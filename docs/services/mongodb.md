# MongoDB

By default MongoDB is used as the local message provider for the Lighthouse/PHPCS Servers. In order for these services to use MongoDB you'll need to ensure the following settings are in your `.env`. The only setting that you should **not** change is `MONGO_HOST`.

| Variable | Description |
| :--- | :--- |
| `MONGO_DATABASE_NAME` | The name of the database. Default is `queue`. |
| `MONGO_DATABASE_PASSWORD` | The database root password. Default is `root`. |
| `MONGO_DATABASE_USERNAME` | The database root username. Default is `root`. |
| `MONGO_QUEUE_LH` | Specifies which collection in MongoDB to use for the Lighthouse message queue. Default is `lighthouse`. |
| `MONGO_QUEUE_PHPCS` | Specifies which collection in MongoDB to use for the PHPCS message queue. Default is `phpcs`. |