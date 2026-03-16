---
layout: post
title: 'Asynchronous programming in .NET - introduction'
date: 2019-09-16
banner_image: async.jpg
tags: [development, asynchronous, tutorial, programming, introduction]
---

At the beginning, it is worth considering what asynchronous programming is and why it is better than synchronous.
Asynchronous programming involves approaching the problem in a completely different way. The point is that the program code does not execute line by line, waiting each time for the end of the operation to move on. It allows us to speed up the program to a great extent, release the main thread of the application.

<!--more-->

### Synchronous vs asynchronous

Imagine a situation in which a user wants to download a list of e-mails in his e-mail client, e.g. Outlook. Choose the download button and ...?

In a synchronous approach, his main program thread has just been blocked to execute email retrieval. What does it mean? Well, at this point the application stops responding to any commands, you can not start writing a new message, change settings, etc. In today's world, something like this is unacceptable. Anyone who would see such an application would quickly remove it from their computer. And here, among other things, the asynchronous approach will apply. It will allow you to transfer the operation of loading the list of messages to a separate thread, so that the main thread will be unlocked and the user will be able to execute other operations, while the list of messages will be completed locally after the operation.

Asynchronous programming gives much better results in this situation, but by default it requires much more complicated code, but not this time! Microsoft in C # 5.0 introduced a brilliant solution to this problem, the keywords "async" and "await", which allow you to write code almost identical to the synchronous code, and making the operations are asynchronous. I already explain what's going on:

The async keyword informs the runtime that in the current method we will call functions asynchronously and wait for the result.

### Await - what does it mean?

Okay, but what is this await anyway? Why is the code executed differently only by adding this word and creating Task<EmailList> as the return type instead of EmailList?

```csharp
var list = await GetEmailsAsync(new Uri("https://example-mail.com/email-list"));
foreach (var email in list)
{
    email.Show();
}
```

This keyword means that the method we are calling is transformed byc complier into that form

```csharp
var awaiter = GetEmailsAsync(new Uri("https://example-mail.com/email-list")).GetAwaiter();  awaiter.OnCompleted(()=>
{
    var list = awaiter.GetResult();
    foreach (var email in list)
    {
        email.Show();
    }
});
```

Let's take the sample code for synchronous download of email messages by the user.

#### Synchronous

```csharp
void Main()
{
    var list = GetEmails(new Uri("https://example-mail.com/email-list"));
}

public IEnumerable<Email> GetEmails(Uri uri)
{
    HttpClient client = new HttpClient();
    var response = client.Get(uri); // assume that HttpClient has sync implementation of GET
    return JsonConvert.DeserializeObject<List<Email>>(response.Content.ReadAsStringAsync());
}
```

#### Asynchronous

```csharp
async void Main()
{
    var list = await GetEmailsAsync(new Uri("https://example-mail.com/email-list"));
}

public async Task<IEnumerable<Email>> GetEmailsAsync(Uri uri)
{
    HttpClient client = new HttpClient();
    var response = await client.GetAsync(uri);
    response.EnsureSuccessStatusCode();
    return JsonConvert.DeserializeObject<List<Email>>(response.Content.ReadAsStringAsync());
}
```

See how easy it is? Try adding this to your application and you will see that from now on the main thread is no longer locked.

In this case, our problem is solved, but what if we have several operations executed in sequence? Combining tasks comes to the rescue.

### Combining tasks

Sometimes, instead of waiting for each task and executing it sequentially, we can define it earlier and wait for all of them to finish their operation if we do not need to wait for each of them to finish before the next one begins. For this we use Task.WhenAll(). This method says: wait until all the tasks are finished and then continue with the main method. On the other hand, if you don't want to wait for all the methods to finish, and only one, no matter which, we can use Task.WhenAny(); - whenany returns us the first task completed.

Let's create simple cooker! We don't want to start preparing everything step by step. All operations will start at once, boiling water, boiling potatoes and frying bacon. We are newbie and want to check what will finish first.

```csharp
async Task Main(string[] args)
{
    Console.WriteLine("Hello Chef!");
    var potatoesTask =  BoilPotatoesAsync();
    Console.WriteLine("Boiling potatoes.");
    var waterTask =  BoilWaterAsync();
    Console.WriteLine("Boiling water.");
    var baconTask =  FryBaconAsync();
    Console.WriteLine("Frying bacon.");
    var task = await Task.WhenAny(potatoesTask, waterTask, baconTask);
    if (task == baconTask)
    {
        Console.WriteLine("Bacon was first!");
    }
    else if(task == waterTask)
    {
        Console.WriteLine("Water was first!");
    }
    else
    {
        Console.WriteLine("Potatoes were first!");
    }
}
async Task BoilPotatoesAsync()
{
    Thread.Sleep(10000);
    Console.WriteLine("Potatoes boiled.")
}
async Task BoilWaterAsync()
{
    Thread.Sleep(5000);
    Console.WriteLine("Water boiled.")
}
async Task FryBaconAsync()
{
    Thread.Sleep(1000);
    Console.WriteLine("Bacon fried.")
}
```

Result:

```bash
Hello Chef!
Boiling potatoes.
Boiling water.
Frying bacon.
Bacon fried.
Bacon was first!
```

Do you see how easy it is?
At the very beginning I put forward the thesis that asynchronous programming is better - I continue to say, with the capabilities of today's computers, using many threads is an obligation and not just a good practice. However, it should be remembered that always when choosing a solution, template or technology should be guided by common sense and knowledge. If we are creating a simple console application that has to execute a few commands and finish, then rewriting it, redesigning asynchronous can be a slight overengineering, so remember! Always think what you need at the moment and what is appropriate.

That's it in the first part about asynchronous programming.
In the next I will tell you a little more I will focus on the other issues related to asynchronous development and maybe we will slightly touch on reactive extensions. However, what you have read here should be enough to create a fully working application with asynchronous methods.
