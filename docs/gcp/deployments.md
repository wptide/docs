# Deployments to Google Cloud Platform

Deploying to GCP is optional and not required for local development. In this 
section we've included some of the basic steps required to get setup on GCP.

## GCP Settings

These three settings are required for both local development and deployments to 
GCP. Be sure to use the same region you chose during the earlier 
`gcloud app create` step.

| Variable | Description |
| :--- | :--- |
| `GCP_PROJECT` | The unique ID of you Google project. |
| `GCP_REGION` | The [region][regions-and-zones] where all your resources will be created. For example, `us-west1`. |
| `GCP_ZONE` | The preferred [zone][regions-and-zones] in your region that resources will be created, For example, `us-west1-a`. |

## Google Cloud SQL (GCSQL)

Deploying a database to Cloud SQL for the WordPress API only requires a bit of 
configuration to the environment variable and then to run a single `make` command.

Create the Cloud SQL database:

```
make api.deploy.sql
```

_This command will create a database instance and failover instance, set the 
root password, create a database for WordPress, and create a user for that 
database._

### GCSQL API Settings

| Variable | Description |
| :--- | :--- |
| `GCSQL_API_BACKUP_START_TIME` | he start time of daily backups, specified in the 24 hour format - HH:MM, in the UTC timezone. This is the window of time when you would like backups to start. [Learn more](https://cloud.google.com/sql/docs/mysql/instance-settings#backups-and-binary-logging-2ndgen). |
| `GCSQL_API_DATABASE_VERSION` | The database engine type and version. Must be one of: `MYSQL_5_6`, `MYSQL_5_7`. |
| `GCSQL_API_DB_NAME` | Name of the database. |
| `GCSQL_API_DB_PASSWORD` | Password used to access the database. |
| `GCSQL_API_DB_ROOT_PASSWORD` | The database root password. |
| `GCSQL_API_DB_USER` | Username used to access the database. |
| `GCSQL_API_INSTANCE` | Second Generation instance name. Do not include sensitive or personally identifiable information in your instance name; it is externally visible. |
| `GCSQL_API_FAILOVER_REPLICA_NAME` | The name of the failover replica to be created for the new instance. |
| `GCSQL_API_TIER` | The tier for this instance. For Second Generation instances, this is the instance's machine type (e.g., db-n1-standard-1). The machine type determines the number of CPUs and the amount of memory your instance has. [See valid values](https://cloud.google.com/sql/docs/mysql/instance-settings#tier-values). [Learn more](https://cloud.google.com/sql/docs/mysql/instance-settings#machine-type-2ndgen). |
| `GCSQL_API_MAINTENANCE_RELEASE_CHANNEL` | Your preferred timing for instance updates, relative to other instances in the same project. Use `preview` for earlier updates, and `production` for later updates. [Learn more](https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen). |
| `GCSQL_API_MAINTENANCE_WINDOW_DAY` | Day of week for maintenance window, in UTC time zone. Must be one of: `SUN`, `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`. |
| `GCSQL_API_MAINTENANCE_WINDOW_HOUR` | Hour of day - `0` to `23`. Determines a one-hour window when Cloud SQL can perform disruptive maintenance on your instance. |
| `GCSQL_API_STORAGE_SIZE` | Amount of storage allocated to the instance. Must be an integer number of `GB` between `10GB` and `10230GB` inclusive. |

## Google Cloud Memorystore (GCM)

Deploying a Redis instance to Cloud Memory for the WordPress API only requires a bit of 
configuration to the environment variable and then to run a single `make` command.

Deploy the Google Cloud Memorystore Redis instance:

```
make api.deploy.redis
```

Get metadata, including the internal VPC IP address, for the Google Cloud Memorystore Redis instance:

```
make api.get.redis
```

Delete the Google Cloud Memorystore Redis instance:

```
make api.clean.redis
```

### GCM API Settings

| Variable | Description |
| :--- | :--- |
| `GCM_INSTANCE_NAME` | The name of the Redis instance. |
| `GCM_INSTANCE_SIZE` | The memory size of the instance in GiB. Must be an integer number between `1-300`. This setting dramatically changes costs, do your research before deploying an instance. |
| `GCM_INSTANCE_TIER` | The service tier of the instance. Must be one of: `basic`, `standard`. Basic means the Redis instance will not have replication. Standard is a high-availability Redis instance with replication for failover. |

## Google App Engine (GAE)

Deploying the API to App Engine is fairly straight forward. You'll need to 
provision a database and then deploy the app. With one caveat. The first time 
you deploy the API you **must** remove the `readiness_check` section from your 
`service/api/app.yaml` or your app will never become healthy. The section looks 
like this:

```yaml
readiness_check:
  path: "/health-check.php"
  timeout_sec: 4
  check_interval_sec: 5
  failure_threshold: 2
  success_threshold: 2
  app_start_timeout_sec: 60
```

_Once you've deployed and installed WordPress add the `readiness_check` 
section back to `app.yaml` and re-deploy. The health check should be working 
and ensuring the health of your containers on App Engine._

Deploy the API to App Engine:

```
make api.deploy.app
```

_You will need to activate the plugins, create the necessary API user accounts, 
and setup permalinks manually._

### GAE API Settings

| Variable | Description |
| :--- | :--- |
| Auto Scaling: |
| `GAE_API_AS_COOL_DOWN_PERIOD_SEC` | The number of seconds that the autoscaler should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. The cool-down period must be greater than or equal to 60 seconds. An example value is `120`. |
| `GAE_API_AS_CPU_TARGET_UTILIZATION` | Target CPU utilization. CPU use is averaged across all running instances and is used to decide when to reduce or increase the number of instances. Note that instances are downscaled irrespective of in-flight requests 25 seconds after an instance receives the shutdown signal. An example value is `0.5`. |
| `GAE_API_AS_MAX_NUM_INSTANCES` | The maximum number of instances that your service can scale up to. The maximum number of instances in your project is limited by your project's [resource quota](https://cloud.google.com/compute/docs/resource-quotas). |
| `GAE_API_AS_MIN_NUM_INSTANCES` | The minimum number of instances given to your service. When a service is deployed, it is given this many instances and scales according to traffic. Must be `1` or greater, use a minimum of `2` to reduce latency. |
| Cron Schedule: |
| `GAE_API_CRON_SCHEDULE_MINS` | The number of minutes between cron intervals. An example value is `1`. |
| Readiness Check: |
| `GAE_API_RC_APP_START_TIMEOUT_SEC` | The maximum time, in seconds, an instance has to become ready after the VM and other infrastructure are provisioned. After this period, the deployment fails and is rolled back. You might want to increase this setting if your application requires significant initialization tasks, such as downloading a large file, before it is ready to serve. Must be within range of: `1-3600`. |
| `GAE_API_RC_CHECK_INTERVAL_SEC` | Time interval between checks, in seconds. Must be within range of: `1-300`. |
| `GAE_API_RC_FAILURE_THRESHOLD` | An instance is unhealthy after failing this number of consecutive checks. Must be within range of: `1-10`. |
| `GAE_API_RC_SUCCESS_THRESHOLD` | An unhealthy instance becomes healthy after successfully responding to this number of consecutive checks. Must be within range of: `1-10`. |
| `GAE_API_RC_TIMEOUT_SEC` | Timeout interval for each request, in seconds. Must be within range of: `1-300`. |

## Google Kubernetes Engine (GKE)

All the goroutines are deployed with the same basic steps. Push the image to 
Google Container Registry (GCR), create the Kubernetes cluster, and then create 
a Kubernetes deployment.

I'll demonstrate with the PHPCS Server. Other than specific `make` commands for 
each service, these step are all the same.

Push the image to GCR:

```
make phpcs.push.image
```

Create the GKE cluster:

```
make phpcs.build.cluster
```

Deploy the GKE cluster:

```
make phpcs.deploy.cluster
```

Delete the GKE cluster:

```
make phpcs.clean.cluster
```

### GKE Lighthouse Server Settings

| Variable | Description |
| :--- | :--- |
| `GKE_LH_CLUSTER` | The name of the cluster. Default is`lighthouse-server`. |
| `GKE_LH_CLUSTER_VERSION` | The Kubernetes version to use for the master and nodes. You can check which Kubernetes versions are default and available in a given zone by running the following command: |
| | `gcloud container get-server-config --zone [COMPUTE-ZONE]` |
| `GKE_LH_CPU_PERCENT` | The average percent CPU utilization across all pods. Must be a range of `1-100`. |
| `GKE_LH_DISK_SIZE` | Size in GB for node VM boot disks. An example value is `100`. |
| `GKE_LH_IMAGE` | The name of the Docker image. Default is`lighthouse-server`. |
| `GKE_LH_MACHINE_TYPE` | The type of machine to use for nodes. An example value is `n1-standard-1`. |
| `GKE_LH_MAX_NODES` | Maximum number of nodes to which the node pool can scale. |
| `GKE_LH_MAX_PODS` |  Maximum number of Pods you want to run based on the CPU utilization of your existing Pods. |
| `GKE_LH_MIN_NODES` | Minimum number of nodes to which the node pool can scale. |
| `GKE_LH_MIN_PODS` | Minimum number of Pods you want to run based on the CPU utilization of your existing Pods. |
| `GKE_LH_NUM_NODES` | The number of nodes to be created in each of the cluster's zones. |
| `GKE_LH_REPLICAS` | The number of desired Pods in the initial deployment. |

### GKE PHPCS Server Settings

| Variable | Description |
| :--- | :--- |
| `GKE_PHPCS_CLUSTER` | The name of the cluster. Default is `phpcs-server`. |
| `GKE_PHPCS_CLUSTER_VERSION` | The Kubernetes version to use for the master and nodes. You can check which Kubernetes versions are default and available in a given zone by running the following command: |
| | `gcloud container get-server-config --zone [COMPUTE-ZONE]` |
| `GKE_PHPCS_CPU_PERCENT` | The average percent CPU utilization across all pods. Must be a range of `1-100`. |
| `GKE_PHPCS_DISK_SIZE` | Size in GB for node VM boot disks. An example value is `100`. |
| `GKE_PHPCS_IMAGE` | The name of the Docker image. Default is `phpcs-server`. |
| `GKE_PHPCS_MACHINE_TYPE` | The type of machine to use for nodes. An example value is `n1-standard-1`. |
| `GKE_PHPCS_MAX_NODES` | Maximum number of nodes to which the node pool can scale. |
| `GKE_PHPCS_MAX_PODS` | Maximum number of Pods you want to run based on the CPU utilization of your existing Pods. |
| `GKE_PHPCS_MIN_NODES` | Minimum number of nodes to which the node pool can scale. |
| `GKE_PHPCS_MIN_PODS` | Minimum number of Pods you want to run based on the CPU utilization of your existing Pods. |
| `GKE_PHPCS_NUM_NODES` | The number of nodes to be created in each of the cluster's zones. |
| `GKE_PHPCS_REPLICAS` | The number of desired Pods in the initial deployment. |

### GKE Sync Server Settings

| Variable | Description |
| :--- | :--- |
| `GKE_SYNC_CLUSTER` | The name of the cluster. Default is `sync-server`. |
| `GKE_SYNC_CLUSTER_VERSION` | The Kubernetes version to use for the master and nodes. You can check which Kubernetes versions are default and available in a given zone by running the following command: |
| | `gcloud container get-server-config --zone [COMPUTE-ZONE]` |
| `GKE_SYNC_DISK_SIZE` | Size in GB for node VM boot disks. An example value is `100`. |
| `GKE_SYNC_IMAGE` | The name of the Docker image. Default is `sync-server`. |
| `GKE_SYNC_MACHINE_TYPE` | The type of machine to use for nodes. An example value is `n1-standard-1`. |
| `GKE_SYNC_PERSISTENT_DISK_TYPE` | Type of persistent disk. Must be one of: `pd-standard`, `pd-ssd`. |
| `GKE_SYNC_PERSISTENT_DISK_SIZE` | Size in GB for the persistent disk. An example value is `100GB`. |
