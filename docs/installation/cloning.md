# Cloning

Ensure you're in the directory where you would like to install Tide:

```
git clone -b develop --recursive https://github.com/xwp/go-tide.git tide
```

_Note: On Windows clone repository to a folder `C:\Users\[YourName]\go\src\github.com\xwp\go-tide` to avoid problems with properly mounting shared volumes and to be able to build servers._

Change to Tide working directory:  

```
cd tide
```

Update submodules:

```
git submodule update --init --recursive
```