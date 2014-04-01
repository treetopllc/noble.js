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


## User#submission(id)

Returns a `Submission` object that represents a submission that is
"owned" by this user.

| Parameter | Type     |
| --------- | -------- |
| `id`      | `String` |


## User#moderations([query], callback)

Retrieves a list of moderations for this user. (moderations are
submissions that this user has admin ability over)

| Parameter  | Type       |
| ---------- | ---------- |
| `query`    | `Object`   |
| `callback` | `Function` |


## User#moderation(id)

Returns a `Moderation` object that represents a moderation that is
"owned" by this user.

| Parameter | Type     |
| --------- | -------- |
| `id`      | `String` |


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


## User#participation([entity], callback)

Retrieves participation metrics for this user in relation to a
specific `entity`. (or in general if no `entity` is provided)

| Parameter  | Type       |
| ---------- | ---------- |
| `entity`   | `String`   |
| `callback` | `Function` |


## User#author(type, params, callback)

Creates a new vertex that is owned by the current user. (eg: they
"authored" it)

Alias: `add`

| Parameter  | Type       | Notes                                             |
| ---------- | ---------- | ------------------------------------------------- |
| `type`     | `String`   | Must match one of the types in `mixin.js`         |
| `params`   | `Object`   | Changes per-type (see the respective constructor) |
| `callback` | `Function` |                                                   |


## User#contribute(params, callback)

Creates a new submission vertex that is owned by the current user. (this
is a thin wrapper around `User#author`)

| Parameter  | Type       | Notes                 |
| ---------- | ---------- | --------------------- |
| `params`   | `Object`   | See `Submission` docs |
| `callback` | `Function` |                       |
