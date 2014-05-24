# Organization (inherits from [`Vertex`](Vertex.md))

Represents an opportunity that user's can participate in.


## Organization(client, id) *constructor*

Creates a `Organization` object instance.

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | Organization UUID                          |


## Organization#content([query], callback)

Retrieves the content (ie: approved submissions) for an organization.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## Organization#participation([key], [entity], callback)

Retrieves the participation data (eg: impact) for an organization.

| Parameter  | Type       |                                                                 |
| ---------- | ---------- | --------------------------------------------------------------- |
| `key`      | `String`   | Subset of participation data to retrieve (eg: "impact")         |
| `callback` | `Function` |                                                                 |


## Organization#submissions([query], callback)

Retrieves all submissions for an organization.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |
