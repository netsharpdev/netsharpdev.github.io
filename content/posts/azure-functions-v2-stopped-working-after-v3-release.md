---
layout: post
title: 'Azure Functions v2 stopped working after v3 release'
date: 2020-01-30
banner_image: az-functions.jpg
tags: [development, azure, solutions, functions]
---

## Azure Functions v2 stopped working after release of Azure Functions v3

Did you experience that problem? Because me and my team did. We spent a lot of time looking for solution which appears to be actually really simple. However, I couldn’t find Microsoft information about that in recent changelogs, blog posts etc. But let me explain what the reason was. 
<!--more-->
It seems like before deployment of Azure Functions v3 to the datacenters it was possible to deploy Azure Function v2 without ```host.json``` file. Suddenly 24th of January 2020 in the morning we started getting errors from our Azure Functions like this:

```
Function (aaaa/xxx) Error: Microsoft.Azure.WebJobs.Host: Error indexing method ‘xxx’. Microsoft.Azure.WebJobs.Host: Cannot bind parameter 'blob' to type ICloudBlob. Make sure the parameter Type is supported by the binding. If you're using binding extensions (e.g. Azure Storage, ServiceBus, Timers, etc.) make sure you've called the registration method for the extension(s) in your startup code (e.g. builder.AddAzureStorage(), builder.AddServiceBus(), builder.AddTimers(), etc.).
```

I was looking for different answers on StackOverflow, nevertheless none of them was soluton in my case. Locally function was working perfectly fine. And reason of that behavior was obvious after comparison of files on production and on my local machine. It appears visual studio is generating host.json file in bin/ folder while our build entries in AzureDevops does not. And that was the case for last couple of months, but functions were working fine in Azure. I created a file called ```host.json``` with content

```JSON
{"version":"2.0"}
```

 in my project and added it with build action set to ```Content``` and copy to output directory to ```Always```. Triggered a build and everything works fine 😉 Hope this post helped you to fix this issue.
