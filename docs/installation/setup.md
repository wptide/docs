# Setup

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

The `.env.gcp` file overwrites the `.env` file and can be left blank if you are running Tide locally. These files are used to store custom values of environment variables for various services. Before setting up any of the services, update the values according to the instructions for each service. The variables and their descriptions can be found at the end of each relevant section.

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

We typically update the following environment variables in `.env` file at minimum:

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account. |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account. |
| `API_ADMIN_USER` | The username associated with the local admin account. |
| `API_KEY` | The API key used locally to authenticate the `audit-server` user. |
| `API_SECRET` | The API secret used locally to authenticate the `audit-server` user. |

To make local development simple we have added values for the `API_KEY` and `API_SECRET` associated with the `audit-server` user, which will automatically update the user meta values when `make api.setup` is ran. However, you are free to change these values and we encourage you to, especially if you plan on deploying to the cloud.

If you are running Tide in production, then you can access the auto generated key and secret from the `audit-server` user's profile after you setup the API and before you deploy the Kubernetes clusters.

Install the dependencies as follows:

```
$ make api.composer
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

If you see an error like this on OS X when bringing up the API you need to add the directory to the `Preferences -> File Sharing` section of the Docker for Mac app.

```
ERROR: for wptide_api-mysql_1  Cannot start service api-mysql: b'Mounts denied: ...'
```

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