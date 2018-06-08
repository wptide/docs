# API

The API implements MySQL, PHP-FPM, and an Nginx web server with WordPress installed 
serving a theme and a REST API.

The local database is stored in the `data/api/mysql` directory. If you ever need 
to start from scratch delete that directory and run `make api.setup` again. Be 
sure to stop the API with `make api.down` or `make down` and then start it again 
with `make api.up`.

## Commands

| Variable | Description |
| :--- | :--- |
| `$ make api.tpl` | Generates the API templates. |
| `$ make api.composer` | Runs the previous command and installs the dependencies. |
| `$ make api.up` | Starts the API Docker images in isolation. |
| `$ make api.setup` | Runs the setup script. |
| `$ make api.down` | Stops the API. |
| `$ make down` | Stops all Docker services. |

## Settings

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account. |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account. |
| `API_ADMIN_USER` | The username associated with the local admin account. |
| `API_AUTH_URL` | The [`wp-tide-api`][wp-tide-api] authentication REST endpoint, used both locally and on GCP. Default is `http://tide.local/api/tide/v1/auth`. |
| `API_BLOG_DESCRIPTION` | Site tagline (set in Settings > General). Default is `Automated insight into your WordPress code`. |
| `API_BLOG_NAME` | Site title (set in Settings > General). Default is `Tide`. |
| `API_CACHE` | Whether caching should be active or not. Must be one of: `true`, `false`. Default is `true`. |
| `API_CACHE_DEBUG` | Whether or not to display the caching headers for debugging. Must be one of: `true`, `false`. Default is `false`. |
| `API_CACHE_TTL` | Sets the numeric time to live (TTL) in seconds for page caching. Default is `300`. |
| `API_DB_HOST` | The host of the local database, which connects to a Docker container. Default is `api-mysql`. |
| `API_DB_NAME` | Name of the local database. Default is `wordpress`. |
| `API_DB_PASSWORD` | Password used to access the local database. Default is `wordpress`. |
| `API_DB_ROOT_PASSWORD` | The local database root password. Default is `wordpress`. |
| `API_DB_USER` | Username used to access the local database. Default is `wordpress`. |
| `API_HTTP_HOST` | The API domain name, used both locally and on GCP. Default is `tide.local`. |
| `API_KEY` | The API key used locally to authenticate the `audit-server` user. |
| `API_PROTOCOL` | The API protocol, used both locally and on GCP Default is `http`. |
| `API_REDIS_AUTH` | The Redis database password. Default is `redis`. |
| `API_REDIS_DATABASE` | Use a specific numeric Redis database. Default is `0`. |
| `API_REDIS_HOST` | The host where the Redis database can be reached. Default is `api-redis`. |
| `API_REDIS_PORT` | The port where the Redis database can be reached. Default is `6379`. |
| `API_SECRET` | The API secret used locally to authenticate the `audit-server` user. |
| `API_THEME` | The slug of the local WordPress theme. Default is `twentyseventeen`. |
| `API_UPLOAD_HANDLER` | Tells WordPress how media upload is handled. Uses either the local file system or Google Cloud Storage. Must be one of: `local`, `gcs`. Default is `local`. |
| `API_VERSION` | The API version found in the Tide API REST url, used both locally and on GCP. Default is `v1`. |

## Endpoints

| Endpoint | Description |
| :--- | :--- |
| `/api/tide/v1/` | Description |