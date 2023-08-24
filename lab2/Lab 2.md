For this assignment, you will practice your usage of redis and async / await together. 

You will create a Marvel API Express Server that caches the results in Redis. Your routes will just return JSON data.

You can use the following code to construct the URL. (this example is for characters, you would do the same for series and comics) you can read more about AUTHORIZING AND SIGNING REQUESTS from the link below

You will cache your data in Redis for this assignment after it has been accessed; you should not cache all data by default. When a request is made to one of the routes, you will first check to see if it is already stored in the cache.  If it is, you will serve it from the cache. If it's not stored in the cache, you will then make a request to the Marvel API to get the data, store it in the cache for the next time it is accessed and will respond with the JSON data. 

You will have 4 routes. 

1) Check if the character has a cache entry in redis. If so, render the result from that cache entry

2) If not, query the data from the Marvel API for the Character and fail the request if they are not found, or send JSON and cache the result if they are found.

**You will insert everything in the `"results"` property returned from the API. You'll notice `results` is an array, even through there is only one character in the results. You can just take `results[0]`Again, LOOK at the data returned from the API. It's always important to understand the data schema when you pull data from an API.** 

If the character is found, then you will add their ID to a list of recently viewed character (this list allows duplicates!) ordered by most recent character that was accessed first. This list can be infinitely large.

This route will respond with an array of the last 20 characters that were accessed in the cache from the recently viewed list. **You can have duplicate characters in your 20 character list**.

**For each character being printed out, you will print out their entire data returned from the API. You will insert everything in the `"results"` property returned from the API. You'll notice `results` is an array, even through there is only one character in the results. You can just take `results[0]`Again, LOOK at the data returned from the API. It's always important to understand the data schema when you pull data from an API.** 

For example, if character 1011334 was accessed , then character 1009146, then character 1009149, then character 1009146, then character 1011031, you would output:

```
[
```

1) Check if the comic has a cache entry in redis. If so, render the result from that cache entry

2) If not, query the data from the Marvel API for the Comic and fail the request if it is not found, or send JSON and cache the result if they are found.

**You will insert everything in the `"results"` property returned from the API. You'll notice `results` is an array, even through there is only one comic in the results. You can just take `results[0]`Again, LOOK at the data returned from the API. It's always important to understand the data schema when you pull data from an API.** 

1) Check if the story has a cache entry in redis. If so, render the result from that cache entry

2) If not, query the data from the Marvel API for the Story and fail the request if it is not found, or send JSON and cache the result if they are found.

**You will insert everything in the `"results"` property returned from the API. You'll notice `results` is an array, even through there is only one story in the results. You can just take `results[0]`Again, LOOK at the data returned from the API. It's always important to understand the data schema when you pull data from an API.**