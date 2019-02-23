# Lighthouse Server
The Lighthouse Server is a Go binary that reads messages from a queue and runs Google 
Lighthouse reports against themes, then sends the results back to the Tide API.

## Commands

| Command | Description |
| :--- | :--- |
| `$ make lighthouse.build.image` | Builds the Lighthouse Server Docker image. |
| `$ make lighthouse.up` | Starts the Lighthouse Server in isolation. |
| `$ make lighthouse.build.up` | Combines the previous two steps. |
| `$ make lighthouse.down` | Takes the isolated Lighthouse Server down. |

## Settings

| Variable | Description |
| :--- | :--- |
| `LH_CONCURRENT_AUDITS` | Sets the number of goroutines the server will perform concurrently. Default is `5`. |
| `LH_MESSAGE_PROVIDER` | Queue audit messages using the local MongoDB, Google Cloud Firestore, or AWS SQS. Must be one of: `local`, `firestore`, `sqs`. Default is `local`. |
| `LH_STORAGE_PROVIDER` | Upload reports to the local file system, Google Cloud Storage, or AWS S3. Must be one of: `local`, `gcs`, `s3`. Default is `local`. |
| `LH_TEMP_FOLDER` | Sets the temporary folder inside the container used to store downloaded files. Default is `/tmp`. |

## Running audits

Details on running Lighthouse audits are [available in the Tide wiki](https://github.com/xwp/go-tide/wiki/Running-Lighthouse-audits).

## Usage

First build the Lighthouse Server Docker image:

```
$ make lighthouse.build.image
```

Next start the Lighthouse Server in isolation:

```
$ make lighthouse.up
```

You can combine the previous two steps and simply run:

```
$ make lighthouse.build.up
```

Take the isolated Lighthouse Server down:

```
$ make lighthouse.down
```