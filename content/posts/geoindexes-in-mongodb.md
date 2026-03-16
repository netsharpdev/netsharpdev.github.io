---
layout: post
title: 'Geospatial Indexes in MongoDB'
date: 2021-09-09
banner_image: mongo.jpg
tags: [mongodb, solutions, database]
---

## What are geospatial indexes?

Recently I have been preparing to MongoDB Professional Developer certification program. I learnt there about something called Geospatial Queries and Indexes. This kind of index had been created to handle geospatial queries. Thanks to them we can easily get nearby places, calculate area, distance or find all points within certain coordinates range.

<!--more-->

## GeoJSON

Geospatial Indexes are created only on field of type **GeoJSON**. This object contains two properties. **Type** contains information about a type of field. It can be for example __Point__ or __Polygon__ (all possible types available [here](https://docs.mongodb.com/manual/reference/geojson/)). Depending on that type, field **Coordinates** has different form. In case of __point__, it will be array containing two values: longitude and latitude **(in this order)**. For polygon it will be array of dual element arrays.

More about GeoJSON format you can read on [RFC7946](https://datatracker.ietf.org/doc/html/rfc7946).

### Is it the only way?

MongoDB supports as well legacy coordinate pairs. It means you can store coordinates just as field of type array. But that works only with **2d** index. If you want to use 2dsphere, you have to convert to GeoJSON (what is pretty easy to do with aggregations).

## 2d and 2dsphere index

As I mentioned, there are two types of Geospatial index available in MongoDB. **2d** are coordinates on two-dimensional plane. 
```JSON
{ "loc": [54.0221231, 0.2132442]}
```
On the other hand, we have **2dsphere** index that has been designed to handle earth-like sphere. It makes it great tool to find  for example closest restaurants to the user or within specific polygon like district, etc.

## How to calculate distance?

The problem I encountered was following. My task was to calculate current distance between a plane and a city it is heading to. I was thinking that there needs to be written external javascript code to perform the action. I found some sort of solution of that issue on this [page](https://www.movable-type.co.uk/scripts/latlong.html). It uses mathematical algorithm to calculate distance on the sphere. 
```javascript
function calculateDistance(lat1,lon1,lat2,lon2){	
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}
```

In the end I have better solution than that above. I will describe it in the next paragraphs.

## How actually can we use geospatial queries?

Let's assume we are building application that show us all restaurants within range of 1000 meters.
First of all, start with importing some data of a restaurants around.
For that let's create sample dataset. For testing purposes I will use sample generated data in MongoDB atlas. [Here](https://docs.atlas.mongodb.com/sample-data/) is manual how to load it.

Let's connect to MongoDB via shell. (Install Mongo Shell first.)
In order to do that go to database __Overview__ tab and click __Connect__. There you will find instructions how to do that.
In my case it will be
```bash
mongosh "mongodb+srv://test.fd2ej.mongodb.net/myFirstDatabase" --username admin
```
Now we need to select **"sample_restaurants"*** database.
```javascript
use sample_restaurants
```
Once that is done. Find first restaurant to see what the schema is.
```javascript
 db.restaurants.findOne({restaurant_id: '30112340'})
```
The result should look like this:
```javascript
{
  _id: ObjectId("5eb3d668b31de5d588f4292d"),
  address: {
    building: '469',
    coord: [ -73.961704, 40.662942 ],
    street: 'Flatbush Avenue',
    zipcode: '11225'
  },
  borough: 'Brooklyn',
  cuisine: 'Hamburgers',
  grades: [
    { date: ISODate("2014-12-30T00:00:00.000Z"), grade: 'A', score: 8 },
    {
      date: ISODate("2014-07-01T00:00:00.000Z"),
      grade: 'B',
      score: 23
    },
    {
      date: ISODate("2013-04-30T00:00:00.000Z"),
      grade: 'A',
      score: 12
    },
    {
      date: ISODate("2012-05-08T00:00:00.000Z"),
      grade: 'A',
      score: 12
    }
  ],
  name: "Wendy'S",
  restaurant_id: '30112340'
}
```
You can notice that coordinates are saved in old way. We should convert that into GeoJSON structure. In order to do it we will use [aggregation](https://docs.mongodb.com/manual/aggregation/).
```javascript
excludeEmptyCoords = { $match: { "address.coord": { $elemMatch: {$exists: true}}}}
addField = { $addFields: { "address.location": { type: "Point", coordinates: "$address.coord"} } }
unsetCoord = { $unset: "address.coord" }
newCollection = {$out: "formated_restaurants" }
db.restaurants.aggregate([excludeEmptyCoords, addField, unsetCoord, newCollection]);
```
This is how we have created new collection called **"formatted_restaurants"**. 
Now we need to create geo index on that collection.
```javascript
db.formated_restaurants.createIndex({ "address.location": "2dsphere" })
```
Excellent! We are now ready for geospatial queries! Let's assume we are at Wendy's bar (our sample restaurant from first query). Our coordinates are: 
```javascript
here = [ -73.961704, 40.662942 ];
```

Now, let's find all restaurants within 1000 meters from **here**.
```javascript
db.formated_restaurants.find({
    "address.location": {
        $near: {
            $geometry: {type: "Point", coordinates: here},
            $maxDistance: 1000,
            $minDistance: 0
        }
    }
})
```
Let us see how far from **here** are restaurants we are getting in this query. In order to calculate that we need to use aggregation again.
```javascript
db.formated_restaurants.aggregate({
    $geoNear: {
        near: { type: "Point", coordinates: here},
        spherical: true,
        distanceField: "calculatedDistance",
        maxDistance: 1000
    }
})
```

I wrote previously in this post that we could use this aggregation to calculate actualy distance between here and the target. To make it work I need to have unique identifier of a target and a place I am.

Let's find distance between me and restaurant called __"The Local Ice Cream"__(id: 50009217).

```javascript
db.formated_restaurants.aggregate({
    $geoNear: {
        near: { type: "Point", coordinates: here},
        spherical: true,
        distanceField: "calculatedDistance",
        query: { restaurant_id: '50009217'}
    }
})
```
This aggregation is going to return us an array with one object in it.
```javascript
[
  {
    _id: ObjectId("5eb3d669b31de5d588f47fc1"),
    address: {
      building: '843',
      street: 'Classon Avenue',
      zipcode: '11238',
      location: { type: 'Point', coordinates: [ -73.9611369, 40.6719058 ] }
    },
    borough: 'Brooklyn',
    cuisine: 'Ice Cream, Gelato, Yogurt, Ices',
    grades: [
      {
        date: ISODate("2014-07-15T00:00:00.000Z"),
        grade: 'A',
        score: 0
      }
    ],
    name: 'The Local Ice Cream',
    restaurant_id: '50009217',
    calculatedDistance: 998.9881035721183
  }
]
```

Look how awesome this is! Thanks to Geospatial queries and GeoIndexes we can build awesome solutions that use maps and distances between the points we imagine! Geospatial Queries give us even more. I hope I helped you a bit to understand how it works. I encourage you to read more about that on official MongoDB [website](https://docs.mongodb.com/manual/geospatial-queries/). If you have any questions, please reach out to me in the comments section or write an email: pawel.pindel@netsharpdev.com.


