# Setup

## Environment Variables

Copy the `.env.dist` file to `.env`.

```
$ cp .env.dist .env
```

`.env` file is used to store custom values of environment variables for various services. Before setting up any of the services, update values according instructions for each service. The variables and their descriptions can be found at the end of each relevant section.

The `.tpl` files are template files that through variable interpolation are 
converted and used to deploy your project to GCP and even setup the local API. So 
these files play a critical role in getting Tide setup. If these files are not 
generating the correct output, please [contact us](#contact-us) to troubleshoot and 
figure out a solution for your OS.

So far we've only tested on OS X with and without the `envsubst` command available. 
Other systems may not work correctly and we want to resolve that quickly.

## API

Update the following environment variables in `.env` file:

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account |
| `API_ADMIN_USER` | The username associated with the local admin account |
| `API_KEY` | The API key used locally to authenticate the `audit-server` user. |
| `API_SECRET` | The API secret used locally to authenticate the `audit-server` user. |

For local development you have to manually set the `API_KEY` and `API_SECRET` for the 
`audit-server` user, which will automatically update the user meta values when 
`make api.setup` is ran. If you are 
running Tide in production, then you can access the auto generated key and secret 
from the `audit-server` user profile. 

Now install the dependencies as follows:

```
$ make api.composer
```

Then start the API Docker images in isolation:

```
$ make api.up
```

Last run the setup script:

```
$ make api.setup
```

Run the setup script to initialize WordPress for the first time or if you would 
like a convenient way to update the default values when you change relevant 
environment variables.

If you see an error like this on OS X when bringing up the API you need to add the 
directory to the `Preferences -> File Sharing` section of the Docker for Mac app.

```
ERROR: for gotide_api-mysql_1  Cannot start service api-mysql: b'Mounts denied: ...'
```

Add `127.0.0.1 tide.local` to your `hosts` file. You should be now able to run API at [tide.local](http://tide.local)

## Build images
Install Glide dependencies and build images:

```
$ make build.images
```

## Start servers

Start the servers (Lighthouse Server, PHPCS Server, Sync Server):

```
$ make up
```