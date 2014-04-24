# Submission (inherits from [`Vertex`](Vertex.md))

Represents a submission of content between entities. (e.g. User -> Community)
Allows us to follow the approval/denial process.


## Submission(client, id) *constructor*

Creates a `Submission` object instance.

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| `client`  | `Client` | The base client object (passed internally) |
| `id`      | `String` | Submission UUID                            |


## Submission#unsubmit(callback)

Mark the submission as unsubmitted

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |


## Submission#history(callback)

Retrieve the update history for this submission.

| Parameter  | Type       |
| ---------- | ---------- |
| `callback` | `Function` |
