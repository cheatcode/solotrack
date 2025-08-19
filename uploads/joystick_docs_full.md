---
category: "@joystick.js/cli"
title: build
description: Build your Joystick app for deployment.
---

To build an existing Joystick app, from your terminal, run:

{% code theme="light" %}
joystick build -t <type>
{% /code %}

When you run this command, Joystick will build your app as the chosen output type `-t, --type` to the `.build` folder at the root of your app.

## Options

{% parameters %}
{
  "-t, --type": {
    "required": true,
    "description": "The output type for your built app (either `directory` or `tar`)."
  },
  "-e, --environment": {
    "required": false,
    "description": "The environment to set for `process.env.NODE_ENV` in your build (defaults to `production`)."
  }
}
{% /parameters %}

---
category: "@joystick.js/cli"
title: create
description: Create a new Joystick app from your terminal.
---

To create a new Joystick app, from your terminal, run:

{% code theme="light" %}
joystick create <app_name>
{% /code %}

## Args

{% parameters %}
{
  "&lt;app_name&gt;": {
    "required": true,
    "description": "The name of the app you'd like to create. Joystick will use this value for the folder containing your project and as the `name` field in your `package.json` file."
  }
}
{% /parameters %}

## Options

{% parameters %}
{
  "--r, --release": {
    "description": "The Joystick release to use when creating this project. Either `production` (default) or `canary`."
  }
}
{% /parameters %}

---
category: "@joystick.js/cli"
title: logout
description: Log out of your Push account from the terminal.
---

To log out of your [Push](https://cheatcode.co/push) account, from your terminal, run:

{% code theme="light" %}
joystick logout
{% /code %}

When you run this command, Joystick will unset the stored session token for your Push account from your operating system.

---
category: "@joystick.js/cli"
title: push
description: Deploy a Joystick app using Push.
---

To deploy an existing Joystick app via [Push](https://cheatcode.co/push), from your terminal, run:

{% code theme="light" %}
joystick push -d <domain>
{% /code %}

When running this command, if you haven't run it before, you will be prompted for your Push account's [Session Token](/push/getting-started/running-a-deployment).

## Options

{% parameters %}
{
  "-d, --domain": {
    "required": true,
    "description": "The domain to deploy this app to (must be created via the Push app)."
  },
  "-e, --environment": {
    "description": "The environment to set for `process.env.NODE_ENV` when your app is deployed (default `production`)."
  },
  "-t, --token": {
    "description": "The deployment token for your deployment. Only required on the first deployment (Joystick will save this to your machine for re-use), or, when using multiple Push accounts."
  }
}
{% /parameters %}

---
category: "@joystick.js/cli"
title: start
description: Start an existing Joystick app from your terminal.
---

To start an existing Joystick app, from your terminal, run:

{% code theme="light" %}
joystick start
{% /code %}

## Using Node.js Imports

In some situations (e.g., when implementing instrumentation for an APM service like [Sentry](https://docs.sentry.io/platforms/javascript/guides/express/install/esm/)), you will need to start Joystick with one or more scripts to import _before_ Joystick's Node.js process starts.

To do this, utilize the `--imports` flag when starting your app, passing a comma-separated list of imports to load:

{% code theme="light" %}
joystick start --imports lib/node/sentry.js,lib/node/datadog.js
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="APMs Typically Support One Import" %}
Because APMs use this mechanism for instrumenting your app via the [V8 Inspector API](https://nodejs.org/api/inspector.html), typically only a single import is supported. Joystick supports multiple imports as a convenience, not a prescription.
{% /alert %}

## Options

{% parameters %}
{
  "-d, --debug": {
    "description": "Enables debug mode for Node.js when starting your app (default `false`)."
  },
  "-e, --environment": {
    "description": "The environment to set for `process.env.NODE_ENV` (default `development`)."
  },
  "-p, --port": {
    "description": "The port number to start your Joystick app on (default `2600`)."
  },
  "-i, --imports": {
    "description": "A comma-separated list of paths pointing to scripts that should run before Joystick's Node.js process starts (e.g., APM instrumentation)."
  }
}
{% /parameters %}

---
category: "@joystick.js/cli"
title: test
description: Run tests for an existing Joystick app.
---

To run tests in standalone mode for an existing Joystick app, from your terminal, run:

{% code theme="light" %}
joystick test
{% /code %}

This will start a mirror of your app on port `1977` and run all of your app's tests against it.

## Watch Mode

Joystick has two options for running your tests in watch mode:

1. As a traditional, standalone process (in another terminal) that watches for app changes and reruns your tests as normal.
2. As an integrated process that runs your app's tests and reports their results directly inside of your app's server logs.

### Traditional Watch Mode

To run your tests in traditional watch mode, run:

{% code theme="light" %}
joystick test --watch
{% /code %}

This will start a separate process that runs your tests and reruns them whenever file changes are detected.

### Integrated Watch Mode

Joystick's integrated watch mode is designed to run directly alongside your Joystick app.

This makes it far easier to do TDD with Joystick and encourages better testing practices as your test results are output right alongside your dev server's logs (no need to maintain multiple terminals just to do TDD).

In order to run tests in integrated watch mode, just start your app with the `--tests` flag:

{% code theme="light" %}
joystick start --tests
{% /code %}

This will start a mirror of your app on port `1977` and run all of your app's tests against it at startup time and then again whenever your app's source changes.
---
category: "@joystick.js/cli"
title: update
description: Update the version of all Joystick packages in your app.
---

To update the version of all Joystick packages, from your terminal, run:

{% code theme="light" %}
joystick update
{% /code %}

This will install the latest versions of `@joystick.js/ui`, `@joystick.js/node`, and `@joystick.js/test` in your app and update `@joystick.js/cli` globally on your computer. If you pass the `-r, --release` option as `canary`, the `-canary` variant of these packages will be installed instead.

## Options

{% parameters %}
{
  "-r, --release": {
    "description": "The release of Joystick to update (default `production`)."
  }
}
{% /parameters %}

---
category: "@joystick.js/cli"
title: use
description: Set the release of Joystick to use for your app.
---

To set the release of Joystick to use for your app, from your terminal, run:

{% code theme="light" %}
joystick use <release>
{% /code %}

This will globally replace all instances of the package opposite from `<release>` in your project and install the latest version of the chosen release.

{% alert theme="info" title="@joystick.js/cli is not auto-installed" %}
A separate, manual install of `@joystick.js/cli` or `@joystick.js/cli-canary` (depending on your chosen `<release>`) is required.
{% /alert %}

## Args

{% parameters %}
{
  "&lt;release&gt;": {
    "required": true,
    "description": "The release of Joystick to use for your app (either `production` or `canary`)."
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: Databsaes
title: Binaries
description: Which database binaries are bundled with and supported by Joystick.
---

Currently, Joystick supports the following databases via a local binary:

1. [MongoDB](https://www.mongodb.com/) - A popular, NoSQL database.
2. [PostgreSQL](https://www.postgresql.org/) - A popular, SQL database.
3. [Redis](https://redis.com) - A popular, in-memory datbase.

Internally, as part of Joystick's development server (run via the `@joystick.js/cli` package), when starting up your app for the first time, Joystick will scan your current `settings.<env>.json` file's `config.databases` value.

For each [database provider](/joystick/databases/providers) detected, Joystick will also check to see if the _binary_ release of that database has been downloaded to your machine. If it _has_, Joystick will start the database via its binary and run your app. If it _has not_ been installed, first, Joystick will download and install the binary from the Joystick's CDN and then start the database and your app.

## Implications

Joystick bundles specific database binary versions for the sake of convenience and stability. While this _does_ limit the highest version available for a given database at least briefly, it avoids a version mismatch between your _machine's_ version of the database and the binary that Joystick installs (and can guarantee works with the framework).

Because the databases Joystick supports are _mature_, typically, the delay between a new version being supported (which may only have trivial feature additions) by Joystick and its release are deemed tolerable.
---
category: "@joystick.js/databases"
title: Connecting Multiple Databases
description: Connect multiple databases from the same or different providers in your Joystick app.
---

Joystick supports connecting multiple databases from different providers to your app. Instead of being limited to a single database, your app can send data where it's best handled. In a Joystick app, you can add multiple databases from different providers (e.g., MongoDB and PostgreSQL), or, you can add multiple from the same provider.

## From Different Providers

To add databases from different providers, add one object to the `config.databases` array for each provider:

{% code theme="light" title="/settings.<env>.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "options": {}
      },
      {
        "provider": "postgresql",
        "users": true,
        "options": {}
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

In `development`, Joystick will attempt to start each database defined in the `config.databases` array locally (assuming the database has already been installed), starting databases from the current app port (default of `2600`) plus `10` (the default database port starts at `2610`). In the example above, we'd expect MongoDB to be started on port `2610` and PostgreSQL to be started on port `2611`.

In your app, the driver for each database will be mapped to `process.databases.<provider_name>` (e.g., `process.databases.mongodb` or `process.databases.postgresql`).

## From Identical Providers

If you'd like to use multiple databases with the same `provider` key, this is supported, but with some caveats related to naming:

{% code theme="light" title="/settings.<env>.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "options": {}
      },
      {
        "provider": "mongodb",
        "users": true,
        "options": {}
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

In the above example, assuming an app port of `2600`, we'd expect two MongoDB servers to be started: one on port `2610` and one on `2611`. Because both are using the same provider name, Joystick will automatically map these databases to `process.databases` using the naming convention `process.databases.<provider_name>_<database_port>`. In this case, we'd expect to get drivers for each database at `process.databases.mongodb_2610` and `process.databases.mongodb_2611`.

### Specifying a Name

Because tying the name of the driver in your code to the port number isn't ideal—especially in a non-development environment—when using multiple databases of the same provider, you can specify a `name` property in the config:

{% code theme="light" title="/settings.<env>.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "name": "user_data",
        "users": true,
        "options": {}
      },
      {
        "provider": "mongodb",
        "name": "analytics_data",
        "users": true,
        "options": {}
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

When a `name` is provided, the database will be mapped using that name. In the example above, we would expect to get drivers mapped to `process.databases.mongodb.user_data` and `process.databases.mongodb.analytics_data`.

---
category: "@joystick.js/databases"
title: Database Providers
description: Learn about the database providers supported by Joystick.
---

While most apps tend to focus on utilizing a single database, in modern apps, it's wise to use databases on a "best tool for the job" basis. To walk in step with this idea, Joystick is designed to work with multiple databases, simultaneously, out of the box.

Instead of forcing you to compromise, Joystick lets you connect multiple databases from different providers to the same app. For example, you can use a MongoDB database for frequently-changed data like user profiles or user-generated content, and PostgreSQL for infrequently-changed data, side by side.

To do it, in a `development` environment, Joystick automatically starts up local servers for the databases you specify in your app's `settings.<env>.json` file. Behind the scenes, when your app is started, Joystick then maps these database connections to the `process.databases` object in your app.

So, if you decide to run MongoDB and PostgreSQL at the same time, in your app's code, you would access MongoDB via `process.databases.mongodb` and PostgreSQL via `process.databases.postgresql`.

Currently, Joystick supports the following database providers and features:

| Database   | Provider ID     | Autostart via CLI | Node.js Driver | User Accounts | Queues | Sessions |
|------------|:---------------:|:-----------------:|:--------------:|:--------------:|:------:|:--------:|
| MongoDB    | `mongodb`        | ✅                 | ✅             | ✅            | ✅     | ✅       |
| PostgreSQL | `postgresql`     | ✅                 | ✅             | ✅            | ✅     | ✅       |

---
category: "@joystick.js/databases"
title: Queues
description: Enable support for queues on a database in your Joystick app.
---

To enable support for [queues](/joystick/node/queues/defining-queues) on a database, in your `settings.<env>.json` file add the `"queues": true` flag to a database config object:

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "queues": true,
        "options": {}
      }
    ],
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Once added, any queue defined in the app will automatically have its jobs routed to the specified database. If a queue is _not_ [defined as external](/joystick/node/queues/external-queues) in the app, the app will also read jobs _from_ the specified database and run them internally.

---
category: "@joystick.js/databases"
title: Remote Connections
description: Configure Joystick to connect to remote databases across environments.
---

For non-development environments, a remote database can be specified in the `config.databases` array via the `connection` object:

{% code theme="light" title="/settings.production.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "connection": {
          "username": "remote_user",
          "password": "remotepassword123",
          "database": "remote_database",
          "hosts": [{
            "hostname": "primary.mongodb-host.com",
            "port": 27017
          }, {
            "hostname": "secondary.mongodb-host.com",
            "port": 27017
          }]
        },
        "options": {
          "ca": "private/ssl_ca.pem",
          "replicaSet": "rs-0",
          "ssl": true,
          "authSource": "admin"
        }
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

In the above example, we're creating a connection to a fictional remote MongoDB database. While the same structure of the `connection` object is used for all databases (e.g., PostgreSQL), the part to pay attention to here is the `options` object. Here, we've expanded this to include additional _driver_ options (meaning, options passed to the database's Node.js driver internally in Joystick when your app starts up) which affect the behavior of the remote connection.

{% alert theme="info" title="MongoDB Specific Options" %}
Though usage of the `options` object itself is consistent across all database providers, the actual options we're setting on the object here are specific to the MongoDB driver bundled with Joystick. For PostgreSQL options, [refer to this documentation](https://node-postgres.com/apis/client#new-client).
{% /alert %}

## MongoDB Atlas + SRV Users

For MongoDB databases utilizing a `mongodb+srv://` prefixed connection string, you need to add `"srv": true` to the `connection` object. This tells Joystick to internally flip the protocol to use MongoDB's DNS discovery feature (automatically selecting servers, whereas the old protocol required you to specify each server manually). For example, a modified version of the above file would look like:

{% code theme="light" title="/settings.production.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "connection": {
          "srv": true,
          "username": "remote_user",
          "password": "remotepassword123",
          "database": "remote_database",
          "hosts": [{
            "hostname": "primary.mongodb-host.com"
          }]
        },
        "options": {
          "replicaSet": "replica-set-name",
          "ssl": true,
          "authSource": "admin"
        }
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

In this example, we've specified the path of an SSL certificate authority file (some remote databases require this for SSL/TLS authentication), the name of a `replicaSet` to target, flagged the `ssl` option to `true`, and have set an `authSource` relative to where our remote database user will be defined.

## Connecting to Another Local Database

If your app's footprint consists of _multiple_ Joystick applications (e.g., a user-facing app and a separate job server app), in development, it can be helpful to share the same _local_ database between apps. Assuming we have a user-facing app running on port `2600` (with a database running on port `2610`), a separate job server app started on `2605` can connect to the `2610` database using the same `connection` pattern above:

{% code theme="light" title="/settings.development.json (Job Server App)" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "connection": {
          "username": "",
          "password": "",
          "database": "app",
          "hosts": [{
            "hostname": "127.0.0.1",
            "port": 2610
          }]
        },
        "options": {}
      }
    ],
    "i18n": { ... },
    "middleware": {},
    "email": { ... }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Here instead of pointing to a true remote database (meaning one that's accessible via the internet), we point to `127.0.0.1` and port `2610` to access the local database.

---
category: "@joystick.js/databases"
title: Sessions
description: Enable support for sessions and CSRF tokens on a database in your Joystick app.
---

{% alert theme="warning" icon="triangle-alert" title="Only Applies to Joystick Versions Up To 1.0.0-rc.1" %}
Prior to Joystick v1.0.0-rc.2, session data was stored in the database. This is now managed 100% via cookies and does not require a database.
{% /alert %}

If you'd like to enable session support, please refer to [the @joystick.js/node docs on enabling CSRF protection](/joystick/node/csrf-protection).

---
category: "@joystick.js/databases"
title: Users
description: Enable support for user accounts on a database in your Joystick app.
---

To enable support for user accounts on a database, in your `settings.<env>.json` file add the `"users": true` flag to a database config object:

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "options": {}
      }
    ],
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Once added, all calls to `accounts` methods will be automatically mapped to the specified database.

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Events
description: Define event hooks to run after account-related actions like login, signup, or logout.
---

Depending on the nature of your app, it may be helpful to know when certain account actions are taken (e.g., for auditing or administrative purposes). To support this, Joystick offers **account event hooks** that can be defined via the `accounts.events` option passed in the options object for `joystick.app()`.

Account hooks are called immediately after the corresponding account event takes place.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  accounts: {
    events: {
      on_login: ({ token, token_expires_at, user }) => {
        // Handle login event...
      },
      on_signup: ({ token, token_expires_at, user }) => {
        // Handle signup event...
      },
      on_logout: (user = {}) => {
        // Handle logout event...
      },
      on_recover_password: (email_address = '') => {
        // Handle recover password event...
      },
      on_reset_password: ({ token, token_expires_at, user }) => {
        // Handle reset password event...
      },
    },
  },
  routes: {
    // Your routes configuration...
  }
});
{% /code %}

Above, we define multiple account event hooks inside `accounts.events`. Each hook runs automatically after its corresponding account event occurs.

## API

### Definition

{% code theme="light" %}
accounts: {
  events: {
    on_login: ({ token, token_expires_at, user }) => void,
    on_signup: ({ token, token_expires_at, user }) => void,
    on_logout: (user: object) => void,
    on_recover_password: (email_address: string) => void,
    on_reset_password: ({ token, token_expires_at, user }) => void
  }
}
{% /code %}

### Parameters

#### on_login()

{% parameters %}
{
  "token": {
    "type": "string",
    "required": true,
    "description": "The login token generated for the user."
  },
  "token_expires_at": {
    "type": "string",
    "required": true,
    "description": "The expiration date/time of the login token as an ISO string."
  },
  "user": {
    "type": "object",
    "required": true,
    "description": "The logged-in user’s data."
  }
}
{% /parameters %}

#### on_signup()

{% parameters %}
{
  "token": {
    "type": "string",
    "required": true,
    "description": "The signup token generated for the user."
  },
  "token_expires_at": {
    "type": "string",
    "required": true,
    "description": "The expiration date/time of the signup token as an ISO string."
  },
  "user": {
    "type": "object",
    "required": true,
    "description": "The newly signed up user’s data."
  }
}
{% /parameters %}

#### on_logout()

{% parameters %}
{
  "user": {
    "type": "object",
    "required": true,
    "description": "The user who has logged out."
  }
}
{% /parameters %}

#### on_recover_password()

{% parameters %}
{
  "email_address": {
    "type": "string",
    "required": true,
    "description": "The email address associated with the password recovery request."
  }
}
{% /parameters %}

#### on_reset_password()

{% parameters %}
{
  "token": {
    "type": "string",
    "required": true,
    "description": "The reset password token generated for the user."
  },
  "token_expires_at": {
    "type": "string",
    "required": true,
    "description": "The expiration date/time of the reset token as an ISO string."
  },
  "user": {
    "type": "object",
    "required": true,
    "description": "The user whose password was reset."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Login
description: Log in an existing user account from the server.
---

To log in an existing user account, the `accounts.login()` method can be called from anywhere on your server.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  routes: {
    '/api/accounts/login': {
      method: 'POST',
      handler: async (req = {}, res = {}) => {
        const login = await accounts.login({
          email_address: req?.body?.email_address,
          password: req?.body?.password,
        });
        
        res.cookie('joystick_login_token', login?.token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        res.cookie('joystick_login_token_expires_at', login?.token_expires_at, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        
        await process.databases.mongodb.collection('customer_sessions').insertOne({
          customer_id: req?.body?.customer_id,
          user_id: login?.user?._id,
          created_at: new Date().toISOString(),
        });

        res.status(200).send({ user_id: login?.user?._id });
      },
    },
  },
});
{% /code %}

Above, we create an [advanced route](/joystick/node/routes/advanced-routes) for a special `/api/accounts/login` endpoint that we can use to log in a user and do some additional work afterward (in this case, creating a hypothetical customer session).

Because we're implementing the _raw_ server API for `accounts.login()`, we manually set the `joystick_login_token` and `joystick_login_token_expires_at` cookies. Without this, a session would be created in the database but not in the browser, so for the user, it would appear they didn’t log in.

## API

### Definition

{% code theme="light" %}
accounts.login(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "An object defining the parameters for the existing user account. Note: either `email_address` or `username` is required.",
    "children": {
      "email_address": {
        "type": "string",
        "required": false,
        "description": "The email address for the existing user account."
      },
      "username": {
        "type": "string",
        "required": false,
        "description": "The username for the existing user account."
      },
      "password": {
        "type": "string",
        "required": true,
        "description": "The password for the existing user account."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Recover Password
description: Start the password recovery process for an existing user account from the server.
---

To start the password recovery process for an existing user account, the `accounts.recover_password()` method can be called from anywhere on your server.

## Example Usage

{% code theme="light" title="api/users/setters.js" %}
import joystick, { accounts } from '@joystick.js/node';
import Twilio from 'twilio';

const twilio = Twilio(
  joystick.settings.private.twilio.account_sid,
  joystick.settings.private.twilio.auth_token,
);

const setters = {
  recover_password_via_sms: {
    input: {
      email_address: {
        type: 'string',
        required: true,
      },
    },
    set: async (input = {}) => {
      const user = await process.databases.mongodb.collection('users').findOne({
        emailAddress: input?.email_address,
      });

      if (!user || !user?.sms_phone_number) {
        throw new Error('User does not have an SMS number defined.');
      }

      const reset_token = await accounts.recover_password({
        email_address: input?.email_address,
      });

      await twilio.messages.create({
        body: `Your password reset token is: ${reset_token}.`,
        to: '+11234567890',
        from: '+18905671234',
      });
    },
  },
};

export default setters;
{% /code %}

Above, we create a hypothetical [setter](/joystick/node/api/setters) that triggers a password recovery attempt, relaying the reset token to a two-factor SMS number via the Twilio API.

## API

### Definition

{% code theme="light" %}
accounts.recover_password(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "An object defining the parameters for the existing user account.",
    "children": {
      "email_address": {
        "type": "string",
        "required": true,
        "description": "The email address for the existing user account."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Reset Password
description: Reset the password for an existing user account from the server.
---

To reset the password for an existing user account, the `accounts.reset_password()` method can be called from anywhere on your server.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  routes: {
    '/admin/accounts/reset-password': {
      method: 'POST',
      handler: async (req = {}, res = {}) => {
        const reset_password = await accounts.reset_password({
          password: req?.body?.password,
          token: req?.body?.token,
        });
        
        res.cookie('joystick_login_token', reset_password?.token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        res.cookie('joystick_login_token_expires_at', reset_password?.token_expires_at, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        
        res.status(200).send({ user_id: reset_password?.user?._id });
      },
    },
  },
})
{% /code %}

Above, we create an [advanced route](/joystick/node/routes/advanced-routes) for a special `/admin/accounts/reset-password` endpoint that administrators can use to reset a user's password on their behalf (e.g., during a support session).

Of note, because we're implementing the _raw_ server API for `accounts.reset_password()`, we need to manually set the `joystick_login_token` and `joystick_login_token_expires_at` cookies in order for the login after the reset to actually succeed (without this, a session is created in the database but not in the browser so for the user, it doesn't look like they logged in).

## API

### Definition

{% code theme="light" %}
accounts.reset_password(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "An object defining the parameters for the user account to reset.",
    "children": {
      "password": {
        "type": "string",
        "required": true,
        "description": "The new password for the existing user account."
      },
      "token": {
        "type": "string",
        "required": true,
        "description": "The password reset token for the existing user account."
      }
    }
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Add Role
description: Add a role to your app’s database for use with user accounts.
---

To add a role that's available for users, the `accounts.roles.add()` method can be utilized:

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  ...
}).then(() => {
  accounts.roles.add('manager');
});
{% /code %}

Above, we tap into the `.then()` callback that's triggered internally by `joystick.app()` after our server starts up. Inside, we call to `accounts.roles.add('manager')` to create the `manager` role in our database. Keep in mind: this only creates the role in our database but _does not_ grant the role to any users. Roles must be [granted on a user-by-user basis](/joystick/node/accounts/roles-grant).

The purpose of the above `.add()` method is limited. It's best used in situations where roles need to be available for a feature like an admin UI (where an administrator can select roles to grant to a user) before they're actually _granted_ to users.

## API

### Definition

{% code theme="light" %}
accounts.roles.add(role: string) => void;
{% /code %}

### Parameters

{% parameters %}
{
  "role": {
    "type": "string",
    "required": true,
    "description": "A string defining the name of the role to add."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Grant Role
description: Grant a role to an existing user in your app’s database.
---

To grant a role to an existing user, the `accounts.roles.grant()` method can be utilized:

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  accounts: {
    events: {
      on_login: ({ user }) => {
        accounts.roles.grant(user?._id, 'active_account');
      },
    },
  },
});
{% /code %}

Above, we tap into the [account event hook](/joystick/node/accounts/event-hooks) for the `on_login()` event to grant a temporary role of `active_account` to a user. When a role is granted to a user, it’s added to an array on their document/row in the database called `roles`.

When calling `accounts.roles.grant()`, if the specified role does not already exist in the `roles` collection/table for the app, Joystick will automatically create it.

## API

### Definition

{% code theme="light" %}
accounts.roles.grant(user_id: string, role: string) => void;
{% /code %}

### Parameters

{% parameters %}
{
  "user_id": {
    "type": "string",
    "required": true,
    "description": "A user ID from your `users` collection/table in the database (e.g., `user._id` for MongoDB or `user.user_id` for PostgreSQL)."
  },
  "role": {
    "type": "string",
    "required": true,
    "description": "A string defining the name of the role to grant to the specified user."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Remove Role
description: Remove a role from your app’s database and revoke it from all users.
---

To remove a role that's available for users, the `accounts.roles.remove()` method can be utilized.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  ...
}).then(() => {
  accounts.roles.remove('manager');
});
{% /code %}

Above, we tap into the `.then()` callback that's triggered internally by `joystick.app()` after our server starts up. Inside, we call to `accounts.roles.remove('manager')` to remove the `manager` role from our database.

When we run `accounts.roles.remove()`, the passed `role` is removed from the global `roles` collection/table, but also from all users who currently have it granted. This is a great way to migrate between roles, or to bulk remove a role that no longer exists without having to worry about security leaks.

## API

### Definition

{% code theme="light" %}
accounts.roles.remove(role: string) => void;
{% /code %}

### Parameters

{% parameters %}
{
  "role": {
    "type": "string",
    "required": true,
    "description": "A string defining the name of the role to remove from the database and revoke from all users."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Revoke Role
description: Revoke a role from an existing user in your app’s database.
---

To revoke a role from an existing user, the `accounts.roles.revoke()` method can be utilized.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick, { accounts } from '@joystick.js/node';

joystick.app({
  accounts: {
    events: {
      on_logout: (user = {}) => {
        accounts.roles.revoke(user?._id, 'active_account');
      },
    },
  },
});
{% /code %}

Above, we tap into the [account event hook](/joystick/node/accounts/event-hooks) for the `on_logout()` event to revoke the temporary role `active_account` from a user. When a role is revoked, it is removed from the `roles` array on the user’s document/row in the database.

## API

### Definition

{% code theme="light" %}
accounts.roles.revoke(user_id: string, role: string) => void;
{% /code %}

### Parameters

{% parameters %}
{
  "user_id": {
    "type": "string",
    "required": true,
    "description": "A user ID from your `users` collection/table in the database (e.g., `user._id` for MongoDB or `user.user_id` for PostgreSQL)."
  },
  "role": {
    "type": "string",
    "required": true,
    "description": "A string defining the name of the role to revoke from the specified user."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Signup
description: Create new user accounts from anywhere on your server.
---

To create new user accounts, the `accounts.signup()` method can be called from anywhere on your server.

## Example Usage

{% code theme="light" title="api/users/setters.js" %}
import joystick, { accounts } from '@joystick.js/node';

const setters = {
  create_user: {
    input: {
      email_address: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'object',
        required: true,
        fields: {
          first: {
            type: 'string',
            required: true,
          },
          last: {
            type: 'string',
            required: true,
          }
        }
      }
    },
    set: (input = {}) => {
      return accounts.signup({
        email_address: input?.email_address,
        username: `${input?.name?.first?.charAt(0)?.toLowerCase()}${input?.name?.last?.toLowerCase()}`,
        password: input?.password,
        metadata: {
          name: input?.name,
        }
      });
    },
  },
};
{% /code %}

Above, inside of a hypothetical [setter](/joystick/node/api/setters) `create_user`, we take in the `input` for a new user and [validate it](/joystick/node/api/input-validation). Then, inside of our `set()` function, we call `accounts.signup()` mapping values from `input` to the options object.

## API

### Definition

{% code theme="light" %}
accounts.signup(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "An object defining the parameters for the new user account.",
    "children": {
      "email_address": {
        "type": "string",
        "required": true,
        "description": "The email address for the new user account."
      },
      "username": {
        "type": "string",
        "required": false,
        "description": "The username for the new user account."
      },
      "password": {
        "type": "string",
        "required": true,
        "description": "The password for the new user account."
      },
      "metadata": {
        "type": "object",
        "required": false,
        "description": "Additional metadata for the new user account.",
        "children": {
          "language": {
            "type": "string",
            "required": false,
            "description": "Preferred language for the user as an [ISO Language Code](https://gist.github.com/rglover/23d9d10d788c87e7fc5f5d7d8629633f)."
          }
        }
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Validate Signup Metadata
description: Validate metadata passed during user signup from the client.
---

When calling the `accounts.signup()` method from the client, you have the option of passing an additional `metadata` object alongside the `email_address` and `password` for the user being created. The `metadata` field is intended to contain additional information about the user (e.g., their name, their job title, etc).

Because this `metadata` object is passed directly from the client to your database by Joystick, it's important to validate its contents to ensure they match your expectations. To perform this validation, you can utilize the `accounts.signup.metadata` object passed to `joystick.app()` in your `index.server.js` file at the root of your project.

## Example Usage

As an example, assume we had a call to `accounts.signup()` in the browser like this:

{% code theme="light" title="ui/pages/index.js" %}
import { accounts } from '@joystick.js/ui';

joystick.component({
  events: {
    'submit form': (event = {}, instance = {}) => {
      accounts.signup({
        email_address: event.target.email_address.value,
        password: event.target.password.value,
        metadata: {
          company_name: event.target.company_name.value,
        },
      });
    },
  },
  render: () => {
    return `
      <form></form>
    `;
  },
});
{% /code %}

Above, the `metadata` object is optional. While we _do_ control what's passed to `accounts.signup()` in our code, because that function is accessible to any user on the client, a hypothetical attacker could pass arbitrary data to it via the `metadata` object.

To guard against this, on our server, we can define input validation for this field to prevent unexpected data from making it to the database:

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  accounts: {
    signup: {
      metadata: {
        company_name: {
          type: 'string',
          required: true,
        },
      }
    },
  },
  ...
});
{% /code %}

In the example above, the object passed to `accounts.signup.metadata` is using the same [input validation schema language](/joystick/node/api/input-validation) that's used when you define getters and setters in your app's API.

When `accounts.signup.metadata` is set, Joystick will automatically validate that the `metadata` object passed to the server via `accounts.signup()` matches its expectations. If it doesn't, Joystick will throw an error and reject the signup request.

## API

### Definition

{% code theme="light" %}
accounts.signup.metadata: object
{% /code %}

### Description

The `accounts.signup.metadata` object defines the validation schema for metadata passed from the client during signup. Each field in the object corresponds to a key in the metadata object sent by the client.

{% parameters %}
{
  "&lt;metadata_field&gt;": {
    "type": "object",
    "required": "boolean",
    "description": "Validation for each key of the metadata object passed to accounts.signup()."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Actions
description: How to organize multi-step processes into fault-tolerant actions with Joystick.
---

Actions are a unique feature of Joystick, designed to help you organize complex, multi-step code into a single, fault-tolerant function. For example, when a new user signs up for your app, the "action" being taken might be called `signup()` which consists of a few discrete "steps:"

1. Create a user account.
2. Create a customer account in your payment system.
3. Seed the database with some example data.
4. Fire off a welcome email.
5. Track the signup in your analytics.

While we can certainly write code that runs each of these steps independently, it can be helpful to call them together, with the end result of all of the steps being completed successfully being identified as a successful "signup."

Conversely, if any of those steps fail, we can say that the "signup" failed. We may have gotten a user account and some seed data, but the payments API was down and so now there's no payment data connected to the user.

When this happens, ideally, we can treat the entire action as a failure and alert the user, suggesting they try again.

This is where Joystick's built-in `action` library comes in to play.

## Example Usage

An action works by creating a function composed of multiple steps that can be called together. Inside of the action, steps can reference each other's inputs and outputs, streamlining the process of completing some "action." This is helpful not only for maintenance purposes and system stability, but also for things like testing your app.

In addition to being able to call steps together in sequence, an action can also include input validation (to confirm all of the data you need to complete the action is present with the correct data types) as well as the option to "abort" the action if any one of the steps fails.

Consider the following example action `signup()`:

{% code theme="light" title="/api/signup.js" %}
import joystick, { accounts, email, origin } from "@joystick.js/node";
import Stripe from 'stripe';
import analytics from 'analytics-provider';
import seed_new_user_data from '../lib/seed_new_user_data.js';

const stripe = Stripe(joystick?.settings?.private?.stripe?.secret_key);

const signup = joystick.action(
  "signup",
  {
    input: {
      email_address: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
    },
    steps: {
      create_user: {
        run: (email_address = '', password = '', name = '') => {
          return accounts.signup({
            email_address,
            password,
            metadata: {
              name,
            }
          });
        },
        on_error: (exception, action) => {
          action.abort(exception.message);
        },
      },
      create_customer_on_stripe: {
        run: (name = '', email_address = '', user_id = '') => {
          return stripe.customers.create({
            name,
            email_address,
            metadata: {
              user_id,
            }
          });
        },
        on_error: (exception, action) => {
          action.abort(exception.message);
        },
      },
      add_customer_to_user: {
        run: (user_id = '', stripe_customer_id = '') => {
          return process.databases.mongodb.collection('users').updateOne(
            { _id: user_id },
            {
              $set: {
                stripe_customer_id,
              },
            }
          );
        },
        on_error: (exception, action) => {
          action.abort(exception.message);
        },
      },
      seed_example_data: {
        run: (user_id = '') => {
          seed_new_user_data(user_id);
        },
        on_error: (exception, action) => {
          action.abort(exception.message);
        },
      },
      send_welcome_email: {
        run: (email_address = '', name = '') => {
          return email.send({
            to: email_address,
            from: 'customers@app.com',
            subject: 'Welcome!',
            template: 'welcome',
            props: {
              name,
              onboarding_url: `${origin}/setup`,
            },
          });
        },
      },
      track_signup: {
        run: (user_id = '') => {
          return analytics.track({ event: 'signup', user_id });
        },
      },
    },
    run: async (input = {}, steps = {}, action = {}) => {
      const user = await steps.create_user(input?.email_address, input?.password, input?.name);
      const customer_on_stripe = await steps.create_customer_on_stripe(input?.name, input?.email_address);

      await steps.add_customer_to_user(user?._id, customer_on_stripe?.id);
      await steps.seed_example_data(user?._id);
      await steps.send_welcome_email(input?.email_address, input?.name);

      return user?._id;
    },
  },
  {
    log_errors: true,
  }
);

export default signup;
{% /code %}

### Calling an action

If we look above, we've exported the return value of calling `action()` above. What we expect to get in return is a function that we can call, passing the expected input (relative to the `input` schema we defined on the action):

{% code theme="light" title="/api/users/setters.js" %}
import joystick from '@joystick.js/node';
import signup from '../signup.js';

const setters = {
  create_user: {
    input: {
      email_address: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
    },
  },
  set: (input = {}) => {
    return signup(input);
  },
};

export default setters;
{% /code %}

## API Reference

### action()

#### Function API

{% code theme="light" %}
action(action_name: string, action_definition: object, action_options: object) => function;
{% /code %}

#### Parameters

{% parameters %}
{
  "action_name": {
    "type": "string",
    "required": true,
    "description": "The name for the action. Used internally by the action when reporting errors."
  },
  "action_definition": {
    "type": "object",
    "required": true,
    "description": "The definition for the action.",
    "children": {
      "input": {
        "type": "object",
        "required": false,
        "description": "An object defining an input validation schema to validate the input before calling the action's run() function."
      },
      "steps": {
        "type": "object",
        "required": true,
        "description": "An object containing individual steps as objects with a run() function and optional on_error()/on_success() methods.",
        "children": {
          "[step_name]": {
            "type": "object",
            "required": true,
            "description": "An object defining a single step.",
            "children": {
              "run": {
                "type": "function",
                "required": true,
                "description": "The function for this step. Receives arguments passed from the action's run() function."
              },
              "on_error": {
                "type": "function",
                "required": false,
                "description": "A function called if the step throws an error. Receives the error and the action instance."
              },
              "on_success": {
                "type": "function",
                "required": false,
                "description": "A function called if the step succeeds. Receives the return value from the step and the action instance."
              }
            }
          }
        }
      },
      "run": {
        "type": "function",
        "required": true,
        "description": "The main function for the action, responsible for calling steps in sequence."
      }
    }
  },
  "action_options": {
    "type": "object",
    "required": false,
    "description": "Additional options for configuring the behavior of the action.",
    "children": {
      "log_errors": {
        "type": "boolean",
        "required": false,
        "description": "Set whether or not the action should log errors to the server console. Defaults to false."
      }
    }
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Authorized
description: How to guard API getters and setters by validating requests with custom authorization logic.
---

A golden rule in web development is to _never trust the client_. Because your app is (or will be) open to the web, anyone can access its API endpoints. To guard against unauthorized access to getters and setters, it's recommended that you utilize the `authorized()` method on your getter and setter definitions to determine if a client's access is authorized.

## Example Usage

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    authorized: (input = {}, context = {}) => {
      return !!context?.user;
    },
    get: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').find({
        user_id: context?.user?._id,
        category: input?.category,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

The `authorized()` method on your getter or setter receives the same `input` and `context` values as your `get()` or `set()` methods. Internally, any logic you wish can be performed to determine if the current request is authorized (e.g., checking for the presence of a user, validating their roles, etc.). The only requirement for the `authorized()` method is that it returns one of two responses:

1. A `boolean` value (`true` if authorized, `false` if not).
2. An object containing an `authorized` key containing a `boolean` value and a custom `message` to send back to the client.

If the `authorized()` method returns `true`, the request proceeds as expected. If `false`, the request is rejected with an `HTTP 403 Unauthorized` status code.

If you choose to return an object with an `authorized` value of `true`, the request proceeds as expected. If you choose to return an object with an `authorized` value of `false`, the request is rejected with an `HTTP 403 Unauthorized` status code.

### Custom Authorization Errors

If you'd like to provide a custom error message when authorization fails, an object can be returned from `authorized()` containing a `message` field:

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    authorized: (input = {}, context = {}) => {
      return {
        authorized: !!context.user,
        message: 'Must be logged in to access books.'
      };
    },
    get: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').find({
        user_id: context?.user?._id,
        category: input?.category,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

## API

### Definition

{% code theme="light" %}
authorized(input: object, context: object) => boolean | { authorized: boolean, message: string }
{% /code %}

### Parameters

{% parameters %}
{
  "input": {
    "type": "object",
    "required": false,
    "description": "If passed from the client, the input value for the getter or setter request. If nothing is passed, defaults to an empty object."
  },
  "context": {
    "type": "object",
    "required": false,
    "description": "The context object automatically passed by Joystick containing the inbound HTTP req object and user object (if available)."
  },
  "returns": {
    "type": "boolean|object",
    "required": true,
    "description": "Returns either a boolean (true if authorized, false if not) or an object with an `authorized` key (boolean) and optional `message` key (string)."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Getters
description: How to define a getter in your API to retrieve data from a database, disk, or third-party API.
---

As the name implies, in a Joystick app, a getter is a way to "get" data from a data source. Typically that data source is a database, but it could also be a third-party API, a static file, etc. Ultimately, a getter is nothing more than a function being called with some helpful utilities and context added.

{% alert icon="route" theme="info" title="Getters are HTTP GET Routes" %}
While they may not look like it syntactically, behind the scenes, getters are registered as HTTP GET routes via Express (following the pattern <code>/api/_getters/&lt;getter_name&gt;</code>).
{% /alert %}

Getters are organized in your `/api` folder, in sub-directories with names related to the data being retrieved. For example, if we had a collection/table in our database called `books`, we'd want to define a folder like `/api/books`. Inside of that folder, we'd create a file for our getters at `/api/books/getters.js`, exporting an object from that file with all of our book-related getter definitions.

## Example Usage

### Defining a Getter

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    get: () => {
      return process.databases.mongodb.collection('books').find().toArray();
    }
  }
};

export default getters;
{% /code %}

Above, we've defined a simple getter `books`. To do it, we assign `books` as a key on a parent object containing all of our book-related getters. To that key, we've assigned another object with a single method `get()`: the function on our getter that's responsible for retrieving data.

In this example, we're calling to our database and returning the query result directly from the getter.

### Accessing input and context

When a getter is called (typically via the `get()` method imported from `@joystick.js/ui` or the `api.get()` method passed to a [component's data function](/joystick/ui/component/data)), `input` can be passed along with the request containing useful information like the ID of a specific item to retrieve, a category, etc.

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    get: (input = {}) => {
      return process.databases.mongodb.collection('books').find({
        category: input?.category,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

If there's any `input` passed with a getter request, Joystick will pass it as the first argument to your `get()` function. Above, we anticipate a `category` being passed in the `input` and utilize it in our database query.

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    get: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').find({
        category: input?.category,
        user_id: context?.user?._id,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

In addition to `input`, as the second argument to your getter's `get()` function, a `context` object is passed with a few different sub-fields:

- `req` – the inbound HTTP request related to the getter request.
- `user` – if available, the currently logged in user.
- `<database_provider>` – a connection to the database driver for one of your app's configured database providers (e.g., `context.mongodb` or `context.postgresql`).

Above, as an example, we've referenced the currently logged in user's `_id` field (if our [user's database provider](/joystick/databases/users) was a SQL database like PostgreSQL, we'd reference `context.user.user_id`) on the `context` object.

## API

### Definition

{% code theme="light" %}
get(input: object, context: object) => any;
{% /code %}

### Parameters

{% parameters %}
{
  "input": {
    "type": "object",
    "required": false,
    "description": "If passed from the client, the input value for the getter request. If nothing is passed, value will be an empty object <code>{}</code>."
  },
  "context": {
    "type": "object",
    "required": false,
    "description": "The context object automatically passed by Joystick containing the inbound HTTP req object and user object (if available)."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Input Validation
description: How to define and use input validation for getters and setters in Joystick apps.
---

Joystick uses a built-in validation library for validating inputs passed from the browser to the server as part of a call to a getter or setter.

Validation rules are defined using a nested object structure (written to mimic the structure of the data you're passing from the client) along with a few different properties to set the rules for your inputs.

## Example Usage

### Defining Validation on a Getter

{% code theme="light" title="api/books/getters.js" %}
const getters = {
  books: {
    input: {
      category: {
        type: 'string',
        required: true,
      }
    },
    get: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').find({
        user_id: context?.user?._id,
        category: input?.category,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

Here, `category` is the name of the field we want to validate. We expect it to have a data type of `string` and require it to be passed in the input.

The object assigned to the field name (here, `category`) is known as the validator, while the properties on that object are known as the rules for that validator.

Before a getter or setter’s `get()` or `set()` method is executed, if present, the `input` they pass will be checked against the provided schema. If the `input` meets expectations, the request will proceed as normal.

In the event that the input of a client’s request fails validation, Joystick will return an `HTTP 400 Bad Request` status code.

### Complex Validation Example

Validator objects can be composed together to create complex validation. For example, consider the following input validation schema:

{% code theme="light" title="Example Input Validation Schema" %}
input: {
  name: {
    type: "string",
    required: true,
  },
  instruments: {
    type: "array",
    allowed_values: ["piano", "guitar", "vocals", "bass"],
  },
  albums: {
    type: "array",
    element: {
      type: "object",
      fields: {
        title: {
          type: "string",
          required: true,
        },
        year: {
          type: "string",
          optional: true,
        },
      },
    },
  },
},
{% /code %}

This could be used to validate the following input:

{% code theme="light" title="Example Input" %}
input: {
  name: "Trent Reznor",
  instruments: ["piano", "guitar", "vocals", "kazoo"],
  albums: [
    { title: 'The Downward Spiral', year: '1994' },
    { title: 'The Fragile', year: '1999' },
    { title: 'Broken EP', year: '1995' },
  ],
},
{% /code %}

Above, we’d expect this input to fail validation as the `instruments` array on the `input` has a value that isn’t listed in the `allowed_values` array for that field in the schema.

While your data should be kept shallow for the sake of clarity and simplicity, Joystick’s validation can technically be nested infinitely as it runs recursively to an arbitrary depth.

## API

### Definition

{% code theme="light" %}
input: {
  field_name: {
    type: string,
    required: boolean,
    optional: boolean,
    allowed_values: array,
    element: object,
    fields: object,
    min: number,
    max: number,
    regex: RegExp,
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "type": {
    "type": "string",
    "required": true,
    "description": "The expected type of data for the field. One of: `any`, `array`, `boolean`, `float`, `integer`, `number`, `object`, or `string`."
  },
  "required": {
    "type": "boolean",
    "required": false,
    "description": "Specifies whether or not a field is required. Defaults to `false`."
  },
  "optional": {
    "type": "boolean",
    "required": false,
    "description": "Alias for `required: false`. Specifies whether or not a field is optional."
  },
  "allowed_values": {
    "type": "array",
    "required": false,
    "description": "An array of allowed values for the field. Acts as an enum validator."
  },
  "element": {
    "type": "object",
    "required": false,
    "description": "Defines validation rules for the contents of an array. Only used when `type` is `array`."
  },
  "fields": {
    "type": "object",
    "required": false,
    "description": "Defines validation rules for the contents of an object. Only used when `type` is `object`."
  },
  "min": {
    "type": "number",
    "required": false,
    "description": "Sets a minimum numeric value for the field."
  },
  "max": {
    "type": "number",
    "required": false,
    "description": "Sets a maximum numeric value for the field."
  },
  "regex": {
    "type": "RegExp",
    "required": false,
    "description": "A regular expression used to validate the field value."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Middleware
description: How to define custom middleware for API getters and setters.
---

Behind the scenes, getters and setters are registered as HTTP GET and HTTP POST routes, respectively, via Express. As a result, if necessary, custom middleware can be defined on an individual getter or setter.

## Example Usage

{% code theme="light" title="api/books/getters.js" %}
import rate_limiter_middleware from 'example-rate-limiter';

const getters = {
  books: {
    middleware: [
      rate_limiter_middleware,
    ],
    authorized: (input = {}, context = {}) => {
      return !!context?.user;
    },
    get: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').find({
        user_id: context?.user?._id,
        category: input?.category,
      }).toArray();
    }
  }
};

export default getters;
{% /code %}

You can provide as many middleware functions as you'd like on a getter or setter, but it's important to be mindful of your middleware's effect on response performance. It's recommended to only use middleware when absolutely necessary to avoid surprise bottlenecks for your users.

## API

### Definition

{% code theme="light" %}
middleware: [function];
{% /code %}

### Parameters

{% parameters %}
{
  "middleware": {
    "type": "array[function]",
    "required": false,
    "description": "An array of Express middleware functions to execute in order before the getter or setter is run. Each middleware function receives (req, res, next) as arguments."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Sanitization
description: How to sanitize API responses globally or per getter/setter to help secure user-generated content.
---

For security purposes, if your app manages a lot of user generated content, it's wise to add HTML sanitization to your API. Sanitization is the process of scrubbing unexpected or unwanted HTML tags from the values returned by your API. In Joystick, sanitization can be handled automatically on a global basis, or, on a per-getter or per-setter basis.

{% alert theme="warning" icon="triangle-alert" title="Use With Caution" %}
It's important to note that sanitization, while helpful, is not a bulletproof solution. Depending on the data returned by your API, you can run into unexpected formatting and rendering bugs. When developing, be mindful of how the data you're returning will be used in your UI to avoid surprises.
{% /alert %}

## Example Usage

### Global Sanitization

To enable global sanitization, in your API schema at `/api/index.js`, set the `sanitize` option to `true`:

{% code theme="light" title="api/index.js" %}
const api = {
  sanitize: true,
  getters: { ... },
  setters: { ... }
};

export default api;
{% /code %}

### Getter/Setter Specific Sanitization

To enable getter/setter specific sanitization, on your getter or setter definition, set the `sanitize` option to `true`:

{% code theme="light" title="api/posts/getters.js" %}
const getters = {
  posts: {
    sanitize: true,
    authorized: (input = {}, context = {}) => {
      return !!context.user;
    },
    get: async (input = {}, context = {}) => {
      return process.databases.mongodb.collection('posts').find({
        user_id: { $ne: context?.user?._id },
      });
    },
  }
};

export default getters;
{% /code %}

## API

### Definition

{% code theme="light" %}
api: {
  sanitize: boolean,
}
{% /code %}

### Parameters

{% parameters %}
{
  "sanitize": {
    "type": "boolean",
    "required": false,
    "description": "Enable or disable global HTML sanitization for all API responses."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Schema
description: How to register getters and setters for your app's API endpoints.
---

In order for getter and setter endpoints to function in your app, they need to be registered via your app's API schema (located at `/api/index.js`).

## Example Usage

{% code theme="light" title="api/index.js" %}
import book_getters from './books/getters.js';
import book_setters from './books/setters.js';

const api = {
  getters: {
    ...book_getters,
  },
  setters: {
    ...book_setters,
  }
};

export default api;
{% /code %}

The recommended pattern for defining getters and setters is to follow a folder structure like `/api/<topic>/getters.js` or `/api/<topic>/setters.js`. From those files, we assume that the default export of an object containing all of the getters or setters for a topic will be available.

Importing these files into your API schema at `/api/index.js`, we can register these by passing their contents to the appropriate group under the `api` object exported from `/api/index.js`.

Above, we import our `book_getters` object from `/api/books/getters.js` and then use the JavaScript spread `...` syntax to "unpack" the object we anticipate being exported from that file on to the `api.getters` object. Conversely, we follow the exact same process for our setters, "unpacking" our imported `book_setters` on to the `api.setters` object.

## API

### Definition

{% code theme="light" %}
api: {
  getters: object,
  setters: object,
}
{% /code %}

### Parameters

{% parameters %}
{
  "getters": {
    "type": "object",
    "required": false,
    "description": "An object containing all registered getter endpoints for your app. Each key is the name of a getter, and each value is a getter definition object."
  },
  "setters": {
    "type": "object",
    "required": false,
    "description": "An object containing all registered setter endpoints for your app. Each key is the name of a setter, and each value is a setter definition object."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Setters
description: Learn how to define and use setters for writing data in Joystick apps.
---

As the name implies, in a Joystick app, a setter is a way to "set" data on/to a data source. Typically that data source is a database, but it could also be a third-party API, a static file, etc. Ultimately, a setter is nothing more than a function being called with some helpful utilities and context added.

{% alert icon="route" theme="info" title="Setters are HTTP POST Routes" %}
While they may not look like it syntactically, behind the scenes, setters are registered as HTTP POST routes via Express (following the pattern <code>/api/_setters/&lt;setter_name&gt;</code>).
{% /alert %}

It's recommended that setters are organized in your `/api` folder, in sub-directories with names related to the data being modified. For example, if we had a collection/table in our database called `books`, we'd want to define a folder like `/api/books`. Inside of that folder, we'd create a file for our setters at `/api/books/setters.js`, exporting an object from that file with all of our book-related setter definitions.

## Example Usage

### Defining a Setter

Following the above example, let's define a setter for adding some books to our database.

{% code theme="light" title="api/books/setters.js" %}
import joystick from '@joystick.js/node';

const setters = {
  create_book: {
    set: () => {
      return process.databases.mongodb.collection('books').insertOne({
        _id: joystick.id(),
        title: 'Example Book',
        author: 'Example Author',
      });
    }
  }
};

export default setters;
{% /code %}

Above, we've defined a simple setter `create_book`. To do it, we assign `create_book` as a key on a parent object containing all of our book-related setters. To that key, we've assigned another object with a single method `set()`: the function on our setter that's responsible for writing data.

In this example, we're calling to our database and inserting an example book.

{% alert icon="dices" theme="info" title="Random ID Generation" %}
To keep document/row IDs consistent in your database, it's recommended that you use Joystick's built-in <code>joystick.id()</code> method to generate IDs. IDs are generated by default as 16-character alphanumerical strings, but can have their length set by passing an <code>integer</code> value to the function like <code>joystick.id(32)</code>.
{% /alert %}

### Accessing Input and Context

When a setter is called (typically via the `set()` method imported from `@joystick.js/ui` or the `api.set()` method passed to a [component's data function](/joystick/ui/component/data)), `input` can be passed along with the request containing the data to insert, update, or use for determining what to update.

{% code theme="light" title="api/books/setters.js" %}
import joystick from '@joystick.js/node';

const setters = {
  create_book: {
    set: (input = {}) => {
      return process.databases.mongodb.collection('books').insertOne({
        _id: joystick.id(),
        title: input?.title,
        author: input?.author,
        category: input?.category,
      });
    }
  }
};

export default setters;
{% /code %}

If there's any `input` passed with a setter request, Joystick will pass it as the first argument to your `set()` function. Above, we anticipate a `title`, `author`, and `category` being passed in the `input` and utilize it in our database insert.

{% code theme="light" title="api/books/setters.js" %}
const setters = {
  create_book: {
    set: (input = {}, context = {}) => {
      return process.databases.mongodb.collection('books').insertOne({
        _id: joystick.id(),
        title: input?.title,
        author: input?.author,
        category: input?.category,
        owner: context?.user?._id,
      });
    }
  }
};

export default setters;
{% /code %}

In addition to `input`, as the second argument to your setter's `set()` function, a `context` object is passed with a few different sub-fields:

- `req` – The inbound HTTP request related to the setter request.
- `user` – If available, the currently logged-in user.
- `<database_provider>` – A connection to the database driver for one of your app's configured database providers (e.g., `context.mongodb` or `context.postgresql`).

Above, as an example, we've referenced the currently logged-in user's `_id` field (if our [user's database provider](/joystick/databases/users) was a SQL database like PostgreSQL, we'd reference `context.user.user_id`) on the `context` object.

## API

### Definition

{% code theme="light" %}
set(input: object, context: object) => any;
{% /code %}

### Parameters

{% parameters %}
{
  "input": {
    "type": "object",
    "required": false,
    "description": "If passed from the client, the input value for the setter request. Defaults to an empty object if nothing is passed."
  },
  "context": {
    "type": "object",
    "required": false,
    "description": "The context object automatically passed by Joystick containing the inbound HTTP request, user object (if available), and database provider connections (e.g., context.mongodb or context.postgresql)."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: joystick.app()
description: How to configure and start your Joystick app server with `joystick.app()`.
---

The heart of a Joystick app begins in the `/index.server.js` file at the root of your app. In development, when you run `joystick start`, Joystick will run this file with `node`, starting the Express HTTP server under the hood and instrumenting all of Joystick’s server-side features.  

By calling `joystick.app()` from the default export of `@joystick.js/node`, you can define your app server and configure its behavior.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': (req = {}, res = {}) => {
      res.send('Hello!');
    },
  },
});
{% /code %}

In this example, we define a single GET route at `/`. When the app server starts, Joystick initializes the HTTP server and sets up all configured routes and features.

## API

### Definition

{% code theme="light" %}
joystick.app(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "An object defining configuration options for `joystick.app()`.",
    "children": {
      "accounts": {
        "type": "object",
        "required": false,
        "description": "Configuration for Joystick’s user accounts APIs like [Validating Signup Metadata](/joystick/node/accounts/accounts-signup-metadata) and [Event Hooks](/joystick/node/accounts/accounts-events)."
      },
      "api": {
        "type": "object",
        "required": false,
        "description": "An object representing an [API schema](/joystick/node/api/schema) for the app."
      },
      "caches": {
        "type": "function",
        "required": false,
        "description": "A function that contains calls to [server-side caches](/joystick/node/cache) for your app. Run automatically by Joystick on app startup."
      },
      "cluster": {
        "type": "boolean",
        "required": false,
        "description": "Turn Node.js clustering on or off for your app. If turned on, Joystick will automatically fork your app process to match the number of processors on the host machine."
      },
      "cron_jobs": {
        "type": "object",
        "required": false,
        "description": "An object containing [cron job definitions](/joystick/node/cron-jobs/defining-cron-jobs) for the app."
      },
      "csp": {
        "type": "object",
        "required": false,
        "description": "An object containing [Content Security Policy (CSP) definitions](/joystick/node/content-security-policy)."
      },
      "events": {
        "type": "object",
        "required": false,
        "description": "An object containing [Node.js event listener methods](/joystick/node/node-js-events)."
      },
      "fixtures": {
        "type": "function",
        "required": false,
        "description": "A function called after databases are connected to define [database fixtures](/joystick/node/fixtures)."
      },
      "indexes": {
        "type": "function",
        "required": false,
        "description": "A function called after databases are connected to define [database indexes](/joystick/node/database-indexes)."
      },
      "middleware": {
        "type": "array[function]",
        "required": false,
        "description": "An array of [middleware functions](/joystick/node/middleware) for the app."
      },
      "queues": {
        "type": "object",
        "required": false,
        "description": "An object containing [queue definitions](/joystick/node/queues/defining-queues) for the app."
      },
      "routes": {
        "type": "object",
        "required": true,
        "description": "An object containing [route definitions](/joystick/node/routes/basic-routes) for the app."
      },
      "uploaders": {
        "type": "object",
        "required": false,
        "description": "An object containing [uploader definitions](/joystick/node/uploads/defining-an-uploader) for the app."
      },
      "websockets": {
        "type": "object",
        "required": false,
        "description": "An object containing [WebSocket server definitions](/joystick/node/websockets/defining-a-server)."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Cache
description: A utility for creating and managing caches in Joystick apps with Redis support and TTL/LRU policies.
---

The `cache()` function in `@joystick.js/node` provides a simple API for managing caches on the server in your app. This utility is useful for temporarily storing data (e.g., frequently accessed records or ephemeral data) that you want to avoid repeatedly fetching or recalculating during runtime.

Caches automatically use **Redis** as the storage backend if Redis is configured with `cache: true` in your app's settings, otherwise they fall back to in-memory storage. Both backends support **TTL (Time To Live)** and **LRU (Least Recently Used)** eviction policies.

Caches can be defined anywhere on your server, however, the recommended approach is to store each cache definition as a single file in the `caches` folder at the root of your project and import them into your `index.server.js` file to pass to the `caches()` function passed to your `joystick.app()` via its options object.

## Example Usage

### Defining a cache

{% code theme="light" title="caches/example.js" %}
import { cache } from '@joystick.js/node';

const users_cache = cache('users');
{% /code %}

To define a cache, we import the named export `cache` from `@joystick.js/node` and then call it, passing the name of our `cache()`. In response, we get a cache instance with a few different methods for managing the cache.

### Setting a cache

{% code theme="light" title="caches/example.js" %}
import { cache } from '@joystick.js/node';

const users_cache = cache('users');

users_cache.set([
  { id: '1', name: 'Alice', role: 'admin' },
  { id: '2', name: 'Bob', role: 'editor' },
]);
{% /code %}

Above, to set a default value for a cache (or overwrite the entirety of an existing cache), we can use the `cache.set()` method. To it, we pass an array of objects representing the new value we want to set for the cache.

### Finding one or all items in a cache

{% code theme="light" title="caches/example.js" %}
import { cache } from '@joystick.js/node';

const users_cache = cache('users');

// Find all users
const all_users = users_cache.find();

// Find users with role 'editor'
const editors = users_cache.find(['role', 'editor']);

// Find a single user by ID
const user = users_cache.find_one(['id', '2']);
{% /code %}

Above, we call `.find()` on a cache to return the full, current cache. To find items matching a specific query, we can call `.find()` passing an array where the first element is the name of the field on the cache item we want to match and the second element is the value _for_ the field on the cache itme we want to match. If we want a single, specific item, we can use the `.find_one()` method, using the same array-based querying.

### Updating a cache

{% code theme="light" title="caches/example.js" %}
import { cache } from '@joystick.js/node';

const users_cache = cache('users');

users_cache.update(['id', '2'], { role: 'superadmin' });
{% /code %}

Above, we update a specific item in the cache, first passing an array-style query like we use with the `.find()` method and then as the second argument, an object containing the modifications we'd like to make to the cache item matching the query passed as the first argument.

### Removing items from a cache

{% code theme="light" title="caches/example.js" %}
import { cache } from '@joystick.js/node';

const users_cache = cache('users');

users_cache.remove(['id', '1']);
{% /code %}

To remove a specific item(s) from the cache, again, we deploy the array-style query syntax we used with the other methods above. **Note:** this will remove _any_ cache items matching the query, not just the first one to match.

## Redis Support

Caches automatically use Redis as the storage backend when Redis is configured in your app's settings with `cache: true`. This provides several benefits:

- **Shared across processes**: Multiple app instances can share the same cache
- **Persistent**: Cache survives app restarts
- **Efficient**: Uses Redis native data structures for optimal performance

### Configuring Redis for caching

{% code theme="light" title="settings.development.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "redis",
        "cache": true,
        "options": {}
      }
    ]
  }
}
{% /code %}

## TTL and LRU Policies

Both in-memory and Redis caches support Time To Live (TTL) and Least Recently Used (LRU) eviction policies:

### TTL (Time To Live)

Items automatically expire after the specified time:

{% code theme="light" title="caches/session.js" %}
import { cache } from '@joystick.js/node';

// Items expire after 5 minutes (300 seconds)
const session_cache = cache('sessions', { ttl: 300 });

session_cache.add({ user_id: '123', token: 'abc...' });
// Item will be automatically removed after 5 minutes
{% /code %}

### LRU (Least Recently Used)

Cache maintains a maximum number of items, removing the least recently accessed:

{% code theme="light" title="caches/users.js" %}
import { cache } from '@joystick.js/node';

// Keep maximum 1000 items, remove oldest when exceeded
const user_cache = cache('users', { max_items: 1000 });

user_cache.add({ id: '1', name: 'Alice' });
// When 1001st item is added, least recently used item is removed
{% /code %}

### Combining TTL and LRU

{% code theme="light" title="caches/api_responses.js" %}
import { cache } from '@joystick.js/node';

// Items expire after 10 minutes AND keep max 500 items
const api_cache = cache('api_responses', { 
  ttl: 600,        // 10 minutes
  max_items: 500   // Maximum 500 items
});

api_cache.add({ endpoint: '/users', data: [...] });
// Item will be removed after 10 minutes OR when LRU limit is exceeded
{% /code %}

### How LRU tracking works

- Items are marked as "accessed" when retrieved via `find()` or `find_one()`
- Items are marked as "accessed" when updated via `update()`
- When `max_items` is exceeded, the least recently accessed items are removed first
- **Redis**: Uses sorted sets for efficient LRU tracking
- **In-memory**: Uses timestamps for LRU tracking

## API

### cache()

{% code theme="light" %}
cache(cache_name: string, options?: object) => object
{% /code %}

#### Parameters

{% parameters %}
{
  "cache_name": {
    "type": "string",
    "required": true,
    "description": "A string to uniquely identify the cache in `process.caches`. Used as the key to store and retrieve cache data."
  },
  "options": {
    "type": "object",
    "required": false,
    "description": "Optional configuration object for TTL and LRU policies.",
    "properties": {
      "ttl": {
        "type": "number",
        "required": false,
        "description": "Time to live in seconds. Items will automatically expire after this duration."
      },
      "max_items": {
        "type": "number", 
        "required": false,
        "description": "Maximum number of items to keep in cache. When exceeded, least recently used items are removed."
      }
    }
  }
}
{% /parameters %}

### cache.add()

{% code theme="light" %}
cache.add(cache_item: object) => void
{% /code %}

#### Parameters

{% parameters %}
{
  "cache_item": {
    "type": "object",
    "required": true,
    "description": "The object to add to the cache array."
  }
}
{% /parameters %}

### cache.find()

{% code theme="light" %}
cache.find(query_array: [string, any]) => array
{% /code %}

#### Parameters

{% parameters %}
{
  "query_array": {
    "type": "array",
    "required": false,
    "description": "An array with two elements: `[key, value]`. Only cache items matching this key/value pair will be returned. If omitted, all items in the cache are returned."
  }
}
{% /parameters %}

### cache.find_one()

{% code theme="light" %}
cache.find_one(query_array: [string, any]) => object|null
{% /code %}

#### Parameters

{% parameters %}
{
  "query_array": {
    "type": "array",
    "required": false,
    "description": "An array with two elements: `[key, value]`. Only the first cache item matching this key/value pair will be returned. If omitted, returns `null`."
  }
}
{% /parameters %}

### cache.set()

{% code theme="light" %}
cache.set(cache_array: array) => void
{% /code %}

#### Parameters

{% parameters %}
{
  "cache_array": {
    "type": "array",
    "required": true,
    "description": "An array of objects to set as the entire cache contents. Overwrites any existing cache data."
  }
}
{% /parameters %}

### cache.update()

{% code theme="light" %}
cache.update(match_array: [string, any], replacement_item: object) => void
{% /code %}

#### Parameters

{% parameters %}
{
  "match_array": {
    "type": "array",
    "required": true,
    "description": "An array with two elements: `[key_to_match, value_to_match]`. Identifies the cache item to update."
  },
  "replacement_item": {
    "type": "object",
    "required": true,
    "description": "The object to merge into the matched cache item."
  }
}
{% /parameters %}

### cache.remove()

{% code theme="light" %}
cache.remove(match_array: [string, any]) => void
{% /code %}

#### Parameters

{% parameters %}
{
  "match_array": {
    "type": "array",
    "required": true,
    "description": "An array with two elements: `[key_to_match, value_to_match]`. Identifies the cache items to remove."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Cluster
description: How to enable cluster mode in Joystick to fully utilize the processing power of your app's host machine.
---

In Node.js, the [cluster](https://nodejs.org/api/cluster.html) library makes it possible to "fork" your main Node.js process and creat copies of it equal to the number of processor cores on the machine running your app.

So, if we run our app on a single core machine, we'll get a single process. If we run our app on an 8 core machine, we'll get eight processes.

As a convenience, Joystick includes a simple `cluster` option that you can pass alongside your other `joystick.app()` options to enable cluster mode.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  cluster: true,
  ...
});
{% /code %}

Here, we add the `cluster` option to our `joystick.app()` options and set it to `true`. Now, when our app starts (or restarts), Joystick will detect the number of CPU cores available on the machine and fork the main process to match this count.
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Defining Cron Jobs
description: Learn how to define and use cron jobs in Joystick apps for recurring tasks.
---

To run recurring tasks in your app, cron jobs can be defined as part of the `joystick.app()` startup process. Cron jobs should live in the `/cron_jobs` folder (alias: `cronJobs`) at the root of your app.

If your app requires a significant number of cron jobs, it's recommended to split them into individual files and then import them into a `/cron_jobs/index.js` file and combine them together using a JavaScript spread `...`.

## Example Usage

### Defining a Cron Job

{% code theme="light" title="cron_jobs/index.js" %}
import fetch from 'node-fetch';
import fs from 'fs';

const EVERY_TWELVE_HOURS = '0 */12 * * *';
const { writeFile } = fs.promises;

const cron_jobs = {
  update_usd_to_eur_exchange_rate: {
    log_at_run_time: 'Updating USD -> EUR exchange rate...',
    schedule: EVERY_TWELVE_HOURS,
    run: async () => {
      const usd_to_eur_rate = await fetch('https://exchange-rates.imaginary-api.com?from=usd&to=eur').then((response) => {
        return response.json();
      });
      
      await writeFile('lib/exchange_rates/usd_to_eur.json', JSON.stringify(usd_to_eur_rate));
    },
  },
};

export default cron_jobs;
{% /code %}

A cron job is defined as a key/value pair on an object where the **key** name is the name of the cron job and the **value** is an object defining the cron job.

Above, we've defined a cron job `update_usd_to_eur_exchange_rate` with three options:

1. **`log_at_run_time`** – A `string` we want to log to our server logs every time the cron job runs.
2. **`schedule`** – [A crontab string](https://crontab.guru/examples.html) defining the schedule for the cron job.
3. **`run`** – A `function` that's called for each "tick" or run of the cron job.

In order for a cron job to run, it must be [registered via the options you pass to `joystick.app()`](/joystick/node/cron-jobs/registering-cron-jobs).

## API

### Definition

{% code theme="light" %}
cron_jobs: {
  cron_job_name: {
    log_at_run_time: string,
    schedule: string,
    run: () => void
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "log_at_run_time": {
    "type": "string",
    "required": false,
    "description": "A message to log in your server logs each time the cron job runs."
  },
  "schedule": {
    "type": "string",
    "required": true,
    "description": "A crontab-formatted string that defines the schedule for the cron job (e.g., '0 */12 * * *')."
  },
  "run": {
    "type": "function",
    "required": true,
    "description": "The function that runs when the cron job is triggered."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Registering Cron Jobs
description: Learn how to register cron jobs in Joystick apps using `joystick.app()`.
---

In order to register cron jobs, they need to be passed via the options you pass to `joystick.app()`.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';
import cron_jobs from './cron_jobs/index.js';

joystick.app({
  cron_jobs,
  routes: { ... }
});
{% /code %}

Above, we've imported an assumed file containing all of our cron jobs from `/cron_jobs/index.js`. We expect that file to have a default export of [an object containing all of our cron job definitions](/joystick/node/cron-jobs/defining-cron-jobs).

## API

### Definition

{% code theme="light" %}
joystick.app({
  cron_jobs: {
    cron_job_name: {
      log_at_run_time: string,
      schedule: string,
      run: () => void
    }
  }
})
{% /code %}

### Parameters

{% parameters %}
{
  "cron_jobs": {
    "type": "object",
    "required": false,
    "description": "An object containing your cron job definitions. Each key is the cron job name and its value is an object defining that cron job's options and run logic."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Content Security Policy (CSP)
description: How to configure CSP headers for securing your Joystick app.
---

To aid in the process of securing against Cross-Site Scripting Attacks (XSS), Joystick offers a thin abstraction around Content-Security Policy (CSP), making it easy to define and set directives for the `Content-Security-Policy` header. Joystick implements this as middleware that applies to all requests. CSP is [a standard approach in browsers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) for specifying which origins are allowed to load content on your site.

In your app, CSP directives are defined via the `csp` object passed as part of the options to `joystick.app()`.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  csp: {
    directives: {
      'font-src': ['fonts.gstatic.com'],
      'style-src': ['fonts.googleapis.com'],
    },
  },
});
{% /code %}

Above, we're adding two CSP directives—`font-src` and `style-src`—and assigning both an array containing strings for origins we want to allow to load those specific source types. Here, our example is for allowing the CDN-hosted version of Google Fonts on our page. If we were to omit these origins, assuming we were using a Google Fonts CDN link somewhere in our site, on page load the browser would block those URLs and our fonts would not work (only if the `csp` option is passed to our `joystick.app()` options—if not, the URLs would not be blocked).

{% alert icon="triangle-alert" theme="info" title="'self' is included automatically" %}
By default, Joystick automatically adds <code>'self'</code> to the origins array for all directives (meaning, you're only responsible for specifying origins <em>outside</em> of your app's current origin).
{% /alert %}

### Unrestricted Origins

When you add one or more Content Security Policy (CSP) directives, Joystick will automatically enable _all_ CSP directives available. By default, for all directives, the only origin specified is `'self'` (the current domain). Beyond this, you will need to specify which origins/domains are allowed to have their content loaded on the page.

To avoid the tedium of doing so, for trusted domains (e.g., `google.com`), the `csp.unrestricted_origins` array can be utilized. Any domain/origin added to this array is automatically added to _all_ CSP directives for your app.

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  csp: {
    unrestricted_origins: ['fonts.gstatic.com', 'fonts.googleapis.com'],
    directives: {
      ...
    },
  },
});
{% /code %}

## API Reference

### Definition

{% code theme="light" %}
{
  csp: {
    unrestricted_origins: array[string],
    directives: object,
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "unrestricted_origins": {
    "type": "array[string]",
    "required": false,
    "description": "An array of strings specifying origins (domains) that should not have any of their URLs restricted by the Content Security Policy."
  },
  "directives": {
    "type": "object",
    "required": false,
    "description": "An object containing key/value pairs where the key is the name of a Content Security Policy directive and the value is an array of strings specifying origins allowed for that type of URL."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: CSRF Protection
description: How Joystick protects against Cross-Site Request Forgery (CSRF) attacks.
---

{% alert theme="warning" icon="triangle-alert" title="Only Applies to Joystick Versions Up To 1.0.0-rc.1" %}
Prior to Joystick v1.0.0-rc.2, CSRF protection required database-based sessions. This is now managed 100% via cookies and does not require a database.
{% /alert %}

Cross-Site Request Forgery (CSRF) attacks involve an attacker creating a fake URL that points to your domain and sending it to your users. When a logged-in user clicks that link, actions will proceed as if the user originated them (e.g., calling a [setter](/joystick/api/node/setters) with malicious parameters).

To enable CSRF protection in your Joystick app, set the `config.sessions.secret` in your `settings.<env>.json` file to a difficult to guess string.

To generate a secret, we recommend using the following command in your terminal:

{% code theme="light" title="Terminal" %}
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
{% /code %}

This will generate a secure 32-bit hex string (64 characters). **Keep in mind**: this value should NOT be stored in an unsafe location. Copy it to your `settings.<env>.json` file and/or into a password manager.

Once you have your secret, update your `settings.<env>.json` file:

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    "sessions": {
      "secret": "<Paste your generated secret here...>"
    },
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Once added, Joystick will detect it and automatically create a session cookie (HTTP-only, inaccessible from the browser) that the server can validate alongside API requests ([getters](/joystick/node/api/getters) and [setters](/joystick/node/api/setters)).

When you call [getters](/joystick/api/node/getters) or [setters](/joystick/api/node/setters), Joystick automatically validates the CSRF token included in the session cookie. If it's a match, the request proceeds; if not, the request receives a `403 Forbidden` error.

{% alert icon="shield-check" theme="info" title="Query params sanitized" %}
To protect against scripts being executed via query params, Joystick automatically sanitizes HTML tags from query params passed in your app's URL. This prevents any vulnerability with the above approach, making it impossible for an attacker to read the <code>csrf</code> token Joystick injects into the page.
{% /alert %}

---
category: "@joystick.js/node"
title: Database Indexes
description: How to create database indexes in your Joystick app using the indexes() hook.
---

To aid in the process of creating indexes for your app's database, Joystick includes support for a special hook function `indexes()` passed via the options object passed to `joystick.app()`.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  indexes: () => {
    // Run your indexes here...
  },
});
{% /code %}

Inside of the function, database indexes can be created by calling the appropriate query functions for your app's databases (see below). If your app has a large number of indexes, it's recommended that you store them in the `/indexes` folder at the root of your app, creating one file per collection/table (each file should export a function that can be called inside of the `indexes()` function showcased above).

### Creating MongoDB Indexes

While Joystick itself does not include any helpers for creating MongoDB indexes, indexes can easily be created directly via the MongoDB driver:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  indexes: async () => {
    await process.databases.mongodb.collection('posts').createIndex({ slug: 1 });
    await process.databases.mongodb.collection('posts').createIndex({ title: 1 });
  },
});
{% /code %}

To learn more about creating indexes for MongoDB, [read the official documentation](https://www.mongodb.com/docs/manual/indexes/).

### Creating PostgreSQL Indexes

While Joystick itself does not include any helpers for creating PostgreSQL indexes, indexes can easily be created directly via the PostgreSQL driver:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  indexes: async () => {
    await process.databases.postgresql.query(`CREATE INDEX IF NOT EXISTS posts_slug ON posts(slug)`);
    await process.databases.postgresql.query(`CREATE INDEX IF NOT EXISTS posts_slug ON posts(title)`);
  },
});
{% /code %}

To learn more about creating indexes for PostgreSQL, [read the official documentation](https://www.postgresql.org/docs/current/indexes.html).

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Accounts Emails
description: How Joystick's built-in accounts emails work.
---

When utilizing the [accounts.recover_password()](/joystick/ui/accounts/recover-password) method, Joystick will attempt to use a pre-defined template (as a Joystick component) at the path `email/reset_password.js`.

If a template is defined, Joystick will use this instead of just printing the reset password URL to your server console.

## Example Usage

At a minimum, your custom `email/reset_password.js` template should include a link pointing to the value of `props.url`:

{% code theme="light" title="emails/reset_password.js" %}
import joystick from '@joystick.js/ui';

const ResetPassword = joystick.component({
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div>
        <p>A reset password request has been generated for this email (${props?.email_address}). To reset your password, click the link below. If you did not request this reset, ignore this email.</p>
        <a href="${props?.url}">Reset Password</a>
      </div>
    `;
  },
});

export default ResetPassword;
{% /code %}
---
category: "@joystick.js/node"
title: Base Email Templates
description: How to configure base HTML and CSS templates for your emails in Joystick.
---

When sending email, all HTML email starts with a base template. A base template is a plain HTML file and a plain CSS file that create a standardized structure for all emails.  

For individual emails, we [define templates using Joystick components](/joystick/node/email/defining-email-templates). At send time, Joystick injects an email template into the base template.  

Base templates are similar to Joystick layout components in that they include elements and styles common to all emails (e.g., a header, a footer, etc).  

By default, Joystick looks for a base HTML template at `/email/base.html` and a base CSS template at `/email/base.css`. These files are created automatically when you run `joystick create <app_name>`.

## Example Usage

### Base HTML Template

{% code theme="light" title="/email/base.html" %}
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;${subject}&lt;/title&gt;
    ${css}
  &lt;/head&gt;
  &lt;body&gt;
    &lt;span class="preheader"&gt;${preheader}&lt;/span&gt;
    &lt;div id="email"&gt;&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
{% /code %}

### Required Tags in base.html

- `${subject}`: Populated with the `subject` value passed to `email.send()` when sending an email.  
- `${css}`: Where Joystick injects styles from your email template components (and any child components).  
- `${preheader}`: Populated with the `preheader` value passed to `email.send()` if defined (this is the preview text shown in email clients).  
- `<div id="email"></div>`: Where Joystick injects the rendered HTML for your email template.  

Beyond these required tags, your base HTML template can include any other HTML you need.

## Custom Base Templates

While it’s recommended to stick with a single base template, multiple base templates can be useful for separating marketing emails from transactional emails.  

Joystick supports custom base HTML and CSS templates using the naming convention `base_<custom_template_name>.html` and `base_<custom_template_name>.css`.

To use a custom base template, call `email.send()` and pass the `base` option set to your custom template name:  

{% code theme="light" %}
email.send({
  base: 'marketing',
});
{% /code %}

Here, Joystick will use `base_marketing.html` and `base_marketing.css`.  

If the `base` option is omitted, Joystick defaults to `base.html` and `base.css` in the `/email` folder.

---
category: "@joystick.js/node"
title: Configuring Sends
description: How to configure email sending via your `settings.<env>.json` file.
---

To send email with Joystick, you will need to configure an SMTP provider in your `settings.<env>.json` file.

## Example Usage

{% code theme="light" title="settings.&lt;env&gt;.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "options": {}
      }
    ],
    "i18n": {
      "defaultLanguage": "en-US"
    },
    "middleware": {},
    "email": {
      "from": "<default_from_email_address>",
      "smtp": {
        "host": "<smtp_host>",
        "port": 587,
        "username": "<smtp_username>",
        "password": "<smtp_password>"
      }
    }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Above, we add an `email` parameter to the existing `config` object in our `settings.<env>.json` file. Here, we can configure:

- `from` - The default email address that emails will be sent from if a `from` address is not provided at send time.  
- `smtp.host` - The hostname for your SMTP service.  
- `smtp.port` - The port for your SMTP service (defaults to 587 for TLS).  
- `smtp.username` - The username for your SMTP service.  
- `smtp.password` - The password for your SMTP service.  

If set to a valid SMTP provider, emails sent via calls to `email.send()` will be relayed through this SMTP server.

## API

### Definition

{% code theme="light" %}
email: {
  from: string,
  smtp: {
    host: string,
    port: number,
    username: string,
    password: string
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "from": {
    "type": "string",
    "required": true,
    "description": "The default email address that emails will be sent from if no `from` address is provided at send time."
  },
  "smtp": {
    "type": "object",
    "required": true,
    "description": "SMTP configuration for sending email.",
    "children": {
      "host": {
        "type": "string",
        "required": true,
        "description": "The hostname for your SMTP server."
      },
      "port": {
        "type": "number",
        "required": true,
        "description": "The port number for your SMTP server (commonly 587 for TLS or 465 for SSL)."
      },
      "username": {
        "type": "string",
        "required": true,
        "description": "The username to authenticate with your SMTP server."
      },
      "password": {
        "type": "string",
        "required": true,
        "description": "The password to authenticate with your SMTP server."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: email.send()
description: How to send emails in Joystick using the `email.send()` method.
---

To send an email, use the `email.send()` method, available via the named export `email` from `@joystick.js/node`.

## Example Usage

{% code theme="light" title="/api/messages/setters.js" %}
import joystick, { email } from '@joystick.js/node';

const setters = {
  send_message: {
    input: {
      user_id: {
        type: 'string',
        required: true,
      },
      message: {
        type: 'string', 
        required: true,
      },
    },
    set: async (input = {}) => {
      const message_id = joystick.id();

      await process.databases.mongodb.collection('messages').insertOne({
        _id: message_id,
        recipient: input?.user_id,
        message: input?.message,
      });

      const recipient_user = await process.databases.mongodb.collection('users').findOne({
        _id: input?.user_id,
      });

      await email.send({
        to: recipient_user?.emailAddress,
        from: 'notifications@app.com',
        subject: `You received a new message from ${context?.user?.username}!`,
        base: 'user_messages',
        template: 'new_message',
        preheader: `${context?.user?.username} says "${input?.message}"`,
        props: {
          message_id,
          sender: context?.user?.username,
        },
        attachments: [
          { filename: 'message.txt', content: input?.message },
        ],
      });
    },
  },
};

export default setters;
{% /code %}

In the example above, we create a [setter](/joystick/node/api/setters) for sending messages between users. After saving the message to the database, we retrieve the recipient’s email and use `email.send()` to notify them.  

The `to`, `from`, `subject`, and `template` fields are required when calling `email.send()`.

## API

### Definition

{% code theme="light" %}
email.send(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "The options object defining the email to send.",
    "children": {
      "to": {
        "type": "string",
        "required": true,
        "description": "The recipient address for the email being sent."
      },
      "from": {
        "type": "string",
        "required": true,
        "description": "The sender address for the email being sent."
      },
      "subject": {
        "type": "string",
        "required": true,
        "description": "The subject for the email being sent."
      },
      "base": {
        "type": "string",
        "required": false,
        "description": "The name of the [base template](/joystick/node/email/defining-a-base-template) relative to the `/email` directory. The `.html` suffix is assumed."
      },
      "template": {
        "type": "string",
        "required": true,
        "description": "The name of the [email template](/joystick/node/email/defining-email-templates) relative to the `/email` directory. The `.js` suffix is assumed."
      },
      "preheader": {
        "type": "string",
        "required": false,
        "description": "Text shown as the preview line in a recipient’s inbox."
      },
      "props": {
        "type": "object",
        "required": false,
        "description": "Key/value pairs passed as props to the email template."
      },
      "attachments": {
        "type": "array[object]",
        "required": false,
        "description": "An array of attachment objects, following the [Nodemailer attachments](https://nodemailer.com/message/attachments/) specification."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Defining Email Templates
description: How to create and use email templates in Joystick.
---

Email templates in Joystick are just Joystick components. The only difference between a Joystick component intended for email vs. the UI is the level of interactivity we expect. Features like state and DOM events are ignored in a component purposed as an email template, but basic features like rendering HTML, defining CSS, and using custom methods work as expected.

To define an email template, create a file in the `/email` folder with the name of a template like `/email/welcome.js`.

## Example Usage

### Defining an Email Template

{% code theme="light" title="/email/welcome.js" %}
import joystick from '@joystick.js/ui';

const Welcome = joystick.component({
  css: `
    p {
      font-size: 16px;
      line-height: 24px;
      color: #333;
    }

    ul li a {
      color: red;
    }
  `,
  render: ({ props }) => {
    return `
      <div>
        <p>Hey, ${props.username}!</p>
        <p>Thanks for signing up for our app. To get up to speed we recommended checking out the following resources:</p>
        <ul>
          <li><a href="https://app.com/docs/getting-started">Getting Started</a></li>
          <li><a href="https://app.com/docs/sending-a-message">Sending a Message</a></li>
          <li><a href="https://app.com/docs/following-users">Following Users</a></li>
        </ul>
        <p>We want you to feel right at home, so if you ever get confused, feel free to hit reply on this email and we'll help you out!</p>
        <p>Welcome,<br /> The App Team</p>
      </div>
    `;
  },
});
{% /code %}

### Sending an Email with a Template

{% code theme="light" %}
email.send({
  template: 'welcome',
  props: {
    username: '@example_user',
  },
});
{% /code %}

In the template component above, we expect `props.username` to be defined. When calling `email.send()`, we can pass any `props` we’d like delivered to our template.  

Behind the scenes, Joystick automatically:  
- Renders the component to HTML.  
- Compiles any CSS and injects it into the `<head></head>` of the [base template](/joystick/node/email/defining-a-base-template).  
- Attempts to auto-inline CSS directly into the HTML for better email client compatibility.  

## Internationalization (i18n)

Similar to Joystick components in the UI, we can define translations for emails. Translations are stored in the `/i18n/email` folder and use the naming convention `<template_name>_<iso_language_code>.js`, like `welcome_en-US.js` or `welcome_es-ES.js`.

### Defining Translations

{% code theme="light" title="/i18n/email/welcome_en-US.js" %}
const en_US = {
  hey: 'Hey',
  thanks_for_signing_up: 'Thanks for signing up for our app. To get up to speed we recommended checking out the following resources:',
};

export default en_US;
{% /code %}

### Using Translations in an Email Template

{% code theme="light" title="/email/welcome.js" %}
import joystick from '@joystick.js/ui';

const Welcome = joystick.component({
  css: `...`,
  render: ({ props, i18n }) => {
    return `
      <div>
        <p>${i18n('hey')}, ${props.username}!</p>
        <p>${i18n('thanks_for_signing_up')}</p>
        ...
      </div>
    `;
  },
});
{% /code %}

---
category: "@joystick.js/node"
title: escape_html()
description: Escaping HTML in your Joystick app using the built-in utility.
---

While the recommended way to escape HTML is to use one of the [built-in output sanitization options in the API](/joystick/node/api/sanitization), for convenience, `@joystick.js/node` offers a standalone named export of its HTML escaping function.

## Example Usage

{% code theme="light" title="/api/products/getters.js" %}
import joystick, { escape_html } from '@joystick.js/node';

const getters = {
  input: {
    product_id: {
      type: 'string',
      required: true,
    },
  },
  get: async (input = {}) => {
    const product = await process.databases.mongodb.collection('products').findOne({
      _id: input?.product_id,
    });
    
    return {
      ...product,
      title: escape_html(product?.title || ''),
      description: escape_html(product?.description || ''),
    }
  },
};

export default getters;
{% /code %}

The `escape_html()` method is helpful for escaping previously-stored user input at retrieval time. This process ensures that once your data is returned to the client and rendered, any malicious code embedded in the data has been sanitized and made safe for display.

---
category: "@joystick.js/node"
title: Fixtures
description: How to define and run fixtures for seeding data in your Joystick app.
---

To create test data for your app, Joystick includes a function exported as a named export from `@joystick.js/node` as `fixture`. The `fixture` function itself returns another function you can call via the `fixtures` function assigned to the options you pass to `joystick.app()` in your `index.server.js` file.

## Example Usage

### Defining a fixture

Fixtures should be defined in the `/fixtures` folder at the root of your app. Inside that folder, a file should be created for each fixture in your app with a name describing the target (e.g., a collection name in a MongoDB database or a table name in a PostgreSQL database like `/fixtures/books.js`).

{% code theme="light" title="/fixtures/books.js" %}
import joystick, { fixture } from "@joystick.js/node";
import { faker } from '@faker-js/faker';
import random_book_title from '../lib/random_book.js';

const books = fixture({
  target: "books",
  quantity: 25,
  template: (fixture = {}, index = 0, input = {}) => {
    return {
      _id: joystick.id(),
      title: random_book_title(),
      author: faker.person.fullName(),
    };
  },
  skip: async (fixture = {}, input = {}) => {
    const total = await process.databases.mongodb.collection(fixture?.options?.target).countDocuments({});
    return total >= fixture?.options?.quantity;
  },
  on_create: async (
    fixture = {},
    data_to_create = [],
    on_after_create_each = null,
  ) => {
    await process.databases.mongodb.collection(fixture?.options?.target).bulkWrite(
      data_to_create.map((book) => {
        return {
          insertOne: book,
        };
      })
    );
  },
  on_after_create_all: (fixture = {}, data_to_create = [], input = {}) => {
    console.log(`Fixture created ${data_to_create.length} books.`);
  },
});

export default books;
{% /code %}

### Calling a fixture

To call a fixture, import it into your `index.server.js` file and then call the function returned by `fixture` inside of the function you pass to `fixtures` in your `joystick.app()` options:

{% code theme="light" title="/index.server.js" %}
import joystick from "@joystick.js/node";
import books_fixture from './fixtures/books.js';

joystick.app({
  fixtures: () => {
    books_fixture();
  },
  routes: { ... }
});
{% /code %}

When your app starts, after a connection has been established to each of your databases, Joystick will call the `fixtures()` function passed to `joystick.app()` above, triggering a run of any fixtures called within it.

## API

#### Definition

{% code theme="light" %}
fixture(options: object) => function;
{% /code %}

#### Parameters

{% parameters %}
{
  "target": {
    "type": "string",
    "required": true,
    "description": "A string containing the name of the intended target for the data (e.g., a MongoDB collection name or PostgreSQL table name)."
  },
  "quantity": {
    "type": "integer",
    "required": true,
    "description": "How many copies of the fixture template to generate."
  },
  "template": {
    "type": "function",
    "required": true,
    "description": "A function returning the data to create (e.g., an object of key/value pairs). Receives the fixture instance, the index for the current iteration, and any input provided when the fixture was invoked."
  },
  "skip": {
    "type": "function",
    "required": false,
    "description": "A function returning a boolean true or false that determines whether or not the fixture should run. Receives the fixture instance and any input provided when the fixture was invoked."
  },
  "on_create": {
    "type": "function",
    "required": true,
    "description": "A function called after the template function has been invoked quantity times. Handles inserting the data into the database or performing additional logic."
  },
  "on_after_create_each": {
    "type": "function",
    "required": false,
    "description": "A function called after each record is created. Useful for triggering additional fixtures or logic dependent on the inserted data."
  },
  "on_after_create_all": {
    "type": "function",
    "required": false,
    "description": "A function called after all records have been created. Useful for performing cleanup or triggering dependent fixtures."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Internationalization (i18n)
description: How to configure and use translations in Joystick apps.
---

As your app grows, it's wise to internationalize your UI (offer translations for other languages). To help with this, Joystick supports built-in translation support for pages rendered via the [res.render()](/joystick/node/routes/res-render) method.

## Storing translations

Translation files should be stored in the `/i18n` folder at the root of your app. Files should be named using a combination of the ISO-693 language code with the ISO-3166 country code (e.g., `en-US.js`, `de-DE.js`, `es-ES.js`, or `ja-JP.js`). This format matches [the standard used by browsers](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language).

An example `/i18n` folder might look like this:

{% code theme="light" title="/i18n folder structure" %}
/i18n
-- de-DE.js
-- en-GB.js
-- en-US.js
-- es-ES.js
-- jp-JP.js
{% /code %}

Above, we have translations for `German`, `English (Great Britain)`, `English (United States)`, `Spanish`, and `Japanese`.

## Loading translations

When you render a page via `res.render()`, Joystick will try to find a matching language file based on the following preference order:

1. The current user's (if available) `language` field value.
2. The browser's `navigator.language` value.
3. The `config.i18n.default_language` (alias: `config.i18n.defaultLanguage`) value.

If there's a matching language file in the `/i18n` folder, that file will be loaded automatically.

## Matching based on page path

After a language match is found, inside of a language file, Joystick will attempt to match a value on the object exported by the language file matching the path of the page being rendered. For example, if we have a call to `res.render()` like this:

{% code theme="light" title="Server-side render call" %}
res.render('ui/pages/profile/index.js');
{% /code %}

Joystick will try to find something like this in the matching language file:

{% code theme="light" title="/i18n/en-US.js" %}
const en_US = {
  'ui/pages/profile/index.js': {
    title: 'The Killer App the Internet Always Wanted'
  },
};

export default en_US;
{% /code %}

If there's a match, Joystick will load only the translations stored in the value of that key, ignoring the rest of the translation file. If a matching path _cannot_ be found, Joystick will fallback to loading the entire translation file.

## Example Usage

### Accessing translations in a component

Once a translation file is found, either the subset matching the page path or the entire translation file's contents are mapped over to the `window.__joystick_i18n__` value. Internally, `@joystick.js/ui` looks for this value at mount time and loads it into the `i18n` value for all components in the current tree.

Inside of a component, then, we can do something like this:

{% code theme="light" title="/ui/pages/profile/index.js" %}
import joystick from '@joystick.js/ui';

const Profile = joystick.component({
  css: { ... },
  render: ({ i18n }) => {
    return `
      <div class="page-profile">
        <div class="masthead">
          <h1>${i18n('title')}</h1>
        </div>
      </div>
    `;
  },
});

export default Profile;
{% /code %}

In the example above, because our example language file had a matching page path for `/ui/pages/profile/index.js`, we expect the value of that key in the language file to be loaded in the browser. Using the [`i18n()` render method](/joystick/ui/component/render#i18n), we pass the name of a key that we want to obtain the translation for _relative_ to that file.

When the above component is rendered, we'd expect to get back some HTML like this:

{% code theme="light" title="Rendered HTML" %}
<div class="page-profile">
  <div class="masthead">
    <h1>The Killer App the Internet Always Wanted</h1>
  </div>
</div>
{% /code %}

---
category: "@joystick.js/ui"
title: index.client.js
description: How to utilize the `index.client.js` file in your app.
---

At the root of your app, the `index.client.js` file created for you when you run `joystick create <app_name>` is intended to store all global, client-side JavaScript (e.g., analytics init functions, global library configs, etc.).

By default, this file is empty, but can be modified to include any global JavaScript that your app will need on the client.
---
category: "@joystick.js/ui"
title: index.css
description: How to configure and use the base CSS file for your Joystick app.
---

At the root of your app, the `index.css` file serves as the base CSS file for your entire app. When you run `joystick create <app_name>`, a template file is generated automatically, including some basic styles and a light reset for default browser styles.  

This file should include all of the global CSS for your app (e.g., Tailwind, Bootstrap, or other frameworks). You can also import other CSS files from the `/css` directory at the root of your app (an optional directory you can create to organize additional global CSS files).

## Example Usage

{% code theme="light" title="/index.css" %}
// @import('/css/some-other-global.css');

:root {
  --brand: #ffcc00;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
}

body {
  min-height: 100dvh;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  background: #000;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
{% /code %}

---
category: "@joystick.js/ui"
title: index.html
description: How to configure and use the base HTML file for your Joystick app.
---

At the root of your app, the `index.html` file serves as the base HTML file for your entire app. When Joystick server-side renders a page, that page is mounted into the `<div id="app"></div>` element inside this file. This file is included in the template created for you when you run `joystick create <app_name>`.  

Any global HTML tags that need to be present in the app—such as meta tags for Google Fonts—should be added here.

## Example Usage

### Base index.html

{% code theme="light" title="/index.html" %}
&lt;!doctype html&gt;
&lt;html class="no-js" lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;App&lt;/title&gt;
    &lt;meta name="description" content="A new Joystick app."&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;meta name="theme-color" content="#FFCC00"&gt;
    &lt;link rel="apple-touch-icon" href="/apple-touch-icon-152x152.png"&gt;
    &lt;link rel="stylesheet" href="/_joystick/index.css"&gt;
    &lt;link rel="manifest" href="/manifest.json"&gt;
    ${css}
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="app"&gt;&lt;/div&gt;
    &lt;script&gt;
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
      }
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
{% /code %}

### SSR CSS Target

Inside the template, Joystick anticipates a `${css}` placeholder. During a server-side render, Joystick automatically injects the CSS for your component tree into this slot.  

If your app is missing its CSS in the browser, double-check that this placeholder is present.

### Service Workers

To enable basic Progressive Web App (PWA) support, Joystick’s default `index.html` template includes a call to register a generic `service-worker.js` file. This file is stored in the `/public` folder of your app to make it accessible when `index.html` is loaded in the browser.  

If your app does not require (or you do not want) service workers, you can comment out or delete the `<script></script>` block wrapping this import.

---
category: "@joystick.js/node"
title: Middleware
description: How to configure middleware for your Joystick app.
---

If you need to run custom middleware for all of your routes, the `middleware` option can be utilized on the options object passed to `joystick.app()`:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';
import some_middleware_package from 'some-middleware-package';

joystick.app({
  middleware: [
    (req = {}, res = {}, next = {}) => {
      req._internal_request_id = joystick.id();
      next();
    },
    some_middleware_package,
  ],
  routes: { ... }
});
{% /code %}

Any Express-supported middleware will work (the contents of the `middleware` array are handed directly to Express when routes are registered). Above, we show an example of implementing a custom middleware that adds an `_internal_request_id` value to the inbound `req` object.

Any middleware you add to the middleware array will run _ahead_ of any route matching the inbound request (the intended purpose of middleware is to run in the _middle_ of the user's request and your routes).

## Built-in middleware

In addition to any custom middleware you define, behind the scenes, Joystick implements a handful of built-in middleware functions. Where applicable, options can be passed via your [`settings.<env>.json`](/joystick/settings/defining-settings) file.

Currently, Joystick adds the following middleware functions:

| Middleware Name   | Docs                                                                                               | Settings Path                   | Description                                                                                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| compression        | [View](https://www.npmjs.com/package/compression)                                                 | `config.middleware.compression`  | Attempts to compress response bodies for all requests that traverse through the middleware.                                                                    |
| serve-favicon      | [View](https://www.npmjs.com/package/serve-favicon)                                               | N/A                               | Properly maps all requests for your favicon.ico file to avoid HTTP 404 errors.                                                                                 |
| cookie-parser      | [View](https://www.npmjs.com/package/cookie-parser)                                               | N/A                               | Parses the HTTP `cookie` header into a JavaScript object and makes it accessible on the Express `req` object.                                                  |
| body-parser        | [View](https://expressjs.com/en/resources/middleware/body-parser.html)                            | `config.middleware.bodyParser`   | Parses the HTTP request `body` into the format specified in the `application/content-type` header. Uses the version bundled with Express, not the standalone. |
| cors               | [View](https://www.npmjs.com/package/cors)                                                        | `config.middleware.cors`         | Aids in configuring the CORS (cross-origin resource sharing) policy for the server. Defines which URLs can access the server remotely and blocks unauthorized access. |

## Configuring built-in middleware

Built-in middleware listed in the table above can be configured via your application's `settings.<env>.json` file at the root of your project (where `<env>` is replaced with the name of the environment those settings apply to).

Where supported, built-in middleware can be configured via the `config.middleware` object in your settings file (see the "Settings Path" column in the table above for the correct name/path as well as which middleware are configurable):

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    ...
    "middleware": {
      "bodyParser": {
        "limit": "50mb"
      }
    },
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

For middleware that _are_ configurable, please refer to the documentation for that middleware for configuration options (Joystick just passes these along without modification).

## Custom public paths

By default, Joystick exposes the `public` folder at the root of your project at the `/` root route in your app. For example, if a file like `/public/example.txt` exists, it will be accessible at `http://localhost:2699/example.txt`.

If you'd like to support additional, custom public paths, these can be added via the `config.middleware.public_paths` field in your [`settings.<env>.json`](/joystick/settings/defining-settings) file:

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    ...
    "middleware": {
      "public_paths": [
        { "route": "/example", "directory": "example" }
      ]
    },
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

In the example above, we expect a folder named `example` at the root of your project. Its contents will be accessible from the `/example` route in your app. For example, if we have a file like `example/photo.jpg`, it will be accessible via `http://localhost:2600/example/photo.jpg`.

---
category: "@joystick.js/node"
title: Node.js Events
description: How to hook into standard Node.js events in your Joystick app.
---

If you'd like to instrument your server using a custom monitoring tool or a third-party monitoring tool, you can hook into the standard Node.js events via the `events` object passed as an option to the options object passed to `joystick.app()` in `index.server.js`.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  events: {
    error: (error) => {
      // Handle error event...
    },
    beforeExit: (error) => {
      // Handle beforeExit event...
    },
    disconnect: (error) => {
      // Handle disconnect event...
    },
    exit: (error) => {
      // Handle exit event...
    },
    message: (error) => {
      // Handle message event...
    },
    rejectionHandled: (error) => {
      // Handle rejectionHandled event...
    },
    uncaughtException: (error) => {
      // Handle uncaughtException event...
    },
    uncaughtExceptionMonitor: (error) => {
      // Handle uncaughtExceptionMonitor event...
    },
    unhandledRejection: (error) => {
      // Handle unhandledRejection event...
    },
    warning: (error) => {
      // Handle warning event...
    },
    worker: (error) => {
      // Handle worker event...
    },
  },
  routes: { ... }
});
{% /code %}

---
category: "@joystick.js/node"
title: origin
description: Get the current HTTP origin for your app.
---

For convenience, `@joystick.js/node` offers a named export `origin` that you can reference in your code to get the current HTTP origin for the app.

## Example Usage

{% code theme="light" %}
import { origin } from '@joystick.js/node';
{% /code %}

In `development`, the `origin` value is equal to `http://localhost:<app_port>` (e.g., `http://localhost:2600`).  

In a non-development environment, the `origin` value is mapped to the value of `process.env.ROOT_URL` (e.g., `https://myapp.com`).

Using the `origin` value is highly recommended as it helps to avoid bugs in code that need to reference the current app URL (e.g., when sending an email with a clickable link).

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Defining Queues
description: Learn how to define queues and jobs in Joystick apps for running background work.
---

To define a queue for your app, add your queue to the `queues` object on the options passed to `joystick.app()`.

## Example Usage

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    example: {
      run_on_startup: true,
      concurrent_jobs: 10,
      jobs: {
        example_job: {
          run: (payload = {}, job = {}) => {
            // Handle work for the job here...
            // Call one of job.completed(), job.failed(), job.requeue(), or job.delete() after work is finished.
          }
        },
      },
    },
  },
  routes: { ... }
});
{% /code %}

In Joystick, a queue is a constantly running process (ticking every `300ms`) that pulls database entries representing jobs to run. Joystick uses a FIFO (first in, first out) approach to job execution.

Above, we've defined a simple queue called `example`. On the `queues` object passed to `joystick.app()`, we added a key/value pair where the `key` is the queue name and the `value` is an object defining its behavior and jobs.

### Running Jobs

A job is just an arbitrary function called at a specified time. The `job` object passed to your `run()` function includes methods for managing the job’s state:

- **job.completed()**: Marks the job as successfully completed.
- **job.failed()**: Marks the job as failed.
- **job.requeue()**: Schedules the job to run again later.
- **job.delete()**: Removes the job from the queue.

{% alert icon="alert-triangle" theme="warning" title="One of these methods must be called" %}
To prevent a job from getting "stuck," you must call one of these methods after your work is done.
{% /alert %}

### Cleaning Up Jobs

By default, jobs remain in the database even after completion or failure. To automatically delete them, use the `cleanup` option:

{% code theme="light" title="index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    example: {
      run_on_startup: true,
      concurrent_jobs: 10,
      cleanup: {
        completed_after_seconds: 60,
        failed_after_seconds: 60,
      },
      jobs: {
        example_job: {
          run: (payload = {}, job = {}) => {
            // Work here...
            job.completed();
          }
        },
      },
    },
  },
});
{% /code %}

### Retrying Jobs After Server Restart

To retry jobs that were running when the server restarted, use `retry_jobs_running_before_restart: true`.

{% code theme="light" title="index.server.js" %}
joystick.app({
  queues: {
    example: {
      retry_jobs_running_before_restart: true,
      jobs: { ... }
    }
  }
});
{% /code %}

### Setting Max Job Attempts

To limit retries for a job, use `max_attempts`:

{% code theme="light" title="index.server.js" %}
jobs: {
  example_job: {
    max_attempts: 5,
    on_max_attempts_exhausted: (job = {}) => {
      // Handle exhausted attempts
    },
    run: (payload, job) => { ... }
  }
}
{% /code %}

### Automatically Requeue on Failure

Set `requeue_on_failure: true` to retry failed jobs automatically.

### Preflight Options

Use `preflight` options to control whether jobs can be added or run.

{% code theme="light" title="index.server.js" %}
jobs: {
  example_job: {
    preflight: {
      on_before_add: (job_to_add, db, queue_name) => true,
      okay_to_run: (payload, job) => true,
      requeue_delay_in_seconds: 60,
    },
    run: (payload, job) => { ... }
  }
}
{% /code %}

## API

### Definition

{% code theme="light" %}
queues: {
  [queue_name]: {
    run_on_startup: boolean,
    concurrent_jobs: integer,
    cleanup: {
      completed_after_seconds: integer,
      failed_after_seconds: integer,
    },
    retry_jobs_running_before_restart: boolean,
    jobs: {
      [job_name]: {
        preflight: {
          on_before_add: (job_to_add, db, queue_name) => boolean,
          okay_to_run: (payload, job) => boolean,
          requeue_delay_in_seconds: integer,
        },
        max_attempts: integer,
        on_max_attempts_exhausted: (job) => void,
        requeue_on_failure: boolean,
        run: (payload, job) => void
      }
    }
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "queues": {
    "type": "object",
    "required": true,
    "description": "An object defining queues and their jobs for background work.",
    "children": {
      "[queue_name]": {
        "type": "object",
        "description": "A named queue configuration.",
        "children": {
          "run_on_startup": {
            "type": "boolean",
            "description": "Whether the queue should start automatically when the server starts."
          },
          "concurrent_jobs": {
            "type": "integer",
            "description": "The maximum number of jobs to run simultaneously in this queue."
          },
          "cleanup": {
            "type": "object",
            "description": "Options for automatically removing completed or failed jobs from the database.",
            "children": {
              "completed_after_seconds": {
                "type": "integer",
                "description": "Seconds to wait before removing completed jobs."
              },
              "failed_after_seconds": {
                "type": "integer",
                "description": "Seconds to wait before removing failed jobs."
              }
            }
          },
          "retry_jobs_running_before_restart": {
            "type": "boolean",
            "description": "Retries jobs that were running before the server restarted."
          },
          "jobs": {
            "type": "object",
            "description": "An object containing definitions for each job in the queue.",
            "children": {
              "[job_name]": {
                "type": "object",
                "description": "A job definition.",
                "children": {
                  "preflight": {
                    "type": "object",
                    "description": "Preflight options for the job.",
                    "children": {
                      "on_before_add": {
                        "type": "function",
                        "description": "Decides if the job can be added to the queue."
                      },
                      "okay_to_run": {
                        "type": "function",
                        "description": "Decides if the job can be run now."
                      },
                      "requeue_delay_in_seconds": {
                        "type": "integer",
                        "description": "Seconds to wait before retrying if not ready."
                      }
                    }
                  },
                  "max_attempts": {
                    "type": "integer",
                    "description": "Maximum retry attempts before failing permanently."
                  },
                  "on_max_attempts_exhausted": {
                    "type": "function",
                    "description": "Function to call when max attempts are exhausted."
                  },
                  "requeue_on_failure": {
                    "type": "boolean",
                    "description": "Requeue failed jobs automatically."
                  },
                  "run": {
                    "type": "function",
                    "required": true,
                    "description": "The function to execute for the job."
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Enabling Queues
description: Learn how to enable queues in Joystick apps by configuring a database for queue storage.
---

In order for queues to work in your app, one of your configured databases must be set as the target for queue data. To do it, in your `settings.<env>.json` file, on your preferred database, add the `queues: true` flag.

## Example Usage

{% code theme="light" language="json" title="settings.&lt;env&gt;.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "queues": true,
        "options": {}
      }
    ],
    "i18n": {
      "defaultLanguage": "en-US"
    },
    "middleware": {},
    "email": {
      "from": "",
      "smtp": {
        "host": "",
        "port": 587,
        "username": "",
        "password": ""
      }
    }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

Above, in the `config.databases` array, for our `mongodb` database, we've added the flag `"queues": true`. When your [app server](/joystick/node/joystick-app) starts up, this tells Joystick to map any queues-related activity to this database and use it as the source database when running jobs in your queues.

Behind the scenes, each queue that you define will get a new collection (or table, if using a SQL-based database like PostgreSQL) with a name like `queue_<queue_name>`. Assuming we define a queue like `notifications`, we'd anticipate a collection/table like `queue_notifications` to be created for us on the database with the `"queues": true` flag specified above.

{% alert icon="alert-circle" theme="warning" title="One Queues Database Per App" %}
Keep in mind that only one database can be used for storing queue data in your app. Joystick enforces this to avoid confusion in your code and unwanted bugs when handling jobs internally.
{% /alert %}

---
category: "@joystick.js/node"
title: External Queues
description: How to configure external queues for sharing work between multiple Joystick apps.
---

{% alert icon="triangle-alert" theme="warning" title="Warning: Advanced Topic" %}
Using external queues is an advanced topic and is not recommended for beginners. You should only attempt this if you feel comfortable with the following docs.
{% /alert %}

In Joystick, external queues are used to split work across multiple apps. For example, you may have one app that is your main user-facing app and another Joystick app that functions as a job server.  

By marking a queue as `external: true`, Joystick allows both apps to add jobs to the same database queue, while only one app (the job server) is responsible for running those jobs. This approach avoids wiring up HTTP routes between apps and simplifies scaling.

## Example Usage

### User-Facing App: Marking a Queue as External

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    encoder: {
      external: true,
    },
  },
  routes: { ... },
});
{% /code %}

### User-Facing App: Database Configuration

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "users": true,
        "queues": true,
        "options": {}
      }
    ],
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

### Job Server App: Defining the Queue

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    encoder: {
      run_on_startup: true,
      concurrent_jobs: 10,
      jobs: {
        encode_image: {
          run: (payload = {}, job = {}) => {
            // Handle work for the job here...
          },
        },
      },
    },
  },
  routes: { ... },
});
{% /code %}

### Job Server App: Database Configuration

{% code theme="light" title="/settings.development.json" %}
{
  "config": {
    "databases": [
      {
        "provider": "mongodb",
        "queues": true,
        "options": {},
        "connection": {
          "username": "",
          "password": "",
          "database": "app",
          "hosts": [
            {
              "hostname": "127.0.0.1",
              "port": 2610
            }
          ]
        }
      }
    ],
    ...
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

### User-Facing App: Adding a Job to an External Queue

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    encoder: {
      external: true,
    },
  },
  routes: { ... },
}).then(async () => {
  await process.queues.encoder.add({
    job: 'encode_image',
    next_run_at: new Date().toISOString(),
    payload: {
      image_url: '...',
    },
  });
});
{% /code %}
---
category: "@joystick.js/node"
title: Queueing Jobs
description: How to add jobs to a queue using the `process.queues.<queue_name>.add()` function.
---

Once a queue is [defined](/joystick/node/queues/defining-queues) and [registered](/joystick/node/queues/registering-queues), jobs can be added to it via the global `process.queues.<queue_name>.add()` function from anywhere on your server.

## Example Usage

### Adding a Notification Job

{% code theme="light" title="/api/notifications/setters.js" %}
import joystick from '@joystick.js/node';

const setters = {
  send_notification: {
    input: {
      user_id: {
        type: 'string',
        required: true,
      },
      message: {
        type: 'string',
        required: true,
      },
    },
    set: async (input = {}) => {
      const notification_id = joystick.id();

      await process.databases.mongodb.collection('notifications').insertOne({
        _id: notification_id,
        ...input,
      });

      await process.queues.notifications.add({
        job: 'send_notification_via_email',
        next_run_at: new Date().toISOString(),
        payload: {
          notification_id,
        },
      });
    },
  },
};

export default setters;
{% /code %}

In the example above, `process.queues.notifications.add()` is called to add a job where `notifications` is the name of the [queue we defined](/joystick/node/queues/defining-queues).  

The `add()` function receives an options object containing:  

- `job`: The name of the job in the queue definition's `jobs` object.  
- `next_run_at`: An ISO-8601 timestamp specifying when the job should run.  
- `payload`: Key/value pairs with additional metadata for the job at run time.  

When called, the job is added to the queue and will run as soon as possible (ASAP), unless constrained by the queue’s `concurrent_jobs` setting or other rules.

## API

### Definition

{% code theme="light" %}
process.queues.<queue_name>.add(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "required": true,
    "description": "Options defining the job to add to the queue.",
    "children": {
      "job": {
        "type": "string",
        "required": true,
        "description": "The name of the job to run, as defined in the queue's `jobs` object."
      },
      "next_run_at": {
        "type": "string",
        "required": false,
        "description": "An ISO-8601 string specifying the date/time when the job should run. Relative to other jobs in the queue, the job will run as close to this timestamp as possible."
      },
      "payload": {
        "type": "object",
        "required": false,
        "description": "An object containing key/value pairs to pass to the job's `run()` method at run time. Should include any data necessary for performing the job."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Registering Queues
description: How to register queues with your app using the `queues` option in `joystick.app()`.
---

In order for a queue to run, it needs to be registered with your app. To register it, define the queue on the `queues` object passed as part of the `options` object to `joystick.app()`.

## Example Usage

### Defining a Queue Inline

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  queues: {
    example: {
      run_on_startup: true,
      concurrent_jobs: 10,
      jobs: {
        example_job: {
          run: (payload = {}, job = {}) => {
            // Handle work for the job here...
            // Call one of job.completed(), job.failed(), job.requeue(), or job.delete(), after work is finished.
          },
        },
      },
    },
  },
  routes: { ... }
});
{% /code %}

### Defining a Queue in a Separate File

{% code theme="light" title="/queues/example.js" %}
const example_queue = {
  run_on_startup: true,
  concurrent_jobs: 10,
  jobs: {
    example_job: {
      run: (payload = {}, job = {}) => {
        // Handle work for the job here...
        // Call one of job.completed(), job.failed(), job.requeue(), or job.delete(), after work is finished.
      },
    },
  },
};

export default example_queue;
{% /code %}

### Centralizing Queue Definitions

{% code theme="light" title="/queues/index.js" %}
import example from './example.js';

const queues = {
  example,
};

export default queues;
{% /code %}

### Registering Queues in joystick.app()

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';
import queues from './queues/index.js';

joystick.app({
  queues,
  routes: { ... }
});
{% /code %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Advanced Routes
description: How to define routes with custom HTTP methods and middleware in `joystick.app()`.
---

If you need to implement a route that uses an HTTP method other than `GET`, you can use an advanced route definition.

## Example Usage

### Defining a Route with a Custom HTTP Method

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': {
      method: 'GET',
      handler: (req = {}, res = {}) => {
        return res.status(200).send('Howdy');
      },
    },
  },
});
{% /code %}

Instead of assigning a callback function directly to your route, assign an object. On that object, specify either:  

- A single `method` option as a `string` (one of `OPTIONS`, `HEAD`, `CONNECT`, `GET`, `POST`, `PUT`, `DELETE`, or `PATCH`).  
- Or, to support multiple methods on a single route, a `methods` option as an array of HTTP method `string`s.  

Your route’s callback should be assigned to the `handler` property. This behaves identically to a basic route definition.  

### Adding Route-Specific Middleware

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';
import custom_middleware from 'middleware-package';

joystick.app({
  routes: {
    '/': {
      methods: ['POST', 'PUT'],
      middleware: [
        custom_middleware,
        (req = {}, res = {}, next = {}) => {
          if (!req.body) {
            return res.redirect('/404');
          }

          next();
        },
      ],
      handler: (req = {}, res = {}) => {
        return res.status(200).send('Howdy');
      },
    },
  },
});
{% /code %}

Advanced route definitions support a `middleware` array for running route-specific middleware functions before the `handler()` function.

## API

### Definition

{% code theme="light" %}
{
  [route_path: string]: {
    method: string,
    methods: array[string],
    middleware: array[function],
    handler: (req: object, res: object) => void,
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "route_path": {
    "type": "object",
    "required": true,
    "description": "The route path as a string, assigned an object for its definition. Either `method` or `methods` must be defined for the route to register.",
    "children": {
      "method": {
        "type": "string",
        "required": false,
        "description": "The HTTP method for the route (one of: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, or `OPTIONS`)."
      },
      "methods": {
        "type": "array[string]",
        "required": false,
        "description": "An array of HTTP methods as strings for the route (e.g., `['GET', 'POST']`)."
      },
      "middleware": {
        "type": "array",
        "required": false,
        "description": "An optional array of Express middleware functions to run before the route's `handler()` method."
      },
      "handler": {
        "type": "function",
        "required": true,
        "description": "The callback function for the route. Receives the inbound `req` and `res` objects."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Basic Route Definitions
description: How to define basic routes in `joystick.app()` using the `routes` option.
---

When you start your app with `joystick.app()`, Joystick starts an HTTP server via Express in the background and registers any routes you define on the `routes` object passed via the `options` object to `joystick.app()`.  

By default, when you specify a route, Joystick defines an HTTP `GET` route (meaning the route can only receive HTTP requests made with the `GET` method), mapped to the URL you specify.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': (req = {}, res = {}) => {
      return res.status(200).send('Howdy');
    },
  },
});
{% /code %}

In the example above, we define a simple "index" route at `/` in our app using the basic route syntax: a key containing the path for our route, assigned a route handler as a callback function.  

Apart from Joystick adding a few additional properties to the `req` and `res` objects, the route behaves identically to one you'd define in a vanilla Express app.

## API

### Definition

{% code theme="light" %}
{
  [route_path: string]: (req: object, res: object) => void
}
{% /code %}

### Parameters

{% parameters %}
{
  "route_path": {
    "type": "function",
    "required": true,
    "description": "The callback function for the route. Receives the inbound `req` and `res` objects."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Accessing Databases in Routes
description: How to access your database from within a route using `process.databases` or `req.context`.
---

While it’s recommended to isolate database calls to your [getters](/joystick/node/api/getters) and [setters](/joystick/node/api/setters) in your API, you can also access your database directly in a route if needed (e.g., when exposing a public developer API).  

Your database can be accessed in two ways:  

- Via the global `process.databases.<provider>` object.  
- Via its alias at `req.context.<provider>`.  

Both methods are identical and are provided for convenience.

## Example Usage

### Accessing MongoDB via process in a route

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      const books = await process.databases.mongodb.collection('books').find().toArray();
      return res.status(200).send(books);
    },
  },
});
{% /code %}

### Accessing MongoDB via req.context in a route

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      const books = await req.context.mongodb.collection('books').find().toArray();
      return res.status(200).send(books);
    },
  },
});
{% /code %}

---
category: "@joystick.js/node"
title: req.context.if_logged_in()
description: How to use `req.context.if_logged_in()` to redirect logged-in users in your routes.
---

To aid in the process of routing users to the correct location, Joystick includes a helper function `req.context.if_logged_in()` to trigger custom behavior if a user is already logged in.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      req.context.if_logged_in('/dashboard', () => {
        res.render('ui/pages/index/index.js');
      });
    },
    '/login': async (req = {}, res = {}) => {
      req.context.if_logged_in('/dashboard', () => {
        res.render('ui/pages/login/index.js');
      });
    },
  },
});
{% /code %}

In the example above, we call `req.context.if_logged_in()`, passing two arguments:  

1. The path the user should be redirected to if they **are logged in**.  
2. A callback function describing what to do if they **are not logged in**.

## API

### Definition

{% code theme="light" %}
req.context.if_logged_in(redirect_path: string, callback: function) => void
{% /code %}

### Parameters

{% parameters %}
{
  "redirect_path": {
    "type": "string",
    "required": true,
    "description": "If there is a current user, redirect them to this path."
  },
  "callback": {
    "type": "function",
    "required": true,
    "description": "If there is not a current user, call this function."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: req.context.if_not_logged_in()
description: How to use `req.context.if_not_logged_in()` to redirect users who are not logged in.
---

To aid in the process of routing users to the correct location, Joystick includes a helper function `req.context.if_not_logged_in()` to trigger custom behavior if a user is not logged in.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/dashboard': async (req = {}, res = {}) => {
      req.context.if_not_logged_in('/login', () => {
        res.render('ui/pages/dashboard/index.js');
      });
    },
    '/billing': async (req = {}, res = {}) => {
      req.context.if_not_logged_in('/dashboard', () => {
        res.render('ui/pages/billing/index.js');
      });
    },
  },
});
{% /code %}

In the example above, we call `req.context.if_not_logged_in()`, passing two arguments:  

1. The path the user should be redirected to if they **are not logged in**.  
2. A callback function describing what to do if they **are logged in**.

## API

### Definition

{% code theme="light" %}
req.context.if_not_logged_in(redirect_path: string, callback: function) => void
{% /code %}

### Parameters

{% parameters %}
{
  "redirect_path": {
    "type": "string",
    "required": true,
    "description": "If there is not a current user, redirect them to this path."
  },
  "callback": {
    "type": "function",
    "required": true,
    "description": "If there is a current user, call this function."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: req.context.user
description: How to access the authenticated user on `req.context.user` in your routes.
---

When a user logs in to the app, for each request, Joystick will attempt to authenticate the user via the `joystick_login_token` cookie (if present). If a user exists, the accounts middleware will automatically assign that user’s data to the `req.context.user` object.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      return res.render('ui/pages/index/index.js', {
        layout: 'ui/layouts/app/index.js',
        props: {
          has_user: !!req.context.user,
        },
      });
    },
  },
});
{% /code %}

## API

### Definition

The `req.context.user` object contains the authenticated user’s data for the current request. The structure of this object depends on your database provider.

{% code theme="light" title="MongoDB" %}
{
  _id: string,
  emailAddress: string,
  password: string (hash),
  username: string,
  sessions: array[object],
  language: string,
}
{% /code %}

{% code theme="light" title="PostgreSQL" %}
{
  user_id: string,
  email_address: string,
  password: string (hash),
  username: string,
  sessions: array[object],
  language: string,
}
{% /code %}

### Parameters

{% parameters %}
{
  "_id": {
    "type": "string",
    "required": false,
    "description": "The ID for the user. Set if the [users database](/joystick/databases/users) is MongoDB."
  },
  "user_id": {
    "type": "string",
    "required": false,
    "description": "The ID for the user. Set if the [users database](/joystick/databases/users) is PostgreSQL."
  },
  "emailAddress": {
    "type": "string",
    "required": false,
    "description": "The user's email address."
  },
  "password": {
    "type": "string",
    "required": false,
    "description": "The user's password as a SHA-256 hash."
  },
  "username": {
    "type": "string",
    "required": false,
    "description": "If set, the user's username."
  },
  "sessions": {
    "type": "array[object]",
    "required": false,
    "description": "The user's existing login sessions."
  },
  "language": {
    "type": "string",
    "required": false,
    "description": "If set, the user's language as a combination of the ISO-639 language code with the ISO-3166 country code (e.g., en-US, de-DE, es-ES, or ja-JP)."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: res.render()
description: How to use `res.render()` for server-side rendering (SSR) of Joystick components.
---

To aid in the process of server-side rendering Joystick components, Joystick overrides the `res.render()` function built into Express. Using this function, you can:  

- Render a Joystick [page](/joystick/concepts/component-types#pages) component.  
- Render a page component into a [layout](/joystick/concepts/component-types#layouts) component.  
- Pass route-specific props to a component.  
- Define SEO metadata for a page.  
- Define custom `<head>` and `<body>` attributes.  

## Example Usage

### Rendering a Component

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': (req = {}, res = {}) => {
      return res.render('ui/pages/index/index.js');
    },
  },
});
{% /code %}

In this example, Joystick renders the page component located at `/ui/pages/index/index.js`. The server returns the component’s HTML and CSS.

### Rendering into a Layout

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': (req = {}, res = {}) => {
      return res.render('ui/pages/index/index.js', {
        layout: 'ui/layouts/app/index.js',
      });
    },
  },
});
{% /code %}

Here, Joystick renders the page into a layout and passes the page as `props.page` to the layout component.

### Passing Props to a Component

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      const active_sale = await process.databases.mongodb.collection('sales').findOne();

      return res.render('ui/pages/index/index.js', {
        layout: 'ui/layouts/app/index.js',
        props: {
          active_sale: !!active_sale,
        },
      });
    },
  },
});
{% /code %}

Props defined in `options.props` are passed to both the layout and the page.

### Defining SEO Metadata

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      return res.render('ui/pages/index/index.js', {
        layout: 'ui/layouts/app/index.js',
        head: {
          title: 'A Custom SEO Title',
          tags: {
            meta: [
              { property: 'og:type', content: 'Website' },
              { property: 'og:site_name', content: 'Website Name' },
              { property: 'og:title', content: 'A Custom SEO Title' },
              { property: 'og:description', content: 'A custom Open Graph description.' },
              { property: 'og:image', content: 'https://mywebsite.com/seo/image.png' },
            ],
            link: [
              { rel: 'stylesheet', href: '/styles/extra.css' },
            ],
            script: [
              { src: '/scripts/extra.js', async: true },
            ],
            style: [
              {
                attributes: {
                  id: 'custom-style',
                  media: 'screen',
                },
                content: `
                  body {
                    background-color: #f5f5f5;
                  }
                `,
              },
            ],
          },
          jsonld: {
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            name: 'Website Name',
            author: {
              '@type': 'Organization',
              name: 'Website Co.',
            },
            description: 'A custom JSON-LD description.',
          },
        },
      });
    },
  },
});
{% /code %}

SEO metadata like `title`, `meta`, `link`, `script`, `style`, and JSON-LD can be added using the `head` option.

### Defining Custom Attributes

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/': async (req = {}, res = {}) => {
      return res.render('ui/pages/index/index.js', {
        layout: 'ui/layouts/app/index.js',
        attributes: {
          head: {
            class: {
              list: ['no-js'],
            },
          },
          body: {
            class: {
              list: ['is-index-page'],
            },
          },
        },
      });
    },
  },
});
{% /code %}

Custom attributes for the `<head>` and `<body>` tags can be defined using the `attributes` option.

### Disable Escaping

{% alert icon="triangle-alert" theme="warning" title="Use With Caution" %}
Escaping is turned on by default to protect your app from XSS (cross-site scripting) attacks. In some cases, it may be necessary to disable this conditionally. Make sure that no user data will flow through either the data or props (depending on which your disable escaping for) if you're going to disable escaping.
{% /alert %}

By default, Joystick automatically escapes any data and props sent to the client. If you'd like to disable this, you an do so on a per-render basis via `res.render()`:

{% code theme="light" title="index.server.js %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: {
    '/documentation/:slug': (req = {}, res = {}) => {
      res.render('ui/pages/documentation/index.js', {
        layout: 'ui/layouts/documentation/index.js',
        props: {
          docs: '<Assume an html string here...>',
        },
        escaping: {
          props: false, // NOTE: Disable escaping only for props on this route.
        },
      })
    },
  },
})
{% /code %}

This is useful for when you're rendering safe props/data (not user generated) via `res.render()`.

## API

### Definition

{% code theme="light" %}
res.render(page_path: string, options?: object) => void
{% /code %}

### Parameters

{% parameters %}
{
  "page_path": {
    "type": "string",
    "required": true,
    "description": "The path to the page component that should be rendered."
  },
  "options": {
    "type": "object",
    "required": false,
    "description": "Additional options for rendering the page.",
    "children": {
      "layout": {
        "type": "string",
        "required": false,
        "description": "Path to a layout component. The rendered page is passed as `props.page`."
      },
      "props": {
        "type": "object",
        "required": false,
        "description": "Props to pass to the page and layout components."
      },
      "head": {
        "type": "object",
        "required": false,
        "description": "Options for defining SEO metadata and custom tags in the &lt;head&gt;.",
        "children": {
          "title": {
            "type": "string",
            "required": false,
            "description": "The title for the page."
          },
          "tags": {
            "type": "object",
            "required": false,
            "description": "Additional HTML tags to add to the &lt;head&gt;.",
            "children": {
              "meta": {
                "type": "array",
                "required": false,
                "description": "An array of objects representing HTML &lt;meta&gt; tags. Each object defines attributes and values for a meta tag."
              },
              "link": {
                "type": "array",
                "required": false,
                "description": "An array of objects representing HTML &lt;link&gt; tags. Each object defines attributes and values for a link tag."
              },
              "script": {
                "type": "array",
                "required": false,
                "description": "An array of objects representing HTML &lt;script&gt; tags. Each object defines attributes and values for a script tag."
              },
              "style": {
                "type": "array",
                "required": false,
                "description": "An array of objects representing HTML &lt;style&gt; tags. Each object can define `attributes` (applied to the &lt;style&gt; tag) and `content` (CSS rules as a string). The type is always set to `text/css` automatically."
              }
            }
          },
          "jsonld": {
            "type": "object",
            "required": false,
            "description": "An object defining JSON-LD structured data for the page."
          }
        }
      },
      "attributes": {
        "type": "object",
        "required": false,
        "description": "Custom attributes to add to the &lt;head&gt; or &lt;body&gt; tags.",
        "children": {
          "head": {
            "type": "object",
            "required": false,
            "description": "Attributes for the &lt;head&gt; tag.",
            "children": {
              "class": {
                "type": "object",
                "required": false,
                "description": "Options for adding class names to the &lt;head&gt; tag.",
                "children": {
                  "list": {
                    "type": "array",
                    "required": false,
                    "description": "An array of CSS class names to add."
                  }
                }
              }
            }
          },
          "body": {
            "type": "object",
            "required": false,
            "description": "Attributes for the &lt;body&gt; tag.",
            "children": {
              "class": {
                "type": "object",
                "required": false,
                "description": "Options for adding class names to the &lt;body&gt; tag.",
                "children": {
                  "list": {
                    "type": "array",
                    "required": false,
                    "description": "An array of CSS class names to add."
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: validate_input
description: Validate input values against a schema in your Joystick app.
---

As a convenience, `@joystick.js/node` offers the schema validation function used behind the scenes for [validating getter/setter input](/joystick/node/api/input-validation) as a named export `validate_input` to be used in non-Joystick code within your app.

## Example Usage

{% code theme="light" %}
import { validate_input } from '@joystick.js/node';

const errors = validate_input({
  name: {
    first: 'Ryan',
    last: 'Glover',
  },
}, {
  name: {
    type: 'object',
    required: true,
    fields: {
      first: {
        type: 'string',
        required: true,
      },
      last: {
        type: 'string',
        required: true,
      }
    },
  },
});
{% /code %}

Above, the first argument to `validate_input` is the input value to validate, and the second argument is the schema to validate it against.  

In response, if there are any errors with the input value, each error will be returned as a string describing the path and the error that occurred.

## API

### Definition

{% code theme="light" %}
validate_input(input: object, schema: object) => array[string];
{% /code %}

### Parameters

{% parameters %}
{
  "input": {
    "type": "object",
    "required": true,
    "description": "The input object to validate."
  },
  "schema": {
    "type": "object",
    "required": true,
    "description": "The schema object to validate the input against."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: PostgreSQL Helpers
description: Helper functions for authoring SQL queries in Joystick apps.
---

To aid in the process of authoring injection-safe SQL queries, the Joystick PostgreSQL driver includes a handful of helper functions for generating SQL statements in a JavaScript-friendly format.

All methods can be accessed via the PostgreSQL driver at `process.databases.postgresql.<method_name>` when a PostgreSQL database is connected to your app.

## Example Usage

### create_table()

The `create_table()` method can be used to create new PostgreSQL tables in your database:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: { ... }
}).then(async () => {
  await process.databases.postgresql.create_table({
    table: 'posts',
    columns: {
      id: 'serial primary key',
      title: 'text',
      slug: 'text',
      author_id: 'text',
      content: 'text',
    },
  });
});
{% /code %}

Above, we use the `create_table()` method to create a mock table `posts` with four columns. The method accepts a single `options` object with:

- `table`: The name of the table to create.
- `columns`: An object where the key is the column name and the value is the PostgreSQL data type.

Behind the scenes, Joystick builds and executes a `CREATE TABLE IF NOT EXISTS` statement.

### add_column()

The `add_column()` method can be used to add a new column to an existing table:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: { ... }
}).then(async () => {
  await process.databases.postgresql.add_column({
    table: 'posts',
    column_name: 'tags',
    column_type: 'text',
  });
});
{% /code %}

This creates a column `tags` in the `posts` table. Behind the scenes, Joystick runs an `ALTER TABLE <table> ADD COLUMN IF NOT EXISTS` statement.

### select()

The `select()` method queries data from a PostgreSQL table:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: { ... }
}).then(async () => {
  const rows = await process.databases.postgresql.select({
    table: 'posts',
    columns: ['title', 'slug', 'author_id'],
    where: {
      author: 'abcd1234',
    }
  });
});
{% /code %}

This queries the `posts` table and selects specific columns where `author` matches the value.

### insert()

The `insert()` method inserts data into a table:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: { ... }
}).then(async () => {
  const rows = await process.databases.postgresql.insert({
    table: 'posts',
    data: {
      title: 'How to Upload Files to Amazon S3',
      slug: 'how-to-upload-files-to-amazon-s3',
      author_id: 'abcd1234',
      content: 'Some placeholder content...',
      tags: `['upload', 'files', 'aws', 's3']`,
    },
  });
});
{% /code %}

This creates a new row in `posts`.

### update()

The `update()` method updates data in a table:

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  routes: { ... }
}).then(async () => {
  const rows = await process.databases.postgresql.update({
    table: 'posts',
    data: {
      title: 'How to Upload Files to AWS S3',
    },
    where: {
      id: 5,
    },
  });
});
{% /code %}

This updates the `title` field where `id` equals `5`.

## API

### create_table()

#### Definition

{% code theme="light" %}
process.databases.postgresql.create_table(options: object) => void;
{% /code %}

#### Parameters

{% parameters %}
{
  "table": {
    "type": "string",
    "required": true,
    "description": "The name of the table to create."
  },
  "columns": {
    "type": "object",
    "required": true,
    "description": "An object of key/value pairs where the key is the column name and the value is the PostgreSQL data type."
  }
}
{% /parameters %}

### add_column()

#### Definition

{% code theme="light" %}
process.databases.postgresql.add_column(options: object) => void;
{% /code %}

#### Parameters

{% parameters %}
{
  "table": {
    "type": "string",
    "required": true,
    "description": "The name of the table to add the column to."
  },
  "column_name": {
    "type": "string",
    "required": true,
    "description": "The name of the column to add."
  },
  "column_type": {
    "type": "string",
    "required": true,
    "description": "The PostgreSQL data type for the column."
  }
}
{% /parameters %}

### select()

#### Definition

{% code theme="light" %}
process.databases.postgresql.select(options: object) => array[object];
{% /code %}

#### Parameters

{% parameters %}
{
  "table": {
    "type": "string",
    "required": true,
    "description": "The name of the table to query."
  },
  "columns": {
    "type": "array[string]",
    "required": true,
    "description": "An array of column names to return."
  },
  "where": {
    "type": "object",
    "required": true,
    "description": "An object of key/value pairs where the key is a column name and the value is the value to match."
  }
}
{% /parameters %}

### insert()

#### Definition

{% code theme="light" %}
process.databases.postgresql.insert(options: object) => void;
{% /code %}

#### Parameters

{% parameters %}
{
  "table": {
    "type": "string",
    "required": true,
    "description": "The name of the table to insert into."
  },
  "data": {
    "type": "object",
    "required": true,
    "description": "An object of key/value pairs representing the data to insert."
  }
}
{% /parameters %}

### update()

#### Definition

{% code theme="light" %}
process.databases.postgresql.update(options: object) => void;
{% /code %}

#### Parameters

{% parameters %}
{
  "table": {
    "type": "string",
    "required": true,
    "description": "The name of the table to update."
  },
  "data": {
    "type": "object",
    "required": true,
    "description": "An object of key/value pairs representing the columns to update."
  },
  "where": {
    "type": "object",
    "required": true,
    "description": "An object of key/value pairs representing the condition for which rows to update."
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Defining Uploaders
description: How to configure uploaders in `joystick.app()` for handling file uploads.
---

To assist with uploading files in your app, Joystick includes support for defining custom uploader endpoints that can target one or more providers (e.g., your app’s local disk or Amazon S3). Uploaders can:  

- Validate uploads based on MIME type and size.  
- Customize file destinations and names in storage.  
- Hook into before and after upload events for custom behavior (e.g., using `imagemagick` or `ffmpeg`).  

## Example Usage

### Defining an Uploader with Local and S3 Providers

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: {
        path: 'uploads',
      },
      s3: {
        region: 'us-east-2',
        access_key_id: joystick?.settings?.private?.aws?.access_key_id,
        secret_access_key: joystick?.settings?.private?.aws?.secret_access_key,
        bucket: 'cheatcode-joystick',
        acl: 'public-read',
      },
    },
  },
});
{% /code %}

To keep `access_key_id` and `secret_access_key` secure, use references to `settings.<env>.json` instead of hard-coding them:  

{% code theme="light" title="/settings.development.json" %}
{
  "config": { ... },
  "global": {},
  "public": {},
  "private": {
    "aws": {
      "access_key_id": "ABCD...",
      "secret_access_key": "abcd123..."
    }
  }
}
{% /code %}

### Adding MIME Type Validation

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: { ... },
      s3: { ... },
      mime_types: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    },
  },
});
{% /code %}

### Adding File Size Validation

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: { ... },
      s3: { ... },
      max_size_in_megabytes: 50,
    },
  },
});
{% /code %}

### Customizing File Names

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: { ... },
      s3: { ... },
      file_name: ({ input, file_name }) => {
        return `images/${file_name}`;
      },
    },
  },
});
{% /code %}

### Using on_before_upload

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: { ... },
      s3: { ... },
      on_before_upload: ({ input, req, uploads }) => {
        // Perform validation or transformations here
      },
    },
  },
});
{% /code %}

### Using on_after_upload

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  uploaders: {
    example_uploader: {
      providers: ['local', 's3'],
      local: { ... },
      s3: { ... },
      on_after_upload: ({ input, req, uploads }) => {
        // Post-processing after upload
      },
    },
  },
});
{% /code %}

## Supported Providers

| Provider Name | Provider Key |
|:---------------|:--------------:|
| Amazon S3     | `s3`         |
| Local         | `local`      |

## API

### Definition

{% code theme="light" %}
{
  uploaders: {
    [uploader_name: string]: {
      providers: array[string],
      local: { path: string },
      s3: {
        region: string,
        access_key_id: string,
        secret_access_key: string,
        bucket: string,
        acl: string,
      },
      mime_types: array[string],
      max_size_in_megabytes: integer | function,
      file_name: (options: object) => string,
      on_before_upload: (options: object) => void,
      on_after_upload: (options: object) => void,
    }
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "uploader_name": {
    "type": "object",
    "required": true,
    "description": "An object defining an uploader."
  },
  "providers": {
    "type": "array[string]",
    "required": true,
    "description": "An array of provider keys that will handle the upload. Can contain one or both of: `local`, `s3`."
  },
  "local": {
    "type": "object",
    "required": false,
    "description": "Configuration for uploads to the local disk.",
    "children": {
      "path": {
        "type": "string",
        "required": true,
        "description": "The path relative to your app’s root where files will be stored."
      }
    }
  },
  "s3": {
    "type": "object",
    "required": false,
    "description": "Configuration for Amazon S3 uploads.",
    "children": {
      "region": {
        "type": "string",
        "required": true,
        "description": "The AWS region of your S3 bucket."
      },
      "access_key_id": {
        "type": "string",
        "required": true,
        "description": "Your AWS Access Key ID."
      },
      "secret_access_key": {
        "type": "string",
        "required": true,
        "description": "Your AWS Secret Access Key."
      },
      "bucket": {
        "type": "string",
        "required": true,
        "description": "The name of the S3 bucket where files will be stored."
      },
      "acl": {
        "type": "string",
        "required": true,
        "description": "The ACL permissions for uploaded files."
      }
    }
  },
  "mime_types": {
    "type": "array[string]",
    "required": false,
    "description": "An array of allowed MIME types for uploaded files."
  },
  "max_size_in_megabytes": {
    "type": "integer | function",
    "required": false,
    "description": "The maximum allowed file size in megabytes, or a function returning it dynamically."
  },
  "file_name": {
    "type": "function",
    "required": false,
    "description": "A function returning the customized file path/name for the upload."
  },
  "on_before_upload": {
    "type": "function",
    "required": false,
    "description": "A function run before the upload is sent to providers."
  },
  "on_after_upload": {
    "type": "function",
    "required": false,
    "description": "A function run after the upload is completed for all providers."
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/node"
title: Defining a WebSocket Server
description: How to configure WebSocket servers in `joystick.app()` for real-time data.
---

To add real-time data to your app, Joystick supports the creation of WebSocket servers via the `websockets` property on the options object passed to `joystick.app()`.

## Example Usage

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  websockets: {
    example_endpoint: {
      on_open: (connection = {}) => {
        // Handle connection open event...
      },
      on_message: (message = {}, connection = {}) => {
        // Handle an inbound client message...
      },
      on_close: (code = 0, reason = '', connection = {}) => {
        // Handle a client close event...
      },
    },
  },
  routes: { ... },
});
{% /code %}

In this example, we define a WebSocket server at `example_endpoint`.  

Joystick automatically wires up the server and makes it accessible to clients at:  

- `ws://localhost:2600/api/_websockets/example_endpoint` in development.  
- `wss://<your-domain>/api/_websockets/example_endpoint` in production.  

Once defined, you can [connect to it from a Joystick component](/joystick/ui/component/websockets).

## API

### Definition

{% code theme="light" %}
{
  websockets: {
    [websocket_endpoint: string]: {
      on_open: (connection: object) => void,
      on_message: (message: object, connection: object) => void,
      on_close: (code: integer, reason: string, connection: object) => void,
    }
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "websocket_endpoint": {
    "type": "object",
    "required": true,
    "description": "An object defining the WebSocket server at the given endpoint.",
    "children": {
      "on_open": {
        "type": "function",
        "required": false,
        "description": "A function called when a WebSocket client connects to this endpoint."
      },
      "on_message": {
        "type": "function",
        "required": false,
        "description": "A function called when a WebSocket client sends a message to this endpoint."
      },
      "on_close": {
        "type": "function",
        "required": false,
        "description": "A function called when a WebSocket client disconnects from this endpoint."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Sending WebSocket Messages
description: How to send messages to clients using the `connection.send()` method and the `websockets()` function.
---

There are two ways to send a WebSocket message to a client:  

1. Via the `connection.send()` method on the `connection` object passed to your WebSocket endpoint’s `on_open()`, `on_message()`, and `on_close()` event handlers.  
2. Via the `websockets()` function available as a named export from `@joystick.js/node`.  

## Example Usage

### Sending Messages via the Connection Object

{% code theme="light" title="/index.server.js" %}
import joystick from '@joystick.js/node';

joystick.app({
  websockets: {
    example_endpoint: {
      on_open: (connection = {}) => {
        connection.send(JSON.stringify({ message: 'Hello from the server!' }));
      },
      on_message: (message = {}, connection = {}) => {
        connection.send(JSON.stringify({ message: 'Hello from the server!' }));
      },
      on_close: (code = 0, reason = '', connection = {}) => {
        connection.send(JSON.stringify({ message: 'Hello from the server!' }));
      },
    },
  },
  routes: { ... },
});
{% /code %}

When sending messages using `connection.send()`, ensure the message is stringified as JSON (`JSON.stringify()`) because Joystick’s client-side WebSocket connection expects messages to be JSON-formatted.

### Sending Messages via the websockets() Function

{% code theme="light" title="/index.server.js" %}
import joystick, { websockets } from '@joystick.js/node';

joystick.app({
  websockets: {
    example_endpoint: {
      on_open: (connection = {}) => {
        websockets('example_endpoint').send({ message: 'Hello from the server!' });
      },
      on_message: (message = {}, connection = {}) => {
        websockets('example_endpoint').send({ message: 'Hello from the server!' });
      },
      on_close: (code = 0, reason = '', connection = {}) => {
        websockets('example_endpoint').send({ message: 'Hello from the server!' });
      },
    },
  },
  routes: { ... },
});
{% /code %}

The `websockets()` function returns an object with a `.send()` method that automatically stringifies your message, allowing you to pass a plain JavaScript object.

### Filtering Messages for Specific Clients

{% code theme="light" title="Sending a Message to a Specific ID" %}
websockets('example_endpoint').send(
  { message: 'Hello from the server!' },
  'some_unique_id_abc123'
);
{% /code %}

Here, the `some_unique_id_abc123` string filters the message to only clients who passed the same ID in their WebSocket connection’s `query.id`.

## API

### Definition

{% code theme="light" %}
websockets(websocket_name: string) => {
  send: (message: object, channel_id: string) => void
}
{% /code %}

### Parameters

{% parameters %}
{
  "websocket_name": {
    "type": "string",
    "required": true,
    "description": "The name of the WebSocket server to target."
  }
}
{% /parameters %}

### Returns

{% code theme="light" %}
{
  send: (message: object, channel_id: string) => void
}
{% /code %}

{% parameters %}
{
  "send": {
    "type": "function",
    "required": true,
    "description": "A function that sends a message to clients connected to the specified WebSocket server. Accepts a `message` object (required) and an optional `channel_id` string to filter recipients."
  }
}
{% /parameters %}

---
category: "@joystick.js/node"
title: Workers
description: How to use Node.js workers to offload CPU-heavy tasks in a Joystick app.
---

In Node.js, [worker threads](https://nodejs.org/api/worker_threads.html) are a way to offload CPU-intensive tasks from the main execution thread. A worker thread runs a standalone Node.js script that performs some task in your app (e.g., crunching some numbers), but does so in a way that doesn't block the main thread.

The result is that your main execution thread (e.g., your Joystick app handling inbound HTTP requests) is _not_ blocked by compute-heavy work.

As a convenience, Joystick ships with a simple abstraction for defining and calling workers to help with scaling tasks in your app.

## Example Usage

### Defining a worker

In your app, all worker scripts live as standalone `.js` JavaScript files in the `/workers` folder at the root of your app.

{% code theme="light" title="workers/example.js" %}
import { parentPort as parent_port, workerData as worker_data } from 'worker_threads';

const transactions = worker_data?.transactions || [];
const total = transactions?.reduce((total = 0, transaction = {}) => {
  total += transaction?.total;
  return total;
});

parent_port.postMessage(total);
{% /code %}

{% alert icon="route" theme="warning" title="Worker must call parent_port.postMessage()" %}
Whether you're returning a value or just signaling success, in order for workers to behave properly, you will need to call `parent_port.postMessage()`. This message is the response value to your original `worker()` call. If you omit this, workers can get "stuck" in a loop because they're never resolved (Joystick considers a worker resolved when it sends a message).
{% /alert %}

Above, we've defined a simple worker that ingests an array of transactions and then totals them up, returning the result.

To accomplish this, we use the native-Node.js `worker_threads` library, importing `parentPort` as `parent_port` and `workerData` as `worker_data` (this isn't required, just done as an example here to keep code-styling consistent).

From `worker_data`, we reference the value `transactions` which we assume will be passed when our worker is invoked. Once we've calculated our total, to send the result back to the invocation (remember, this is technically a standalone Node.js script, not a traditional function), we call to `parent_port.postMessage()`, passing our `total`.

### Calling a worker

To call our `example` worker, in our main application code, we can import the `worker` method that's exported from `@joystick.js/node`.

{% code theme="light" title="index.server.js" %}
import joystick, { worker } from '@joystick.js/node';

joystick.app({
 ...
}).then(() => {
  const total = await worker('example', { transactions: [/* Array of transaction objects... */]});
  // Do something with total here...
});
{% /code %}

Above, as an example, we import the named export `worker` from `@joystick.js/node` and then after our server starts up, we call it, passing the name of the worker file we want to run (e.g., we pass `example` as our file is called `example.js`—if our file were called `make_pizza.js`, we'd pass `make_pizza` here).

Additionally, we pass our transactions as an object. Here, the object we pass as the second argument to `worker()` will be mapped to the `worker_data` value we referenced when defining our worker above.

Once our worker runs, because we called to `parent_port.postMessage()` internally, we expect the value we pass to that (our `total`) to be returned from the `worker()` call (Joystick abstracts this internally as a convenience so we can call a worker similar to a normal function).

## API

### worker()

{% code theme="light" %}
worker(worker_file_name: string, worker_data: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "worker_file_name": {
    "type": "string",
    "required": true,
    "description": "The name of the worker file in your `workers` directory that you'd like to run (should just be the file name minus the `.js` extension)."
  },
   "worker_data": {
    "type": "object",
    "required": false,
    "description": "Data that you'd like to pass to your worker. Inside of the worker, maps to the `workerData` value provided by the Node.js `worker_threads` library."
  }
}
{% /parameters %}
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/test"
title: Accessing Databases in Tests
description: How to work with databases in your Joystick app tests using the process.databases object.
---

Similar to your application code, databases connected to your app can be accessed via the `process.databases` object directly within your tests:

{% code theme="light" title="/tests/lib/add.test.js" %}
import test from '@joystick.js/test';

test.that('add function adds two numbers together', async (assert = {}) => {
  const seed_database = await test.load('lib/seed_database.js', { default: true });
  await seed_database();
  const posts = await process.databases.mongodb.collection('posts').find();

  assert.is(posts?.length >= 5, true);
});
{% /code %}

When you run `joystick test` via the Joystick CLI, the CLI will start the databases specified in your `settings.test.json` file at the root of your app. For each database, a server will be started (starting from port `1987` as the default Joystick test app port is `1977`).

{% alert icon="database" theme="info" title="Test Data is Isolated" %}
The data created during tests is entirely independent from your app. This gives you a 100% safe way to interact with your database just like you would in your app code, but avoid costly accidents that impede development.
{% /alert %}

## Database Cleanup

Although the data created during tests is isolated, it still lives on disk. It's important to follow the standard testing methodology of: setup, test/execute, verify, teardown where "teardown" involves writing code to clean up your test database after each test. A quick refactor of the example test above might look like the following:

{% code theme="light" title="/tests/lib/add.test.js" %}
import test from '@joystick.js/test';

test.that('add function adds two numbers together', async (assert = {}) => {
  const seed_database = await test.load('lib/seed_database.js', { default: true });
  await seed_database();
  const posts = await process.databases.mongodb.collection('posts').find();

  assert.is(posts?.length >= 5, true);
});

// NOTE: test.after() runs after *all* tests in the file are complete.
// To run code after *each* test, test.after_each() can be used instead.
test.after(async () => {
  await process.databases.mongodb.collection('posts').deleteMany({});
});
{% /code %}

This ensures that you don't overwhelm the machine where your tests are being run and future test runs beyond the current file aren't tripped up by unexpected data.

---
category: "@joystick.js/test"
title: Organizing Tests
description: How to structure and organize test files in your Joystick app for recognition by the test runner.
---

In Joystick, tests are only recognized if they are located in the `/tests` folder at the root of your app. Additionally, all test files must be named following the pattern `<test_file_name>.test.js`. Any file that does _not_ include the `.test.js` suffix will be ignored by the test runner.

## Recommended Folder Structure

While you’re not required to do so, it’s highly recommended that the contents of your `/tests` folder mirror the structure of your project’s root directory. For example:

- Tests for a utility function in `/lib` should live in `/tests/lib`.
- Tests for page components in `/ui/pages` should live in `/tests/ui/pages`.

### Example Project Structure

{% code theme="light" title="Project Structure" %}
/api
-- /books
---- getters.js
/lib
-- slugify_title.js
/ui
-- /pages
---- /books
------ index.js
{% /code %}

### Mirrored Tests Folder

{% code theme="light" title="/tests Folder" %}
/tests
-- /api
---- /books
------ getters.test.js
-- /lib
---- slugify_title.test.js
-- /ui
---- /pages
------ /books
-------- index.test.js
{% /code %}

## Writing Test Files

Each test file should only contain tests relevant to the mirrored path in your app. Treat each test file as a “suite” of related tests. Joystick’s testing system does not provide an explicit `suite()` function for organizing tests; instead, the file itself acts as the container for related test cases.

This structure helps ensure your tests remain organized and easy to maintain as your project grows.

---
category: "@joystick.js/test"
title: settings.test.json
description: How to define a settings file for running tests in Joystick.
---

To keep your code as isolated as possible, when running tests, Joystick expects you to have a settings file located in the root of your app at `/settings.test.json`. The structure of this file should follow the [standard process for defining settings](/joystick/getting-started/environment-settings) for your app, however, its contents should be specific to writing your tests.

## Databases

If you'd like to [access your app's database in tests](/joystick/test/accessing-databases), it's important that the `config.databases` array in your `settings.test.json` file has the same databases defined as your `settings.development.json` file (and other environment settings files). This ensures that the tests you write accessing the database are consistent with your actual application code and that your tests are not fragile.

---
category: "@joystick.js/test"
title: Testing Accounts
description: How to create and delete user accounts in your Joystick app tests using the @joystick.js/test package.
---

For account testing, Joystick takes a simple approach. You have two options: create accounts and delete accounts. Because a test is ephemeral, users _for_ a test should be ephemeral, too. To facilitate this, `@joystick.js/test` includes two methods for accounts:

- `accounts.signup()` creates a new user in your test database, returning the login credentials (a login `token` that the server understands and a `token_expires_at` timestamp that the server understands).
- `accounts.delete()` deletes a user in your test database.

The ideal lifecycle for a user is to create a user for the test, run the test, and then delete the user.

## Creating Accounts

To create an account, we leverage the `test.accounts.signup()` method exported from `@joystick.js/test`:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the user is created as expected', async (assert = {}) => {
  const user = await test.accounts.signup({
    emailAddress: 'example@test.com',
    password: 'password',
    metadata: {
      roles: ['manager'],
    }
  });
  
  const existing_user = await process.databases.mongodb.collection('users').findOne({ emailAddress: 'example@test.com' });

  assert.is(!!existing_user, true);
});
{% /code %}

Similar to the `accounts.signup()` methods in `@joystick.js/ui` and `@joystick.js/node`, we call to the method `test.accounts.signup()` passing an object of options describing our user. We pass an `email_address` (and/or `username`), `password`, and optionally, a `metadata` object with additional fields to add to the user.

When this method is called, on the server, Joystick will attempt to create the user. First, it will check to see if a user with the `email_address` (or `username`) already exists. If one does, it will automatically delete that user and then recreate the user with the new input you've provided. This ensures that multiple tests can create the same user without having to worry about collisions.

Once created, the server will respond with an object containing a `token` and `token_expires_at` field. The former representing a login token for the user and the latter its expiration date. This object can be passed to other test methods like `test.render()` and `test.routes.<http_method>` to simulate a logged-in user.

## Deleting Accounts

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the user is deleted as expected', async (assert = {}) => {
  const user = await test.accounts.signup({
    emailAddress: 'example@test.com',
    password: 'password',
    metadata: {
      roles: ['manager'],
    }
  });

  await test.accounts.delete(user?._id);
  
  const existing_user = await process.databases.mongodb.collection('users').findOne({ emailAddress: 'example@test.com' });

  assert.is(!existing_user, true);
});
{% /code %}

While Joystick will automatically attempt to clean up users with an identical email address when running `test.accounts.signup()`, it's wise to manually write the code to clean up test users so the behavior is clear in your code. To do it, we can use the `test.accounts.delete()` method, passing the `_id` (if we're using MongoDB) or `user_id` (if we're using PostgreSQL) field from the object returned by `test.accounts.signup()`.

When this method runs, the specified user will automatically be deleted from your test database.

## API

### test.accounts.signup()

{% code theme="light" %}
test.accounts.signup(options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "options": {
    "type": "object",
    "description": "An object defining the parameters for the new user account.",
    "properties": {
      "email_address": {
        "type": "string",
        "required": true,
        "description": "A string defining the email address for the new user account."
      },
      "username": {
        "type": "string",
        "description": "A string defining the username for the new user account."
      },
      "password": {
        "type": "string",
        "required": true,
        "description": "A string defining the password for the new user account."
      },
      "metadata": {
        "type": "object",
        "description": "An object defining additional metadata for the new user account.",
        "properties": {
          "language": {
            "type": "string",
            "description": "A string defining the preferred language for the user as an [ISO Language Code](https://gist.github.com/rglover/23d9d10d788c87e7fc5f5d7d8629633f)."
          }
        }
      }
    }
  }
}
{% /parameters %}

### test.accounts.delete()

{% code theme="light" %}
test.accounts.delete(user_id: string) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "user_id": {
    "type": "string",
    "required": true,
    "description": "The ID of the user to delete. This should be either the `_id` or `user_id` field from the response object of `test.accounts.signup()`."
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Components
description: How to test Joystick components using the test.render() method from @joystick.js/test.
---

To test Joystick components, the `@joystick.js/test` package includes a special `test.render()` method for rendering your component's into memory. Once rendered into memory, you can test:

- That, given some props and user data, the component renders the correct HTML.
- DOM event listeners behave in the way that you expect.
- Component methods you've defined behave in the way that you expect.
- Data you fetch on the component matches your expectations.

By testing in these four areas, you can gain confidence that your UI behaves how you'd expect for your users.

## Using the test.render() Method

To generate an in-memory instance of your component for testing, call the `test.render()` method from `@joystick.js/test`, passing the path of the component you'd like to test:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the index page renders as expected', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {},
    state: {},
    options: {
      language: 'en-US',
    },
  });

  assert.is(true, true);
});
{% /code %}

Above, we've defined a test with the `test.that()` method and inside of the test's callback, we create a variable `component` and set it to a call to `test.render()` (we expect a Promise to be returned so we place `async` on the callback for our test and prefix our call with `await`).

To `test.render()`, as the first argument, we pass the path to the Joystick component we'd like to test: `ui/pages/index/index.js`. As the second argument, we pass an options object containing the default `props`, default `state`, and some render `options` (here we force the `language` for this test to be `en-US`).

In response, we expect to get back an object with a few methods to help us test our component.

## Testing Rendered HTML

On the object returned by `test.render()`, we can retrieve the rendered HTML for the component by calling to `component.instance.render_to_html()` on the component instance object returned by `test.render()`:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the index page renders as expected', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {},
    state: {},
    options: {
      language: 'en-US',
    },
  });

  const html = component.instance.render_to_html();

  assert.is(html?.includes('A full-stack JavaScript framework for building web apps and websites.'), true);
});
{% /code %}

When we call to `component.instance.render_to_html()` we expect to get back a string of HTML returned from calling the component's `render()` method internally.

## Testing DOM Events

When testing DOM events in Joystick, focus on _side effects_. For example, if a `click` event sets the current time on state, trigger that event and then confirm the value changed:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('a button click sets the current time on state', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {},
    state: {},
    options: {
      language: 'en-US',
    },
  });

  component.test.event('click', 'button');

  assert.is(!!component.state.current_time, true);
});
{% /code %}

## Testing Component Methods

To test custom component methods, use `component.test.method()`:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the reverse_name() method reverses the name', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {},
    state: {},
    options: {
      language: 'en-US',
    },
  });

  const reversed_name = component.test.method('reverse_name', ['Ryan']);

  assert.is(reversed_name === 'nayR', true);
});
{% /code %}

## Testing Data

To verify data returned from a component’s `data()` function, use `component.test.data()`:

{% code theme="light" title="/tests/ui/pages/index/index.test.js" %}
import test from '@joystick.js/test';

test.that('the data returned matches our expectations', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {},
    state: {},
    options: {
      language: 'en-US',
    },
  });

  const data = await component.test.data();

  assert.is(typeof data?.stars === 'integer', true);
});
{% /code %}

## API

### test.render()

{% code theme="light" %}
test.render(component_path: string, render_options: object) => object;
{% /code %}

### Parameters

{% parameters %}
{
  "component_path": {
    "type": "string",
    "required": true,
    "description": "The path to a component in the project to render into memory."
  },
  "render_options": {
    "type": "object",
    "description": "An object of options for customizing the render.",
    "properties": {
      "props": {
        "type": "object",
        "description": "Props to pass to the rendered component instance."
      },
      "state": {
        "type": "object",
        "description": "State to pass to the rendered component instance."
      },
      "options": {
        "type": "object",
        "description": "Additional options to customize the behavior of the rendered component.",
        "properties": {
          "language": {
            "type": "string",
            "description": "A string containing the ISO language code to load for the test."
          },
          "user": {
            "type": "object",
            "description": "A user object returned by the `test.accounts.signup()` method containing a user session to perform the test against."
          }
        }
      },
      "layout": {
        "type": "string",
        "description": "The path to a Joystick layout component to render the component into."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Email Sends
description: How to verify email sends in your Joystick app tests using test.utils.get_function_calls().
---

While `@joystick.js/test` doesn't include an explicit method for triggering email sends, behind the scenes, Joystick automatically tracks all calls to the `email.send()` method which can be accessed inside of your tests.

To verify that emails are sending as expected, it's recommended that your test calls to the functionality (e.g., a setter) in your app that triggers an email send and then verify a call to `email.send()` was fired via the `test.utils.get_function_calls()` method (with the arguments you expect):

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
   await test.api.set('create_user', {
    user,
    input: {
      email_address: 'example@test.com',
      password: 'password',
      name: 'Cory Hale',
    },
  });

  const function_calls = await test.utils.get_function_calls('node.email.send');

  assert.is(function_calls[0]?.args[0]?.to, 'example@test.com');
});
{% /code %}

## API

### test.utils.get_function_calls()

{% code theme="light" %}
test.utils.get_function_calls(function_name: string) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "function_name": {
    "type": "string",
    "required": true,
    "description": "The name of the function to retrieve tracked calls for (e.g., `node.email.send`)."
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Getters and Setters
description: How to test API getters and setters in your Joystick app using test.api.get() and test.api.set().
---

To test your [getters](/joystick/node/api/getters) and [setters](/joystick/node/api/setters), `@joystick.js/test` includes `test.api.get()` and `test.api.set()` methods to call endpoints directly.

## Testing a Getter

To test a getter, the `test.api.get()` method can be utilized:

{% code theme="light" title="/tests/api/books/getters.js" %}
import test from '@joystick.js/test';

test.that('the book getter returns a book', async (assert = {}) => {
  const data = await test.api.get('book', {
    input: {
      title: 'Tough and Competent',
    }
  });

  assert.is(data?.author, 'Gene Kranz');
});
{% /code %}

The `test.api.get()` method is analogous to [the `get()` method exported from `@joystick.js/ui`](/joystick/ui/api/get). To call a getter, we first pass the name of the getter `book` as the first argument and then, as the second argument, we pass an options object. Here, we've set the `input` value in our options to get a book with a `title` of `Tough and Competent`.

In response, we get the exact output of our getter endpoint. To verify our getter worked, we assert that the `author` field on the resulting data returned by the `book` getter matches the author we expect.

## Testing a Setter

To test a setter, the `test.api.set()` method can be utilized:

{% code theme="light" title="/tests/api/books/setters.js" %}
import test from '@joystick.js/test';

test.that('the create_book setter creates a book', async (assert = {}) => {
  await test.api.set('create_book', {
    input: {
      title: 'Tough and Competent',
      author: 'Gene Kranz',
    }
  });

  const book = await process.databases.mongodb.collection('books').findOne({
    title: 'Tough and Competent',
    author: 'Gene Kranz',
  });

  assert.is(book?.author, 'Gene Kranz');
});
{% /code %}

The `test.api.set()` method is analogous to [the `set()` method exported from `@joystick.js/ui`](/joystick/ui/api/set). To call a setter, we first pass the name of the setter `create_book` as the first argument and then, as the second argument, we pass an options object. Here, we've set the `input` value in our options with the `title` and `author` of a book we'd like to create.

To verify our setter worked, we run a database query to get a book with the `title` and `author` we passed and assert that the `author` field on the resulting data returned by that query matches the author we expect.

## Passing a User

For both the `test.api.get()` and `test.api.set()` methods, via the options object, a user can be passed along with the request:

{% code theme="light" title="/tests/api/books/getters.js" %}
import test from '@joystick.js/test';

test.that('the create_book setter creates a book for the user', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'example@test.com',
    password: 'password',
    metadata: {
      name: 'Ryan Glover', 
    },
  });

  const data = await test.api.set('create_book', {
    user,
    input: {
      title: 'Tough and Competent',
      author: 'Gene Kranz',
    }
  });

  const book = await process.databases.mongodb.collection('books').findOne({
    title: 'Tough and Competent',
    author: 'Gene Kranz',
  });

  assert.is(book?.owner === user?._id, true);
});
{% /code %}

In the example above, we assume that our setter `create_book` will automatically assign the logged in user's `_id` as the value of `owner` on the book we create.

## API

### test.api.get()

{% code theme="light" %}
test.api.get(getter_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "getter_name": {
    "type": "string",
    "description": "The name of a getter as a string to call in your API."
  },
  "options": {
    "type": "object",
    "description": "The options for the getter request.",
    "properties": {
      "user": {
        "type": "object",
        "description": "The `user` object returned from a call to `test.accounts.signup()`."
      },
      "skip": {
        "type": "boolean",
        "description": "A boolean value that decides if/when a getter request should be skipped."
      },
      "input": {
        "type": "object",
        "description": "The input values for the getter request as an object."
      },
      "output": {
        "type": "array[string]",
        "description": "An array of strings describing which fields to return as output from the getter response. Can use dot notation `like.this` to selectively return nested object fields in the response value."
      }
    }
  }
}
{% /parameters %}

### test.api.set()

{% code theme="light" %}
test.api.set(setter_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "setter_name": {
    "type": "string",
    "description": "The name of a setter as a string to call in your API."
  },
  "options": {
    "type": "object",
    "description": "The options for the setter request.",
    "properties": {
      "user": {
        "type": "object",
        "description": "The `user` object returned from a call to `test.accounts.signup()`."
      },
      "skip": {
        "type": "boolean",
        "description": "A boolean value that decides if/when a setter request should be skipped."
      },
      "input": {
        "type": "object",
        "description": "The input values for the setter request as an object."
      },
      "output": {
        "type": "array[string]",
        "description": "An array of strings describing which fields to return as output from the setter response. Can use dot notation `like.this` to selectively return nested object fields in the response value."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Queues
description: How to test jobs in queues using the test.queues.job() method from @joystick.js/test.
---

To test that specific jobs defined in a queue are working as expected, you can utilize the `test.queues.job()` method exported from `@joystick.js/test`:

{% code theme="light" title="/tests/queues/tasks.js" %}
import test from '@joystick.js/test';

test.that('queue runs the tasks_report job', async (assert = {}) => {
  await test.queues.job('tasks_report', {
    queue: 'tasks',
    payload: {
      week: 'january_4',
      user_id: 'abc123',
    },
  });

  const report = await process.databases.mongodb.collection('task_reports').findOne({
    user_id: 'abc123',
    week: 'january_4',
  })

  assert.is(!!report, true);
});
{% /code %}

Above, using the `test.queues.job()` method, we make a call directly to the `tasks_report` job in our `tasks` queue. To verify our call succeeded, we check that the expected side-effect of a report being added to the `task_reports` collection in our database exists for the `user_id` on the specified `week`.

The idea here is that when testing a job, we're _not_ testing the queue functionality itself (i.e., that the job runs at a specific time). Instead, we're testing that the work being done at whatever time the job runs, runs as expected and creates the intended result.

## API

### test.queues.job()

{% code theme="light" %}
test.queues.job(job_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "job_name": {
    "type": "string",
    "required": true,
    "description": "The name of the job you're trying to test."
  },
  "options": {
    "type": "object",
    "required": true,
    "description": "The options for the job to run.",
    "properties": {
      "queue": {
        "type": "string",
        "required": true,
        "description": "The name of the queue the job you're trying to test is defined on."
      },
      "payload": {
        "type": "object",
        "description": "An optional object of key/value pairs representing the payload for the job."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Routes
description: How to test API routes in your Joystick app using test.routes HTTP methods.
---

Depending on the nature of your app, it can be helpful to author tests for individual routes (e.g., if you're offering a public API and want to test responses). To facilitate this, `@joystick.js/test` includes the `test.routes` object, containing methods for each of Joystick's supported HTTP methods.

- `test.routes.get()` performs an HTTP GET request.
- `test.routes.delete()` performs an HTTP DELETE request.
- `test.routes.patch()` performs an HTTP PATCH request.
- `test.routes.post()` performs an HTTP POST request.
- `test.routes.put()` performs an HTTP PUT request.

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
  const response = await test.routes.get('/api/books');
  assert.is(response?.body?.books?.length === 25, true);
});
{% /code %}

Above, we create a mock test leveraging the `test.routes.get()` method, performing an HTTP GET request to the `/api/books` endpoint in our route. We assume that this endpoint will return us an array of 25 books and write our assertion to verify this.

## Passing a Body

To pass a body with your request (assuming you're performing an HTTP request other than a `GET`), utilize the `body` field on the options object passed to your `test.routes` method:

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
  const response = await test.routes.post('/api/books', { 
    body: {
      title: 'Tough and Competent',
      author: 'Gene Kranz',
    },
  });

  const existing_book = await process.databases.mongodb.collection('books').findOne({
    title: 'Tough and Competent',
  });

  assert.is(existing_book && existing_book?.author === 'Gene Kranz', true);
});
{% /code %}

## Passing Headers

If you need to test a route that relies on custom HTTP headers, you can pass a `headers` object in the options object passed to your `test.routes` method:

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
  const response = await test.routes.post('/api/books', {
    headers: {
      'x-api-key': 'abc1234567890',
    },
    body: {
      title: 'Tough and Competent',
      author: 'Gene Kranz',
    },
  });

  const existing_book = await process.databases.mongodb.collection('books').findOne({
    title: 'Tough and Competent',
  });

  assert.is(existing_book && existing_book?.author === 'Gene Kranz', true);
});
{% /code %}

## Passing Query Params

If you need to test a route that relies on query params, you can pass a `query` object in the options object passed to your `test.routes` method:

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
  const response = await test.routes.get('/api/books', {
    query: {
      limit: 10,
    }
  });

  assert.is(response?.body?.books?.length === 10, true);
});
{% /code %}

## Adding a User

If the route you’re testing calls for it, a `user` object can be passed along with the request being made:

{% code theme="light" title="/tests/index.server.js" %}
import test from '@joystick.js/test';

test.that('the /api/books route returns books', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'example@test.com',
    password: 'password',
  });

  const response = await test.routes.get('/api/books', {
    user
  });

  assert.is(response?.body?.books?.length === 25, true);
});
{% /code %}

## API

### test.routes.get()

{% code theme="light" %}
test.routes.get(route: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "route": {
    "type": "string",
    "required": true,
    "description": "The route to perform an HTTP GET request to."
  },
  "options": {
    "type": "object",
    "description": "The options for the HTTP GET request.",
    "properties": {
      "headers": {
        "type": "object",
        "description": "An object defining the HTTP headers to pass with the request."
      },
      "query": {
        "type": "object",
        "description": "An object defining query parameters to pass with the request."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from a call to `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

### test.routes.delete()

{% code theme="light" %}
test.routes.delete(route: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "route": {
    "type": "string",
    "required": true,
    "description": "The route to perform an HTTP DELETE request to."
  },
  "options": {
    "type": "object",
    "description": "The options for the HTTP DELETE request.",
    "properties": {
      "body": {
        "type": "object",
        "description": "An object defining the HTTP body to pass with the request."
      },
      "headers": {
        "type": "object",
        "description": "An object defining the HTTP headers to pass with the request."
      },
      "query": {
        "type": "object",
        "description": "An object defining query parameters to pass with the request."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from a call to `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

### test.routes.patch()

{% code theme="light" %}
test.routes.patch(route: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "route": {
    "type": "string",
    "required": true,
    "description": "The route to perform an HTTP PATCH request to."
  },
  "options": {
    "type": "object",
    "description": "The options for the HTTP PATCH request.",
    "properties": {
      "body": {
        "type": "object",
        "description": "An object defining the HTTP body to pass with the request."
      },
      "headers": {
        "type": "object",
        "description": "An object defining the HTTP headers to pass with the request."
      },
      "query": {
        "type": "object",
        "description": "An object defining query parameters to pass with the request."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from a call to `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

### test.routes.post()

{% code theme="light" %}
test.routes.post(route: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "route": {
    "type": "string",
    "required": true,
    "description": "The route to perform an HTTP POST request to."
  },
  "options": {
    "type": "object",
    "description": "The options for the HTTP POST request.",
    "properties": {
      "body": {
        "type": "object",
        "description": "An object defining the HTTP body to pass with the request."
      },
      "headers": {
        "type": "object",
        "description": "An object defining the HTTP headers to pass with the request."
      },
      "query": {
        "type": "object",
        "description": "An object defining query parameters to pass with the request."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from a call to `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

### test.routes.put()

{% code theme="light" %}
test.routes.put(route: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "route": {
    "type": "string",
    "required": true,
    "description": "The route to perform an HTTP PUT request to."
  },
  "options": {
    "type": "object",
    "description": "The options for the HTTP PUT request.",
    "properties": {
      "body": {
        "type": "object",
        "description": "An object defining the HTTP body to pass with the request."
      },
      "headers": {
        "type": "object",
        "description": "An object defining the HTTP headers to pass with the request."
      },
      "query": {
        "type": "object",
        "description": "An object defining query parameters to pass with the request."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from a call to `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing Uploaders
description: How to test uploaders in your Joystick app using the test.uploaders.upload() method.
---

To verify that one of your [uploaders](/joystick/node/uploads/defining-an-uploader) is working as expected, the `test.uploaders.upload()` method can be utilized:

{% code theme="light" title="/tests/uploaders/profile_photo.js" %}
import test from '@joystick.js/test';

test.that('uploader works as expected', async (assert = {}) => {
  const user = await test.accounts.signup({
    email_address: 'tommy@callahanauto.com',
    password: 'chickenwings',
    metadata: {
      name: 'Tommy Callahan',
    },
  });

  const response = await test.uploaders.upload('profile_photo', {
    user,
    files: [test.utils.create_file(256, 'headshot.jpg', 'image/jpg')],
    input: {
      description: 'Tommy in a suit and tie.',
    }
  });
  
  assert.is(response[0]?.url === 'uploads/profile_photos/headshot.jpg', true);
});
{% /code %}

Above, we start our test by creating a user who will be associated with the file being uploaded. Next, we call to our `profile_photo` uploader, assuming that the uploader will upload a profile photo to the `uploads/profile_photos` directory in our app. To keep our test stable, we use the `test.utils.create_file()` method to generate a mock `.jpg` file in memory with 256 bytes of data.

Additionally, we also pass an `input` object with a `description` of the photo being uploaded.

{% alert icon="triangle-alert" theme="warning" title="Uploads are hot/real" %}
Keep in mind that files uploaded by your tests are *actually uploaded to your specified providers*. This is done to verify that uploads actually work. It's recommended that if you're uploading to a non-local upload target, you use that provider's APIs (e.g., Amazon S3) to verify the upload exists in the specified location.
{% /alert %}

## API

### test.uploaders.upload()

{% code theme="light" %}
test.uploaders.upload(uploader_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "uploader_name": {
    "type": "string",
    "required": true,
    "description": "The name of the uploader to call."
  },
  "options": {
    "type": "object",
    "required": true,
    "description": "The options for the upload.",
    "properties": {
      "files": {
        "type": "array[File]",
        "required": true,
        "description": "An array containing the files to upload."
      },
      "input": {
        "type": "object",
        "description": "Optional input to pass along with the upload."
      },
      "user": {
        "type": "object",
        "description": "A user object returned from `test.accounts.signup()`."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Testing WebSockets
description: How to test WebSocket endpoints in your Joystick app using the test.websockets.connect() method.
---

While their utility is limited due to the nature of WebSockets, tests can be authored to verify WebSocket connection endpoints exist and are working as expected via the `test.websockets.connect()` method from `@joystick.js/test`:

{% code theme="light" title="/tests/websockets/chat_messages.js" %}
import test from '@joystick.js/test';

test.that('the websocket message is sent and received on the server', async (assert = {}) => {
  const connection = await test.websockets.connect('chat_messages');

  connection.send({
    message: 'Hey, did you get the Q3 report I sent?'
  });

  connection.close();

  const function_calls = await test.utils.get_function_calls('node.websockets.chat_messages.on_message'); 

  assert.like(function_calls[0]?.args[0], {
    message: 'Hey, did you get the Q3 report I sent?'
  });
});
{% /code %}

Above, using the `test.websockets.connect()` method, we establish a connection to a hypothetical `chat_messages` WebSocket endpoint. Next, we call the `connection.send()` method to send a payload containing a `message` we want to relay via WebSockets.

After our message is sent, we make sure to close the connection with `connection.close()` (important as open connections can cause the test runner to hang unexpectedly and time out).

Finally, to assert our message made it to the server, we call to `test.utils.get_function_calls()`, retrieving the value of `node.websockets.chat_messages.on_message`, which is an array containing all calls to our `chat_messages` WebSocket server's `on_message()` method.

To assert our test works, we check that the function calls to `on_message()` contain a message like the one we sent above.

## API

### test.websockets.connect()

{% code theme="light" %}
test.websockets.connect(server_name: string) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "server_name": {
    "type": "string",
    "required": true,
    "description": "The name of the WebSocket server to connect to."
  }
}
{% /parameters %}

### Returns

{% code theme="light" %}
{
  send: function,
  close: function,
}
{% /code %}

{% parameters %}
{
  "send": {
    "type": "function",
    "description": "A function receiving an object containing the `message` to send to the WebSocket server."
  },
  "close": {
    "type": "function",
    "description": "A function to close the open WebSocket connection."
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Tracking Function Calls
description: How to track and verify function calls in your Joystick app using test.utils.function_called() and test.utils.get_function_calls().
---

Internally in `@joystick.js/ui` and `@joystick.js/node`, for tests, function calls are automatically tracked to all core APIs. This allows you to test the behavior of your app in a nearly-transparent way, confirming that what you intended to call was called without the need for excessive mocking or heavy instrumentation at the app level.

## Accessing Calls

To access calls to any of the listed "Tracked Calls" below, the `test.utils.get_function_calls()` method can be utilized:

{% code theme="light" %}
const calls = await test.utils.get_function_calls('<tracked_call_path>');
{% /code %}

## Check If Function Called

To check if a specific function has received any calls (with a `boolean` response), the `test.utils.function_called()` method can be utilized:

{% code theme="light" %}
const function_called = await test.utils.function_called('<tracked_call_path>');
{% /code %}

## Tracked Calls

The following calls are tracked across `@joystick.js/ui` and `@joystick.js/node`. Below, the path of the tracked calls that you would pass to the `test.utils.get_function_calls()` or `test.utils.function_called()` methods described above are listed.

### @joystick.js/ui

In components, function calls can be tracked on a per-component basis by utilizing the `test.name` value in your component options. If this is not available, Joystick will create a random ID to group together function calls for a component.

#### Lifecycle Function Calls

- `ui.<test.name || random_id>.render_for_mount`
- `ui.<test.name || random_id>.rerender`
- `ui.<test.name || random_id>.lifecycle.on_before_mount`
- `ui.<test.name || random_id>.lifecycle.on_mount`
- `ui.<test.name || random_id>.lifecycle.on_before_render`
- `ui.<test.name || random_id>.lifecycle.on_render`
- `ui.<test.name || random_id>.lifecycle.on_update_props`
- `ui.<test.name || random_id>.lifecycle.on_refetch_data`
- `ui.<test.name || random_id>.lifecycle.on_before_unmount`

#### Data

- `ui.<test.name || random_id>.data.refetch`

#### Events

- `ui.<test.name || random_id>.events.<event_type>.selector_<selector>`

#### Methods

- `ui.<test.name || random_id>.methods.<method_name>`

#### Uploads

- `ui.upload.<uploader_name>`

#### Websockets

- `ui.<test.name || random_id>.websockets.send`
- `ui.<test.name || random_id>.websockets.on_open`
- `ui.<test.name || random_id>.websockets.on_message`
- `ui.<test.name || random_id>.websockets.on_close`

#### Instance Methods

- `ui.<test.name || random_id>.set_interval`
- `ui.<test.name || random_id>.set_timeout`
- `ui.<test.name || random_id>.set_state`

### @joystick.js/node

On the server, function calls are tracked globally (as there is only one server instance to track calls for).

#### Actions

- `node.actions.<action_name>.abort`
- `node.actions.<action_name>.run`
- `node.actions.<action_name>.steps.<step_name>`
- `node.actions.<action_name>.steps.<step_name>.on_success`
- `node.actions.<action_name>.steps.<step_name>.on_error`

#### API

- `node.api.getters.<getter_name>`
- `node.api.getters.<getter_name>.authorized`
- `node.api.setters.<setter_name>`
- `node.api.setters.<setter_name>.authorized`

#### Email

- `node.email.send`

#### Queues

- `node.queues.<queue_name>.jobs.<job_name>`

#### Uploaders

- `node.uploaders.<uploader_name>.on_before_upload`
- `node.uploaders.<uploader_name>.on_after_upload`
- `node.uploaders.<uploader_name>.file_name`
- `node.uploaders.<uploader_name>.max_size_in_megabytes`

#### Websockets

- `node.websockets.<server_name>.send`
- `node.websockets.<server_name>.on_open`
- `node.websockets.<server_name>.on_message`
- `node.websockets.<server_name>.on_close`

## API

### test.utils.function_called()

{% code theme="light" %}
test.utils.function_called(tracked_call_path: string) => Promise -> boolean;
{% /code %}

### Parameters

{% parameters %}
{
  "tracked_call_path": {
    "type": "string",
    "required": true,
    "description": "Either [a pre-defined Joystick call path](#tracked-calls), or a custom call path used in your app."
  }
}
{% /parameters %}

### test.utils.get_function_calls()

{% code theme="light" %}
test.utils.get_function_calls(tracked_call_path: string) => Promise -> array[object];
{% /code %}

### Parameters

{% parameters %}
{
  "tracked_call_path": {
    "type": "string",
    "required": true,
    "description": "Either [a pre-defined Joystick call path](#tracked-calls), or a custom call path used in your app."
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Unit Testing Functions
description: How to unit test functions in your Joystick app using the test.load() method.
---

Unit testing in your app should be reserved for testing individual, standalone functions (i.e., "units" of code). To unit test a function, the `test.load()` method can be utilized:

{% code theme="light" title="/tests/lib/add.test.js" %}
import test from '@joystick.js/test';

test.that('add function adds two numbers together', async (assert = {}) => {
  const add = await test.load('lib/add.js', { default: true });
  assert.is(add(5, 5), 10);
});
{% /code %}

Above, we've utilized the `test.load()` method to dynamically import a function we want to unit test in our app at `/lib/add.js`. When we call `test.load()`, a dynamic import of that path is performed. Because we expect `/lib/add.js` to export the `add()` function as a default export, we pass `{ default: true }` as the second argument to `test.load()` to ensure that we're handed back the default export and not an object like `{ default: [Function add] }`.

## API

### Definition

{% code theme="light" %}
test.load(path: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "path": {
    "type": "string",
    "required": true,
    "description": "The path relative to the root of your project that you want to load dynamically."
  },
  "options": {
    "type": "object",
    "description": "Options for test.load().",
    "properties": {
      "default": {
        "type": "boolean",
        "description": "If set to `true`, tells `test.load()` that the file being loaded has a JavaScript `export default` statement and that the `_default` value on the returned object should be returned from `test.load()` (as opposed to the object with all of the file's exports)."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/test"
title: Writing Tests
description: How to write tests for your Joystick app using the @joystick.js/test package.
---

Writing tests for your Joystick app starts and ends with the `@joystick.js/test` package (installed for you when running `joystick create <app_name>`), and more specifically, the `test.that()` method on the default export from that package.

Behind the scenes, Joystick relies on the [Ava](https://github.com/avajs/ava) test runner. The `@joystick.js/test` package adds some helpful utilities around that library designed specifically for testing a Joystick app.

## Example Usage

To showcase an example of writing a test, assume we have a generic function in our `/lib` folder called `add()` that adds two numbers together:

{% code theme="light" title="/lib/add.js" %}
const add = (n1 = 0, n2 = 0) => {
  return n1 + n2;
};

export default add;
{% /code %}

To write a test for this function, we'd create a file in our `/tests` directory at `/tests/lib/add.test.js`:

{% code theme="light" title="/tests/lib/add.test.js" %}
import test from '@joystick.js/test';

test.that('add function adds two numbers together', async (assert = {}) => {
  const add = await test.load('lib/add.js', { default: true });
  assert.is(add(5, 5), 10);
});
{% /code %}

Above, we import the `test` default export from `@joystick.js/test`. That export is an `object` containing various methods for writing your tests.

Here, we use the `test.that()` function to write an individual test. `test.that()` takes a string describing the test being performed as the first argument and a callback function to perform the test. That callback function receives an object `assert` which contains [various assertion methods](https://github.com/avajs/ava/blob/main/docs/03-assertions.md) for verifying the result of our test.

Inside of the test function, we utilize the `test.load()` method from `@joystick.js/test` which helps us to dynamically import code from our app. We give it a path relative to the root of our project as the first argument and as the second, an options object with `default` set to `true`, telling `.load()` to hand us the default export from the file at that path.

What we expect to get in return is the `add()` function we defined in that file. To test it, we call to `assert.is()` passing a call to the function `add(5, 5)` to add two numbers together. As the second argument to `assert.is()` we pass the expected result `10`.

When we run this test in our CLI with `joystick test`, we'd expect to get back a passing test. If we were to modify the above example to the following, we'd expect to get back a _failing_ test:

{% code theme="light" title="/tests/lib/add.test.js" %}
import test from '@joystick.js/test';

test.that('add function adds two numbers together', async (assert = {}) => {
  const add = await test.load('lib/add.js', { default: true });
  assert.is(add(5, 3), 10);
});
{% /code %}

This is the core of writing a test for a Joystick app. While there are several other helper methods for testing specific functionality, this is all you need to know to get your hands dirty.

## API

### Definition

{% code theme="light" %}
test.that(test_description: string, callback: function) => void;
{% /code %}

### Parameters

{% parameters %}
{
  "test_description": {
    "type": "string",
    "required": true,
    "description": "A string describing what the test is testing (e.g., 'the alert fires when the button is clicked')."
  },
  "callback": {
    "type": "function",
    "required": true,
    "description": "The function called to execute the test. Can optionally be async if any of the code inside the callback returns a Promise. Receives a single argument `assert` as an object containing [Ava assertion methods](https://github.com/avajs/ava/blob/main/docs/03-assertions.md#built-in-assertions)."
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/ui"
title: accounts.authenticated()
description: How to use the <code>accounts.authenticated()</code> method in your app.
---

To check whether or not there's a currently authenticated, you can utilize the `accounts.authenticated()` method. This method returns a `Boolean` response of either `true` or `false`.

{% alert icon="user" theme="info" title="How to Get the Authenticated User" %}
If you'd like to get the full, currently authenticated user, you can utilize the `accounts.user()` method [defined here](/joystick/ui/accounts/user).
{% /alert %}

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const Dashboard = joystick.component({
  events: {
    'click .logout': async (event = {}, instance = {}) => {
      if (await accounts.authenticated()) {
        await accounts.logout();
        location.pathname = '/login';
      }
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="dashboard">
        <nav>
          <a href="/"><img src="/logo.svg" alt="Brand" /></a>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/friends">Friends</a></li>
            <li><a href="/messages">Messages</a></li>
            <li class="logout"><a href="#">Logout</a></li>
          </ul>
        </nav>
      </div>
    `;
  },
});

export default Dashboard;
{% /code %}

## API

{% code theme="light" %}
accounts.authenticated() => promise(boolean)
{% /code %}

{% alert icon="code-xml" title="This method does not support any parameters." %}{% /alert %}
---
category: "@joystick.js/ui"
title: accounts.login()
description: How to use the <code>accounts.login()</code> method in your app.
---

To log an existing user into your app, you can utilize the `accounts.login()` method. This method returns an object representing the current user.

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const Login = joystick.component({
  events: {
    'submit form': async (event = {}, instance = {}) => {
      accounts.login({
        email_address: event.target.email_address.value,
        password: event.target.password.value,
      }).then(() => {
        location.pathname = '/dashboard';
      }).catch(({ errors }) => {
        // NOTE: All errors are collected into an array of error objects.
        window.alert(errors?.[0]?.message);
      });
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="login">
        <form>
          <label>Email Address</label>
          <input type="email" name="email_address" placeholder="Email Address" />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" /> 
          <button>Log In</button>
        </form>
      </div>
    `;
  },
});

export default Login;
{% /code %}

## API

{% code theme="light" %}
accounts.login(options: object) => promise(user: object)
{% /code %}

{% parameters %}
{
   "email_address":{
      "type":"string",
      "required": true,
      "description": "The user's email address."
   },
   "username":{
      "type":"string",
      "required": false,
      "description": "The user's username. Can optionally be used as an alternative to `email_address`."
   },
   "password":{
      "type": "string",
      "required": true,
      "description": "The user's password."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: accounts.logout()
description: How to use the <code>accounts.logout()</code> method in your app.
---

To logout the current user in your app, you can utilize the `accounts.logout()` method.

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const Dashboard = joystick.component({
  events: {
    'click .logout': async (event = {}, instance = {}) => {
      await accounts.logout();
      location.pathname = '/login';
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="dashboard">
        <nav>
          <a href="/"><img src="/logo.svg" alt="Brand" /></a>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/friends">Friends</a></li>
            <li><a href="/messages">Messages</a></li>
            <li class="logout"><a href="#">Logout</a></li>
          </ul>
        </nav>
      </div>
    `;
  },
});

export default Dashboard;
{% /code %}

## API

{% code theme="light" %}
accounts.logout() => promise()
{% /code %}

{% alert icon="code-xml" title="This method does not support any parameters." %}{% /alert %}
---
category: "@joystick.js/ui"
title: accounts.recover_password()
description: How to use the <code>accounts.recover_password()</code> method in your app.
---

To start the password recovery process for a user in your app, you can utilize the `accounts.recover_password()` method.

After a successful call, Joystick will generate a password recovery token and store it on the user.

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const RecoverPassword = joystick.component({
  events: {
    'submit form': async (event = {}, instance = {}) => {
      accounts.recover_password({
        email_address: event.target.email_address.value,
      }).then(() => {
        location.pathname = '/login';
      }).catch(({ errors }) => {
        // NOTE: All errors are collected into an array of error objects.
        window.alert(errors?.[0]?.message);
      });
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="recover-password">
        <form>
          <label>Email Address</label>
          <input type="email" name="email_address" placeholder="Email Address" />
          <button>Recover Password</button>
        </form>
      </div>
    `;
  },
});

export default RecoverPassword;
{% /code %}

{% alert theme="info" icon="mail" title="Uses Reset Password Template" %}
When sending the email triggered by calling `accounts.recover_password()`, Joystick will check to see if you have [a template defined](/joystick/node/email/accounts-emails) at `email/reset_password.js`. Before running this in production, make sure to create this template and match it to your app's branding.
{% /alert %}

## API

{% code theme="light" %}
accounts.recover_password(options: object) => promise()
{% /code %}

{% parameters %}
{
   "email_address":{
      "type":"string",
      "required": true,
      "description": "The user's email address."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: accounts.reset_password()
description: How to use the <code>accounts.reset_password()</code> method in your app.
---

To reset the password for a user in your app, you can utilize the `accounts.reset_password()` method.

After a successful call, Joystick will automatically create a new session for the user and log them in (you will be responsible for navigating the user afterward).

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const ResetPassword = joystick.component({
  events: {
    'submit form': async (event = {}, instance = {}) => {
      accounts.reset_password({
        // NOTE: Assumes that the reset token generated by Joystick is stored in a URL
        // parameter called :token in the route for your Reset Password page.
        token: instance?.url?.params?.token,
        password: event.target.new_password.value,
      }).then(() => {
        location.pathname = '/dashboard';
      }).catch(({ errors }) => {
        // NOTE: All errors are collected into an array of error objects.
        window.alert(errors?.[0]?.message);
      });
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="reset-password">
        <form>
          <label>New Password</label>
          <input type="password" name="new_password" placeholder="New Password" />
          <label>Repeat New Password</label>
          <input type="password" name="repeat_new_password" placeholder="Repeat New Password" />
          <button>Reset Password</button>
        </form>
      </div>
    `;
  },
});

export default ResetPassword;
{% /code %}

## API

{% code theme="light" %}
accounts.reset_password(options: object) => promise()
{% /code %}

{% parameters %}
{
   "token":{
      "type":"string",
      "required": true,
      "description": "The user's password reset token generated by Joystick."
   },
   "password":{
      "type":"string",
      "required": true,
      "description": "The user's new password."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: accounts.signup()
description: How to use the <code>accounts.signup()</code> method in your app.
---

To create a new user for your app, you can utilize the `accounts.signup()` method. This method returns an object representing the current user.

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const Signup = joystick.component({
  events: {
    'submit form': async (event = {}, instance = {}) => {
      accounts.signup({
        email_address: event.target.email_address.value,
        password: event.target.password.value,
      }).then(() => {
        location.pathname = '/dashboard';
      }).catch(({ errors }) => {
        // NOTE: All errors are collected into an array of error objects.
        window.alert(errors?.[0]?.message);
      });
    },
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="signup">
        <form>
          <label>Email Address</label>
          <input type="email" name="email_address" placeholder="Email Address" />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" /> 
          <button>Sign Up</button>
        </form>
      </div>
    `;
  },
});

export default Signup;
{% /code %}

## API

{% code theme="light" %}
accounts.signup(options: object) => promise(user: object)
{% /code %}

{% parameters %}
{
   "email_address":{
      "type":"string",
      "required": true,
      "description": "The new user's email address."
   },
   "username":{
      "type":"string",
      "required": false,
      "description": "The new user's username. Can optionally be used as an alternative to `email_address`."
   },
   "password":{
      "type": "string",
      "required": true,
      "description": "The new user's password."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: accounts.user()
description: How to use the <code>accounts.user()</code> method in your app.
---

To get the currently authenticated user for your app, you can utilize the `accounts.user()` method. This method returns a **client-safe** object representing the current user.

{% alert theme="warning" icon="user" title="Client-Only Method" %}
This method is client-only as it's dependent on the global <code>window</code> object. If used in server-executed code, this method will throw an error.
{% /alert %}

## Example Usage

{% code theme="light" title="Example Usage" %}
import joystick, { accounts } from '@joystick.js/ui';

const Profile = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      user: await accounts.user(),
    };
  },
  render: ({ props, state, data, each, when, methods }) => {
    return `
      <div class="profile">
        <header>
          <h2>Hey, ${data?.user?.name?.first}!</h2>
        </header>
        ...
      </div>
    `;
  },
});

export default Profile;
{% /code %}

## API

{% code theme="light" %}
accounts.user() => promise(user: object)
{% /code %}

{% alert icon="code-xml" title="This method does not support any parameters." %}{% /alert %}
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/ui"
title: Get
description: How to call getters in your API directly from Joystick components.
---

To call a getter from your API directly, use the `get()` method imported from `@joystick.js/ui`.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick, { get } from '@joystick.js/ui';

const Book = joystick.component({
  state: {
    author: null,
  },
  events: {
    'click .author-name': (event = {}, instance = {}) => {
      get('author', {
        input: {
          author_id: event?.target?.getAttribute('data-author-id'),
        }
      }).then((author) => {
        instance.set_state({ author });
      });
    },
  },
  render: ({ props, state, when }) => {
    return `
      <div>
        <header>
          <h1>${props?.book?.title}</h1>
          <h5 data-author-id="${props?.book?.author?._id}" class="author-name">${props?.book?.author?.name}</h5>
          ${when(state?.author, `
            <div class="author">
              <img src="${state?.author?.avatar}" alt="${state?.author?.name}" />
              <h4>${state?.author?.name}</h4>
              <p>${state?.author?.biography}</p>
            </div>
          `)}
        </header>
      </div>
    `;
  },
});

export default Book;
{% /code %}

In the example above, we fetch additional information about a book’s author when clicking their name. The `get()` method sends an API request to the `author` getter on the server. Once the response is received, we copy the `author` data to the component’s `state`, triggering a re-render and displaying additional author details.

## API

### Definition

{% code theme="light" %}
get(getter_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "getter_name": {
    "type": "string",
    "required": true,
    "description": "The name of a getter to call in your API."
  },
  "options": {
    "type": "object",
    "required": false,
    "description": "Options for the getter request.",
    "children": {
      "skip": {
        "type": "boolean",
        "required": false,
        "description": "A boolean value that determines whether the getter request should be skipped. Defaults to false."
      },
      "input": {
        "type": "object",
        "required": false,
        "description": "An object containing input values to send with the getter request."
      },
      "output": {
        "type": "array[string]",
        "required": false,
        "description": "An array of strings defining which fields to return from the getter response. Supports dot notation (e.g., 'author.name')."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Set
description: How to call setters in your API directly from Joystick components.
---

To call a setter from your API directly, use the `set()` method imported from `@joystick.js/ui`.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick, { set } from '@joystick.js/ui';

const Book = joystick.component({
  events: {
    'click .fa-star': (event = {}, instance = {}) => {
      set('favorite_author', {
        input: {
          author_id: event?.target?.closest('.author-name')?.getAttribute('data-author-id'),
        }
      }).then(() => {
        location.reload();
      });
    },
  },
  render: ({ props }) => {
    return `
      <div>
        <header>
          <h1>${props?.book?.title}</h1>
          <h5 data-author-id="${props?.book?.author?._id}" class="author-name">
            ${props?.book?.author?.name} <i class="fas fa-star"></i>
          </h5>
        </header>
      </div>
    `;
  },
});

export default Book;
{% /code %}

In the example above, clicking the star icon triggers the `set()` method to call the `favorite_author` setter on the server. The `author_id` is passed as input, and once the request completes successfully, the page reloads to reflect the updated data.

## API

### Definition

{% code theme="light" %}
set(setter_name: string, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "setter_name": {
    "type": "string",
    "required": true,
    "description": "The name of the setter to call in your API."
  },
  "options": {
    "type": "object",
    "required": false,
    "description": "Options for the setter request.",
    "children": {
      "skip": {
        "type": "boolean",
        "required": false,
        "description": "A boolean value that determines whether the setter request should be skipped. Defaults to false."
      },
      "input": {
        "type": "object",
        "required": false,
        "description": "An object containing input values to send with the setter request."
      },
      "output": {
        "type": "array[string]",
        "required": false,
        "description": "An array of strings defining which fields to return from the setter response. Supports dot notation (e.g., 'user.profile.name')."
      }
    }
  }
}
{% /parameters %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/ui"
title: cache()
description: How to use the `cache()` method to create and initialize a client-side cache.
---

In Joystick, the `cache()` method helps you to create a client-side, global state cache for your app (think like [Redux](https://redux.js.org) but specific to Joystick). A cache can be initialized with a default value and returns an instance with methods for modifying the cache and listening for changes.

{% alert icon="database" theme="info" title="Global State" %}
As a convenience, Joystick initializes a default cache for your app and exposes it via the named export `global_state` from `@joystick.js/ui`. `global_state` is just an alias for the instance returned by the `cache()` method documented below.
{% /alert %}

## Example Usage

Inside of our `App` [layout component](/joystick/concepts/component-types), we import `cache` from `@joystick.js/ui` and initialize our global state at `window.player_state`.

To initialize our cache, we call `cache('<cache_name>', <default_state>)`, here within the `lifecycle.on_mount` method of our `App` layout component:

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick, { cache } from '@joystick.js/ui';
import Player from '../../components/player/index.js';

const App = joystick.component({
  state: {
    player: null,
  },
  lifecycle: {
    on_mount: (instance = {}) => {
      window.player_state = cache('player', {});
    },  
  },
  render: ({ component, props }) => {
    return `
      <div class="app">
        ${component(props.page, props)}
        ${component(Player, { state: state?.player })}
      </div>
    `;
  },
});

export default App;
{% /code %}

Here, we initialize our cache with an empty object as we do not have any default values to set (if you did, you'd pass them as the second argument as shown above).

{% alert icon="database" theme="warning" title="Cache Value is Type-Agnostic" %}
When setting a default value, be mindful of the data type that you use (e.g., an object, string, number, etc). Whenever you use the cache, you will want to match this type expectation. In other words, for an object-initialized cache, assume you're modifying an object; for a number-initialized cache, assume you're modifying a number.
{% /alert %}

## API

{% code theme="light" %}
cache(cache_name: string, default_value: any) => object
{% /code %}

{% parameters %}
{
   "cache_name":{
      "type":"string",
      "required": true,
      "description": "The name of the cache."
   },
   "default_value":{
      "type":"string",
      "required": false,
      "description": "The default value for the cache. Accepts any data type."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: cache.get()
description: How to use the `cache.get()` method to get the current value of an existing cache.
---

Once you [have an existing cache](/joystick/ui/cache/cache), to retrieve the current value, you can utilize the `.get()` method (defined on the object returned when initializing the cache).

## Example Usage

{% code theme="light" title="ui/components/player/index.js" %}
import joystick from '@joystick.js/ui';

const Player = joystick.component({
  lifecycle: {
    on_render: () => {
      // NOTE: Logs the current value of the player_state cache.
      console.log(window.player_state.get());
    },
  },
  events: {
    ...
  },
  render: ({ props, state }) => {
    return `
      <div class="player">
        ...
      </div>
    `;
  },
});

export default Player;
{% /code %}

## API

{% code theme="light" %}
cache.get() => any
{% /code %}

{% alert icon="code-xml" title="This method does not support any parameters." %}{% /alert %}
---
category: "@joystick.js/ui"
title: cache.on()
description: How to use the `cache.on()` method to listen to cache events.
---

Once you [have an existing cache](/joystick/ui/cache/cache), to listen for events on that cache, you can utilize the `.on()` method (defined on the object returned when initializing the cache).

## Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick, { cache } from '@joystick.js/ui-canary';
import Player from '../../components/player/index.js';

const App = joystick.component({
  state: {
    player: null,
  },
  lifecycle: {
    on_mount: (instance = {}) => {
      window.player_state = cache('player', {});
      
      // NOTE: Listen for changes on player_state and copy the player state to
      // the local state of the App layout component.
      player_state.on('change', (state = {}) => {
        instance.set_state({ player: state?.player });
      });
    },  
  },
  render: ({ component, props, state, data, each, when, methods }) => {
    return `
      <div class="app">
        ${component(props.page, props)}
        ${component(Player, { state: state?.player })}
      </div>
    `;
  },
});

export default App;
{% /code %}

## API

### Definition
{% code theme="light" %}
cache.on(event: string, callback: function) => undefined
{% /code %}

### Parameters
{% parameters %}
{
   "event":{
      "type": "string",
      "required": false,
      "description": "The name of the event to listen for. One of: change, set, unset."
   },
   "callback":{
      "type": "function",
      "required": false,
      "description": "The function to call when the specified event occurs."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: cache.set()
description: How to use the `cache.set()` method to modify an existing cache.
---

Once you [have an existing cache](/joystick/ui/cache/cache), to modify the current value, you can utilize the `.set()` method (defined on the object returned when initializing the cache).

## Example Usage

For this example, we're using [the cache that we defined here](/joystick/ui/cache/cache).

{% code theme="light" title="ui/components/player/index.js" %}
import joystick from '@joystick.js/ui';

const Player = joystick.component({
  events: {
    'click .play': (event = {}, instance = {}) => {
      window.player_state.set((state = {}) => {
        return {
          player: {
            ...(state || {}),
            playing: true,
          },
        };
      }, 'CHANGE_PLAYING_STATE');
    },
    'click .pause': (event = {}, instance = {}) => {
      window.player_state.set((state = {}) => {
        return {
          player: {
            ...(state || {}),
            playing: false,
          },
        };
      }, 'CHANGE_PLAYING_STATE');
    },
  },
  render: ({ props, state }) => {
    return `
      <div class="player">
        <header>
          <ul>
            <li class="previous"><i class="mod-icon-skip-back"></i></li>
            <li class="${props?.state?.playing ? 'pause' : 'play'}">
              <i class="mod-icon-${props?.state?.playing ? 'pause' : 'play'}"></i>
            </li>
            <li class="next"><i class="mod-icon-skip-forward"></i></li>
          </ul>
        </header>
        <footer>
          <div class="progress-bar">
            <div class="progress" style="width: ${(state?.player?.current_time / state?.player?.total_time) * 100}%;"></div>
          </div>
        </footer>
      </div>
    `;
  },
});

export default Player;
{% /code %}

To change the cache state, above, we reference `player_state` on the `window` and whenever we have a click on either our `.play` or `.pause` element, call to `player_state.set()` to set the state. To the `.set()` method, we pass a callback function that will be called automatically, passing the current state for us to modify. As a return value, we return the modified state object that will become the _new_ current value.

As an example, we all pass a custom `user_event_label` to `.set()` which gives us a way to identify the change being made to the cache (beyond the built-in `set`, `change`, and `unset` event types).

## API

### .set()

#### Definition
{% code theme="light" %}
cache.set(callback: function, user_event_label: string) => void
{% /code %}

#### Parameters
{% parameters %}
{
   "callback":{
      "type":"function",
      "required": true,
      "description": "A function that will be called passing the current state value, returning an updated version of the state value."
   },
   "user_event_label":{
      "type":"string",
      "required": false,
      "description": "A custom label for the change being made to the cache that's passed to the callback function to identify the change."
   }
}
{% /parameters %}

### .set() callback

#### Definition
{% code theme="light" %}
(current_state: any, internal_event_label: string, user_event_label: string) => object
{% /code %}

#### Parameters
{% parameters %}
{
   "current_state":{
      "type":"any",
      "required": false,
      "description": "The current value of the cache."
   },
   "internal_event_label":{
      "type":"string",
      "required": false,
      "description": "The generic, internal label used to describe the event taking place on the cache (e.g., set, change. or unset)."
   },
   "user_event_label":{
      "type":"string",
      "required": false,
      "description": "A custom label for the change being made to the cache that's passed to the callback function to identify the change."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: cache.unset()
description: How to use the `cache.unset()` method to clear an existing cache.
---

Once you [have an existing cache](/joystick/ui/cache/cache), to clear the current value, you can utilize the `.unset()` method (defined on the object returned when initializing the cache).

## Example Usage

{% code theme="light" title="ui/components/player/index.js" %}
import joystick from '@joystick.js/ui';

const Player = joystick.component({
  events: {
    'click .clear-player': (event = {}, instance = {}) => {
      window.player_state.unset();
    },
    'click .play': (event = {}, instance = {}) => {
      ...
    },
    'click .pause': (event = {}, instance = {}) => {
      ...
    },
  },
  render: ({ props, state }) => {
    return `
      <div class="player">
        <header>
          <ul>
            <li class="previous"><i class="mod-icon-skip-back"></i></li>
            <li class="${props?.state?.playing ? 'pause' : 'play'}">
              <button>${props?.state?.playing ? 'pause' : 'play'}</button>
            </li>
            <li class="next"><i class="mod-icon-skip-forward"></i></li>
            <li class="clear-player"><i class="mod-icon-x"></i></li>
          </ul>
        </header>
        <footer>
          <div class="progress-bar">
            <div class="progress" style="width: ${(state?.player?.current_time / state?.player?.total_time) * 100}%;"></div>
          </div>
        </footer>
      </div>
    `;
  },
});

export default Player;
{% /code %}

## API

### Definition
{% code theme="light" %}
cache.unset(path: string, user_event_label: string) => undefined
{% /code %}

### Parameters
{% parameters %}
{
   "path":{
      "type": "string",
      "required": false,
      "description": "An dot-notated path (e.g., 'player.playing') for a specific value in the cache you want to unset."
   },
   "user_event_label":{
      "type": "string",
      "required": false,
      "description": "A custom label for the change being made to the cache that's passed to event listeners to identify the change."
   }
}
{% /parameters %}
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/ui"
title: joystick.component()
description: How to use the `joystick.component()` method to create components for your UI.
---

In Joystick, the `component()` method is used to define components for your UI. A component is created by calling the `component()` method (passing an options object which defines the HTML it renders and its behavior) and exporting it as the `default` from the file it's defined within.

When defining a component, it should be placed in one of the following paths: `ui/components`, `ui/layouts`, or `ui/pages`. Inside of those folders, each component should be defined following this structure:

{% code theme="light" %}
ui/<components|layouts|pages>/<component_name>/index.js
{% /code %}

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  render: () => {
    return `
      <div class="index">
        <p>This is the index page. You can render any HTML you wish here.</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

## API

{% parameters %}
{
  "css": {
    "type": "string|object|function",
    "required": false,
    "description": "A string containing the CSS for the component. If defined as an object, can specify breakpoints at min/max width and height. If defined as a function, receives the component instance as an argument."
  },
  "data": {
    "type": "function",
    "required": false,
    "description": "A function that's called on the server during server-side rendering (SSR) that fetches data from your API or another location (e.g., a third-party API)."
  },
  "default_props": {
    "type": "object|function",
    "required": false,
    "description": "An object defining the default props for the component. If defined as a function, must return an object representing the default props. When using a function, the full component instance is passed to the function."
  },
  "events": {
    "type": "object",
    "required": false,
    "description": "An object defining the event listeners for the component. The key follows a pattern of <code>&lt;event&gt; &lt;selector&gt;</code> and the value is the function to call when the event fires."
  },
  "lifecycle": {
    "type": "object",
    "required": false,
    "description": "An object defining different lifeycle methods for the component.",
    "children": {
      "on_before_mount": {
        "type": "function",
        "required": false,
        "description": "A function called before a component is mounted to the screen."
      },
      "on_before_render": {
        "type": "function",
        "required": false,
        "description": "A function called before a component is rendered to the screen (both at mount time and re-render time)."
      },
      "on_before_unmount": {
        "type": "function",
        "required": false,
        "description": "A function called right before the browser rendering the component is closed."
      },
      "on_mount": {
        "type": "function",
        "required": false,
        "description": "A function called immediately after the component is mounted to the screen."
      },
      "on_refetch_data": {
        "type": "function",
        "required": false,
        "description": "A function called immediately after the data.refetch() method is called on the component."
      },
      "on_render": {
        "type": "function",
        "required": false,
        "description": "A function called immediately after a component renders (both at mount time and re-render time)."
      },
      "on_update_props": {
        "type": "function",
        "required": false,
        "description": "A function called immediately after a component renders with new props."
      }
    }
  },
  "methods": {
    "type": "object",
    "required": false,
    "description": "An object containing miscellaneous functions defined as methods."
  },  
  "render": {
    "type": "function",
    "required": true,
    "description": "A function that returns the HTML defining your component. Receives a single argument (the component instance) as an object."
  },
  "state": {
    "type": "object|function",
    "required": false,
    "description": "An object defining the default state for the component. If defined as a function, must return an object representing the default state. When using a function, the full component instance is passed to the function."
  },
  "test": {
    "type": "object",
    "required": false,
    "description": "An object defining test-related options for the component.",
    "children": {
      "name": {
        "type": "string",
        "required": false,
        "description": "A name identifier to use when tracking function calls to the component instance in tests."
      }
    }
  },
  "websockets": {
    "type": "function",
    "required": false,
    "description": "A function returning an object defining the websocket server endpoints to establish a client connection to and event handlers for inbound messages."
  },
  "wrapper": {
    "type": "object",
    "required": false,
    "description": "Configuration for the wrapper div that Joystick automatically wraps around your component at render time.",
    "children": {
      "attributes": {
        "type": "array&lt;object&gt;",
        "required": false,
        "description": "An array of objects with a `key` property and `value` property representing HTML attributes to assign to the wrapper."
      },      
      "class_list": {
        "type": "array&lt;string&gt;",
        "required": false,
        "description": "An array of strings representing classes to set as the class attribute on the wrapper div."
      },      
      "id": {
        "type": "string",
        "required": false,
        "description": "A custom id attribute to set on the wrapper div."
      },
      "tag_name": {
        "type": "string",
        "required": false,
        "description": "The HTML tag you'd like to use for the wrapper (defaults to `<div>`)."
      }
    }
  }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: CSS
description: How to author CSS for a Joystick component.
---

CSS for your component can be defined in one of three ways:

- As a `string`.
- As a `function` returning a `string` that receives the component instance.
- As an `object`, denoting CSS on a per-breakpoint basis.

All CSS defined on a component is automatically scoped _to_ that component's auto-generated `id` behind the scenes. For example, given a component `id` of `abcdefg1234567`, Joystick will automatically compile any CSS returned by the component to look like this:

{% code theme="light" %}
[js-c="abcdefg1234567"] .some-selector {
  background: #000;
}
{% /code %}

Of note, by default, styles will only apply to the HTML located _inside_ of the wrapper element auto-generated by Joystick. If you'd like to style the wrapper element specifically (using any of the methods below), prefix rules with the special `@wrapper` selector:

{% code theme="light" %}
@wrapper {
  background: #000;
  padding: 20px;
}

.some-non-wrapper-selector p {
  font-size: 24px;
  line-height: 36px;
}
{% /code %}

## Example Usage

### Defining CSS as a String

To define CSS as a `string`, just pass the `css` option on your component as a string literal using backticks ` `` `:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  css: `
    @wrapper {
      background: #000;
    }

    p {
      font-size: 18px;
      line-height: 26px;
      color: #333;
    }
  `,
  render: () => {
    return `
      <div>
        <p>Some text on the page</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

### Defining CSS as a Function

If you'd like to have access to your component instance when defining CSS rules (e.g., to define conditional CSS based on props or state) just pass the `css` option on your component as a `function` returning a string literal using backticks ` `` `:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  css: (instance = {}) => `
    @wrapper {
      background: #000;
    }

    p {
      font-size: 18px;
      line-height: 26px;
      color: ${instance?.props?.info ? '#0099ff' : '#333'};
    }
  `,
  render: () => {
    return `
      <div>
        <p>Some text on the page</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

### API

#### Definition

{% code theme="light" %}
css(component_instance: object) => string;
{% /code %}

#### Parameters

{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}

## Defining CSS as an Object

If you're building a responsive UI, the recommended approach for writing CSS is using the object-based syntax. **Note**: all of the above concepts apply (defining CSS as a `string` or as a `function` returning a \`string), the only difference is how you organize your CSS:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  css: {
    min: {
      width: {
        0: `
          @wrapper {
            background: #000;
          }

          p {
            font-size: 14px;
            line-height: 24px;
            color: #333;
          }
        `,
        768: (instance = {}) => {
          p {
            font-size: 18px;
            line-height: 26px;
            color: ${instance?.props?.info ? '#0099ff' : '#333'};
          }
        },
        992: `
          p {
            font-size: 20px;
            line-height: 30px;
          }
        `,
      },
    },
    print: `
      @wrapper {
        background: #fff;
      }

      p {
        background: #fff;
        color: #000;
      }
    `,
  },
  render: () => {
    return `
      <div>
        <p>Some text on the page</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

Above, we define our CSS using object syntax which allows us to define `min` and `max` rules for both `width` and `height` breakpoints in our CSS. Behind the scenes, Joystick will automatically wrap the CSS we pass in the relevant `@media screen and (min-<width|height>: <width|height>) {}` tags. We've also included some `print` styles which will apply to our component when the operating system's "print" dialog is opened.

Though more verbose, using the object-based syntax is highly recommended for UIs that require complex, responsive styles.

### API

#### Definition

{% code theme="light" %}
css: object;
{% /code %}

#### Parameters

{% parameters %}
{
  "min": {
    "type": "object",
    "required": false,
    "description": "An object containing either width, height, or both objects.",
    "children": {
      "width": {
        "type": "object",
        "required": false,
        "description": "An object containing CSS width breakpoints as integer-based keys, assigned either a string containing CSS or a function returning a string containing CSS."
      },
      "height": {
        "type": "object",
        "required": false,
        "description": "An object containing CSS height breakpoints as integer-based keys, assigned either a string containing CSS or a function returning a string containing CSS."
      }
    }
  },
  "max": {
    "type": "object",
    "required": false,
    "description": "An object containing either width, height, or both objects.",
    "children": {
      "width": {
        "type": "object",
        "required": false,
        "description": "An object containing CSS width breakpoints as integer-based keys, assigned either a string containing CSS or a function returning a string containing CSS."
      },
      "height": {
        "type": "object",
        "required": false,
        "description": "An object containing CSS height breakpoints as integer-based keys, assigned either a string containing CSS or a function returning a string containing CSS."
      }
    }
  },
  "print": {
    "type": "string|function",
    "required": false,
    "description": "A string containing CSS or a function returning a string containing CSS."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Data
description: How to use the `data()` function to fetch data for a component.
---

When server-side rendering your component, Joystick can automatically fetch data from your [API](/joystick/node/app/api/getters), or from a third-party data source. On the client, data can be _refetched_ to update data after the page has loaded.

## Example Usage

### Fetching Data During SSR

Though the `data()` function is defined on your component, it is only ever run in a server-side context. To make this work. Joystick passes an object `api` to the data function which contains methods for interacting with your API: `api.get()`, `api.set()`, and `api.fetch()`.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      books: await api.get('books', {
        input: {
          category: req?.params?.category,
        },
      })
    };
  },
  render: ({ data, each }) => {
    return `
      <div>
        <h2>Books</h2>
        <ul>
          ${each(data?.books, (book = {}) => {
            return `<li><a href="/books/${book.id}">${book.title}</a> by ${book.author}</li>`;
          })}
        </ul>
      </div>
    `;
  },
});

export default Index;
{% /code %}

Above, we define `data` as a `function` on our component options. That function takes four possible arguments: `api`, `req`, `input`, and `component_instance`.

While we _can_ just return the raw value from a call like `api.get('books')`, it’s recommended to organize returned values under named keys so they’re easier to reference in the component.

The `input` object passed to `api.get()` is often used in tandem with `req`, which contains route-specific data like URL parameters. For example, `req.params.category` accesses `:category` from a route like `/books/:category`.

### Refetching Data

Once a component is mounted, you can call `instance.data.refetch()` to update its data. The `refetch()` method accepts an `input` object, which maps to the `input` argument of the `data()` function.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  data: async (api = {}, req = {}, input = {}, instance = {}) => {
    return {
      books: await api.get('books', {
        input: {
          category: req?.params?.category,
          page: input?.page,
        },
      })
    };
  },
  events: {
    'click [data-page]': (event = {}, instance = {}) => {
      instance.data.refetch({
        page: parseInt(event.target.getAttribute('data-page'), 10),
      });
    },
  },
  render: ({ data, each }) => {
    return `
      <div>
        <h2>Books</h2>
        <ul>
          ${each(data?.books, (book = {}) => {
            return `<li><a href="/books/${book.id}">${book.title}</a> by ${book.author}</li>`;
          })}
        </ul>
        <div class="pagination">
          <ol>
            <li data-page="1">1</li>
            <li data-page="2">2</li>
            <li data-page="3">3</li>
          </ol>
        </div>
      </div>
    `;
  },
});

export default Index;
{% /code %}

To trigger a refetch, we listen for clicks on elements with a `data-page` attribute. When clicked, we extract the page number and pass it to `refetch()` via the `input` object.

## API

### Definition

{% code theme="light" %}
data(api: object, req: object, input: object, component_instance: object) => object;
{% /code %}

### Parameters

{% parameters %}
{
  "api": {
    "type": "object",
    "required": true,
    "description": "An object containing methods for interacting with your app's API or third-party data sources.",
    "children": {
      "fetch": {
        "type": "function",
        "required": false,
        "description": "A server-safe version of fetch() for calling third-party APIs."
      },
      "get": {
        "type": "function",
        "required": false,
        "description": "A Joystick-specific method to call a getter endpoint in your app's API."
      },
      "set": {
        "type": "function",
        "required": false,
        "description": "A Joystick-specific method to call a setter endpoint in your app's API."
      }
    }
  },
  "req": {
    "type": "object",
    "required": false,
    "description": "A sanitized copy of the incoming HTTP request for server-rendered components.",
    "children": {
      "headers": {
        "type": "object",
        "required": false,
        "description": "The HTTP headers for the request."
      },
      "params": {
        "type": "object",
        "required": false,
        "description": "The route parameters (e.g., from /:slug)."
      },
      "query": {
        "type": "object",
        "required": false,
        "description": "The query parameters from the URL."
      },
      "context": {
        "type": "object",
        "required": false,
        "description": "Additional request context passed in by your app.",
        "children": {
          "user": {
            "type": "object",
            "required": false,
            "description": "A browser-safe copy of the currently logged-in user, if available."
          }
        }
      }
    }
  },
  "input": {
    "type": "object",
    "required": false,
    "description": "Optional input variables passed via instance.data.refetch()."
  },
  "component_instance": {
    "type": "object",
    "required": false,
    "description": "The current component instance."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Default Props
description: How to define default prop values for a component.
---

While a component most often receives its props from [a parent component at render time](/joystick/ui/component/render#component), it can be helpful to define default prop values in case a required or expected prop is not passed. You can set default props on your component instance using the `default_props` option.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  default_props: {
    name: 'Example Default Prop',
  },
  render: ({ props }) => {
    return `
      <div>
        <p>This will be set no matter what: ${props.name}</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

When a parent component does not provide a prop expected by the child, Joystick will fall back to using the value from `default_props`. This helps ensure components are resilient and display predictable behavior without needing constant defensive checks.

## API

### Definition

{% code theme="light" %}
default_props: object;
{% /code %}

### Parameters

{% parameters %}
{
  "&lt;prop&gt;": {
    "type": "any",
    "required": false,
    "description": "A key/value pair representing the name of the prop and its default value. All values defined here will be automatically merged into the component's props if not explicitly provided by a parent component."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: DOMNode
description: How to access and interact with a component’s DOM node via its instance.
---

To interact with the DOM node that's automatically generated for your component, Joystick provides the `DOMNode` value on the component instance. You can access this value from anywhere you have access to `instance` (e.g. lifecycle methods, event handlers, etc.).

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_mount: (instance = {}) => {
      const button = instance.DOMNode.querySelector('button');
      // Interact with the DOM node for the button in your component.
    },
  },
  render: () => {
    return `
      <div>
        <button>Click Me</button>
      </div>
    `;
  },
});
{% /code %}

{% callout title="Use Extreme Caution" %}
Extreme caution should be used when interacting with `DOMNode`, as changes to the DOM or its children can cause unexpected rendering bugs. Be certain of what you're doing before modifying it.
{% /callout %}

## API Reference

### Definition

{% code theme="light" %}
instance.DOMNode: HTMLElement;
{% /code %}

### Parameters

{% parameters %}
{
  "DOMNode": {
    "type": "HTMLElement",
    "required": true,
    "description": "A direct reference to the DOM node automatically generated by Joystick for the component. Accessible anywhere the component instance is available (e.g., lifecycle methods, event handlers)."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Dynamic Pages (SPA)
description: How to build an SPA-style app with Joystick using dynamic pages.
---

By default, Joystick apps use a more traditional, server-side rendering approach to routes. This is intentional, as most apps benefit more from _this_ approach (for the sake of things like SEO, simplicity, and user experience) than the more common SPA (single page application) approach common to JavaScript frameworks.

For some apps, though, an SPA-style approach is _better_. For example, if you're building something like a media player where some elements are fixed, some are dynamic, SPA is a great pattern.

In Joystick, instead of taking an all-or-nothing approach, you can build an SPA-style experience on top of Joystck's existing routing system.

## Example Usage

To showcase this functionality, we're going to build a simple "audio player" app that has a fixed audio player that's visible globally, with pages that are rendered dynamically in the browser (i.e., they don't require going to brand new URL or reloading the page).

### Setting up your routes

Even though navigation in the _browser_ will be dynamic, we still want to have our traditional, server-side rendered routes defined. Behind the scenes, Joystick will use the routes to help us with our dynamic rendering.

{% code theme="light" title="index.server.js" %}
import joystick from "@joystick.js/node-canary";
import api from "./api/index.js";

joystick.app({
  api,
  routes: {
    "/": (req = {}, res = {}) => {
      res.render("ui/pages/index/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
    "/artists": (req = {}, res = {}) => {
      res.render("ui/pages/artists/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
    "/albums": (req = {}, res = {}) => {
      res.render("ui/pages/albums/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
    "*": (req = {}, res = {}) => {
      res.render("ui/pages/error/index.js", {
        layout: "ui/layouts/app/index.js",
        props: {
          status_code: 404,
        },
      });
    },
  },
});
{% /code %}

Above, we [define our routes](/joystick/node/routes/basic-routes) like normal, defining each of our page routes, rendering them inside of a layout. Notice that all pages being rendered are using the same layout located at `ui/layouts/app/index.js`.

### Defining your layout

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from "@joystick.js/ui-canary";

const App = joystick.component({
  events: {
    'click ul li a': (event = {}, instance = {}) => {
      event.preventDefault();
      
      instance.dynamic_page.load({
        path: event.target.href,
        page: event.target.getAttribute('data-page'),
        query_params: {
          user_id: 'abc123',
        },
        props: {
          album_name: 'Future Perfect'
        },
      });
    },
  },
  render: ({ props, dynamic_page_props, state, component }) => {
    return `
      <div>
        <ul>
          <li>
            <a data-page="ui/pages/artists/index.js" href="/artists">Artists</a>
          </li>
          <li>
            <a data-page="ui/pages/albums/index.js" href="/albums">Albums</a>
          </li>
        </ul>
        ${component(props.page, {
          ...props,
          ...dynamic_page_props,
        })}
        <audio controls src="/audio.mp3"></audio>
      </div>
    `;
  },
});

export default App;
{% /code %}

In the `render()` method for our [layout component](/joystick/concepts/component-types#layouts), first, notice that like all layout components, we have a call to `component()` passing `props.page`. **This is important**: behind the scenes, Joystick's server-sider `res.render()` _and_ the client-side `dynamic_page.load()` both pass the page-to-be-rendered to the current layout as `props.page`.

This is intentional as it ensures that your app works both as a server-side rendered page (i.e., returning plain HTML for SEO purposes) _and_ as a dynamic page.

If we look at the HTML surrounding our call to `component(props.page)` we can see that we have an `<audio></audio>` player at the bottom and then a simple navigation at the top. For the navigation, we have a normal `<ul></ul>` list filled with `<li>` tags containing `<a>` tags. 

Each `<a>` tag is pointed at one of the routes we defined on the server, however, we've manually added a `data-page` attribtue which contains the path to the page we'd like to render dynamically (notice, this is the same, `ui`-relative path that we use in our server-side route).

Next, in our [`events`](/joystick/ui/component/events), we listen for a click on the `<a>` tags in our navigation. When we get one, we call to `instance.dynamic_page.load()`, a special function that, internally, fetches the `page` we specify and uses the HTML5 Push State API to redirect to the specified `path`. We achieve the effect of going to that route like normal, however, Joystick fetches the component _dynamically_ behind the scenes and passes it to our layout as `props.page`.

In turn, the user gets a snappy UX without a page refresh. The benefit in this example being that, if the user hits play on the `<audio></audio>` player but then clicks on one of the nav links, the player will keep playing but the page will update.

Notice that in addition to our `path` and `page` options, we can also pass `query_params` and `props` directly to the route/component being rendered dynamically. This allows us to do things like utilize query params on the server to control behavior inside of our actual route at (dynamic) render time.

For the `props` we pass to `instance.dynamic_page.load()`, these are provided back to the page component being rendered via the special `dynamic_page_props` that are passed to our layout component's `render()` method.

Notice that when we render our page with `component(props.page)`, we're passing both the layout component's `props` along with the `dynamic_page_props`. This ensures that the rendered page has all possible props—irrespective of whether we're rendering the page statically via a route, or dynamically via `dynamic_page.load()` in the browser.

With all of the above, now, when a user clicks a navigation item, the specified `data-page` will be dynamically loaded into the browser and the URL will be updated (all without a page refresh).

## API

### dynamic_page.load()

{% code theme="light" %}
dynamic_page.load(options: object) => Promise
{% /code %}

### Parameters

{% parameters %}
{
  "path": {
    "type": "string",
    "required": true,
    "description": "The URL path that the browser will be redirected to at load time."
  },
  "page": {
    "type": "string",
    "required": true,
    "description": "The path to the page we want to dynamically render, relative to the `ui` folder in our app (identical to how we pass pages to [res.render()](/joystick/node/routes/res-render))"
  },
  "route_pattern": {
    "type": "string",
    "required": false,
    "description": "An Express-style route pattern (e.g., `/blog/:slug`) that tells Joystick the anticipated structure of the dynamic page's route. When `dynamic_page.load()` is called, Joystick maps the specified `path`'s structure to this `route_pattern`, ensuring that any \"dynamic\" parts of the URL (e.g., `:slug`) are properly mapped to the current page. **Only required if the specified route has parameters defined within it**."
  },
  "query_params": {
    "type": "object",
    "required": false,
    "description": "An object containing key/value pairs representing query params that you want to pass to the route at dynamic render time."
  },
  "props": {
    "type": "object",
    "required": false,
    "description": "An object containing key/value pairs representing props that you want to pass to the page at dynamic render time."
  }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: Events
description: How to handle DOM events inside a component.
---

To handle user interactions, DOM event listeners can be added via the `events` object on your component. Joystick automatically uses the native `.addEventListener()` method to register listeners, scoped to the current component's DOM.

Joystick also handles cleanup of listeners between renders, ensuring duplicate listeners aren't attached.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  events: {
    'click button': (event = {}, instance = {}) => {
      window.alert('DOM event detected!');
    },
  },
  render: () => {
    return `
      <div>
        <button>Click Me</button>
      </div>
    `;
  },
});

export default Index;
{% /code %}

In the example above, we attach a `click` event to a `button` element by defining a key/value pair in the `events` object. The key is a string combining the event type and a CSS selector (e.g. `'click button'`), and the value is a function that will be called when the event is triggered.

The function receives two arguments:

- The native `event` object (unmodified from `.addEventListener()`).
- The current `component_instance`.

Any valid selector you’d pass to `document.querySelector()` can be used in the key.

## API

### Definition

{% code theme="light" %}
events: {
  '<event_name> <selector>': (event: DOMEvent, component_instance: object) => void;
}
{% /code %}

### Parameters

{% parameters %}
{
  "&lt;event_name&gt; &lt;selector&gt;": {
    "type": "function",
    "required": false,
    "description": "A key/value pair where the key is a string of the form '&lt;event_name&gt; &lt;selector&gt;' and the value is a function to run when the event is triggered on the matched element.",
    "children": {
      "event": {
        "type": "DOMEvent",
        "required": true,
        "description": "The native DOM event triggered on the element."
      },
      "component_instance": {
        "type": "object",
        "required": true,
        "description": "The current component instance where the event occurred."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: component.language
description: How to access and set the user's language preference in Joystick components.
---

In Joystick, every component instance has access to a `language` property that contains the user's determined language preference. This language is automatically determined server-side during SSR and made available to all components on both the server and client.

## Accessing the Language

The language is available as `component.language` in the render function:

{% code theme="light" title="ui/components/example/index.js" %}
import joystick from '@joystick.js/ui';

const Example = joystick.component({
  render: (component) => {
    return `
      <div>
        <p>Current language: ${component.language}</p>
        <p>Welcome message in ${component.language}</p>
      </div>
    `;
  },
});

export default Example;
{% /code %}

## Language Preference Priority

Joystick determines the user's language preference using the following priority order:

1. **User Profile Language** (`user.language`) - Highest priority
   - Set when a user is logged in and has a language preference in their profile
   
2. **Cookie Language** (`cookies.language`) - Second priority
   - Set via browser cookie: `document.cookie = "language=es"`
   - Persists across browser sessions
   
3. **Browser Language** (`navigator.language`) - Third priority
   - Automatically detected from the user's browser `Accept-Language` header
   - Falls back to browser's default language settings
   
4. **Default Language** - Lowest priority
   - Configured in your app's `settings/env.json` file
   - Falls back to `'en'` if no default is configured

## Setting Language via Cookie

Users can set their language preference by setting a browser cookie:

{% code theme="light" %}
// Set language to Spanish
document.cookie = "language=es; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Set language to French  
document.cookie = "language=fr; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Using the cookies helper (available on component instances)
component.cookies.set('language', 'de', { expires: 365 }); // Expires in 1 year
{% /code %}

## Configuration

Configure your app's default language in `settings/env.json`:

{% code theme="light" title="settings/env.json" %}
{
  "development": {
    "i18n": {
      "default_language": "en"
    }
  },
  "staging": {
    "i18n": {
      "default_language": "en"
    }
  },
  "production": {
    "i18n": {
      "default_language": "en"
    }
  }
}
{% /code %}

## Example: Language Switcher Component

Here's an example of a language switcher component that allows users to change their language preference:

{% code theme="light" title="ui/components/language_switcher/index.js" %}
import joystick from '@joystick.js/ui';

const LanguageSwitcher = joystick.component({
  events: {
    'change select': (event, component) => {
      const selected_language = event.target.value;
      
      // Set the language cookie (expires in 1 year)
      component.cookies.set('language', selected_language, { expires: 365 });
      
      // Reload the page to apply the new language
      window.location.reload();
    },
  },
  
  render: (component) => {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'de', name: 'Deutsch' },
    ];
    
    return `
      <div class="language-switcher">
        <label for="language-select">Language:</label>
        <select id="language-select">
          ${languages.map(lang => `
            <option value="${lang.code}" ${component.language === lang.code ? 'selected' : ''}>
              ${lang.name}
            </option>
          `).join('')}
        </select>
        <p>Current: ${component.language}</p>
      </div>
    `;
  },
});

export default LanguageSwitcher;
{% /code %}

## Working with Translations

The `language` property works seamlessly with Joystick's translation system. Use it to determine which translation files to load or to conditionally render content:

{% code theme="light" title="ui/components/welcome/index.js" %}
import joystick from '@joystick.js/ui';

const Welcome = joystick.component({
  render: (component) => {
    const messages = {
      en: 'Welcome to our application!',
      es: '¡Bienvenido a nuestra aplicación!',
      fr: 'Bienvenue dans notre application!',
      de: 'Willkommen in unserer Anwendung!',
    };
    
    const message = messages[component.language] || messages.en;
    
    return `
      <div class="welcome">
        <h1>${message}</h1>
        <p>Language: ${component.language}</p>
      </div>
    `;
  },
});

export default Welcome;
{% /code %}

## Notes

- The language preference is determined once per request on the server-side
- Changes to language cookies require a page reload to take effect
- The language property is read-only on component instances
- Language codes should follow standard ISO 639-1 format (e.g., 'en', 'es', 'fr')
- The language preference works for both authenticated and anonymous users

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: "@joystick.js/ui"
title: lifeycle.on_before_mount()
description: How to use the `lifecycle.on_before_mount()` method to do something before a component is mounted.
---

Before a component is mounted to screen, if present, the `on_before_mount()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_before_mount: (instance = {}) => {
      // Handle the on_before_mount() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_before_mount()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_before_mount(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_before_render()
description: How to use the `lifecycle.on_before_render()` method to do something before a component is rendered.
---

Before a component is rendered for mount (or re-rendered following an existing mount), if present, the `on_before_render()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_before_render: (instance = {}) => {
      // Handle the on_before_render() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_before_render()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_before_render(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_before_unmount()
description: How to use the `lifecycle.on_before_unmount()` method to do something before a component is unmounted.
---

Immediately before a component is removed from screen, if present, the `on_before_unmount()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_before_unmount: (instance = {}) => {
      // Handle the on_before_unmount() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="info" title="Intended Usage" %}
While any code can be run inside of the `on_before_unmount()`  method, it should be reserved for calling "cleanup" code or third-party code related to the user navigating away from the current component (e.g., if the component is purposed as a page, notifying an analytics provider).
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_before_unmount(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_mount()
description: How to use the `lifecycle.on_mount()` method to respond to a component's mount event.
---

Immediately after a component is mounted to screen, if present, the `on_mount()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_mount: (instance = {}) => {
      // Handle the on_mount() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_mount()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_mount(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_refetch_data()
description: How to use the `lifecycle.on_refetch_data()` method to do after a component's data has been refetched.
---

Immediately after a data is refetched for a component, if present, the `on_refetch_data()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_refetch_data: (instance = {}) => {
      // Handle the on_refetch_data() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_refetch_data()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_refetch_data(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_render()
description: How to use the `lifecycle.on_render()` method to do something immediately after a component is rendered.
---

Immediately after a component is rendered for mount (or re-rendered following an existing mount), if present, the `on_render()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_render: (instance = {}) => {
      // Handle the on_render() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_render()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_render(component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: lifeycle.on_update_props()
description: How to use the `lifecycle.on_update_props()` method to respond to props changes on a component.
---

Immediately after a component receives new props, if present, the `on_update_props()` method for the component will be called.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_update_props: (existing_props = {}, new_props = {}, instance = {}) => {
      // Handle the on_update_props() event.
    },
  },
  render: ({ state, when }) => {
    return `
      <div>...</div>
    `;
  },
});

export default Index;
{% /code %}

{% alert icon="triangle-alert" theme="warning" title="Use Caution With State" %}
It's important to avoid calling `set_state()` inside of `on_update_props()` to copy props or other values over to state as it can cause unwanted rendering bugs. Instead, set your default state value to a function and map the props from the instance passed to that function over to state.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
on_update_props(existing_props: object, new_props: object, component_instance: object) => undefined
{% /code %}

##### Parameters
{% parameters %}
{
   "existing_props":{
      "type": "object",
      "required": true,
      "description": "The component's props before the update."
   },
   "new_props":{
      "type": "object",
      "required": true,
      "description": "The component's props after the update."
   },
   "component_instance":{
      "type": "object",
      "required": true,
      "description": "The current component instance."
   }
}
{% /parameters %}
---
category: "@joystick.js/ui"
title: Methods
description: How to define and use reusable methods in a Joystick component.
---

As your component logic grows in complexity, it can be helpful to extract reusable or verbose logic into dedicated methods. Joystick provides a `methods` option on your component to define arbitrary methods that are accessible from anywhere in the component via `instance.methods`.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  methods: {
    reverse_name: (name = '', instance = {}) => {
      return name?.split('')?.reverse()?.join('');
    },
  },
  events: {
    'click .reverse-name': (event = {}, instance = {}) => {
      const name = instance.DOMNode.querySelector('[name="name"]');
      const reversed_name = instance.methods.reverse_name(name.value);
      name.value = reversed_name;
    },
  },
  render: () => {
    return `
      <div>
        <form>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" />
          <button class="reverse-name">Reverse</button>
        </form>
      </div>
    `;
  },
});

export default Index;
{% /code %}

In the example above, we've defined a method called `reverse_name` under the `methods` object. When called, Joystick passes any arguments you provide, followed by the component instance automatically.

In this case, we pass a single argument (`name.value`), so inside the method we receive the string as `name` and the `instance` as the second argument.

Methods can contain any logic you like—there are no expectations for return values or side effects. They're simply helper functions you can call anywhere the component instance is available.

## API

### Definition

{% code theme="light" %}
methods: {
  method_name: ([...args], instance: object) => void;
}
{% /code %}

### Parameters

{% parameters %}
{
  "&lt;method_name&gt;": {
    "type": "function",
    "required": false,
    "description": "A method defined by name on the methods object. Each method receives its passed arguments first, followed by the component instance.",
    "children": {
      "instance": {
        "type": "object",
        "required": true,
        "description": "The current component instance passed as the last argument to all methods. If no arguments are passed at call time, <code>instance</code> will be the first (and only) argument."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Render
description: How to use the `render()` method on a Joystick component.
---

The only required option on a Joystick component is the `render()` method. The `render()` method is defined as a function that returns a string of HTML using a JavaScript template literal (enables usage of multi-line strings in JavaScript as well as interpolation of variables and function calls).

The `render()` method receives a single argument: the entire component instance as an object. In addition to the built-in properties and functions on the instance, Joystick also introduces a series of ["render methods:"](#render-methods) functions that can be used within your HTML to do things like embed another component, loop over a list of items, or load a translation.

## Rendering HTML

The simplest Joystick component just renders a string of HTML. Joystick components do not utilize attribute hacks or domain-specific syntax that are common in other frameworks. **If the HTML you're using is defined in the HTML spec, it will work with Joystick**—no exceptions.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  render: () => {
    return `
      <div class="index">
        <p>This is the index page. You can render any HTML you wish here.</p>
      </div>
    `;
  },
});

export default Index;
{% /code %}

## Render Methods

One of the more powerful features of a Joystick component are render methods. Render methods are functions passed to your component's `render()` method that provide additional functionality for things like rendering other components, looping over lists, or rendering a translation tag.

### component()

The `component()` method helps you to render _another_ component within the current component.

#### Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from '@joystick.js/ui';
import Player from '../../components/player/index.js';

const App = joystick.component({
  state: {
    player: null,
  },
  lifecycle: {
    ... 
  },
  render: ({ component, props, state }) => {
    return `
      <div class="app">
        ${component(props.page, props)}
        ${component(Player, { state: state?.player })}
      </div>
    `;
  },
});

export default App;
{% /code %}

Here, inside of a layout component, we use the `component()` render method (destructured from the component instance passed to the `render()` method) twice: first, to render the `props.page` component we've been passed, and second, an example `Player` component.

In addition to the component we'd like to render, we can also pass props down to it. This makes it easy to share state between parent and children components.

#### API

##### Definition
{% code theme="light" %}
component(component: object, props: object) => html
{% /code %}

##### Parameters
{% parameters %}
{
   "component":{
      "type": "object",
      "required": true,
      "description": "The component you'd like to render."
   },
   "props":{
      "type": "object",
      "required": false,
      "description": "Any props you'd like to pass down to the component being rendered."
   }
}
{% /parameters %}

### each()

The `each()` method helps you to loop over an array of elements.

#### Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from '@joystick.js/ui';

const Books = joystick.component({
  render: ({ each, props }) => {
    return `
      <div class="books">
        <ul>
          ${each(props?.books, (book = {}) => {
            return `<li>${book.title} by ${book.author}</li>`;
          })}
        </ul>
      </div>
    `;
  },
});

export default Books;
{% /code %}

Here, we have a component `Books` that we want to render a list of books passed to us via props. We use the `each()` render method (destructured from the component instance passed to the `render()` method) to render the `props.books` list.

#### API

##### Definition
{% code theme="light" %}
each(value: array, callback: function) => html
{% /code %}

##### Parameters
{% parameters %}
{
   "value":{
      "type": "array",
      "required": true,
      "description": "The array of elements you'd like to render."
   },
   "callback":{
      "type": "function",
      "required": false,
      "description": "A callback function returning the HTML you'd like to render for each element."
   }
}
{% /parameters %}

### i18n()

The `i18n()` method helps you to render a translation string.

#### Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from '@joystick.js/ui';

const DashboardHeader = joystick.component({
  render: ({ i18n, props }) => {
    return `
      <div class="dashboard-header">
        <h1>${i18n('dashboard_header.hey', { name: props.username })}</h1>
      </div>
    `;
  },
});

export default DashboardHeader;
{% /code %}

Here, we have a component `DashboardHeader` where we render a translation at the key `dashboard_header.hey` (in our translation file) into our HTML. Additionally, we anticipate our translation having a replacement `{{name}}` inside of it, passing `props.username` as a value.

{% alert icon="earth" theme="brand" title="Learn About Translations" %}
Joystick's [translations feature]() makes it easy to define translations in any language and load them into your UI with a simple function.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
i18n(translation_path: string, replacements: object) => html
{% /code %}

##### Parameters
{% parameters %}
{
   "translation_path":{
      "type": "string",
      "required": true,
      "description": "The path to the translation you'd like to render in your translation file."
   },
   "replacements":{
      "type": "object",
      "required": false,
      "description": "Values for any replacements inside of your translation."
   }
}
{% /parameters %}

### when()

The `when()` method helps you to conditionally render HTML.

#### Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from '@joystick.js/ui';

const App = joystick.component({
  render: ({ when, props }) => {
    return `
      <div class="profile">
        ${when(props?.user?.is_admin, () => `
          <nav class="admin-navigation">...</nav>
        `)}
        ${when(!props?.user?.is_admin, () => `
          <nav class="user-navigation">...</nav>
        `)}
      </div>
    `;
  },
});

export default App;
{% /code %}

Here, we have a layout component `App` where we render different navigation based on whether or not the `props?.user?.is_admin` value is `true`. Though we've passed a function returning a template literal string here, `when()` also accepts a template literal string _without_ a wrapper function.

#### API

##### Definition
{% code theme="light" %}
when(value: boolean, html: <function -> string|string>) => html
{% /code %}

##### Parameters
{% parameters %}
{
   "value":{
      "type": "boolean",
      "required": true,
      "description": "The boolean value to test to decide whether or not the conditional HTML should be rendered."
   },
   "html":{
      "type": "function|string",
      "required": false,
      "description": "Either a plain template literal string, or, a function returning a template literal string containing the HTML you'd like to render conditionally."
   }
}
{% /parameters %}

### raw()

The `raw()` method helps you to render the raw, unescaped version of the value passed to the function (e.g., rendering safe HTML sent via the server). 

**Note:** this is required to avoid escaping issues in your UI as Joystick automatically escapes all data sent via the server to avoid XSS vulnerabilities.

#### Example Usage

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from '@joystick.js/ui';
import Player from '../../components/player/index.js';

const Post = joystick.component({
  data: async (api = {}, req = {}) => {
    return {
      post: await api.get('post', {
        slug: req?.params?.slug,
      }),
    };
  },
  render: ({ data, raw }) => {
    return `
      <div class="post">
        ${raw(data?.post?.content)}
      </div>
    `;
  },
});

export default Post;
{% /code %}

Above, we're anticipating that our data will contain some content that we want to render _without_ escaping. To do this, we destructure the `raw()` method from the component instance passed ot the `render()` method and then call it, passing the value we'd like to "unescape."

{% alert icon="triangle-alert" theme="warning" title="Use Extreme Caution" %}
Do not use the `raw()` method if you intend to pass it UGC (user-generated content). The escaping performed on the server is for your own safety and should only be circumvented if you control and trust the data being passed to `raw()`.
{% /alert %}

#### API

##### Definition
{% code theme="light" %}
raw(data: string) => string
{% /code %}

##### Parameters
{% parameters %}
{
   "data":{
      "type": "string",
      "required": true,
      "description": "The string that you'd like to strip the escape characters from and render in its raw, natural state."
   }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: State
description: How to define and manage component state.
---

When rendering Joystick components, state can be used to render arbitrary data and control the display of the component. There are three ways to work with state in a Joystick component:

- Setting a default value for state via the `state` option.
- Updating state dynamically via `instance.set_state()`.
- Reading the current state via the component instance or `render()` arguments.

When state changes, the component automatically re-renders. Use state thoughtfully to avoid unnecessary performance overhead.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  state: {
    tab: 'books',
  },
  events: {
    'click [data-tab]': (event = {}, instance = {}) => {
      instance.set_state({ tab: event.target.getAttribute('data-tab') });
    },
  },
  render: ({ state, when }) => {
    return `
      <div class="media">
        <ul class="tabs">
          <li data-tab="books" class="${state.tab === 'books' ? 'is-active' : ''}">Books</li>
          <li data-tab="movies" class="${state.tab === 'movies' ? 'is-active' : ''}">Movies</li>
          <li data-tab="games" class="${state.tab === 'games' ? 'is-active' : ''}">Games</li>
        </ul>
        ${when(state.tab === 'books', `
          <p>Books list...</p>
        `)}
        ${when(state.tab === 'movies', `
          <p>Movies list...</p>
        `)}
        ${when(state.tab === 'games', `
          <p>Games list...</p>
        `)}
      </div>
    `;
  },
});

export default Index;
{% /code %}

In this example:

- We define an initial value for `state.tab` using the object syntax.
- We update that value in response to user interaction using `instance.set_state()`.
- We read the value in `render()` to determine what UI to show.

### Setting default state via function

Instead of defining `state` as an object, you can pass a function that returns an object. This allows you to dynamically define initial state based on component props or other runtime conditions.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  state: (instance = {}) => {
    return {
      tab: instance?.props?.tab || 'books',
    };
  },
  events: {
    'click [data-tab]': (event = {}, instance = {}) => {
      instance.set_state({ tab: event.target.getAttribute('data-tab') });
    },
  },
  render: ({ state, when }) => {
    return `
      <div class="media">
        <ul class="tabs">
          <li data-tab="books" class="${state.tab === 'books' ? 'is-active' : ''}">Books</li>
          <li data-tab="movies" class="${state.tab === 'movies' ? 'is-active' : ''}">Movies</li>
          <li data-tab="games" class="${state.tab === 'games' ? 'is-active' : ''}">Games</li>
        </ul>
        ${when(state.tab === 'books', `
          <p>Books list...</p>
        `)}
        ${when(state.tab === 'movies', `
          <p>Movies list...</p>
        `)}
        ${when(state.tab === 'games', `
          <p>Games list...</p>
        `)}
      </div>
    `;
  },
});

export default Index;
{% /code %}

Here, we use `props` from the component instance to define the initial state dynamically.

## API

### Definition

{% code theme="light" %}
state: object | (instance: object) => object;
{% /code %}

### Parameters

{% parameters %}
{
  "state": {
    "type": "object|function",
    "required": false,
    "description": "Default state for the component. Can be a static object or a function that returns an object and receives the component instance."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: URL
description: How to access the current URL, path, params, and query in a Joystick component.
---

As a convenience, Joystick includes a `url` object globally available on the component instance. This object helps you access and work with the current route, URL parameters, and query string.

## Example Usage

{% code theme="light" title="ui/components/navigation/index.js" %}
import joystick from '@joystick.js/ui';

const Navigation = joystick.component({
  render: ({ url }) => {
    return `
      <nav>
        <ul>
          <li class="${url.is_active('/') ? 'is-active' : ''}"><a href="/">Home</a></li>
          <li class="${url.is_active('/books') ? 'is-active' : ''}"><a href="/books">Books</a></li>
          <li class="${url.is_active('/movies') ? 'is-active' : ''}"><a href="/movies">Movies</a></li>
          <li class="${url.is_active('/games') ? 'is-active' : ''}"><a href="/games">Games</a></li>
        </ul>
      </nav>
    `;
  },
});

export default Navigation;
{% /code %}

In the example above, we use `url.is_active()` to check if the current route matches a given path. If it does, we apply the `is-active` CSS class to the matching navigation item.

## API

### Definition

{% code theme="light" %}
url: {
  is_active: (url: string) => boolean;
  params: object;
  path: string;
  query: object;
  route: string;
}
{% /code %}

### Parameters

{% parameters %}
{
  "is_active": {
    "type": "function",
    "required": false,
    "description": "Tests whether the passed URL string matches the currently active URL. Returns a boolean."
  },
  "params": {
    "type": "object",
    "required": false,
    "description": "Route parameters extracted from the current matching route. For example, in `/books/:category`, you'd access the `category` param via `params.category`."
  },
  "path": {
    "type": "string",
    "required": false,
    "description": "The current URL path (e.g., `/books/fiction`)."
  },
  "query": {
    "type": "object",
    "required": false,
    "description": "The query string parameters from the current URL. For example, on `/books?sort=asc`, you'd access `query.sort`."
  },
  "route": {
    "type": "string",
    "required": false,
    "description": "The matching route pattern for the current path (e.g., `/books/:category` if the current path is `/books/fiction`)."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Validate Form
description: How to validate forms using the built-in form validation function defined on the component instance.
---

To help with form validation, Joystick includes a built-in validation utility accessible via the component instance as `instance.validate_form()`.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  events: {
    'submit form': (event = {}, instance = {}) => {
      event.preventDefault();
      instance.validate_form(event.target, {
        rules: {
          email_address: {
            required: true,
            email: true,
          },
        },
        messages: {
          email_address: {
            required: 'An email address is required.',
            email: 'A valid email is required.',
          },
        },
      }).then(() => {
        // Form is valid. Handle submission here.
      }).catch(() => {
        // Form is invalid. Handle warnings, etc., here.
      });
    },
  },
  render: () => {
    return `
      <div>
        <form>
          <label>Email Address</label>
          <input type="email" name="email_address" placeholder="Email Address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    `;
  },
});

export default Index;
{% /code %}

When called, `validate_form()` takes two arguments:

- A `form_dom_node`, which is the `<form>` element being validated.
- An `options` object containing validation `rules` (see the [full list of rules below](#validation-rules)), `messages`, and optionally, a custom `on_render_error()` function.

If validation passes, the returned Promise resolves. If it fails, the Promise rejects and error messages are rendered automatically.

### Custom Error Placement

To change where error messages are rendered, provide an `on_render_error()` function on the `options` object:

{% code theme="light" title="ui/pages/index/index.js" %}
on_render_error: (element = {}, message = '') => {
  const error = document.createElement('p');
  error.classList.add('input-hint', 'error');
  error.setAttribute('id', `error-${element.name}`);
  error.innerText = message;
  return element?.closest('form').before(error);
}
{% /code %}

## API

### Definition

{% code theme="light" %}
validate_form(form_dom_node: DOMNode, options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "form_dom_node": {
    "type": "DOMNode",
    "required": true,
    "description": "A DOM node reference to the <form> element being validated."
  },
  "options": {
    "type": "object",
    "required": true,
    "description": "An object of options to configure form validation.",
    "children": {
      "rules": {
        "type": "object",
        "required": true,
        "description": "Validation rules keyed by input name, each with one or more validation rules."
      },
      "messages": {
        "type": "object",
        "required": false,
        "description": "Error messages keyed by input name and rule name."
      },
      "on_render_error": {
        "type": "function",
        "required": false,
        "description": "A function to customize where and how error messages are rendered. Receives the input DOM element and message."
      }
    }
  }
}
{% /parameters %}

### Validation Rules

{% parameters %}
{
  "credit_card": {
    "type": "boolean",
    "description": "Validates whether the field contains a valid credit card number."
  },
  "email": {
    "type": "boolean",
    "description": "Validates whether the field contains a valid email address."
  },
  "equals": {
    "type": "string",
    "description": "Validates whether the field input equals the given value."
  },
  "matches": {
    "type": "any",
    "description": "Validates whether the field input matches the given value in value and type."
  },
  "max_length": {
    "type": "integer",
    "description": "Validates whether the field input is less than or equal to the given value."
  },
  "min_length": {
    "type": "integer",
    "description": "Validates whether the field input is greater than or equal to the given value."
  },
  "phone": {
    "type": "boolean",
    "description": "Validates whether the field input is a valid phone number."
  },
  "postal_code": {
    "type": "boolean|object",
    "description": "Validates whether the field input is a valid postal code. May be an object containing ISO and rule."
  },
  "required": {
    "type": "boolean",
    "description": "Validates whether the field input exists (is not empty)."
  },
  "semver": {
    "type": "boolean",
    "description": "Validates whether the field input is a valid semantic version."
  },
  "slug": {
    "type": "boolean",
    "description": "Validates whether the field input is a valid slug (e.g., a-slug-like-this)."
  },
  "strong_password": {
    "type": "boolean",
    "description": "Validates whether the input matches a strong password pattern (min 8 chars, one upper, one lower, one number, one special)."
  },
  "url": {
    "type": "boolean",
    "description": "Validates whether the field input is a valid URL."
  },
  "vat": {
    "type": "boolean|object",
    "description": "Validates whether the field input is a valid VAT number. May be an object with ISO and rule."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: WebSockets
description: How to connect to and interact with a Joystick WebSocket server from a component.
---

If you've [defined a websocket server](/joystick/node/websockets/defining-a-server) via your `joystick.app()` instance on the server, you can connect to it via your component by utilizing the `websockets` property on your component options.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  websockets: (instance = {}) => {
    return {
      example_endpoint: {
        options: {
          logging: true,
          auto_reconnect: true,
        },
        events: {
          on_open: (connection = {}) => {
            console.log('Connection to example_endpoint opened!');
          },
          on_message: (message = {}) => {
            console.log('Message received from server:', message);
          },
          on_close: (code = 0, reason = '', connection = {}) => {
            console.log('Connection to example_endpoint closed.', { code, reason });
          },
        },
      },
    };
  },
  events: {
    'submit form': (event = {}, instance = {}) => {
      instance.websockets.example_endpoint.send({
        message: event.target.message.value,
      });
    },
  },
  render: ({ state, when }) => {
    return `
      <form>
        <input type="text" name="message" placeholder="Type your message here.." />
        <button type="submit">Send Message</button>
      </form>
    `;
  },
});

export default Index;
{% /code %}

Above, we've defined a connection to our hypothetical websocket server at `ws://localhost:2600/api/_websockets/example_endpoint`. To do it, we pass the option `websockets` to our component options as a `function` that returns an `object` defining the websocket endpoints we want to connect to. On that `object`, we define key/value pairs where the key is the name of a websocket endpoint we want to connect to (`example_endpoint`) and the value is an object defining the behavior of the websocket client.

Here, we set `options.logging` to `true` to enable logging on all websocket connection activity and `options.auto_reconnect` to `true` to establish an auto-reconnect interval in the event that our connection to the server closes.

Next, we define `events` to listen for as an `object` containing methods for the three different events we can listen for: `on_open()`, `on_message()`, and `on_close()`.

Behind the scenes, with this, Joystick will automatically establish a websocket client connection for us and assign the connection back to our component instance at `instance.websockets.example_endpoint`.

Utilizing that value, we've added an [event listener](/joystick/ui/components/events) on the `submit` event of the `<form></form>` element our component is rendering. When it does, we want to send a websocket message back to our server with the value of our input. To do it, we call the `.send()` method of our `instance.websockets.example_endpoint` value, passing an object that will be automatically stringified and sent to our server.

### Filtering messages with query params

By default, WebSocket connections to a given server receive all messages sent from that server. In some cases, a WebSocket client may want to receive messages selectively, for example, in a chat app where it only wants to receive messages for the currently focused user and not _all_ users.

To filter message traffic, an additional `query` object can be specified with a nested `id` field specifying a unique ID to filter messages by:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick, { accounts } from '@joystick.js/ui';

const Index = joystick.component({
  data: async () => {
    return {
      user: await accounts.user(),
    };
  },
  websockets: (instance = {}) => {
    return {
      example_endpoint: {
        options: {
          logging: true,
          auto_reconnect: true,
        },
        query: {
          id: instance?.data?.user?._id,
        },
        events: {
          on_open: (connection = {}) => {
            console.log('Connection to example_endpoint opened!');
          },
          on_message: (message = {}) => {
            console.log('Message received from server:', message);
          },
          on_close: (code = 0, reason = '', connection = {}) => {
            console.log('Connection to example_endpoint closed.', { code, reason });
          },
        },
      },
    };
  },
  events: { ... },
  render: ({ state, when }) => { ... },
});

export default Index;
{% /code %}

As an example, above, we've extended our component to include a [data](/joystick/ui/components/data) function which allows us to fetch the current user via the `accounts.user()` method and pass it to our app via `instance.data`. With this, when we establish our WebSocket client connection, we add an additional `query` object to our `example_endpoint` options, setting the nested `id` field to `instance?.data?.user?._id`, or, the currently logged in user's ID.

On the server, now, we can anticipate this ID being passed and filter messages that we send to clients via this ID.

## API

{% code theme="light" %}
websockets: (instance: object) => {
  return {
    websocket_name: {
      options: {
        logging: boolean;
        auto_reconnect: boolean;
      },
      query: {
        id: string;
      },
      events: {
        on_open(connection: object): void;
        on_message(message: object): void;
        on_close(code: number, reason: string, connection: object): void;
      }
    }
  }
};
{% /code %}

---
category: "@joystick.js/ui"
title: wrapper
description: Customize the outer HTML wrapper element and classes used when rendering a component.
---

By default, when Joystick renders a component, it takes the contents of its `render()` function and renders them into a `<div></div>` tag with a `js-c` and `js-i` attribute (where `js-c` is the component ID and `js-i` is the component's instance ID). This is done to give Joystick a target for scoping things like CSS and events as well as handling DOM selection for mapping relationships between child components and their parents.

## Example Usage

If you'd like to change the wrapper element or apply classes to a wrapper, you can do so via the `wrapper` option passed to your component's options object:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const books = [
  { id: 1, title: 'Awareness', author: 'Anthony DeMello' },
  { id: 2, title: 'Seeking Wisdom', author: 'Peter Bevelin' },
  { id: 3, title: 'The Courage to Be Disliked', author: 'Ichiro Kishimi' }
];

const BooksList = joystick.component({
  wrapper: {
    tag_name: 'ul',
    class_list: ['books-list'],
  },
  render: ({ each }) => {
    return `
      ${each(books, (book = {}) => {
        return `<li><a href="${book?.id}">${book.title}</a> by ${book.author}</li>`;
      })}
    `;
  },
});

export default BooksList;
{% /code %}

This allows us to create simple, specific components without littering our DOM with unnecessary `<div></div>` tags while retaining Joystick's core behavior. Above, we've swapped the default `div` tag with a `ul` and added an additional CSS class `books-list`. When this renders in the browser, we can expect some HTML like this:

```html
<ul class="books-list" js-c="abcdefg1234567" js-i="a1b2c3d4">
  <li><a href="1">Awareness</a> by Anthony DeMello</li>
  <li><a href="2">Seeking Wisdom</a> by Peter Bevelin</li>
  <li><a href="3">The Courage to Be Disliked</a> by Ichiro Kishimi</li>
</ul>
```

## API

### Definition

{% code theme="light" %}
wrapper: {
  tag_name: string;
  id: string;
  class_list: [string];
};
{% /code %}

### Parameters

{% parameters %}
{
  "wrapper": {
    "type": "object",
    "required": false,
    "description": "Customize the outer HTML wrapper element and classes used when rendering a component.",
    "children": {
      "tag_name": {
        "type": "string",
        "required": false,
        "description": "The HTML tag name to use as the wrapper element (e.g., 'div', 'ul'). Defaults to 'div'."
      },
      "id": {
        "type": "string",
        "required": false,
        "description": "An optional ID to assign to the wrapper element."
      },
      "class_list": {
        "type": "array",
        "required": false,
        "description": "An array of CSS class names to apply to the wrapper element."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: External
description: How to manage third-party JavaScript libraries globally in Joystick components.
---

In order to assist in the management of third-party JavaScript libraries, in the browser, Joystick includes a global `joystick._external` object where library instances can be tracked. This allows you to manage external libraries across components without having to implement complicated data patterns or inconveniently pass library instances around via props.

## Example Usage

### Tracking third-party libraries

To track a third-party library, you can utilize the `joystick.external.track()` method.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

const Index = joystick.component({
  lifecycle: {
    on_mount: () => {
      const stripe = stripe(joystick.settings.public.stripe.publishable_key);
      joystick.external.track('stripe', stripe);
    }
  },
  render: () => {
    return `<div></div>`;
  },
});

export default Index;
{% /code %}

`joystick.external.track()` takes two arguments: the `name` of the library you want to track and the data you want to track (e.g., a class instance or a configuration object). Once tracked, you will have global access to that library at `window.joystick._external.<name>` (e.g., `window.joystick._external.stripe`).

### Retrieving a tracked dependency

While you _can_ access `window.joystick._external.<name>` directly, for the sake of convenience, Joystick provides the `joystick.external.get('<name>')` method. Usage of this is recommended for guaranteed backwards compatibility and consistency in your own code.

## API

### Definition

{% code theme="light" %}
external: {
  track: (library_name: string, value_to_track: any) => void,
  get: (library_name: string) => any,
}
{% /code %}

### Parameters

{% parameters %}
{
  "track": {
    "type": "function",
    "required": false,
    "description": "A function that takes the name of a library to track as a string and an arbitrary value representing the library (e.g., a class instance, configuration object, etc.)."
  },
  "get": {
    "type": "function",
    "required": false,
    "description": "A function that takes the name of a library to retrieve from window.joystick._external as a string and returns the tracked value."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Global State
description: Manage global state across Joystick components using the built-in Cache API.
---

Under the hood, `@joystick.js/ui` includes a global state library called Cache. Similar to popular libraries like Redux, Cache allows you to create a "store" or "cache" for storing global data. It features a simple API for getting, setting, and unsetting data from a cache as well as listening for changes to a cache.

By default, Joystick initializes a cache for you and makes it accessible as a named export at `global_state` (and an alias on the default `joystick` export at `joystick.global_state`).

## Example Usage

{% code theme="light" title="ui/pages/store/index.js" %}
import joystick, { global_state } from "@joystick.js/ui";

import Cart from '../../components/cart/index.js';

const Store = joystick.component({
  events: {
    'click [data-item-id]': (event = {}, instance = {}) => {
      global_state.set((state = {}) => {
        return {
          ...state,
          cart: [
            ...state.cart || [],
            { id: event.target.getAttribute('data-item-id') }
          ],
        };
      });
    },
  },
  render: ({ component }) => {
    return `
      <div>
        <div class="store">
          <button data-item-id="book">Add a Book to Cart</button>
          <button data-item-id="t-shirt">Add a T-Shirt to Cart</button>
          <button data-item-id="apple">Add an Apple to Cart</button>
        </div>
        ${component(Cart)}
      </div>
    `;
  },
});

export default Store;
{% /code %}

In this example, we add items to the global state on button click using `global_state.set()`. The updated state is stored globally and can be accessed or modified from any component.

{% code theme="light" title="ui/components/cart/index.js" %}
import joystick, { global_state } from "@joystick.js/ui";

const Cart = joystick.component({
  state: {
    cart: [],
  },
  lifecycle: {
    on_mount: (instance = {}) => {
      global_state.on('change', (state = {}, event = '', user_event_label = '') => {
        instance.set_state({ cart: state?.cart });
      });
    }
  },
  render: ({ state, each, when }) => {
    return `
      <div>
        <div class="items">
          ${when(state?.cart?.length === 0, `
            <p>No items in cart</p>
          `)}
          ${when(state?.cart?.length > 0, `
            <ul>
              ${each(state?.cart, (item) => {
                return `<li>${item.id} <button>X</button></li>`;
              })}
            </ul>
          `)}
        </div>
      </div>
    `;
  },
});

export default Cart;
{% /code %}

Here, the `Cart` component listens for changes to the global state using `global_state.on()` and syncs the global cart state with its local component state.

## API

### Definition

{% code theme="light" %}
global_state: {
  get: (path: string) => object,
  on: (
    event_type: string,
    callback: (existing_state: object, event: string, user_event_label: string) => void
  ) => void,
  set: (
    callback: (existing_state: object) => object,
    user_event_label: string
  ) => void,
  unset: (path: string, user_event_label: string) => void,
}
{% /code %}

### Parameters

{% parameters %}
{
  "get": {
    "type": "function",
    "required": true,
    "description": "Retrieve the current global state value. Optionally provide a path string (e.g., 'cart' or 'user.profile') to access a nested value."
  },
  "on": {
    "type": "function",
    "required": true,
    "description": "Listen for changes to the global state.",
    "children": {
      "event_type": {
        "type": "string",
        "required": true,
        "description": "The type of event to listen for: 'set', 'unset', or 'change'."
      },
      "callback": {
        "type": "function",
        "required": true,
        "description": "A callback function called when the event occurs. Receives the current global state, event type, and optional user event label."
      }
    }
  },
  "set": {
    "type": "function",
    "required": true,
    "description": "Update the global state by passing a function that returns the updated state object. Optionally include a user event label for debugging."
  },
  "unset": {
    "type": "function",
    "required": true,
    "description": "Unset a value from the global state. Provide a path string (e.g., 'cart') to remove a specific property, or call without a path to clear the entire state."
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: Settings
description: Access environment settings in Joystick components.
---

Environment settings can be accessed in components via the default `joystick` export from `@joystick.js/ui` at `joystick.settings`. In a client-side environment, only `joystick.settings.public` and `joystick.settings.global` are exposed—`joystick.settings.private` is intentionally excluded for the sake of security.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from '@joystick.js/ui';

console.log(joystick.settings);
// { global: { ... }, public: { ... } }
{% /code %}

## Node Process Polyfill

In addition to your app's environment settings, a polyfill is provided in browsers for the Node.js `process` object in order to provide access to `process.env.NODE_ENV`. This polyfill is made accessible globally at `window.process`, or just `process`.

## API

### Definition

{% code theme="light" %}
joystick.settings: {
  global: object;
  public: object;
  private: object; // server-only
}

process: {
  env: {
    NODE_ENV: string;
  }
}
{% /code %}

### Parameters

{% parameters %}
{
  "joystick.settings": {
    "type": "object",
    "required": true,
    "description": "An object containing environment settings defined in your Joystick app.",
    "children": {
      "global": {
        "type": "object",
        "required": false,
        "description": "Environment settings that are always available in both server and client environments."
      },
      "public": {
        "type": "object",
        "required": false,
        "description": "Environment settings explicitly marked as public. These are accessible in client-side code."
      },
      "private": {
        "type": "object",
        "required": false,
        "description": "Environment settings only available in server-side code. Not exposed in client environments for security reasons."
      }
    }
  },
  "process": {
    "type": "object",
    "required": true,
    "description": "A Node.js process polyfill available in client environments for compatibility.",
    "children": {
      "env": {
        "type": "object",
        "required": true,
        "description": "Contains environment variables, including NODE_ENV for determining the current environment (e.g., 'development' or 'production')."
      }
    }
  }
}
{% /parameters %}

---
category: "@joystick.js/ui"
title: sync_dom_to_vdom()
description: "How to utilize the `sync_dom_to_vdom()` method to sync DOM modifications made by third-party JavaScript libraries to Joystick's virutal DOM."
---

When you're working with third-party JavaScript libraries, it's not uncommon for those libraries to modify the DOM.

To keep these libraries compatible, Joystick introduces a special method on your component instance: `instance.sync_dom_to_vdom()`. Like the name implies, this method takes a snapshot of the current _physical_ DOM and syncs it back to Joystick's internal virtual DOM.

## Example Usage

To utilize the `sync_dom_to_vdom()` method, call it after your third-party JavaScript code.

{% code theme="light" title="ui/components/code_sample/index.js" %}
import joystick from '@joystick.js/ui';
import { code } from '../../../lib/mod-plus.esm.min.js';

const CodeSample = joystick.component({
  lifecycle: {
    on_render: (instance = {}) => {
      code();
      instance.sync_dom_to_vdom();
    }
  },
  render: ({ props }) => {
    return `<div class="code-sample">
      <pre>${props.code}</pre>
    </div>`;
  },
});

export default CodeSample;
{% /code %}

Above, we import the `code()` function from [Mod Plus](https://mod.cheatcode.co) that we expect to modify the DOM when it runs. To ensure that the code rendered at mount time is preserved between re-renders, immediately after calling `code()`, we call to `instance.sync_dom_to_vdom()`.

When `code()` modifies the DOM, `instance.sync_dom_to_vdom()` will be run immediately after to sync the changes back to Joystick's virtual DOM.

## API

### Definition

{% code theme="light" %}
sync_dom_to_vdom: () => void;
{% /code %}
---
category: "@joystick.js/ui"
title: Upload
description: Upload files from Joystick components to a server-defined uploader.
---

If you've [defined an uploader config on the server](/joystick/node/uploads/defining-an-uploader), you can upload files via the `upload()` method imported from `@joystick.js/ui` on your component.

## Example Usage

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick, { upload } from '@joystick.js/ui';

const Index = joystick.component({
  events: {
    'submit form': (event = {}, instance = {}) => {
      event.preventDefault();
      upload('example_uploader', {
        files: event.target.file.files,
        input: {
          additional_data: 'some arbitrary data to send with the upload',
        },
      }).then((response) => {
        // Response contains URLs for uploaded files.
      });
    },
  },
  render: () => {
    return `
      <form>
        <label>File</label>
        <input type="file" name="file" />
        <button type="submit">Upload File</button>
      </form>
    `;
  },
});

export default Index;
{% /code %}

To upload a file, import the named export `upload` from `@joystick.js/ui`. In the `submit` event handler for the `<form></form>`, call `upload()`, passing the name of the uploader on the server (`example_uploader`) and an options object. This object includes the `files` to upload and an optional `input` object with metadata to send alongside the upload.

### Monitoring Progress

Upload progress is automatically tracked by Joystick across all configured providers for your uploader. As progress occurs, the `on_progress()` method in the `upload()` options is called, passing the current progress `percentage` and the name of the `provider` handling the upload.

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick, { upload } from '@joystick.js/ui';

const Index = joystick.component({
  state: {
    upload_progress: 0,
  },
  events: {
    'submit form': (event = {}, instance = {}) => {
      event.preventDefault();
      upload('example_uploader', {
        files: event.target.files.files,
        input: {
          additional_data: 'some arbitrary data to send with the upload',
        },
        on_progress: (percentage = 0, provider = '') => {
          instance.set_state({ upload_progress: percentage }); 
        },
      }).then((response) => {
        // Response contains URLs for uploaded files.
      });
    },
  },
  render: ({ state, when }) => {
    return `
      ${when(state.upload_progress, `
        <p>Uploading: ${state.upload_progress}%...</p>
      `)}
      <form>
        <label>File</label>
        <input type="file" name="file" />
        <button type="submit">Upload File</button>
      </form>
    `;
  },
});

export default Index;
{% /code %}

## API

### Definition

{% code theme="light" %}
upload(uploader_name: string, uploader_options: object) => Promise;
{% /code %}

### Parameters

{% parameters %}
{
  "uploader_name": {
    "type": "string",
    "required": true,
    "description": "The name of the uploader to target on the server."
  },
  "uploader_options": {
    "type": "object",
    "required": true,
    "description": "Options for the upload being performed.",
    "children": {
      "files": {
        "type": "array[File]",
        "required": true,
        "description": "An array of File objects from the browser representing the files to upload."
      },
      "input": {
        "type": "object",
        "required": false,
        "description": "An object of arbitrary key/value pairs to send to the server alongside the files."
      },
      "on_progress": {
        "type": "function",
        "required": false,
        "description": "A function that receives the current upload progress percentage (integer) and the provider name (string)."
      }
    }
  }
}
{% /parameters %}

---
category: Framework
title: Changelog
description: What's recently been added or changed in Joystick.
---

<!-- For new releases not yet out, do these in a branch with the release name. If need be
just merge in code changes if the actual behavior of docs app changes. -->

<!-- {% changelog title="1.0.0-rc.3" latest="true" %}
{
  "changes":[
    {
      "type":"chore",
      "title":"Add New Docs",
      "description":"What it say my dude.",
      "location":"Framework"
    }
  ]
}
{% /changelog %} -->

{% changelog title="1.0.0-rc.3" %}
{
  "changes":[
    {
      "type":"feature",
      "title":"Integrated Tests",
      "description": "Adds support for running tests directly alongside your app via the `joystick start --tests` command.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"Client-Side Cookies Support",
      "description": "Adds support for the `instance.cookies` value which exposes the API of the `js-cookie` package for managing cookies on the client.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"feature",
      "title": "Add HTML Render Method",
      "description":"Adds support for an html render method that can be used to enable template literal syntax highlighting in your IDE.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"feature",
      "title":"Node Caches",
      "description":"Adds support for a new cache method in @joystick.js/node. Allows developers to create server-side caches of data in memory for faster querying and handling things like seeding search indexes. This adds the cache() API in @joystick.js/node, support for a caches() function in joystick.app() functions, and support in the CLI for the caches folder at the root of your app for organization.",
      "location":"@joystick.js/node"
    },
    {
      "type":"feature",
      "title":"Wrapper Attributes",
      "description":"Added support for assigning an array of attributes to the wrapper options on a Joystick component. Accepts an array of objects with a key and value property, where the key is the name of the attribute and the value is its value.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"feature",
      "title":"Node Track External Process",
      "description":"Adds support for tracking external process IDs related to the Joystick app that need to be cleaned up in development. Provides a process.joystick.track_external_process() function in @joystick.js/node and a kill_process_ids() call in @joystick.js/cli in development that kills those tracked processes when there\\'s a server restart.",
      "location":"@joystick.js/node"
    },
    {
      "type":"feature",
      "title":"Head Style Tags",
      "description":"Adds support for specifying &lt;style&gt;&lt;/style&gt; tags via the res.render() function\\'s head object.",
      "location":"@joystick.js/node"
    },
    {
      "type":"feature",
      "title":"MongoDB Binary",
      "description": "Instead of searching for a local copy of MongoDB, now, Joystick will check for its own canonical binary version on your computer and download it if it can't find it. Once installed, Joystick will start MongoDB if it's defined as a database in your settings.&lt;env&gt;.json.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"PostgreSQL Binary",
      "description":"Instead of searching for a local copy of PostgreSQL, now, Joystick will check for its own canonical binary version on your computer and download it if it can't find it. Once installed, Joystick will start PostgreSQL if it's defined as a database in your settings.&lt;env&gt;.json.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"Redis Binary",
      "description": "Instead of searching for a local copy of Redis, now, Joystick will check for its own canonical binary version on your computer and download it if it can't find it. Once installed, Joystick will start Redis if it's defined as a database in your settings.&lt;env&gt;.json.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"Custom Copy Paths",
      "description":"Allows a developer to specify an array of non-standard project paths that Joystick should copy when running the `joystick build` command (either standalone or as part of `joystick push`).",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"Build Environment Support",
      "description":"Ensures that a build via joystick build (either standalone or via joystick push) respects the -e environment flag or its default (production). In production, guarantees that built files are minified for performance.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"feature",
      "title":"Dynamic Component",
      "description":"Adds support for rendering components dynamically, on-demand. Enables SPA-style navigation on an as-needed basis.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"feature",
      "title":"Joystick Push",
      "description":"Adds support for public release of Push.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"refactor",
      "title": "Cache Translations for Faster SSR",
      "description":"Caches the app's translation files in memory so SSR doesn't have to read translation files from disk for each render.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title": "Cache index.html for Faster SSR",
      "description":"Caches the app's index.html file in memory so SSR doesn't have to read components from disk for each render.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title": "Cache Components for Faster SSR",
      "description":"Caches the component tree in memory so SSR doesn't have to read components from disk for each render.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title": "Cache Email Templates for Faster SSR",
      "description":"Caches the app's email templates in memory so SSR doesn't have to read email files from disk for each render.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title":"Improve Session Handling",
      "description":"Remove unnecessary database usage and access for session creation and validation.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title":"Improve Built-In Middleware Usage",
      "description":"Splits up Joystick's built-in middleware to be context-dependent (UI vs. API routes) to avoid unnecessary middleware calls in the request chain.",
      "location":"@joystick.js/node"
    },
    {
      "type":"refactor",
      "title":"Dependency Path Casing",
      "description":"Adds support for testing paths in the dev server dependency mapper against their lowercase version (as well as original version). Ensures that file name changes don\\'t break rebuilds for existing, uncorrected imports.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"bug",
      "title":"Global State",
      "description":"Fixes issue where global_state was being initialized multiple times, causing the global_state value to be siloed.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Window Settings",
      "description":"Adds a missing reference to window.__joystick_settings__ on the default export of @joystick.js/ui.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Data Request URL",
      "description":"Adds a missing reference for url on req object passed to data (via the __joystick_request__ object set on window during SSR in @joystick.js/node).",
      "location":"@joystick.js/node"
    },
    {
      "type":"bug",
      "title":"CSS Rerender",
      "description":"CSS was failing to be captured on re-render due to the CSS tree job being re-run on each render. This led to a race condition where the CSS is captured initially, but doesn't appear in the final result.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Fix Uploader MIME Types",
      "description":"When validating uploads, the format_uploads() function was only passing the existing mimeTypes field from the uploader options and ignored the new mime_types option.",
      "location":"@joystick.js/node"
    },
    {
      "type":"bug",
      "title":"SVG Rerender",
      "description":"Fixes issue where SVGs render fine on mount, but disappear on re-render. This was due to the incorrect namespace being used for elements when converting them from virtual DOM to DOM nodes. Leverages document.createElementNS() over document.createElement() for SVGs and their children.",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Translation Paths",
      "description":"Fixes double-slash in i18n translations path. Fix uses correct path for i18n translation files in get_translations.js.",
      "location":"@joystick.js/node"
    },
    {
      "type":"bug",
      "title":"Rerender State",
      "description":"When a state change or data refetch occurs, on re-render, the existing state of child components is not preserved (e.g., I have a modal open and it doesn\\'t stay open after re-render).",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Remove Bad Test Dependency",
      "description":"An unnecessary dependency (joystick-ui-test) snuck in to the last release and was breaking test runs. Removed the dependency in favor of referencing the joystick.mount() function it was providing with global.joystick.mount().",
      "location":"@joystick.js/ui"
    },
    {
      "type":"bug",
      "title":"Build Windows",
      "description":"Fixes bug where non-existent rm -rf command throws an error on Windows when building app. Conditionally replaces rm -rf with rmdir /s /q if the process.platform is win32.",
      "location":"@joystick.js/cli"
    },
    {
      "type":"bug",
      "title":"Check Fields in Validation",
      "description":"When running input validation, ensure the input exists in the DOM. This avoids errors where a re-render hides an input that did exist but no longer does.",
      "location":"@joystick.js/ui"
    }
  ]
}
{% /changelog %}

{% alert icon="git-merge" theme="warning" title="RC2 Skipped" %}
Unfortunately there was an issue publishing the 1.0.0-rc.2 release. Due to NPM publishing rules, we can't overwrite this so we've skipped to 1.0.0-rc.3 instead.
{% /alert %}

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: Concepts
title: Component Types
description: The different roles and uses for a component in a Joystick app.
---

Nested inside of Joystick's `/ui` folder, by default, you will find three different folders:

- `ui/layouts`
- `ui/pages`
- `ui/components`

Each of these folders represents a _type_ of component that's used in your UI. Though all components in a Joystick app are defined using the same `joystick.component()` method, their _purpose_ dictates where they live within your project structure.

## Layouts

Layout components in a Joystick app are intended to be global components that render always-visible UI (e.g., a navigation bar and a footer) along with the current page. While they're typically used exclusively for rendering a page within a consistent "frame," they can be as simple or as advanced as your app requires.

{% code theme="light" title="ui/layouts/app/index.js" %}
import joystick from "@joystick.js/ui";

const App = joystick.component({
  render: ({ props, component }) => {
    return `
      <div>
        ${component(props.page, props)}
      </div>
    `;
  },
});

export default App;
{% /code %}

Above, we have the default `App` layout component created for you when you run `joystick create <app-name>` via the CLI. Here, we use the `component()` render method, anticipating a `props.page` value representing the current page being rendered into the layout. We also pass the props passed to the layout down to the page the layout is rendering.

Behind the scenes, that `props.page` value is automatically set by Joystick when using the `res.render()` method inside of one of your routes:

{% code theme="light" title="index.server.js" %}
import joystick from "@joystick.js/node";

joystick.app({
  routes: {
    "/": (req = {}, res = {}) => {
      res.render("ui/pages/index/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
  },
});
{% /code %}

Above, because we've passed the `layout` option to `res.render()`, when this route is visited by a user, Joystick will automatically render that layout component (`ui/layouts/app/index.js`) and pass the component defined at `ui/pages/index/index.js` to it as `props.page`.

Inside of the layout component then, we take this prop and pass it to the `component()` render method because we expect it to contain an instance of a page component that we want to render into our layout.

## Pages

A page component in a Joystick app represents a single page or "screen" in your UI. A profile page, a dashboard, a settings page, etc. A page can contain anything you'd like: static content, interactive elements—whatever. A page can be completely self-contained, or, import other components to render into itself.

Like we showcased above, a page is rendered via the `res.render()` method from one of your routes (passed as the first argument to that method):

{% code theme="light" title="index.server.js" %}
import joystick from "@joystick.js/node";

joystick.app({
  routes: {
    "/": (req = {}, res = {}) => {
      res.render("ui/pages/index/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
  },
});
{% /code %}

A page can be rendered by itself, or—as the example shows above—within a layout.

## Components

Any component that isn't a layout or page in a Joystick app is just considered a generic component. These are typically standalone components that are composed into your layouts, pages, or other components (e.g., a navbar component that's rendered inside of your layout component). Similar to pages, these can contain any UI or functionality you wish.
---
category: Concepts
title: Imports
description: Understanding how imports work in a Joystick app.
---

Due to Joystick's dependency on Node.js v20+, imports are designed to work in-step with the default behavior of the runtime.

Joystick prior to RC1 implemented the experimental Node.js `--experimental-specifier-resolution=node` flag when running your server. This enabled the ability for file paths like these to function:

- `/path/to/index` where `index` was a file called `index.js`. We could omit the `.js` and Node would still resolve it.
- `/path/to/folder` where it was assumed an `index.js` file would be located at `/path/to/folder/index.js` and Node would still resolve it.

After the move to Node.js v20+, this functionality no longer works. Instead, paths that are _not_ pointed at a package in the `/node_modules` directory are assumed to be relative to the current file in your app.

So for example, if we have a file like `/lib/node/parse_markdown.js` and wanted to import that into our `index.server.js` file, we'd do something like this:

{% code theme="light" title="index.server.js" %}
import joystick from "@joystick.js/node-canary";
import api from "./api/index.js";
import parse_markdown from "./lib/node/parse_markdown.js";

joystick.app({
  api,
  routes: {
    "/": (req = {}, res = {}) => {
      res.render("ui/pages/index/index.js", {
        layout: "ui/layouts/app/index.js",
      });
    },
    "*": (req = {}, res = {}) => {
      res.render("ui/pages/error/index.js", {
        layout: "ui/layouts/app/index.js",
        props: {
          status_code: 404,
        },
      });
    },
  },
}).then(() => {
  const markdown_test = parse_markdown(`## Testing 123`);
  console.log(markdown_test);
});
{% /code %}

Here, notice the path for the `parse_markdown.js` file is both:

- The relative path (again, relative to the `index.server.js` file) to the file.
- Uses the full file path, including the `.js` suffix on the file path.

If we were to omit the `.js`, Joystick would still be able to resolve the path, however, it would _not_ trigger any hot module reloading (HMR) behavior in Joystick. If we were to omit the `/index.js` part entirely, Joystick would be unable to resolve the path.
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r




- Queues
- Cron Jobs
- Caches
- Websockets
- File Uploads
- Using Third-Party DOM Libraries (the sync with parent thing)

Do this as its own group in the sidebar under "Fundamentals"


- Simple profile form example or something similar



- Data can be fetched on any component, however, it's best to fetch at the top-most component
  and pass data down via props.
- Using a refetch
- Using the data method
- Using the get() method










- Make sure to link to the docs on:
  - State
  - Props
  - DOM Events
  - Composing Components
  - Fetching data
  

����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
����Mac OS X        ����	���2���q���������������������������������������������ATTR���������������������������������������com.apple.provenance��@�����r
---
category: Getting Started
title: Creating an App
description: How to create a new Joystick app.
---

### Using the Production Release

The `production` release of Joystick is considered the current, stable release of Joystick. This is the version of Joystick installed when you run `npm i -g @joystick.js/cli`. **This is the recommended version of Joystick to use for your app**. To create an app with this release, from your terminal, run:

{% code theme="light" title="Terminal" %}
joystick create <app-name>
{% /code %}

Replace `<app-name>` in the command above with the name of your app (use only single word, hyphenated, or snake_case names). The command above will create your app and install Joystick's dependencies:

- `@joystick.js/ui`: the client-side, component portion of the framework
- `@joystick.js/node`: the server-side, Node.js portion of the framework
- `@joystick.js/test`: the testing framework you will use for writing tests against your Joystick app

Though separate packages, all three are designed to work together and are utilized when building your app.

### Using the Canary Release

The `canary` release of Joystick is considered the current, development release of Joystick. This is the version of Joystick installed when you run `npm i -g @joystick.js/cli-canary`. This release is considered unstable and should only be used for experimental purposes.

{% alert theme="warning" title="Use at your own risk" %}
The canary release is the "nightly" version of Joystick and is subject to incomplete or buggy code. It's subject to frequent change and should be considered unstable. <strong>Only use this in development or if you know what you're doing.</strong>
{% /alert %}

To create a new app using the `canary` release, from your terminal, run:

{% code theme="light" title="Terminal" %}
joystick-canary create <app-name> --release canary
{% /code %}

Replace `<app-name>` in the command above with the name of your app (use only single word, hyphenated, or snake_case names).

**The `--release canary` flag here is important**. If you fail to do this, your app will be created with the `production` version of Joystick's dependencies. This is done as a fail-safe to prevent you from accidentally creating an unstable app. The command above will create your app and install the `canary` version of Joystick's dependencies:

- `@joystick.js/ui-canary`: the `canary` version of the client-side, component portion of the framework
- `@joystick.js/node-canary`: the `canary` version of the server-side, Node.js portion of the framework
- `@joystick.js/test-canary`: the `canary` version of the testing framework you will use for writing tests against your Joystick app

Identical to the `production` packages, thought separate, all three are designed to work together and are utilized when building your app.

{% content_footer previous_page_link="/joystick/getting-started/installation" previous_page_label="Installation" next_page_link="/joystick/getting-started/starting-an-app" next_page_label="Starting an App" %}
---
category: "@joystick.js/core"
title: Environment Settings
description: How to configure your Joystick app with settings.&lt;env&gt;.json files.
---

To provide configuration for your app, Joystick relies on `settings.<env>.json` files at the root of your app. You should have one `settings.<env>.json` file for each environment your app will run in (this environment is denoted by the value of `process.env.NODE_ENV`).

When you start your app with `joystick start` via the CLI, this defaults to `development`. If you deploy your app using [Push](https://cheatcode.co/push), this defaults to `production`.

The following settings files and environments are recommended:

- `settings.development.json` — Settings for your local/development environment.
- `settings.staging.json` — Settings for your staging environment (a private but internet-accessible version of your app running on hardware similar to your production environment).
- `settings.production.json` — Settings for your production environment.
- `settings.test.json` — Settings for your app used when running `joystick test` via the Joystick CLI.

### Non-development environment behavior

While you _can_ use any environment name you wish, keep in mind that Joystick treats any environment name other than `development` as a production-like environment.

## Settings File Structure

For all of your supported environment files, the following structure should be utilized. A description of each field's behavior can be found below.

{% code theme="light" %}
{
  "config": {
    "databases": [],
    "i18n": {
      "default_language": "en-US"
    },
    "middleware": {},
    "email": {
      "from": "",
      "smtp": {
        "host": "",
        "port": 587,
        "username": "",
        "password": ""
      }
    }
  },
  "global": {},
  "public": {},
  "private": {}
}
{% /code %}

## API

### Parameters

{% parameters %}
{
  "config": {
    "type": "object",
    "required": true,
    "description": "Contains Joystick-specific settings for your app.",
    "children": {
      "databases": {
        "type": "array",
        "required": true,
        "description": "Connection settings for the databases you'd like to connect to your app.",
        "children": {
          "provider": {
            "type": "string",
            "required": true,
            "description": "The provider ID of one of Joystick's supported database providers (e.g., mongodb)."
          },
          "users": {
            "type": "boolean",
            "required": false,
            "description": "Whether user management should be enabled for this database (defaults to false)."
          },
          "options": {
            "type": "object",
            "description": "Additional configuration for the provider's Node.js driver."
          },
          "connection": {
            "type": "object",
            "description": "Specify a remote connection for the provider.",
            "children": {
              "username": {
                "type": "string",
                "description": "Username for the remote connection."
              },
              "password": {
                "type": "string",
                "description": "Password for the remote connection."
              },
              "database": {
                "type": "string",
                "description": "Name of the database for the remote connection."
              },
              "hosts": {
                "type": "array",
                "description": "An array of hosts for the remote connection.",
                "children": {
                  "hostname": {
                    "type": "string",
                    "description": "Hostname for the remote DB (e.g., us1.mongodbprovider.com)."
                  },
                  "port": {
                    "type": "integer",
                    "description": "Port number for the hostname."
                  }
                }
              }
            }
          }
        }
      },
      "build": {
        "type": "object",
        "description": "Configuration for Joystick's build process.",
        "children": {
          "excluded_paths": {
            "type": "array",
            "description": "Paths to exclude from the build process."
          },
          "copy_paths": {
            "type": "array",
            "description": "Custom paths to copy during the build process."
          }
        }
      },
      "middleware": {
        "type": "object",
        "description": "Overrides for Joystick's built-in middleware."
      },
      "i18n": {
        "type": "object",
        "description": "Internationalization (i18n) settings.",
        "children": {
          "defaultLanguage": {
            "type": "string",
            "description": "ISO-693 language + ISO-3166 country code (e.g., en-US, de-DE)."
          }
        }
      },
      "email": {
        "type": "object",
        "description": "Email settings for SMTP providers.",
        "children": {
          "from": {
            "type": "string",
            "description": "Default from address if none passed to `email.send()`."
          },
          "smtp": {
            "type": "object",
            "description": "SMTP provider settings.",
            "children": {
              "host": {
                "type": "string",
                "description": "SMTP hostname."
              },
              "port": {
                "type": "integer",
                "description": "SMTP port (commonly 587 for TLS)."
              },
              "username": {
                "type": "string",
                "description": "SMTP username."
              },
              "password": {
                "type": "string",
                "description": "SMTP password."
              }
            }
          }
        }
      }
    }
  },
  "global": {
    "type": "object",
    "required": false,
    "description": "Global settings accessible on both client and server."
  },
  "public": {
    "type": "object",
    "required": false,
    "description": "Public settings accessible on both client and server."
  },
  "private": {
    "type": "object",
    "required": false,
    "description": "Private settings accessible only on the server."
  }
}
{% /parameters %}


---
category: Getting Started
title: File Structure
description: How a Joystick project is structured and how that structure if enforced.
---

As an opinionated framework, Joystick ships with a standardized file structure. This ensures that every project you build with the framework is consistent, easy-to-navigate, and internally: behavior remains stable.

While some developers prefer absolute control over their project structure, Joystick takes the stance that **it's better to sacrifice some control in favor of maximum predictability** (both on the developer experience side and internally on the framework side).

Files with an `*` asterisk after them below are **required**:

{% code theme="light" title="File Structure" %}
├── .joystick/
├── api/ *
├── caches/
├── cron_jobs/
├── css/
├── email/ *
│   ├── base.css
│   ├── base.html
│   └── reset_password.js
├── fixtures/
├── i18n/ *
│   └── email/
├── indexes/
├── lib/ *
│   ├── browser/
│   └── node/
├── node_modules/
├── private/ *
├── public/ *
│   ├── apple-touch-icon-152x152.png
│   ├── favicon.ico
│   ├── joystick_logo.webp
│   ├── manifest.json
│   ├── service-worker.js
│   └── splash-screen-1024x1024.png
├── queues/
├── routes/
├── tests/
├── ui/ *
│   ├── components/ *
│   ├── layouts/ *
│   └── pages/ *
├── uploaders/
├── websockets/
├── workers/
├── index.client.js *
├── index.css
├── index.html *
├── index.server.js *
├── package.json
└── settings.<env>.json
{% /code %}

<div class="mod-table-container">
  <table class="mod-table mod-table-bordered">
    <thead>
      <tr>
        <th class="mod-text-left mod-nowrap">Path</th>
        <th class="mod-text-center mod-nowrap">Required</th>
        <th class="mod-text-left mod-nowrap">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="mod-text-left mod-nowrap">.joystick/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where Joystick stores builds of your app and data from your databases.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">api/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where the definitions for your getters and setters are defined for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">caches/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where the definitions for your in-memory caches are defined for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">cron_jobs/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where the definitions for cron jobs are defined for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">css/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where any global stylesheets are stored for your app (in addition to the root index.css file).</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">email/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where your base HTML and CSS for email templates live as well as individual templates (built with Joystick components).</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">fixtures/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where your fixture function definitions live for creating test data in your app..</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">i18n/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where your translation files live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">indexes/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where your database indexes live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">lib/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where your miscallaneous "library" code lives in your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">node_modules/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where any NPM-installed dependencies live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">private/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where any server-side only files live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">public/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where any public file live for your app (accessible via both client and server).</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">queues/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where job queue definitions live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">routes/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where you can organize larger route files for your app outside of your index.server.js file.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">tests/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where your tests live for your app. Internally, structured to match the structure of your project.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">ui/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where the components, layouts, and pages that make up your app's UI live.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">uploaders/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where your uploader definitions live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">websockets/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where your WebSocket definitions live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">workers/</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where any standalone Node.js workers are stored for your app (loaded and called via the <code>worker()</code> method in <code>@joystick.js/node</code>).</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">index.client.js</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where any global, client-side JavaScript lives for your app (e.g., analytics tracking code).</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">index.css</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where global CSS lives for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">index.html</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where the main HTML template for the app lives.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">index.server.js</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">Where your Joystick app definition lives. The entry point for Joystick's development server.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">package.json</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-check mod-color-success"></i></td>
        <td class="mod-text-left mod-nowrap">The default Node.js package.json file where scripts, dependencies, and Node-specific config live for your app.</td>
      </tr>
      <tr>
        <td class="mod-text-left mod-nowrap">settings.&lt;env&gt;.json</td>
        <td class="mod-text-center mod-nowrap"><i class="mod-icon-x mod-color-danger"></i></td>
        <td class="mod-text-left mod-nowrap">Where the environment-specific config lives for your app (supports <code>development</code>, <code>staging</code>, and <code>production</code>).</td>
      </tr>
    </tbody>
  </table>
</div>

{% content_footer previous_page_link="/joystick/getting-started/starting-an-app" previous_page_label="Starting an App" %}
---
category: Getting Started
title: Installation
description: How to Install Joystick on your computer.
---

### Install Node.js + NPM

In order to install Joystick, you'll need to have Node.js (v20+) and NPM installed on your computer. You can download an installer for both for your operating system from the [official Node.js downloads page](https://nodejs.org/en/download). Alternatively, you can use a tool like [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to install and switch bettwen multiple versions of Node.js and NPM.

### Installing Joystick via NPM

Once you have Node.js and NPM installed, open up your terminal and run the following command:

{% code theme="light" title="Terminal" %}
npm i -g @joystick.js/cli
{% /code %}

That's it! You're ready to create your first app and start using Joystick.

{% alert theme="info" title="Database Support" %}
Prior to Joystick 1.0.0-rc2, any databases used by your app were required to be installed on your computer, independent of Joystick. As of the 1.0.0-rc2 release, Joystick will automatically download and install a binary for your app's chosen database(s) (determined by your `settings.env.json` file) when you start your app for the first time.
{% /alert %}

{% content_footer next_page_link="/joystick/getting-started/creating-an-app" next_page_label="Creating an App" %}
---
category: Getting Started
title: Starting an App
description: How to start Joystick's local development server.
---

Once you've created your project, `cd` into its folder on your computer and run:

{% code theme="light" title="Terminal" %}
joystick start
{% /code %}

First, Joystick will check your project's `settings.development.json` file to see what (if any) databases it has configured. If any of those databases do _not_ have their binary installed on your machine, Joystick will download it for you.

Once all databases are installed, Joystick will start up your app's server on port `2600`. Once your app is running, Joystick will notify you in tour terminal with "App running at: http://localhost:2600."

### Starting your app on a different port

If you're running multiple Joystick apps on your computer (or other projects), you can optionally change the port you start your Joystick app on by including the `--port` or `-p` flag in your start command:

{% code theme="light" title="Terminal" %}
joystick start -p <port-number>
{% /code %}

This will make your app accessible in the browser at `http://localhost:<port-number>`.

## Starting a Canary app

If you created your app using one of Joystick's `canary` releases, it's recommended that you start your app with `joystick-canary start` instead. This will ensure that you use the version of the Joystick CLI (`@joystick.js/cli-canary`) that's compatible with the `canary` packages installed in your app.

{% content_footer previous_page_link="/joystick/getting-started/creating-an-app" previous_page_label="Creating an App" next_page_link="/joystick/getting-started/file-structure" next_page_label="File Structure" %}
---
category: Getting Started
title: Syntax Highlighting
description: How to enable syntax highlighting in Joystick components.
---

When you author [Joystick components](/joystick/ui/component/component), your component's `render()` method will expect you to return a template literal string. By default in most editors, because this is just a string (albeit a special type), most editors just style the entirety of the HTML inside as a string (monochrome). 

To get around this, Joystick offers two solutions:

1. If you're using VSCode, it's highly recommend that you install the [Template Literals](https://marketplace.visualstudio.com/items?itemName=julienetie.vscode-template-literals&utm_source=chatgpt.com) package by julienetie. This automatically enables syntax highlighting of HTML in template literal strings.

2. Use Joystick's built-in `html()` render method to help you "tag" your template literal and enable syntax highlighting (and code folding) via the [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) (VSCode) package by Matt Bierner.

{% alert icon="layers" theme="warning" title="Enable Folding in VSCode" %}
If you'd like to have code folding in addition to syntax highlighting for HTML in components, you'll want to open VSCode's settings and search for "folding." Ensure that folding is turned on, but also, ensure that "Folding Strategy" is set to "indentation," not "auto."
{% /alert %}

## Using the html() render method

To utilize the HTML render method, inside of your component's `render()` method—using destructuring on the component instance passed to `render()`—you'll want to define the `html` property and return a call to it with your HTML string from `render()`:

{% code theme="light" title="ui/pages/index/index.js" %}
import joystick from "@joystick.js/ui-canary";
import Button from "../../components/button/index.js";
import format_iso_to_human_readable from "../../../lib/format_iso_to_human_readable.js";
import supported_languages from "../../../lib/supported_languages.js";

const Index = joystick.component({
  test: {
    name: 'index_page',
  },
  data: async (api = {}) => {
    return {
      index: await api.get('index'),
    };
  },
  state: {
    websockets_connected: false,
  },
  websockets: (instance = {}) => {
    ...
  },
  css: {
    ...
  },
  events: {
    ...
  },
  render: ({ props, html, data, component, state, i18n, user, language, each }) => {
    return html`
      <div class="index-page">
        ...
      </div>
    `;
  },
});

export default Index;
{% /code %}

Above, we destructure `html` from the component instance passed to `render()` and then call it like `html\`HTML for component goes here...\``. Once we have this in our component, with the [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) package installed, we should get syntax highlighting and code folding, right inside of VSCode.

{% alert theme="warning" title="Other IDE Support" }
If you're using a different IDE, it's recommended that you leverage the `html()` render method to enable syntax highlighting unless your IDE of choice has a package similar to the two mentioned above.
{% /alert %}
---
category: Getting Started
title: Using the SaaS Boilerplate
description: How to speed up development with CheatCode's official SaaS boilerplate.
---

While it _can_ be used for any type of website or app, Joystick was designed first and foremost for SaaS founders looking for an easier way to build and ship SaaS apps.

To help you move faster, CheatCode (Joystick's creator) offers an official [SaaS Boilerplate](https://github.com/cheatcode/saas-boilerplate) that includes common SaaS features like:

- Light and dark mode toggling.
- A fully-implemented accounts flow, including sign up, log in, password recovery, and password reset UIs.
- An admin dashboard with a complete user admin where you can create, update, and delete users and manage their roles.
- Transactional email templates for handling things like new sign up welcomes, password resets, and notifications.

{% button theme="brand" label="View on Github" href="https://github.com/cheatcode/saas-boilerplate" %}
---
category: Framework
title: License
description: How Joystick is licensed and what that means for your project.
---

Joystick is licensed under the <a href="https://saucr.org" target="_blank">SAUCR License</a> (Source Available Under Commercial Restriction), an open-source software license created by Joystick's author for Joystick and other open-source developers. The license is designed to maximize transparency while protecting independent creators from forfeiting their intellectual property rights.

## SAUCR License
### Source Available Under Commercial Restriction

Version 1, March 3rd, 2024

---

## Copyright Notice

Copyright © 2025 CheatCode Software LLC

## Definitions

"License" shall mean the terms and conditions for use, reproduction, and distribution of the source code as defined in this document.

"Author" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Work" shall mean the work of authorship, whether in the form of source code, documentation, assets, or other materials, made available under the License, as indicated by a Copyright Notice that is included in or attached to the work.

"Derivative Works" shall mean any work, whether in the form of source code, documentation, assets, or other materials that are based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship.

## Scope

This license covers any and all source code, documentation, assets, or other materials included in the source code ("software", "the software", "project", "the work", "work", "the code", "code", "source", "source code", "repo", "repository", or "git repo") accompanying this license created by the author ("author", "creator", "developer", "developers", "copyright holder", "copyright holders").

This license does not cover any source code, documentation, assets, or other materials included in the source code that were not created by the author. Any source code that falls under this description is subject to its own license(s) and requirements.

## Copyright & Attribution

The full text of this license including the above Copyright Notice shall be included in all derivative works of the source code.

The author retains full copyright, intellectual property rights, and patent rights to any and all source code, documentation, assets, or other materials included in the source code created by the author and is licensing usage of the source code, documentation, assets, or other materials included in the source code to you for the express purpose of creating any derivative work that falls within the limits imposed by the "Derivative Works Permitted" and the "Derivative Works Not Permitted" under "Agreement."

## Agreement

Permission is hereby granted, free of charge, to any person obtaining a copy of this source code, to use the source code in or as a part of any derivative work permitted under "Derivative Works Permitted." Copying, modifying, publishing, distributing, sub-licensing, and/or sale of the source code is permitted for any work that falls within the limits imposed by the "Derivative Works Permitted" and the "Derivative Works Not Permitted." Any usage not expressed or implied under "Derivative Works Permitted" is prohibited without written permission from the author in addition to the "Derivative Works Not Permitted."

## Derivative Works Permitted

Under this license, the following derivative works using the source code are permitted:

Any software ("software", "app", "application", "tool", "intranet", "dashboard", "interface", "back end", "front end"), Software as a Service (SaaS) or Platform as a Service (PaaS) product or service offered either commercially or non-commercially that does not conflict with the limits of the "Derivative Works Not Permitted" stated below.

Use of the source code or documentation as the training data for any non-commercial Artificial Intelligence (AI) model, agent, or product.

## Derivative Works Not Permitted

Under this license, the following derivative works using the source code are not permitted:

An alternative or competing software framework ("framework", "library", "package", "packages", "fork", "forks") that originates as a fork (modified copy of the source code) or copy (either a verbatim, unmodified copy or a reproduction or re-implementation inspired by the source code) either for commercial or non-commercial purposes using either the current name or brand of the source code, Joystick, or a different name, brand, or entity.

A Platform as a Service (PaaS) made available commercially or non-commercially that offers the source code itself as a service (e.g., offering a hosted version of the framework as a service).

Use of the source code or documentation as the training data for any commercial Artificial Intelligence (AI) model, agent, or product.

## Requesting Permission for Derivative Works

Permission for derivative works not listed under "Derivative Works Permitted" can be requested from the author via email at business@cheatcode.co.

## Limitation of Liability

THE SOURCE CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOURCE CODE OR THE USE OR OTHER DEALINGS IN THE SOURCE CODE.
---
category: Framework
title: LLM Access
description: How to access these docs in an LLM-friendly format.
---

To make Joystick more accessible for usage with LLMs, you can access the full contents of these docs as plain-text markdown via the URL [/llm/joystick](/llm/joystick).

This will return a `text/markdown`-typed response with the full source of these docs as a single, large text file.

This URL can safely be used as the full, canonical documentation for Joystick as part of a RAG or MCP server.

## Accessing individual pages

All documentation pages can have their contents returned as plain-text Markdown by appending the `llm` query param like so:

{% code theme="light" %}
https://docs.cheatcode.co/joystick/node/i18n?llm=true
{% /code %}

Similar to the full documentation above, you will receive back the plain-text Markdown version for that specific documentation.
---
category: Framework
title: Philosophy
description: Why Joystick exists, how it's built, and the attitude toward how, when, and why its functionality evolves.
---

Much of what exists in the JavaScript ecosystem can best be described as attempts to solve problems in an overly-clever way. Unfortunately, more often than not, the desire to implement the most clever solution—typically unstated but visible to the trained eye—leads to convoluted tools and excessive dependence on third-parties.

In direct defiance to lessons learned by other languages and frameworks, JavaScript developers attempt to stand on their own, forever reinventing the wheel, only to come up short. This leads to unnecessary compromises and ultimately, messes, that give the language and ecosystem a bad name.

Joystick seeks to fix this. It's goals are humble:

1. Make it easy for a developer to go from learning the basics of web development—HTML, CSS, and JavaScript—to building full-stack applications.

2. Reduce the complexity and fragility of shipping an app with JavaScript.

3. Offer a technical balance between the ability to move fast early via convenience and the long-term desire for a stable, easy-to-maintain app via sound architecture decisions.

To achieve this, Joystick takes a radical approach:

### Prefer Standards-Based JavaScript

Though controversial to some, the language preference for writing code (both in the framework internals _and_ when using the framework to build applications) is JavaScript, not TypeScript. Joystick's author prefers plain JavaScript due to its simplicity and alignment with the [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) standard.

## Be hyper-opinionated

In order to keep Joystick stable between releases, how and why things are done is not left up to discussion. Decisions are made by its creator, backed by careful thought and practical experience over time.

Joystick should be a good fit for most (if not all) SaaS apps, but it's approach isn't going to be for everyone (and that's okay).

## Learn from experience

Make wise use of the lessons and best practices learned from "grey beard" tech, preferring those approaches as a default (e.g., don't jam routes into the client—just define them on the server where they belong). Don't ignore the new stuff, but be skeptical of its efficacy—a demo is worth a thousand words.

## Limit third-party dependencies

DIY should be the default approach, if at all possible. Don't add a package when we can just implement its functionality ourselves. Make it a goal to reduce dependencies to zero over time.

## Keep the team small

Most open source work suffers from a problem of mediocrity because it defaults to making decisions by committee. Joystick is the opposite, with all final decisions being made by its creator. Outside opinions are welcome and will be considered, but pull requests will be few and far between.

Any formation of a core team (if at all) will be slow and hyper-deliberate, with team members being selected for their skill level and dedication to Joystick's philosophy and vision.

## Keep APIs backwards compatible

The only changes to the framework's APIs between versions should be fixes and new features. Anything you've built in the past should just work with a new version. No rug pulls. No excuses. The ideal is to have only one major version, with all subsequent versions being minor or patch releases.

## Avoid the open source rat race

Chasing Github stars and constantly pushing new code without cause is frowned upon. Do work when it makes sense and when the ideas being implemented have been tested and given the appropriate amount of consideration. Make haste slowly.

## Ignore everybody

Focus on delivering a great developer experience so developers can deliver a great user experience. Compete with your current version, not the insecure "competition" or the know-it-all naysayers.

Waste zero time arguing about or defending decisions already made. If the current solution works (and well), any time spent arguing about _how_ it was done is wasted energy that could be put back into the framework. Only genuine, constructive feedback is welcome. Everyone else should be shown the door.

## The big picture

Ultimately, Joystick isn't a fashion statement—it's a tool. In order to ensure that tool remains useful, the above philosophy is deployed. If you don't like it, it's best to move along and use something else.
---
category: Framework
title: System Requirements
description: The minimum requirements your system will need to run Joystick.
---

## Rosetta on M-Series Macs

To make Joystick as universally compatible as possible, some of its database binaries are in an x86_64 format. On a new M-Series Mac, to ensure that Joystick runs smoothly, you'll want to enable support for Rosetta via your Terminal:

{% code theme="light" title="Terminal" %}
softwareupdate --install-rosetta
{% /code %}

After you've run this, you _may_ need to restart your Terminal (recommended). A common error you will see without installing this is `Error: spawn Unknown system error -86`.

## WSL2 on Windows

In order to use Joystick on Windows, we require that you utilize WSL2 via the [Ubuntu 24.04 app available on the Microsoft Store](https://apps.microsoft.com/detail/9nz3klhxdjp5?hl=en-US&gl=US). This will ensure that you gain access to Joystick's full feature set and all of its supported databases without any hiccups. Joystick's database binaries are built against Ubuntu 24.04 and are not currently tested against any other release of Ubuntu.

{% alert icon="package" theme="warning" title="Must Install Node.js" %}
After you've downloaded and installed Ubuntu 24.04 from the Microsoft Store, open the app and follow the [installation instructions on the Node.js Download page](https://nodejs.org/en/download) for Linux using nvm with npm. Node.js v24.0.0 or greater LTS is recommended.
{% /alert %}

## Node.js

Joystick is a Node.js-based framework and requires you to have Node.js and NPM (Node Package Manager) installed on your computer.

Currently, the recommended _minimum_ version for Joystick is Node.js v20 LTS, though, v21 or greater are recommended.

To install Node.js (and NPM) on your computer, <a href="https://nodejs.org/en/download">read the official installation instructions</a>.

## Import Paths

Joystick's earlier versions depended on the `--experimental-specifier-resolution=node` flag which was dropped in Node.js v19. This allowed import paths in your code that omitted a trailing `index.js` file name and excluding the `.js` extension from file names when importing them (e.g., to import a file at `/api/index.js` you could do `/api` or `/api/index` and Node would resolve the full path automatically).

Because Joystick's current minimum version no longer supports this behavior, for import paths, **it's recommended that you type the full, relative path to the file** to ensure maximum long-term compatibility with Node.js. Because this is the standard for Node.js moving forward, Joystick will default to aligning with this behavior (as opposed to implementing a polyfill or other hack to re-implement the path resolution).
---
category: Framework
title: Versioning
description: How and when Joystick's versions change and what that means for your project.
---

Joystick's versioning is designed to keep all of the framework's packages in parity with one another. Although the framework consists of four different packages, if any of those packages change, _all_ packages have their version bumped (even if a package doesn't have changes).

There are two release tracks for all Joystick packages: production and canary.

### Production Packages

These include `@joystick.js/ui`, `@joystick.js/node`, `@joystick.js/cli`, and `@joystick.js/test`. These are the production-safe versions of Joystick's packages.

### Canary Packages

These include `@joystick.js/ui-canary`, `@joystick.js/node-canary`, `@joystick.js/cli-canary`, and `@joystick.js/test-canary`. The canary version of each package is considered the "nightly" version. Packages with the `-canary` suffix contain the latest features, however, unlike the production version are **considered unstable and potentially buggy**.

Canary packages should be used with **extreme caution** and only if you know what you're doing.

## Updating Joystick

To update your Joystick app to the latest version, via the Joystick CLI `@joystick.js/cli`, run the `joystick update` command from the root of your project:

{% code theme="light" title="Terminal" %}
cd <my_project> && joystick update
{% /code %}

This also works for the `-canary` suffixed releases, however, using `joystick-canary update` like so:

{% code theme="light" title="Terminal" %}
cd <my_project> && joystick-canary update
{% /code %}

---
category: Framework
title: What is Joystick?
description: Get an understanding of what Joystick is, what it does, and why it might be a good choice for you and your team.
---

Joystick is an opinionated full-stack JavaScript framework for building SaaS apps.

It combinines a simple, easy-to-learn components API with a batteries-included Node.js back-end. It's designed—first and foremost—for developers who value productivity and performance; essential ingredients for any successful SaaS.

Joystick is for you if:

- **You want an all-in-one system for building your app** with everyday features built-in; not a stripped down "framework" that forces you to use third-party packages and services to implement basic functionality.
- **You want to work with simple, easy-to-understand APIs and structure** that don't force you to comb through poorly written docs, wrestle with half-working tutorials, or roll the dice on AI-generated code.
- **You want a set of tools that just work**, as described, indefinitely. No "sorry, bro, that's deprecated" rug pulls or chasing of patterns that are "it" today and dead tomorrow.
- **You want to move fast** without compromising quality and scalability.
- **You want to build with tools that are *actually* used by the people making them** to build their own apps (not toys or stripped-down demos for a tech talk).

## Packages

Though Joystick works as a single framework, it's made up of four packages:

- `@joystick.js/ui` - The components library for Joystick. Introduces a simple, single-function pattern for implementing your components using plain HTML, CSS, and JavaScript. No attribtue hacks. No compilers. Just straight JavaScript.
- `@joystick.js/node` - The batteries-included, Node.js back-end for Joystick. Incldues everything from routing, to email, uploads, WebSockets, queues, and a whole bunch of other tools common to building a SaaS app.
- `@joystick.js/cli` - The command-line interface for Joystick and its development server. Helps you to create, run, and deploy new Joystick apps.
- `@joystick.js/test` - The testing framework for Joystick. Runs your app as a mirror of itself so that you can write tests against your actual app—not mocks and stubs that create false-positives.

Under-the-hood, `@joystick.js/cli` brings all of these together into a cohesive, full-stack framework. When creating a new project, all of these packages are installed and your app is scaffolded with examples of how they're used, when, and where.
