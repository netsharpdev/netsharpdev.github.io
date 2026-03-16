---
layout: post
title: 'Clean Architecture based on my open-source project'
date: 2019-12-04
banner_image: shape-half.png
tags: [development, architecture, clean, patterns, design]
---

Recently I am starting a couple of new projects. One of them is my university open-source project helping to donate animal shelters. The first challenge every developer faces is the architecture. There are many possible architectural patterns. I wrote a post about choice between monolith and microservices [here](/posts/architectural-patterns-holiness-or-guideline).

But this post is about how to structure your solution. Clean architecture is one of the patterns which can be applied in monolith and microservice.

<!--more-->

## N-layer vs Clean architecture

### N-layer

There is a whole range of ideas how to design our systems. The first one is N-layered architecture. Meaning that we have couple of layers next to each other.

1. User Interface Layer
2. Business Logic Layer
3. Data Access Layer

First one is dependent on the second one and second is dependent on third one. DAL is a core of the system. The biggest problem of this approach and other &quot;traditional&quot; architectures is tight coupling and lack of separation of concerns.

### Clean

Clean architecture is different from the first one presented and solves the problems which couldn't be handled by traditional designs. Principle which helped to achieve that goal is **Inversion of Control.** This approach brings to us several advantages besides the simplicity of reading the structure. Our app becomes:

- Independent of UI
- Independent of database
- Easily testable
- Independent of infrastructure services

I will try to explain to you how to setup clean app architecture based on my university project with a temporary name [ShenAn](https://github.com/netsharpdev/animalshelter-web). The project consists from only one web application – RESTful WebAPI, but approach which I want to share with you can be used across all micro-services. It does not collide with your high-level architecture.

Here you can see the diagram of the clean (sometimes called Onion) architecture.

![clean_architecture_diagram](/images/posts/shape.png)

It has several layers I want you to know and understand.

#### Domain

Here you keep all domain entities and interfaces. This layer contains enterprise types and logic. In my project I called this layer **ShenAn.Domain**. As you can see in snippet – it has no dependencies.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>

</Project>
```

#### Application

This layer is dependent only on **Domain.** It contains all application logic. Here we also define all interfaces used in infrastructure and persistence layer. Basically this layer is saying how our application handles business logic and deals with domain dependencies and **Common** containing crosscutting concerns.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <ProjectReference Include="..\ShenAn.Domain\ShenAn.Domain.csproj" />
    <ProjectReference Include="..\ShenAn.Common\ShenAn.Common.csproj" />
  </ItemGroup>

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>

</Project>
```

#### Infrastructure

Tn this place you can find all code responsible for handling external services like smtp server, notification service, ftp service, etc. This layer is dependent only on **Application** layer where the interfaces are defined and **Common**.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <ProjectReference Include="..\ShenAn.Application\ShenAn.Application.csproj" />
    <ProjectReference Include="..\ShenAn.Common\ShenAn.Common.csproj" />
  </ItemGroup>

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>

</Project>
```

#### Persistence

This layer handles configuration of database and migration. I implement here Entity Framework Db context or connections to database using different ORM, dependent only on **Application** and **Common**.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <ProjectReference Include="..\ShenAn.Application\ShenAn.Application.csproj" />
    <ProjectReference Include="..\ShenAn.Common\ShenAn.Domain.csproj" />
  </ItemGroup>

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>

</Project>
```

#### Presentation

Last but not least, this is layer is responsible for presenting results and accept incoming request from end-user/external service. In my case this is Web API (ShenAn.WebAPI). It holds all layers, registers and configures them as this is an entry point to our application.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\ShenAn.Common\ShenAn.Common.csproj" />
    <ProjectReference Include="..\ShenAn.Application\ShenAn.Application.csproj" />
    <ProjectReference Include="..\ShenAn.Domain\ShenAn.Domain.csproj" />
    <ProjectReference Include="..\ShenAn.Infrastructure\ShenAn.Infrastructure.csproj" />
    <ProjectReference Include="..\ShenAn.Persistence\ShenAn.Persistence.csproj" />
  </ItemGroup>

</Project>
```

That is how easy it is to setup first project with **Clean Architecture** pattern. Follow my repository on GitHub to see how it develops to have an opportunity to learn from it or contribute and comment if you think I am doing something wrong. Always open for feedback and discussion! Cheers!
