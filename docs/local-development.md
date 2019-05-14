# Local Development

If you have come looking for a way to set up your local development environment and use Tide to audit your plugins and themes, that is not a good use case for the platform. A better option would be to install a few Composer packages and run the same code sniffers Tide does. The easiest way would be to add these two files to the root directory inside your plugin or theme.

## Composer

Create a `composer.json` file in the project root, and add this code.

```json
{
  "require-dev": {
    "dealerdirect/phpcodesniffer-composer-installer": "*",
    "phpcompatibility/phpcompatibility-wp": "*",
    "wp-coding-standards/wpcs": "*"
  },
  "scripts": {
    "phpcs": [
      "./vendor/bin/phpcs ${1:.} --standard=.phpcs.ruleset.xml"
    ],
    "phpcbf": [
      "./vendor/bin/phpcbf ${1:.} --standard=.phpcs.ruleset.xml"
    ]
  }
}
```

Install the Composer dependencies:

```
composer install
```

## PHPCS Ruleset

Create a `.phpcs.ruleset.xml` file in the project root, add this code, and replace the `{{NAME}}` and `{{SLUG}}` with your plugin or theme's name and slug.

```xml
<?xml version="1.0"?>
<ruleset name="{{NAME}}">
    <description>Custom ruleset for the {{NAME}} plugin.</description>

    <!-- For help in understanding this file: https://github.com/squizlabs/PHP_CodeSniffer/wiki/Annotated-ruleset.xml -->
    <!-- For help in using PHPCS: https://github.com/squizlabs/PHP_CodeSniffer/wiki/Usage -->

    <!-- What to scan -->
    <file>.</file>
    <!-- Ignoring Files and Folders:
        https://github.com/squizlabs/PHP_CodeSniffer/wiki/Advanced-Usage#ignoring-files-and-folders -->
    <exclude-pattern>/vendor/*</exclude-pattern>

    <!-- How to scan -->
    <arg value="sp"/> <!-- Show sniff and progress -->
    <arg name="colors"/> <!-- Show results with colors -->
    <arg name="basepath" value="."/> <!-- Strip the file paths down to the relevant bit -->
    <arg name="parallel" value="8"/> <!-- Enables parallel processing when available for faster results. -->
    <arg name="extensions" value="php"/> <!-- Limit to PHP files -->

    <!-- Rules: Check PHP version compatibility - see
            https://github.com/PHPCompatibility/PHPCompatibilityWP -->
    <rule ref="PHPCompatibilityWP"/>

    <!-- For help in understanding this testVersion:
        https://github.com/PHPCompatibility/PHPCompatibility#sniffing-your-code-for-compatibility-with-specific-php-versions -->
    <config name="testVersion" value="5.2-"/>

    <!-- Rules: WordPress Coding Standards - see
            https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards -->
    <rule ref="WordPress-Core"/>
    <rule ref="WordPress-Docs"/>
    <rule ref="WordPress-Extra"/>

    <!-- For help in understanding these custom sniff properties:
            https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/wiki/Customizable-sniff-properties -->
    <config name="minimum_supported_wp_version" value="4.4"/>

    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="{{SLUG}}"/>
                <element value="default"/>
            </property>
        </properties>
    </rule>
</ruleset>
```

## Usage

Run the PHP Code Sniffer on every file:

```
composer phpcs
```

Run the PHP Code Sniffer on a single file:

```
composer phpcs filename.php
```

Run PHP Code Beautifier on every file:

```
composer phpcbf
```

Run PHP Code Beautifier on a single file:

```
composer phpcbf filename.php
```

_If you get an error when running these commands see the [Help](help.md#local-development) page._
