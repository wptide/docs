# Setup

## Environment Variables

Copy the `.env.dist` file to `.env`.

```
cp .env.dist .env
```

`.env` file is used to store custom values of environment variables for various services. Before setting up any of the services, update values according instructions for each service. The variables and their descriptions can be found at the end of each relevant section.

## API

Update the following environment variables in `.env` file:

...

Install the dependencies as follows:

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

Update your `hosts` file ...


