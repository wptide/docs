# Sync server

The Sync Server is a Go binary installed on an Alpine Linux Docker image that polls the wp.org API's for themes and plugins to process and writes them to a queue.

Unless you have good reason to set the `SYNC_ACTIVE` environment variable to `on` you should leave the server set to `off` and not bring up the container by running `make sync.up`. Turning on the Sync Server will put around 50k audits in the queue and will take days to process locally and potentially lock up all your computers resources. A better way to audit wp.org themes and plugins would be to follow the instructions found in the [Run Audits](../installation/setup.md#run-audits) section of the setup page.

If you do decide that you would like to seed the queue with plugins and themes, or are testing changes you've made to the Go binary, you can run `make sync.up` for a second or two and then in a different shell run `make sync.down` which should add a few hundred items to the queue.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `SYNC_ACTIVE` | Whether the Sync Server is active or not. Must be one of: `on`, `off`. Default is `off`. |
| `SYNC_API_BROWSE_CATEGORY` | The API category used to ingest the wp.org themes and plugins. Must be one of: `popular`, `featured`, `updated`, `new`. Default is `updated`. |
| `SYNC_DATA` | When the database provider is set to `local` this will be where the data is stored relative to the `/srv/data` working directory. Default is `./db`. |
| `SYNC_DATABASE_DOCUMENT_PATH` |  When the database provider is set to `firestore` this value is the path to the document in Cloud Firestore. Must be in the form of `<collection>/<document>`. Default is `sync-server/wporg`. |
| `SYNC_DATABASE_PROVIDER` | Tells the Sync Server which database provider to use; either the local file system or Google Cloud Firestore. Must be one of: `local`, `firestore`. Default is `local`. |
| `SYNC_DEFAULT_CLIENT` | The API client used to make requests by the audit servers; also associated with the key and secret those server use. Default is `wporg`. |
| `SYNC_DEFAULT_VISIBILITY` | The audit and report visibility. Must be one of: `public`, `private`. Default is `public`. |
| `SYNC_FORCE_AUDITS` | Forces audit reports to be generated even if a report exists for the checksum and standard. Must be one of: `yes`, `no`. Default is `no`. |
| `SYNC_ITEMS_PER_PAGE` | The number of plugins or themes per page in the API request. Default is `250`. |
| `SYNC_LH_ACTIVE` | Send messages to the Lighthouse SQS queue. Must be one of: `on`, `off`. Default is `on`. |
| `SYNC_MESSAGE_PROVIDER` | Queue audit messages using the local MongoDB, Google Cloud Firestore, or AWS SQS. Must be one of: `local`, `firestore`, `sqs`. Default is `local`. |
| `SYNC_PHPCS_ACTIVE` | Send messages to the PHPCS SQS queue. Must be one of: `on`, `off`. Default is `on`. |
| `SYNC_POOL_DELAY` | The wait time in seconds between the wp.org theme and plugin ingests. Default is `600`. |
| `SYNC_POOL_WORKERS` | The number of workers (concurrent goroutines) the server will create to ingest the wp.org API. Default is `125`. |

## Commands

| Command | Description |
| :--- | :--- |
| `make sync.build.bin` | Build the Sync Server Go binary. |
| `make sync.clean.bin` | Clean the Sync Server Go binary. |
| `make sync.build.image` | Build the Sync Server Docker image. |
| `make sync.build.up` | Rebuild the Sync Server Docker image & run the container in isolation with docker-compose up. |
| `make sync.up` | Run the Sync Server Docker container in isolation with docker-compose up. |
| `make sync.down` | Take the isolated Sync Server Docker container down. |
| `make sync.stop` | Stop the isolated Sync Server Docker container with docker-compose stop. |
| `make sync.rm` | Remove the stopped Sync Server Docker container with docker-compose rm. |
| `make sync.push.image` | Push the Sync Server Docker image to GCR. |
| `make sync.clean.image` | Clean the Sync Server Docker image from the host machine. |
| `make sync.build.disk` | Build the Sync Server GKE persistent disk. |
| `make sync.build.cluster` | Build the Sync Server GKE cluster. |
| `make sync.creds` | Get the Sync Server GKE cluster credentials. |
| `make sync.tpl` | Generate the Sync Server GKE YAML template. |
| `make sync.deploy.cluster` | Deploy the Sync Server GKE cluster. |
| `make sync.get.cluster` | Get the Sync Server GKE cluster status. |
| `make sync.clean.cluster` | Clean the Sync Server GKE cluster. |