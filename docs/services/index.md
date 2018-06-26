# Services

Tide consists of the following services:

* The [API](api.md) implements MySQL, PHP-FPM, and an Nginx web server with WordPress installed 
serving a theme and a REST API.
* The [Sync Server](sync.md) polls the WordPress.org API’s for themes and plugins to process and writes them to a queue.
* The [PHPCS Server](phpcs.md) reads messages from a queue and runs reports against both plugins and themes, then sends the results back to the Tide API.
* The [Lighthouse Server](lighthouse.md) reads messages from a queue and runs Google Lighthouse reports against the themes only, then sends the results back to the Tide API.