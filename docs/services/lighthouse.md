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

This section outlines the components included in the Lighthouse integration with Tide, demonstrates how the integration processes Lighthouse audits of WordPress.org themes, and provides examples of the Tide API with Lighthouse audit results.

### Status
Lighthouse auditing of WordPress themes has been integrated by running each theme from wp-themes.com through the Lighthouse CLI, stores the full report, and includes the summary results and a link to the full report in the Tide API. This currently functions locally, XWP is working to get this running on GCP.

### Components
The following outlines the components added to Tide in order to integrate Lighthouse in overall Tide auditing of WordPress themes.
1. Docker Container
   - Lighthouse CLI
   - Lighthouse Server binary (lighthouse-server)
   **Note:** Uses an Alpine Image with working Chromium version. Produces consistent results with Lighthouse Chrome extension. Allows reduced image size of 432MB.
2. Go Lighthouse Server Source Code
   - `cmd/lighthouse-server` for binary
   - `src` for packages
   - `vendor` for imported packages
     - [github.com/nanobox-io/golang-scribble](https://github.com/nanobox-io/golang-scribble)
     - [github.com/wptide/pkg](https://github.com/wptide/pkg)
   - Running Tide cluster

### Process
The following demonstrates how a WordPress theme is run through a Lighthouse audit and has its results stored and returned via the Tide API.
1. `tide-cluster`
   - Starts all Tide services and listens...

   ![](images/starts-all-tide-services-and-listens.png)
2. `lighthouse-server`
   - authenticate with Tide API    

   ![](images/authenticate-with-tide-api.png)
   - polls a job queue (SQS) for messages to process

   ![](images/polls-a-job-queue-for-messages-to-process.png)
   - downloads theme and calculates checksum

   ![](images/downloads-theme-and-calculates-checksum.png)
   - runs source through `gocloc` to get code information
   - scans source for Theme header information (required for Lighthouse Report)

   ![](images/scans-source-for-theme-header-info.png)
   - runs theme through `lighthouse` at `https://wp-themes.com/<theme-slug>` and keeps polling for next job.

   ![](images/runs-theme-through-lighthouse-and-keeps-polling-for-next-job.png)
   - take full report and generate detailed report
   - saves full report to a file store (S3)

   ![](images/saves-full-report-to-a-file-store.png)
   - grabs subset of results `reportCategories` with only:
     - category name
     - score
     - Description

   ![](images/grabs-subset-of-results.png)
   - bundles summary result and reference to full report as a message payload
   - payload sent to Tide API instance

   ![](images/payload-sent-to-tide-api-instance.png)

### Lighthouse Results in Tide API
The following are example responses from the Tide API showing a summary of a Lighthouse report and a detailed result of a Lighthouse report.

#### Checksum Endpoint (Summary Only)
https://tide.local/api/tide/v1/audit/ab38727534cbeeef043faf1e54a786e22e4e7c6a172a5ccccf23fe6b2f3d28bd?standards=lighthouse

![](images/checksum-endpoint-summary-only.png)

#### Checksum Endpoint (Details Included)
https://tide.local/api/tide/v1/audit/ab38727534cbeeef043faf1e54a786e22e4e7c6a172a5ccccf23fe6b2f3d28bd?standards=lighthouse&details=all

![](images/checksum-endpoint-details-included.png)

**Note:** Results for details is exactly the same as the output from a Lighthouse CI report.
