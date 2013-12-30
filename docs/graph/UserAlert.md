# UserAlert

Represents a user's single alert.


## UserAlert(client, id) *constructor*

Creates a `UserAlert` object instance.

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | UserAlert UUID                             |


## UserAlert#get(callback)

Retrieves this alert's content.

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## UserAlert#markRead(callback)

Mark this alert as read.

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## UserAlert#markUnread(callback)

Mark this alert as unread.

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |
