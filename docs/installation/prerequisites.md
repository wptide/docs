# Prerequisites

## Composer
Install [Composer](https://getcomposer.org/) and test if it works by running `composer --version`.

## Docker
Install [Docker](https://docs.docker.com/install/). _Note: you may not be able to setup and run Tide properly with legacy Docker Toolbox._

## Go
Install [Go](https://golang.org/doc/install) and test if your installation works by following the instructions on the installation page.

## Glide
Install [Glide](https://glide.readthedocs.io/en/latest/#installing-glide), a package manager for Go. There are a few ways to install Glide:

  - Use the shell script to try an automatically install it. `curl https://glide.sh/get | sh`
  - Download a [versioned release](https://github.com/Masterminds/glide/releases). Glide releases are semantically versioned.
  - Use a system package manager to install Glide. For example, `brew install glide` can be used if you're using [Homebrew](http://brew.sh/) on Mac.
  - The latest development snapshot can be installed with go get. For example, `go get -u github.com/Masterminds/glide`. This is not a release version.

## Make

Install [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm) _(Windows only)_
  - The `make` command is not available on Windows by default and you must install it to be able to use the Tide `make` commands.
  - Add `C:\zlib\bin` to your `$PATH` once you've installed the package.