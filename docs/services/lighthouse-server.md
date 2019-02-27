# Lighthouse Server

The Lighthouse Server is a Go binary installed on an Alpine Linux Docker image that reads messages from a queue and runs Google Lighthouse reports against themes, then sends the results back to the Tide API.

It is important to note that the server only works for wp.org themes and the most recent version of it. This means that in a headless instance of Chromium the Lighthouse CLI audits each theme by loading the demo version found on wp-themes.com, which is always the latest version so if you request a theme audit for a previous version the results will be for the latest one. Eventually, we will look into a way to load the theme into the container and audit any version on request.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `LH_CONCURRENT_AUDITS` | Sets the number of goroutines the server will perform concurrently. Default is `5`. _This is currently deactivated and will have no impact during runtime._ |
| `LH_MESSAGE_PROVIDER` | Queue audit messages using the local MongoDB, Google Cloud Firestore, or AWS SQS. Must be one of: `local`, `firestore`, `sqs`. Default is `local`. |
| `LH_STORAGE_PROVIDER` | Upload reports to the local file system, Google Cloud Storage, or AWS S3. Must be one of: `local`, `gcs`, `s3`. Default is `local`. |
| `LH_TEMP_FOLDER` | Sets the temporary folder inside the container used to store downloaded files. Default is `/tmp`. |

## Commands

| Command | Description |
| :--- | :--- |
| `make lighthouse.build.bin` | Build the Lighthouse Server Go binary. |
| `make lighthouse.clean.bin` | Clean the Lighthouse Server Go binary. |
| `make lighthouse.build.image` | Build the Lighthouse Server Docker image. |
| `make lighthouse.build.up` | Rebuild the Lighthouse Server Docker image and run the container in isolation with docker-compose up. |
| `make lighthouse.up` | Run the Lighthouse Server Docker image in isolation with docker-compose up. |
| `make lighthouse.down` | Take the isolated Lighthouse Server Docker container down. |
| `make lighthouse.stop` | Stop the isolated Lighthouse Server Docker container with docker-compose stop. |
| `make lighthouse.rm` | Remove the stopped Lighthouse Server Docker container with docker-compose rm. |
| `make lighthouse.push.image` | Push the Lighthouse Server Docker image to GCR. |
| `make lighthouse.clean.image` | Clean the Lighthouse Server Docker image from the host machine. |
| `make lighthouse.build.cluster` | Build the Lighthouse Server GKE cluster. |
| `make lighthouse.creds` | Get the Lighthouse Server GKE cluster credentials. |
| `make lighthouse.tpl` | Generate the Lighthouse Server GKE YAML template. |
| `make lighthouse.deploy.cluster` | Deploy the Lighthouse Server GKE cluster. |
| `make lighthouse.get.cluster` | Get the Lighthouse Server GKE cluster status. |
| `make lighthouse.clean.cluster` | Clean the Lighthouse Server GKE cluster. |