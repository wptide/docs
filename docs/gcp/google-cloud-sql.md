# Google Cloud SQL

Deploying a database to Cloud SQL for the WordPress API only requires a bit of configuration to the environment variables and then to run a single `make` command.

## Environment Variables

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
| `GCSQL_API_MAINTENANCE_WINDOW_DAY` | Day of week for a maintenance window, in the UTC time zone. Must be one of: `SUN`, `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`. |
| `GCSQL_API_MAINTENANCE_WINDOW_HOUR` | Hour of day - `0` to `23`. Determines a one-hour window when Cloud SQL can perform disruptive maintenance on your instance. |
| `GCSQL_API_STORAGE_SIZE` | Amount of storage allocated to the instance. Must be an integer number of `GB` between `10GB` and `10230GB` inclusive. |

## Deploy

Create the Cloud SQL database:

```
make api.deploy.sql
```

_This command will create a database instance and failover instance set the root password, create a database for WordPress, and create a user for that database._