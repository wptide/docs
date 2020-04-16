# Google Kubernetes Engine

All the goroutines are deployed to a Kubernetes cluster with the same basic steps, but first a bit of configuration to the environment variables for each server is required.

## Environment Variables

### Lighthouse Server

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

### PHPCS Server

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

### Sync Server

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

## Deploy

Once you've got the variables setup it's basically push the image to Google Container Registry (GCR), create the Kubernetes cluster, and then create a Kubernetes deployment. I'll demonstrate it with the PHPCS Server. Other than specific `make` commands for each service, these steps are all the same.

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