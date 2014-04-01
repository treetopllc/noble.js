# Vertex

A vertex is a "node" within a graph data-structure. In our API, any vertex can
be accessed via `GET /vertices/:id`. That being said, the "core" vertex data
will likely not be very useful. Therefore, `Vertex` is a "base class" that each
of the types inherit from.


## Vertex(client, id) *constructor*

Represents a generic vertex within the graph. (this is the "base class" that
other types will inherit from)

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | Vertex UUID                                |


## Vertex#base `String`

The base URI for generating URI for various endpoints.


## Vertex#baseUri()

Returns a `String`, which is the base URL for this entity (which
includes `Vertex#base` and any owner entities)


## Vertex#uri([path])

Returns a `String`, which is the URL for this entity (including any
appended `path` information, plus `Vertex#id` if available)

| Parameter  | Type     |
| ---------- | -------- |
| `path`     | `String` |


## Vertex#get(callback)

Returns the vertex information. (via `GET /:base/:id`)

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## Vertex#create(data, callback)

Creates a new Vertex (via `POST /:base`)

| Parameter  | Type       |
| ---------- | ---------- |
| `data`     | `Object`   |
| `callback` | `Function` |


## Vertex#modify(data, callback)

Modifies the vertex. (via `PATCH /:base/:id`) This can also modify
a batch of vertices if no `id` is set and an `Array` of objects is
passed as `data`.

| Parameter  | Type                  |
| ---------- | --------------------- |
| `data`     | `Object|Array:Object` |
| `callback` | `Function`            |


## Vertex#related(type, query, callback)

Returns a list of vertices that are related to the current vertex.
(via `GET /:base/:id/:type`)

| Parameter  | Type       | Description             |
| ---------- | ---------- | ----------------------- |
| `type`     | `String`   | Varies by vertex type   |
| `query`    | `Object`   | Query-string parameters |
| `callback` | `Function` |                         |


## Vertex#toVertex()

Convert this object (particularly a subclass, like `Submission`) into a
plain `Vertex` object.


## Vertex#belongsTo(owner)

Establishes a "resource" hierarchy for this vertex. For example, a
user's submission can only be accessed within the `/users/:id` namespace.
Thus, creating a `Submission` object that has a `User` object as it's
owner will generate the correct URL.


## Vertex.extend(Constructor)

This convenience method allows the `Constructor` to inherit
from `Vertex` (without needing to establish that inheritance chain
itself)
