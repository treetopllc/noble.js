# Developers

## Dependencies

 * [Node.js / NPM](http://nodejs.org/)
 * [GNU Make](http://www.gnu.org/software/make/)
 * [git-flow](https://github.com/nvie/gitflow)


## Build Process

    $ make

This will build the component itself, including downloading and installing all
component dependencies.

    $ make clean

This will basically undo the operation above. Use this if you need to completely
reload the npm modules, installed components, etc.


## Making Changes

We are using [git-flow](https://github.com/nvie/gitflow) for development, which
means you must install it and use it for any development changes. Your changes
will all begin with a command similar to below:

    $ git flow feature start my_new_feature

If you are working on a bugfix, you _may_ need to substitute `hotfix` in place
of `feature`.

Do **not** use `git flow feature finish ...`, instead use:

    $ git flow feature publish my_new_feature

This will push the branch out to GitHub, where you can submit a PR. (make sure
to submit the PR against the `dev` branch)

Also, **always** include tests with your PRs.

Finishing out PRs will be done with git-flow on the command line (manually)
rather than through the GitHub interface.


## Making New Releases

We use [semver](http://semver.org/) for making new releases, so make sure to
take that into account for all versioning decisions.

    $ git flow release start x.y.z

This will begin the release process, make sure to update:

 * `package.json`
 * `component.json`
 * `CHANGES.md`

Also, don't forget to run the unit tests to make sure everything is ok! Once
the release is completely ready to go:

    $ git flow release finish x.y.z -p

The `-p` flag is important, as it will push the changes to github. If you forget
it, you will need to push manually.

That should be it! Component just references `master` in most cases, so your
code elsewhere likely will not need to change. (Unless you're locked into a
specific version tag or branch)


## Coverage Testing

To run code coverage tests, (run in parallel with the mocha unit tests) you
need to build an "instrumented" version of `lib/`. (called `lib-cov/`)

    $ make lib-cov

After this, you can run the server (see "Running Tests") and run the unit tests,
the coverage results will be displayed to the right after the tests are done.


## Running Tests

First, you need to create a test configuration file, which has places to set
the API url and authentication parameters, among other things.

    $ make test/api.json

### Available Config Properties (test/api.json)

````javascript
{
    // required for the api itself
    "client_id": null,
    "client_secret": null,
    "api_url": "http://kingscross.local:7000",
    // if falsy, it will use the URL above (and test CORS by extension)
    "proxy_url": "/api",
    // noblehour account login details
    "username": null,
    "password": null,

    // configuration for testing the alerts API (treetopllc/ponyexpress)
    "alerts": {
        // specify a mailbox to test with (if not, one will be chosen automatically
        // by iterating through the list of all mailboxes until 1 is found that contains alerts)
        "mailbox_id": null
    },

    // configuration for testing the graph API (treetopllc/drake)
    "graph": {
        // search parameters (see `Client#search(params)`)
        "search": {
            "terms": "school",
            "limit": 50
        },
        // testing user graph
        "users": {
            // specify root user vertex (if not, the logged in user will be used)
            "user_id": null
        },
        // testing user submissions graph
        "submissions": {
            // specify root user vertex (if not, the logged in user will be used)
            "user_id": null,
            // specify a submission_id (if not, the first submission from the above user_id will be used)
            "submission_id": null,
            // additional meta required by api119
            "submission_type_id": null,
            "content_id": null
        }
    }
}

````

Tests _cannot_ be run via the CLI at this time, (some weirdness with PhantomJS
and Cross-Domain Requests) but they can be run in a browser. Start up the test
server:

    $ make server

Then, via [http://localhost:3000/test/runner.html](http://localhost:3000/test/runner.html)
you will get the browser test runner.

This server is using a module called [`component-assets`](https://github.com/anthonyshort/component-assets)
for compiling the component automatically in the background during each refresh
of the test runner. (you don't need to run `make` for each change anymore)
