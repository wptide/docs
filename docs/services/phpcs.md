# PHPCS Server

The PHPCS Server is a Go binary that reads messages from a queue and runs PHPCS 
reports against both plugins and themes, then sends the results back to the Tide API.

## Commands

| Variable | Description |
| :--- | :--- |
| `$ make phpcs.build.image` | Builds the PHPCS Server Docker image. |
| `$ make phpcs.up` | Starts the PHPCS Server in isolation. |
| `$ make phpcs.build.up` | Combines the previous two steps. |
| `$ make phpcs.down` | Takes the isolated PHPCS Server down. |

## Settings

| Variable | Description |
| :--- | :--- |
| `PHPCS_CONCURRENT_AUDITS` | Sets the number of goroutines the server will perform concurrently. Default is `5`. |
| `PHPCS_MESSAGE_PROVIDER` | Queue audit messages using the local MongoDB, Google Cloud Firestore, or AWS SQS. Must be one of: `local`, `firestore`, `sqs`. Default is `local`. |
| `PHPCS_STORAGE_PROVIDER` | Upload reports to the local file system, Google Cloud Storage, or AWS S3. Must be one of: `local`, `gcs`, `s3`. Default is `local`. |
| `PHPCS_TEMP_FOLDER` | Sets the temporary folder inside the container used to store downloaded files. Default is `/tmp`. |
