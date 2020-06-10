# Google App Engine

You need to setup App Engine before you can deploy to GCP or use GCP resources for local development.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| **Auto Scaling**: |
| `GAE_API_AS_COOL_DOWN_PERIOD_SEC` | The number of seconds that the autoscaler should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. The cool-down period must be greater than or equal to 60 seconds. An example value is `120`. |
| `GAE_API_AS_CPU_TARGET_UTILIZATION` | Target CPU utilization. CPU use is averaged across all running instances and is used to decide when to reduce or increase the number of instances. Note that instances are downscaled irrespective of in-flight requests 25 seconds after an instance receives the shutdown signal. An example value is `0.5`. |
| `GAE_API_AS_MAX_NUM_INSTANCES` | The maximum number of instances that your service can scale up to. The maximum number of instances in your project is limited by your project's [resource quota](https://cloud.google.com/compute/docs/resource-quotas). |
| `GAE_API_AS_MIN_NUM_INSTANCES` | The minimum number of instances given to your service. When a service is deployed, it is given this many instances and scales according to traffic. Must be `1` or greater, use a minimum of `2` to reduce latency. |
| **Cron Schedule**: |
| `GAE_API_CRON_SCHEDULE_MINS` | The number of minutes between cron intervals. An example value is `1`. |
| **Readiness Check**: |
| `GAE_API_RC_APP_START_TIMEOUT_SEC` | The maximum time, in seconds, an instance has to become ready after the VM and other infrastructure are provisioned. After this period, the deployment fails and is rolled back. You might want to increase this setting if your application requires significant initialization tasks, such as downloading a large file, before it is ready to serve. Must be within the range of: `1-3600`. |
| `GAE_API_RC_CHECK_INTERVAL_SEC` | Time interval between checks, in seconds. Must be within the range of: `1-300`. |
| `GAE_API_RC_FAILURE_THRESHOLD` | An instance is unhealthy after failing this number of consecutive checks. Must be within the range of: `1-10`. |
| `GAE_API_RC_SUCCESS_THRESHOLD` | An unhealthy instance becomes healthy after successfully responding to this number of consecutive checks. Must be within the range of: `1-10`. |
| `GAE_API_RC_TIMEOUT_SEC` | Timeout interval for each request, in seconds. Must be within the range of: `1-300`. |

## Setup

Create an App Engine application within your new project:

```
$ gcloud app create
```

Configure Google Cloud SDK with your account and the project ID you've just created:

```
$ gcloud init
```

Configure the App Engine default GCS bucket for later use. The default App Engine bucket is named `YOUR_PROJECT_ID.appspot.com`. Change the default Access Control List (ACL) of that bucket as follows:

```
$ gsutil defacl ch -u AllUsers:R gs://YOUR_PROJECT_ID.appspot.com
```

## Deploy

Deploying the API to App Engine is fairly straight forward. You'll need to provision a database and then deploy the app. With one caveat. The first time you deploy the API you **must** remove the `readiness_check` section from your `service/api/app.yaml` or your app will never become healthy. The section looks like this:

```yaml
readiness_check:
  path: "/health-check.php"
  timeout_sec: 4
  check_interval_sec: 5
  failure_threshold: 2
  success_threshold: 2
  app_start_timeout_sec: 60
```

_Once you've deployed and installed WordPress add the `readiness_check` section back to `app.yaml` and re-deploy. The health check should be working and ensuring the health of your containers on App Engine._

Deploy the API to App Engine:

```
make api.deploy.app
```

_You will need to activate the plugins, create the necessary API user accounts, and setup permalinks manually._
