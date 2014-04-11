# Moderation (inherits from [`Vertex`](Vertex.md))

Represents a submission of content between entities. (eg: User -> Community)
Unlike a `Submission`, this is different in that this is from the perspective
of an admin. (can do things like approve/deny)


## Moderation(client, id) *constructor*

Creates a `Moderation` object instance.

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | Moderation UUID                            |


## Moderation#approve(callback)

Mark the submission as approved

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## Moderation#deny(callback)

Mark the submission as denied

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |
