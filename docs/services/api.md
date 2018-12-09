# API

The API implements MySQL, PHP-FPM, and an Nginx web server with WordPress installed 
serving a theme and a REST API.

The local database is stored in the `data/api/mysql` directory. If you ever need 
to start from scratch delete that directory and run `make api.setup` again. Be 
sure to stop the API with `make api.down` or `make down` and then start it again 
with `make api.up`.

Running `make down` will stop all Docker services.

If you see an error like this on OS X when bringing up the API you need to add the 
directory to the `Preferences -> File Sharing` section of the Docker for Mac app.

```
ERROR: for gotide_api-mysql_1  Cannot start service api-mysql: b'Mounts denied: ...'
```

For local development you can manually set the `API_KEY` and `API_SECRET` for the 
`audit-server` user, which will automatically update the user meta values when 
`make api.setup` is ran. If you do not set those environment variables, or are 
running Tide in production, then you can access the auto generated key and secret 
from the `audit-server` user profile. 

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

### `/tide/v1/`

#### GET

API Root

### `/tide/v1/report`

#### GET

Get a report.

### `/tide/v1/report/{checksum}/{type}/{standard}/`

#### GET

Get a report by checksum.

### `/tide/v1/report/{post_id}/{type}/{standard}/`

Get a report by id.

### `/tide/v1/auth`

#### POST

Authenticate user.

### `/tide/v1/keypair/{id}`

#### POST

[Description]

#### GET

[Description]

### `/tide/v1/audit/`

#### GET
Get collection of audits.

| Parameter | Description |
| :--- | :--- |
| `context` | Scope under which the request is made; determines fields present in response - `view | embed | edit`. Default is `view`. |
| `page` | Current page of the collection. |
| `per_page` | Maximum number of items to be returned in result set. Default is `10`. |
| `search` | Limit results to those matching a string. |
| `after` | Limit response to posts published after a given ISO8601 compliant date. |
| `author` | Limit result set to posts assigned to specific authors. |
| `author_exclude` | Ensure result set excludes posts assigned to specific authors. |
| `before` | Limit response to posts published before a given ISO8601 compliant date. |
| `exclude` | Ensure result set excludes specific IDs. |
| `include` | Limit result set to specific IDs. |
| `offset` | Offset the result set by a specific number of items. |
| `order` | Order sort attribute ascending or descending. |
| `orderby` | Sort collection by object attribute. |
| `slug` | Limit result set to posts with one or more specific slugs. |
| `status` | Limit result set to posts assigned one or more statuses. |
| `audit_project` | Limit result set to all items that have the specified term assigned in the audit_project taxonomy. |
| `audit_project_exclude` | Limit result set to all items except those that have the specified term assigned in the audit_project taxonomy. |

#### POST
Create an audit.

| Parameter | Description |
| :--- | :--- |
| `date` | The date the object was published, in the site's timezone. |
| `date_gmt` | The date the object was published, as GMT. |
| `slug` | An alphanumeric identifier for the object unique to its type. |
| `status` | A named status for the object. |
| `password` | A password to protect access to the content and excerpt. |
| `title` | The title for the object. |
| `content` | The content for the object. |
| `author` | The ID for the author of the object. |
| `excerpt` | The excerpt for the object. |
| `meta` | Meta fields. |
| `template` | The theme file to use to display the object. |
| `audit_project` | The terms assigned to the object in the audit_project taxonomy. |

### `/tide/v1/audit/{id}`

#### GET

Get an audit by id.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the object. |
| `context` | Scope under which the request is made; determines fields present in response. |
| `password` | The password for the post if it is password protected. |

#### POST, PUT, PATCH

Update an audit.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the object. |
| `date` | The date the object was published, in the site's timezone. |
| `date_gmt` | The date the object was published, as GMT. |
| `slug` | An alphanumeric identifier for the object unique to its type. |
| `status` | A named status for the object. |
| `password` | A password to protect access to the content and excerpt. |
| `title` | The title for the object. |
| `content` | The content for the object. |
| `author` | The ID for the author of the object. |
| `excerpt` | The excerpt for the object. |
| `meta` | Meta fields. |
| `template` | The theme file to use to display the object. |
| `audit_project` | The terms assigned to the object in the audit_project taxonomy. |

#### DELETE

Delete an audit.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the object. |
| `force` | Whether to bypass trash and force deletion. |

### `/tide/v1/audit/{checksum}`

#### GET

Get an audit by checksum.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `context` | Scope under which the request is made; determines fields present in response. |
| `password` | The password for the post if it is password protected. |

#### POST, PUT, PATCH

Update an audit.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `date` | The date the object was published, in the site's timezone. |
| `date_gmt` | The date the object was published, as GMT. |
| `slug` | An alphanumeric identifier for the object unique to its type. |
| `status` | A named status for the object. |
| `password` | A password to protect access to the content and excerpt. |
| `title` | The title for the object. |
| `content` | The content for the object. |
| `author` | The ID for the author of the object. |
| `excerpt` | The excerpt for the object. |
| `meta` | Meta fields. |
| `template` | The theme file to use to display the object. |
| `audit_project` | The terms assigned to the object in the audit_project taxonomy. |

#### DELETE

Delete an audit.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `force` | Whether to bypass trash and force deletion. |

### `/tide/v1/audit/{project_client}`

#### GET

Get collection of audits for a project client.

| Parameter | Description |
| :--- | :--- |
| `project_client` | User login name representing a project client. |

### `/tide/v1/audit/{project_client}/{project_type}`

#### GET

Get collection of audits for a project client of certain type: theme or plugin.

| Parameter | Description |
| :--- | :--- |
| `project_client` | User login name representing a project client. |
| `project_type` | The project type: theme or plugin. |

### `/tide/v1/audit/{project_client}/{project_type}/{project_slug}`

#### GET

Get an audit for a theme or plugin defined by a project slug.

| Parameter | Description |
| :--- | :--- |
| `project_client` | User login name representing a project client. |
| `project_type` | The project type: theme or plugin. |
| `project_slug` | The taxonomy term representing the project. |

### `/tide/v1/audit/{project_client}/{project_type}/{project_slug}/{version}`

#### GET

Get an audit for a theme or plugin defined by a project slug and version.

| Parameter | Description |
| :--- | :--- |
| `project_client` | User login name representing a project client. |
| `project_type` | The project type: theme or plugin. |
| `project_slug` | The taxonomy term representing the project. |
| `version` | The version representing the project. |
