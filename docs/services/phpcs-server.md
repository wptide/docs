# PHPCS Server

The PHPCS Server is a Go binary installed on an Alpine Linux Docker image that reads messages from a queue and runs PHPCS reports against both plugins and themes, then sends the results back to the Tide API. It is important to note that the PHPCS Server only does static analysis of PHP compatibility and WordPress coding standards and does not execute code or install themes and plugins into WordPress to run the audit.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `PHPCS_CONCURRENT_AUDITS` | Sets the number of goroutines the server will perform concurrently. Default is `5`. _This is currently deactivated and will have no impact during runtime._ |
| `PHPCS_MESSAGE_PROVIDER` | Queue audit messages using the local MongoDB, Google Cloud Firestore, or AWS SQS. Must be one of: `local`, `firestore`, `sqs`. Default is `local`. |
| `PHPCS_STORAGE_PROVIDER` | Upload reports to the local file system, Google Cloud Storage, or AWS S3. Must be one of: `local`, `gcs`, `s3`. Default is `local`. |
| `PHPCS_TEMP_FOLDER` | Sets the temporary folder inside the container used to store downloaded files. Default is `/tmp`. |

## Commands

| Command | Description |
| :--- | :--- |
| `make phpcs.build.bin` | Build the PHPCS Server Go binary. |
| `make phpcs.clean.bin` | Clean the PHPCS Server Go binary. |
| `make phpcs.build.image` | Build the PHPCS Server Docker image. |
| `make phpcs.build.up` | Rebuild the PHPCS Server Docker image and run the container in isolation with docker-compose up. |
| `make phpcs.up` | Run the PHPCS Server Docker container in isolation with docker-compose up. |
| `make phpcs.down` | Take the isolated PHPCS Server Docker container down. |
| `make phpcs.stop` | Stop the isolated PHPCS Server Docker container with docker-compose stop. |
| `make phpcs.rm` | Remove the stopped PHPCS Server Docker container with docker-compose rm. |
| `make phpcs.push.image` | Push the PHPCS Server Docker image to GCR. |
| `make phpcs.clean.image` | Clean the PHPCS Server Docker image from the host machine. |
| `make phpcs.build.cluster` | Build the PHPCS Server GKE cluster. |
| `make phpcs.creds` | Get the PHPCS Server GKE cluster credentials. |
| `make phpcs.tpl` | Generate the PHPCS Server GKE YAML template. |
| `make phpcs.deploy.cluster` | Deploy the PHPCS Server GKE cluster. |
| `make phpcs.get.cluster` | Get the PHPCS Server GKE cluster status. |
| `make phpcs.clean.cluster` | Clean the PHPCS Server GKE cluster. |