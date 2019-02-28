# Help

## Failed Audit Request

If you attempt to audit a theme or plugin without adding a version number to the endpoint, or an invalid version, the API will respond with the following error message.

```
{
    "code": "rest_post_invalid_altid_lookup",
    "message": "Invalid post lookup.",
    "data": {
        "status": 404
    }
}
```

This also means that if you attempt to view an audit that doesn't exist, you will get the same error. For example, if you try to go to the following endpoint and Tide does not have an audit yet.

```
https://wptide.org/api/tide/v1/audit/wporg/plugin/akismet
```

You would need to initiate an audit for the plugin with the version first:

```
https://wptide.org/api/tide/v1/audit/wporg/plugin/akismet/4.1.1
```

Then the endpoint without a version would work as expected.

## Mounts Denied

If you see the following error in your OS X terminal when bringing up the API you need to add the `/Users` directory to the `Preferences -> File Sharing` section of the Docker for Mac app, or whatever the root directory is for you `$GOPATH`.

```
ERROR: for wptide_api-mysql_1  Cannot start service api-mysql: b'Mounts denied: ...'
```

## Bad Substitution

If you run any of the `phpcs` commands on the [Local Development](local-development.md) page and get this error:

```
./vendor/bin/phpcs ${1:.} --standard=.phpcs.ruleset.xml
sh: 1: Bad substitution
```

You need to replace both instances of the `${1:.}` string inside the `composer.json` file with either a `.` or `$1`. The `.` will mean that the `composer phpcs filename.php` and `composer phpcbf filename.php` commands will no longer function and you must process every file. However, if you change it to `$1` and it works that means you must always supply a path like `composer phpcs .` or `composer phpcs filname.php` and running the command without a path will fail.