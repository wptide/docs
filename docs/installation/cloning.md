# Cloning

Tide needs to be cloned to a directory inside your Go workspace specified by the [`$GOPATH`](https://golang.org/doc/code#GOPATH) environment variable. Your `$GOPATH` defaults to a directory named `go` inside your home directory, so `$HOME/go` on Mac/Unix and `%USERPROFILE%\go` (usually `C:\Users\YourName\go`) on Windows.

Create the following directory inside your Go workspace:

```
src/github.com/wptide
```

Open a shell and change into the directory:

```
cd $GOPATH/src/github.com/wptide
```

Clone Tide:

```
git clone -b develop --recursive https://github.com/wptide/wptide.git
```

Change to Tide working directory:

```
cd wptide
```

Update submodules:

```
git submodule update --init --recursive
```