# User (inherits from [`Vertex`](Vertex.md))

This represents a NobleHour user. Thus, the user-centric actions of the API
will be routed through this object.


## User(client, id) *constructor*

Represents a User within the Graph API. (inherits from `Vertex`)

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | User ID                                    |


## User#submissions([query], callback)

Retrieves a list of submissions for this user.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#authored([query], callback)

Retrieves a list of content this user has created.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#feed([query], callback)

Retrieves a list of content in this user's feed.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#network([query], callback)

Retrieves this user's network. ("connected" entities)

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#submissions([query], callback)

Retrieves a list of submissions for this user.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#role(entity, callback)

Retrieves this user's role relative to the passed `entity`, where `entity` is a
vertex UUID. If none is passed, the `NobleHour` vertex is assumed.

| Parameter  | Type       |
| ---------- | ---------- |
| `entity`   | `String`   |
| `callback` | `Function` |


## User#alert(id)

Returns a [`UserAlert`](UserAlert.md) object.


## User#alerts([query], callback)

Retrieves a list of alerts for this user.

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#alertsStats(callback)

Retrieves this statistics (e.g. unread count) for this user's alerts.

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## User#contribute(params, callback)

Share existing content with another community.

Available `params`:

| Parameter         | Type           | Notes                                  |
| ----------------- | -------------- | -------------------------------------- |
| `content_id`      | `String`       | Vertex UUID of content                 |
| `to`              | `Array:String` | Community UUIDs                        |
| `name`            | `String`       | For the new `Submission` vertex        |
| `description`     | `String`       | For the new `Submission` vertex        |
| `submission_type` | `Number`       | See [reference](../reference.md) notes |
| `status`          | `Number`       | See [reference](../reference.md) notes |
