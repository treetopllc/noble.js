# Developers

## Dependencies

 * [Node.js / NPM](http://nodejs.org/)
 * [git-flow](https://github.com/nvie/gitflow)


## Building

During development, you will need to rebuild after each change. (this
will change in the future, after the migration to Component v1.0.0 is
complete)

```bash
$ npm run build
```


## Making Changes

We are using [git-flow](https://github.com/nvie/gitflow) for development, which
means you must install it and use it for any development changes. Your changes
will all begin with a command similar to below:

```bash
$ git flow feature start my_new_feature
```

If you are working on a bugfix, you _may_ need to substitute `hotfix` in place
of `feature`.

Do **not** use `git flow feature finish ...`, instead use:

```bash
$ git flow feature publish my_new_feature
```

This will push the branch out to GitHub, where you can submit a PR. (make sure
to submit the PR against the `dev` branch)

Also, **always** include tests with your PRs.

Finishing out PRs will be done with git-flow on the command line (manually)
rather than through the GitHub interface.


## Making New Releases

We use [semver](http://semver.org/) to decide upon version numbers.

```bash
$ git flow release start x.y.z
```

This will begin the release process, make sure to update:

 * `package.json`
 * `component.json`
 * `CHANGES.md`

Also, don't forget to run the unit tests to make sure everything is ok! Once
the release is completely ready to go:

```bash
$ git flow release finish x.y.z -p
```

The `-p` flag is important, as it will push the changes to github. If you forget
it, you will need to push manually:

```bash
$ git push origin --all
$ git push origin --tags
```


## Coverage Testing

**This has been removed temporarily during the upgrade to Component v1.0+**


## Running Tests

In order to run headless tests, use:

```bash
$ npm test
```

If you need to test this out in a real browser, use:

```bash
$ npm start
```

Then, open the following up in whatever browser you need to:
[http://localhost:3000/test/runner.html](http://localhost:3000/test/runner.html)
