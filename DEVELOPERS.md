# Developers

## Dependencies

 * [Node.js / NPM](http://nodejs.org/)
 * [GNU Make](http://www.gnu.org/software/make/)
 * [git-flow](https://github.com/nvie/gitflow)


## Build Process

    $ make

This will build the component itself, including downloading and installing all
component dependencies. This is a prerequisite for opening the test runner.

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


## Running Tests

    $ make test

This will generate a `test/api.json` file (based on `test/api-dist.json`). You
must modify this file to include an API URL, credentials, etc. (basically just
fill all the JSON properties in)

Tests _cannot_ be run via the CLI at this time. (some weirdness with PhantomJS
and Cross-Domain Requests) The test runner is available via the browser though,
so start up a web server (the [http-server](https://github.com/nodeapps/http-server)
module is a good example) in the root directory:

    $ http-server -p 3000

Then, via [http://localhost:3000/test/runner.html](http://localhost:3000/test/runner.html)
you will get the browser test runner.
