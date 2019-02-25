# Google Cloud Memorystore

Deploying a Redis instance to Cloud Memorystore for the WordPress API only requires a bit of configuration to the environment variables and then to run a few `make` commands.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `GCM_INSTANCE_NAME` | The name of the Redis instance. |
| `GCM_INSTANCE_SIZE` | The memory size of the instance in GiB. Must be an integer number between `1-300`. This setting dramatically changes costs, do your research before deploying an instance. |
| `GCM_INSTANCE_TIER` | The service tier of the instance. Must be one of: `basic`, `standard`. Basic means the Redis instance will not have replication. Standard is a high-availability Redis instance with replication for failover. |

## Deploy

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