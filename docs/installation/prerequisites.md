# Prerequisites

## Composer
Install [Composer](https://getcomposer.org/) and test if it works by running `composer --version`.

## Docker
Install [Docker](https://docs.docker.com/install/). Note: you may not be able to setup and run Tide properly with legacy Docker Toolbox.

## Go
Install [Go](https://golang.org/doc/install) language and test if your installation works by following the instructions on the installation page.

## Glide
Install [Glide](https://glide.readthedocs.io/en/latest/#installing-glide), a package manager for Go. There are a few ways to install Glide:

  - Use the shell script to try an automatically install it. `curl https://glide.sh/get | sh`
  - Download a [versioned release](https://github.com/Masterminds/glide/releases). Glide releases are semantically versioned.
  - Use a system package manager to install Glide. For example, `brew install glide` can be used if you're using [Homebrew](http://brew.sh/) on Mac.
  - The latest development snapshot can be installed with go get. For example, `go get -u github.com/Masterminds/glide`. This is not a release version.

## Make
_(Windows only)_

`make` command is not available on Windows by default. Install [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm) to be able to use Tide `make` commands. Add `C:\zlib\bin` to PATH.
