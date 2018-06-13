# Google Cloud Platform Setup

## Prerequisites
* Install [Google Cloud SDK](https://cloud.google.com/sdk/)
* Create a new Cloud Project using the [Cloud Console][cloud-console]
* Enable Billing on that project
* Enable the [Cloud SQL API][cloud-sql-api-enable]


## Setup

### Environment variables

You can create an `.env.gcp` file in the project root. This will make 
deploying services to GCP a bit easier since the `.env.gcp` file will override 
values in the `.env` file. The `.env.gcp` is optional for local development. If 
you see warnings in the console about the file missing when running certain `make` 
commands, that's ok. The `.env.gcp` file will only affect the `.tpl` files and you 
should only add overrides for GCP specific resources. 

### Google App Engine

Create an App Engine application within your new project:

```
$ gcloud app create
```

Configure Google Cloud SDK with your account and the project ID you've just created:

```
$ gcloud init
```

Update the following environment variables in `.env` file:

| Variable | Description |
| :--- | :--- |
| `GCP_PROJECT` | The unique ID of you Google project. Default is `tide-local`. Note: you must update this value if you plan to use **any** GCP resources, for purely local development the default value will work as-is. |
| `GCP_REGION` | The [region][regions-and-zones] where all your resources will be created. For example, `us-west1`. |
| `GCP_ZONE` | The preferred [zone][regions-and-zones] in your region that resources will be created, For example, `us-west1-a`. |

### Google Cloud Storage for App Engine

Configure the App Engine default GCS bucket for later use. The default App Engine 
bucket is named YOUR_PROJECT_ID.appspot.com. Change the default Access Control 
List (ACL) of that bucket as follows:

```
$ gsutil defacl ch -u AllUsers:R gs://YOUR_PROJECT_ID.appspot.com
```

If you want to upload images to WordPress then you'll need to create a bucket for 
those images to live (unless you opt to use the local file system). Open the 
[Cloud Storage Browser][cloud-storage-browser] and click **Create Bucket**.

Run the following command to change the ACL's of your new bucket:

```
$ gsutil defacl ch -u AllUsers:R gs://YOUR_BUCKET_NAME
```

When the API is up and running, log into the WordPress admin and go to the plugin 
settings page for `GCS Upload` then add your bucket name to the form field and 
click **Save Settings**.

### Service Account

Finally, go to the [the Credentials section][credentials-section] of your project 
in the Console. Click 'Create credentials' and then click 'Service account key.' 
For the Service account, select 'App Engine app default service account.' Then 
click 'Create' to create and download the JSON service account key to your local 
machine. Save it as `service-account.json` in the the projects root directory for 
use with connecting to both Cloud Storage and Cloud SQL.

[cloud-console]: https://console.cloud.google.com/
[cloud-sql-api-enable]: https://console.cloud.google.com/flows/enableapi?apiid=sqladmin
[gcloud-sdk]: https://cloud.google.com/sdk/
[gsutil]: https://cloud.google.com/storage/docs/gsutil_install
[credentials-section]: https://console.cloud.google.com/apis/credentials/