---
layout: post
title: 'Architectural patterns - holiness or guideline?'
date: 2019-09-01
banner_image: road.jpg
tags: [development, architecture, patterns, design]
---

Many people at the beginning of the project ask themselves - what architecture to choose? Would you not even think about it when starting your first serious project? I bet you would.

In this post I will try to answer this question from my perspective, because I have always thought about it myself... until one day.

<!--more-->

### Microservices or monolith?

Some time ago, at the request of one of the companies, I was to prepare an application whose functionalities were to be facial recognition. My first thought? MICROSERVICES! - because why not put a super microservice, which will be heavily loaded with processing images containing the face, next to the rest of the functionalities that did not require such resources? The application seemed ideal to directly adapt to this architecture. However, I quickly collided with a customer who said - I want to have it in a month. Then a doubt appeared in my head: "There is no option, I will not do it in such a short time, after all, so much configuration and planning are needed, and the client does not understand how important it is for him in the perspective of time and application development."

What if you look at the problem differently? We are not slaves to one technology, one right thinking. Of course, certain rules should be followed, but they are all just guidelines, not indications of an ideal design. Note that microservices match one project, but a small monolithic application may be enough for another. This is what **Cesar de la Tore** writes about in his book about microservices https://dotnet.microsoft.com/learn/web/microservices-architecture.
And this is also my opinion after a few years spent on numerous projects.

### Go hybrid

Don't feel limited. Go hybrid! In my case, I decided to use a little microservice architecture, and a little monolithic - functionalities that I defined at the very beginning as those with the greatest load I separated from the main application building something like a monolith + external (micro) services - Web API for application management and a separate face detection service and processing the information needed to support the end user who has caused the most traffic. Did it work? By all means - I saved a lot of time setting up the ideal environment for microservices or k8s, and at the same time I gained the most important advantage of microservices - I separated several of the most crowded services from the main application, which gave me High availability and the ability to scale them due to load without the need to scale the entire system.

Why do I think this approach is appropriate? We rarely have the comfort of choosing the perfect path when creating a new application, because the customer wants it already, because it is a small application, so why play in overengineering ... All these are good reasons to start with the simplest - monolith, but if we look slightly forward and we will be able to predict then which parts of the application may have a much greater load compared to the rest, or which part will be updated frequently, without the need to update the rest, it is worth separating it already at the planning stage. Because from experience I know that after some time, when the project grows to sizes that we could not imagine at the very beginning, dividing it into smaller services will require, first of all, good will and willingness on the part of project managers, then a lot of time for the appropriate separation of . bounded contexts and whole application separations.

I will tell you why I claim that the path always leads to microservices in another post. Meanwhile, I am waiting for your comments and opinions on how we should approach the topic of architecture and design of our application from the very beginning! And also please give me the feedback what do you think about this blog and very first post. All constructive comments appreciated!
