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
