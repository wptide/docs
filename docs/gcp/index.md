# Google Cloud Platform

If you are going to use any GCP resources for local development or plan to deploy Tide to the cloud, then you will have to install some prerequisites and get everything properly setup first.

## Prerequisites

* Create a new Cloud Project using the [Cloud Console](https://console.cloud.google.com/)
* Enable Billing on that project
* Enable the [Cloud SQL API](https://console.cloud.google.com/flows/enableapi?apiid=sqladmin)
* Enable [App Engine](https://console.cloud.google.com/appengine)
* Create a `service-account.json`
* Install [Google Cloud SDK](https://cloud.google.com/sdk/)
* Install [`gsutil`](https://cloud.google.com/storage/docs/gsutil_install)

## Service Account

Go to the [Credentials](https://console.cloud.google.com/apis/credentials/) section of your project in the Console. Click **Create credentials** and then click **Service account key**. For the Service account, select **App Engine app default service account**. Then click **Create** to generate and download the JSON service account key file to your local machine. Save the file as `service-account.json` in the projects root directory. We will use this file to connect to Google Cloud Platform services and API's like Cloud Storage and Cloud SQL.

_If **App Engine app default service account** is missing from the list of service accounts, then you haven't activated App Engine for your project or it is still initializing._

Deploying to GCP is optional and not required for local development. In this
section we've included some of the basic steps required to get setup on GCP.

## Environment Variables

You are required to create an `.env.gcp` file in the project root. You should also add the correct values to the variables in the `.env` file only if you plan to deploy or test real GCP resources. However, the `.env.gcp` file makes deploying services to GCP a lot easier, since the `.env.gcp` file will override values in the `.env` file to update any YAML deployment files, but not environment variables.

These three variables are required for both local development and deployments to GCP.

| Variable | Description |
| :--- | :--- |
| `GCP_PROJECT` | The unique ID of your Google project. Default is `tide-local`. _Note: you must update this value if you plan to use **any** GCP resources, for purely local development the default value will work as-is._ |
| `GCP_REGION` | The [region][regions-and-zones] where all your resources will be created. For example, `us-west1`. |
| `GCP_ZONE` | The preferred [zone][regions-and-zones] in your region that resources will be created, For example, `us-west1-a`. |

_Remember to add the region you end up using during the `gcloud app create` step on the [Google App Engine](google-app-engine.md) page or you'll be troubleshooting the reason things are not working for hours._

[regions-and-zones]: https://cloud.google.com/compute/docs/regions-zones/