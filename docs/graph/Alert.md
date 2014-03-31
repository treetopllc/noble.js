# Alert

Represents a user alert, inherits a select set of methods
from [`Vertex`](Vertex.md).


## Alert(client, id) *constructor*

Creates an `Alert` object instance.

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | Alert UUID                                 |


## Alert#baseUri <-- Vertex#baseUri
## Alert#uri <-- Vertex#uri
## Alert#belongsTo <-- Vertex#belongsTo


## Alert#markRead(callback)

Mark this single alert as read

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## Alert#markUnread(callback)

Mark this single alert as unread

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |
