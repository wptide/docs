# Setup

## Environment Variables

Copy the `.env.dist` file to `.env`.

```
cp .env.dist .env
```

`.env` file is used to store custom values of environment variables for various services. Before setting up any of the services, update values according instructions for each service. The variables and their descriptions can be found at the end of each relevant section.

## API

Update the following environment variables in `.env` file:

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account |
| `API_ADMIN_USER` | The username associated with the local admin account |
| `API_KEY` | The API key used locally to authenticate the `audit-server` user. |
| `API_SECRET` | The API secret used locally to authenticate the `audit-server` user. |

For local development you can manually set the `API_KEY` and `API_SECRET` for the 
`audit-server` user, which will automatically update the user meta values when 
`make api.setup` is ran. If you do not set those environment variables, or are 
running Tide in production, then you can access the auto generated key and secret 
from the `audit-server` user profile. 

Now install the dependencies as follows:

```
$ make api.composer
```

Then start the API Docker images in isolation:

```
make api.up
```

Last run the setup script:

```
make api.setup
```

Run the setup script to initialize WordPress for the first time or if you would 
like a convenient way to update the default values when you change relevant 
environment variables.

Add `127.0.0.1 tide.local` to your `hosts` file. You should be now able to run API at [tide.local](http://tide.local)


