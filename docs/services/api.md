# API

The Tide API is a Docker implementation of MySQL, PHP-FPM, and Nginx. The web server has WordPress installed with this documentation theme and a REST API for storing theme and plugin audits. If you plan on deploying to the cloud you should read the entire [Google Cloud Platform](../gcp/index.md) section.

_The API Docker containers must be up and running before you start any of the other services._

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `API_ADMIN_EMAIL` | The email associated with the local admin account. Default is `admin@tide.local`. _Note: unless you setup the Gmail SMTP plugin, any generated emails will not get sent by WordPress._ |
| `API_ADMIN_PASSWORD` | The password associated with the local admin account. Default is `wordpress`. |
| `API_ADMIN_USER` | The username associated with the local admin account. Default is `admin`. |
| `API_AUTH_URL` | The [`wp-tide-api`](https://github.com/wptide/wp-tide-api) authentication REST endpoint, used both locally and on GCP. Default is `http://tide.local/api/tide/v1/auth`. |
| `API_BLOG_DESCRIPTION` | Site tagline (set in Settings > General). Default is `Automated insight into your WordPress code`. |
| `API_BLOG_NAME` | Site title (set in Settings > General). Default is `Tide`. |
| `API_CACHE` | Whether caching should be active or not. Must be one of: `true`, `false`. Default is `true`. |
| `API_CACHE_DEBUG` | Whether or not to display the caching headers for debugging. Must be one of: `true`, `false`. Default is `false`. |
| `API_CACHE_KEY_SALT` | Cache key used to salt the redis object cache. Default is `xbIm5y$i&mMtW9q93la5x*qoE0cvbjWxDTFq@4r3nHJc*ZcIiW@pI@2z$GC7BEz7`. |
| `API_CACHE_TTL` | Sets the numeric time to live (TTL) in seconds for page caching. Default is `86400`. |
| `API_DB_HOST` | The host of the local database, which connects to a Docker container. Default is `api-mysql`. |
| `API_DB_NAME` | Name of the local database. Default is `wordpress`. |
| `API_DB_PASSWORD` | Password used to access the local database. Default is `wordpress`. |
| `API_DB_ROOT_PASSWORD` | The local database root password. Default is `wordpress`. |
| `API_DB_USER` | Username used to access the local database. Default is `wordpress`. |
| `API_HTTP_HOST` | The API domain name, used both locally and on GCP. Default is `tide.local`. |
| `API_KEY` | The API key used both locally and on GCP to authenticate the `audit-server` user. Default is `uRhZgeYt$v5u0vR5fpcDSWcZU`. |
| `API_PROTOCOL` | The API protocol, used both locally and on GCP Default is `http`. |
| `API_REDIS_AUTH` | The Redis database password. Default is `redis`. |
| `API_REDIS_DATABASE` | Use a specific numeric Redis database. Default is `0`. |
| `API_REDIS_HOST` | The host where the Redis database can be reached. Default is `api-redis`. |
| `API_REDIS_PORT` | The port where the Redis database can be reached. Default is `6379`. |
| `API_SECRET` | The API secret used both locally and on GCP to authenticate the `audit-server` user. Default is `rVvUWQlPQr8trSEd2qdwmE4Eiua$MjLX`. |
| `API_THEME` | The slug of the local WordPress theme. Default is `docs`. |
| `API_UPLOAD_HANDLER` | Tells WordPress how media upload is handled. Uses either the local file system or Google Cloud Storage. Must be one of: `local`, `gcs`. Default is `local`. Default is `local`. |
| `API_VERSION` | The API version found in the Tide API REST url, used both locally and on GCP. Default is `v1`. |

## Commands

| Command | Description |
| :--- | :--- |
| `make api.up` | Run the API Docker containers in isolation with docker-compose up. |
| `make api.down` | Take the isolated API Docker containers down. |
| `make api.stop` | Stop the isolated API Docker containers with docker-compose stop. |
| `make api.rm` | Remove the stopped API Docker containers with docker-compose rm. |
| `make api.composer` | Install the Composer dependencies. Runs `make api.tpl` automatically before installing the dependencies. |
| `make api.setup` | Run the setup script; API containers must be running to `exec` into. |
| `make api.tpl` | Generate the API YAML & PHP templates. |
| `make api.deploy.sql` | Deploy the Cloud SQL database and setup the database users. |
| `make api.deploy.app` | Deploy the API to Google App Engine. |
| `make api.deploy.redis` | Deploy the Google Cloud Memorystore Redis instance. |
| `make api.get.redis` | Get metadata, including the internal VPC IP address, for the Google Cloud Memorystore Redis instance. |
| `make api.clean.redis` | Delete the Google Cloud Memorystore Redis instance. |

## Endpoints

The Tide API has several endpoints. I'll try and cover them in as much detail as possible. One important workflow to note when working with the API is that you must authenticate with the API and generate a token that you then use to make authenticated requests.

### `/api/tide/v1/auth`

Generates a user specific JSON Web Token (JWT) by making a basic authentication `POST` request with an API key and secret — which can be found on your user profile page.

#### `POST`

| Parameter | Description |
| :--- | :--- |
| `api_key` | Tide user's API key. |
| `api_secret` | Tide user's API secret. |

#### Usage

Request a JWT with your API key and secret:

```
curl -X POST \
    http://tide.local/api/tide/v1/auth \
    -F 'api_key=<api_key>' \
    -F 'api_secret=<api_secret>'
```

---

### `/api/tide/v1/audit`

This endpoint is used to get audit results and generate audits. There are several ways to generate an audit and reports. One of them is to make a `POST` request to the audit endpoint in the Tide API. An unauthenticated `GET` request option is describe lower on this page and is specifically for the `wporg` user. Another possibility would be to create a message in the queue, but that requires more access than a simple Bearer token.

#### `GET`

Request a collection of audits.

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

#### `POST`

Create an audit that generates various report standards for WordPress themes and plugins.

| Parameter | Description |
|:--- |:--- |
| `title` | Title of the plugin or theme. |
| `content` | Description of the plugin or theme. |
| `slug` | The slug of the plugin or theme. |
| `project_type` | The type of project to audit. Must be one of: `theme`, `plugin`. |
| `source_url` | The source to the `zip` file. _In the future we will support `git` repositories._ |
| `source_type` | This must be `zip`. _In the future we will support `git` repositories._ |
| `request_client` | The Tide API user login name. |
| `force` | Force a re-audit for existing audit reports. Must be one of: `true`, `false`. |
| `visibility` | Sets the visibility of an audit. Must be one of: `public` or `private`. |
| `standards` | An array of available report standards. Must be one of: `phpcs_wordpress`, `phpcs_phpcompatibility`, `lighthouse`. |

#### Usage

Create an audit by making a `POST` request:

```
curl -X POST \
    http://tide.local/api/tide/v1/audit \
    -H 'Authorization: Bearer <token>' \
    -F 'title=Twenty Seventeen' \
    -F 'content=Twenty Seventeen brings your site to life with header video and immersive featured images.' \
    -F 'slug=twentyseventeen' \
    -F 'project_type=theme' \
    -F 'source_url=https://downloads.wordpress.org/theme/twentyseventeen.2.1.zip' \
    -F 'source_type=zip' \
    -F 'request_client=wporg' \
    -F 'force=false' \
    -F 'visibility=public' \
    -F 'standards[]=phpcs_wordpress' \
    -F 'standards[]=phpcs_phpcompatibility'
```

---

### `/api/tide/v1/audit/{id}`

Similar to the previous endpoint but strictly used to make requests to existing audits.

#### `GET`

Get an audit by `id`.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the object. |

#### `POST`

Update an audit by `id`.

| Parameter | Description |
|:--- |:--- |
| `id` | Unique identifier for the object. |
| `title` | Title of the plugin or theme. |
| `content` | Description of the plugin or theme. |
| `slug` | The slug of the plugin or theme. |
| `project_type` | The type of project to audit. Must be one of: `theme`, `plugin`. |
| `source_url` | The source to the `zip` file. _In the future we will support `git` repositories._ |
| `source_type` | This must be `zip`. _In the future we will support `git` repositories._ |
| `request_client` | The Tide API user login name. |
| `force` | Force a re-audit for existing audit reports. Must be one of: `true`, `false`. |
| `visibility` | Sets the visibility of an audit. Must be one of: `public` or `private`. |
| `standards` | An array of available report standards. Must be one of: `phpcs_wordpress`, `phpcs_phpcompatibility`, `lighthouse`. |

#### DELETE

Delete an audit by `id`.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the object. |
| `force` | Whether to bypass trash and force deletion. Must be one of: `true`, `false`. |

#### Usage

Retrieve the audit with a `GET` request:

```
curl -X GET http://tide.local/api/tide/v1/audit/<id>
```

Update the title by making a `POST` request:

```
curl -X POST \
    http://tide.local/api/tide/v1/audit/<id> \
    -H 'Authorization: Bearer <token>' \
    -F 'title=Something New!'
```

Force all the report standards to be re-audited by making a `POST` request:

```
curl -X POST \
    http://tide.local/api/tide/v1/audit/<id> \
    -H 'Authorization: Bearer <token>' \
    -F 'force=true' \
    -F 'standards[]=phpcs_wordpress' \
    -F 'standards[]=phpcs_phpcompatibility' \
    -F 'standards[]=lighthouse'
```

_And adds the Lighthouse report that was missing in the `/api/tide/v1/audit` example above._

Remove the audit with a `DELETE` request and bypass the trash:

```
curl -X DELETE \
    http://tide.local/api/tide/v1/audit/<id> \
    -H 'Authorization: Bearer <token>' \
    -F 'force=true'
```

---

### `/api/tide/v1/audit/{altid}`

This endpoint is nearly identical to the previous one, except you are using the audit's altid (e.g. checksum) to make your requests. A checksum is an MD5 hash string from the contents of a directory.

#### `GET`

Get an audit by `altid`.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |

#### `POST`

Update an audit by `altid`.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `title` | Title of the plugin or theme. |
| `content` | Description of the plugin or theme. |
| `slug` | The slug of the plugin or theme. |
| `project_type` | The type of project to audit. Must be one of: `theme`, `plugin`. |
| `source_url` | The source to the `zip` file. _In the future we will support `git` repositories._ |
| `source_type` | This must be `zip`. _In the future we will support `git` repositories._ |
| `request_client` | The Tide API user login name. |
| `force` | Force a re-audit for existing audit reports. Must be one of: `true`, `false`. |
| `visibility` | Sets the visibility of an audit. Must be one of: `public` or `private`. |
| `standards` | An array of available report standards. Must be one of: `phpcs_wordpress`, `phpcs_phpcompatibility`, `lighthouse`. |

#### `DELETE`

Delete an audit by `altid`.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `force` | Whether to bypass trash and force deletion. |

---

### `/api/tide/v1/audit/{project_client}`

#### `GET`

Get an audit collection for a project client.

| Parameter | Description |
| :--- | :--- |
| `project_client` | The Tide API user login name representing a project client. |

---

### `/api/tide/v1/audit/{project_client}/{project_type}`

#### `GET`

Get a theme or plugin audit collection for a project client.

| Parameter | Description |
| :--- | :--- |
| `project_client` | The Tide API user login name representing a project client. |
| `project_type` | The project type. Must be one of: `theme`, `plugin`. |

---

### `/api/tide/v1/audit/{project_client}/{project_type}/{project_slug}`

#### `GET`

Get a theme or plugin audit collection for a project client and slug.

| Parameter | Description |
| :--- | :--- |
| `project_client` | The Tide API user login name representing a project client. |
| `project_type` | The project type. Must be one of: `theme`, `plugin`. |
| `project_slug` | The taxonomy term representing the project slug. |

---

### `/api/tide/v1/audit/{project_client}/{project_type}/{project_slug}/{version}`

This endpoint can be used to make unauthenticated audit requests on behalf of the `wporg` user if the audit doesn't already exist. With the `wporg` user token I could also send an authenticated request to this endpoint and force a re-audit if the audit does exist.

#### `GET`

Get a theme or plugin audit for a project client, slug and version.

| Parameter | Description |
| :--- | :--- |
| `project_client` | The Tide API user login name representing a project client. |
| `project_type` | The project type. Must be one of: `theme`, `plugin`. |
| `project_slug` | The taxonomy term representing the project slug. |
| `version` | The project version number. |

---

### `/api/tide/v1/report/{id}/{type}/{standard}`

This endpoint is authenticated and requires a Bearer token. As well, you can only view reports associated with your account. The response is a temporary download link for the report — keeping sensitive data safe and secure is important to us.

#### `GET`

Get a specific `type` of report by `id` and `standard`.

| Parameter | Description |
| :--- | :--- |
| `id` | Unique identifier for the audit object. |
| `type` | The report type. Must be one of: `raw`, `parsed`. |
| `standard` | The report standard. Must be one of: `phpcs_wordpress`, `phpcs_phpcompatibility`, `lighthouse`. |

---

### `/api/tide/v1/report/{altid}/{type}/{standard}`

This endpoint has the same restrictions as above.

#### `GET`

Get a specific `type` of report by `altid` and `standard`.

| Parameter | Description |
| :--- | :--- |
| `altid` | An alternate unique id to query on (e.g. checksum). |
| `type` | The report type. Must be one of: `raw`, `parsed`. |
| `standard` | The report standard. Must be one of: `phpcs_wordpress`, `phpcs_phpcompatibility`, `lighthouse`. |
