# Services

Tide consists of the following services:

* The [API](api.md) implements MySQL, PHP-FPM, and an Nginx web server with WordPress installed 
serving a theme and a REST API.
* The [Sync Server](sync-server.md) polls the WordPress.org API’s for themes and plugins to process and writes them to a queue.
* The [PHPCS Server](phpcs-server.md) reads messages from a queue and runs reports against both plugins and themes, then sends the results back to the Tide API.
* The [Lighthouse Server](lighthouse-server.md) reads messages from a queue and runs Google Lighthouse reports against the themes only, then sends the results back to the Tide API.

## Commands

There are several `make` commands you can use to manage the Tide services. Some you run manually, and some are ran by other `make` commands — these are the root level ones. There are additional commands associated with each service, which we'll see later in this section. If you run `make` from the root directory a full list of commands will output to your shell.

| Command | Description |
| :--- | :--- |
| `make deps` | Install Glide dependencies. |
| `make config` | Set GCP configurations. |
| `make build.bins` | Build all the Go binaries. |
| `make clean.bins` | Clean all the Go binaries. |
| `make build.images` | Build all the Docker images. |
| `make build.up` | Rebuild the Docker images & run the containers with docker-compose up. |
| `make up` | Run the Docker containers with docker-compose up. |
| `make down` | Stop the Docker containers with docker-compose down. |
| `make test` | Run the Go test suite. |