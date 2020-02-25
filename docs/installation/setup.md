# Setup

If you run into any problems getting Tide setup, then see the [Help](../help.md) page for common issues or ask in the [`#tide` channel](https://wordpress.slack.com/messages/C7TK8FBUJ/) in [WordPress Slack](https://make.wordpress.org/chat/).

## Environment Variables

Copy the `.env.dist` file to `.env`.

```
$ cp .env.dist .env
```

_If you are running Tide locally, you do not need to change any of these `.env` values. If you are deploying this into the cloud, make sure to read all the documentation for which variables you should update and their values._

Create an empty `.env.gcp` file.

```
touch .env.gcp
```

The `.env.gcp` file overwrites the `.env` file values and can be left blank if you are running Tide locally. These files are used to store custom values of environment variables for various services. Before setting up any of the services, update the values according to the instructions for each service. The variables and their descriptions can be found at the end of each relevant section.

## MongoDB

By default MongoDB is used as the local message provider for the Lighthouse & PHPCS Servers. You do not need to change any of the default settings in your `.env` file, but you could before starting the API if you wanted.

| Variable | Description |
| :--- | :--- |
| `MONGO_DATABASE_NAME` | The name of the database. Default is `queue`. |
| `MONGO_DATABASE_PASSWORD` | The database root password. Default is `root`. |
| `MONGO_DATABASE_USERNAME` | The database root username. Default is `root`. |
| `MONGO_QUEUE_LH` | Specifies which collection in MongoDB to use for the Lighthouse message queue. Default is `lighthouse`. |
| `MONGO_QUEUE_PHPCS` | Specifies which collection in MongoDB to use for the PHPCS message queue. Default is `phpcs`. |

## API

We typically update at minimum the following environment variables in the `.env` file:

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account. Default is `admin@tide.local`. _Note: unless you setup the Gmail SMTP plugin, any generated emails will not get sent by WordPress._ |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account. Default is `wordpress`. |
| `API_ADMIN_USER` | The username associated with the local admin account. Default is `admin`. |
| `API_KEY` | The API key used both locally and on GCP to authenticate the `audit-server` user. Default is `uRhZgeYt$v5u0vR5fpcDSWcZU`. |
| `API_SECRET` | The API secret used both locally and on GCP to authenticate the `audit-server` user. Default is `rVvUWQlPQr8trSEd2qdwmE4Eiua$MjLX`. |

To make local development simple we have added default values for the `API_KEY` and `API_SECRET` associated with the `audit-server` user, which will automatically update the user meta values when `make api.setup` is ran. However, you are free to change these values and we encourage you to, especially if you plan on deploying to the cloud — in that case you should overwrite these values in the `.env.gcp` file.

If you are running Tide in production, then you can access the auto generated key and secret from the `audit-server` user's profile after you setup the API and before you deploy the Kubernetes clusters.

### Initialize WordPress

From the project root directory run the following `make` commands to initialize and setup WordPress.

Install the dependencies:

```
make api.composer
```

Then start the API Docker images in isolation:

```
make api.up
```

Open a new shell and run the setup script:

```
make api.setup
```

_You can run the setup script to initialize WordPress for the first time or if you would like a convenient way to update the default values when you change relevant environment variables._

### Database

The local database is stored in the `data/api/mysql` directory. If you ever need to start from scratch delete that directory and run `make api.setup` again. Be sure to stop the API with `make api.down` or `make down` and then start it again with `make api.up`.

_Running `make down` will stop all Docker services._

### Hosts File

Add the following entry to your hosts file to make sure `tide.local` is pointed at your local Tide instance:

```
127.0.0.1 tide.local
```
_You can change the `tide.local` URL to some other value by modifying the `API_AUTH_URL` and `API_HTTP_HOST` variables inside the `.env` file._

## Build Images

Installs the Glide dependencies, creates the Go binaries, and builds all the Docker images:

```
make build.images
```

### Isolated Build

Lighthouse Image:

```
make lighthouse.build.image
```

PHPCS Image:

```
make phpcs.build.image
```

Sync Image:

```
make sync.build.image
```

## Start Servers

It is recommended that you run these Docker containers separately and start the servers in new shells in order to isolate the output. However, you can start all services (API, Lighthouse Server, PHPCS Server, Sync Server) with the following command:

```
make up
```

### Isolated Start

Lighthouse Server:

```
make lighthouse.up
```

PHPCS Server:

```
make phpcs.up
```

Sync Server:

```
make sync.up
```

## Run Audits

Now that all the Tide services are up and running, you can run audits on themes and plugins by doing a `GET` request to a special endpoint either in your browser or with an app like Postman. This endpoint only initiates an audit for the `wporg` Tide user and for WordPress.org hosted themes and plugins.

If we want to run an audit against the `twentyseventeen` theme version `2.1` for example, we would use this endpoint:

```
http://tide.local/api/tide/v1/audit/wporg/theme/twentyseventeen/2.1
```

Or for the `akismet` plugin version `4.1.1`:

```
http://tide.local/api/tide/v1/audit/wporg/plugin/akismet/4.1.1
```

When you request an audit you will receive a JSON object back that indicates the audit is pending. If the audit has previously been requested and is complete then you will receive a JSON object with information about the theme/plugin and summary reports with links to the full report.

If the audit is pending, your shell should have some output to indicate that the audit is running. Once this output stops and all your services go back to the `polling` status, you can refresh the API request in the browser and you should see the updated JSON object with completed Tide reports.

For a full list of API Endpoints that can be used with Tide, see the [API Endpoints](../services/api.md#endpoints) section.