# Sync server

The Sync Server is a Go binary that polls the WordPress.org API's for themes and 
plugins to process and writes them to a queue.

## Commands

| Variable | Description |
| :--- | :--- |
| `$ make sync.build.image` | Builds the Sync Server Docker image. |
| `$ make sync.up` | Starts the Sync Server in isolation. |
| `$ make sync.build.up` | Combine the previous two steps. |
| `$ make sync.down` |  Take the isolated Sync Server down. |

## Settings

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
