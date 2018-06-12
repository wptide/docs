# Cloning

Tide needs to be cloned to a directory inside Go workspace specified by [GOPATH](https://golang.org/doc/code.html#GOPATH) environment variable. It defaults to a directory named `go` inside your home directory, so `$HOME/go` on Mac/Unix and `%USERPROFILE%\go` (usually `C:\Users\YourName\go`) on Windows.

Create the following directory `src/github.com/xwp` inside your Go workspace and change to that directory:

```
cd src/github.com/xwp
```

Now clone Tide:

```
git clone -b gcp-providers --recursive https://github.com/xwp/go-tide.git
```

Change to Tide working directory:  

```
cd go-tide
```

Update submodules:

```
git submodule update --init --recursive
```