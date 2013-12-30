# Lookup Reference

Throughout many API calls you will find many various types identified only by
a `Number`. We've included `Client.reference` as a way to translate those ID
`Number`s to human-friendly `String`s. (and vice-versa)

A helpful use-case is in several API calls that take a `types` parameter. (or
similar) The API requires the ID numbers to be passed, and you can accomplish
that while retaining readability via the lookup-tables. For example:


```javascript
client.search({
    types: [
        client.reference.vertex_types.by_name.EVENT,
        client.reference.vertex_types.by_name.ORGANIZATION,
        client.reference.vertex_types.by_name.OPPORTUNITY
    ]
}, callback);

// better yet...

var types = client.reference.vertex_types.by_name;

client.search({
    types: [
        types.EVENT,
        types.ORGANIZATION,
        types.OPPORTUNITY
    ]
}, callback);
```
