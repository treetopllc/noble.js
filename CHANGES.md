Version History
===============

## 0.9.0 (10/21/2014)
 * Changing `saml()` to `sso()`

## 0.8.6 (10/21/2014)
 * Repo name changes

## 0.8.4 (10/2/2014)
 * Hotfix for typo in saml() vall (copy-pasta fail)

## 0.8.3 (10/2/2014)
 * Adding `saml()` to allow for search of sso providers

## 0.8.2 (10/1/2014)
 * Adding `Organization#groups()` and `Organization#group()`

## 0.8.1 (9/19/2014)
 * Added `Vertex#delete()`

## 0.8.0 (9/5/2014)
 * Removing all "references", web apps will use treetopllc/mappings-nobleweb and treetopllc/mappings-collaboratory respectively

## 0.7.4 (8/27/2014)
 * Adding `Organization#submission()`, `Organization#moderations()` and `Organization#moderation()`
 * Adding collaboratory-related group types

## 0.7.3 (8/6/2014)
 * Adding "Course" to list of group types

## 0.7.2 (7/11/2014)
 * Adding activity types to reference

## 0.7.1 (6/20/2014)
 * Adding `Project#search()`
 * Changing `Vertex#create()` to always use `baseUri` (just in case)

## 0.7.0 (6/20/2014)
 * Adding the `Project` vertex object

## 0.6.6 (6/19/2014)
 * Updating `reference.vertex_types` to include "Project"

## 0.6.5 (6/19/2014)
 * Adding `reference` lists for project activities and focuses
 * Adding `User#activity()`

## 0.6.4 (6/7/2014)
 * Updating `reference` lists, removing "find" feature

## 0.6.3 (6/7/2014)
 * Updating `reference.organization_types` list

## 0.6.2 (6/6/2014)
 * Changing behavior for `Vertex#modify()` (URL now determined via presence/absence of `id`, not the passed `data`)

## 0.6.1 (6/4/2014)
 * Adding filename for `Asset#create()` uploads (via XHR2)

## 0.6.0 (6/4/2014)
 * Adding old browser support for `Asset#create()` (via [iframe-multipart](https://github.com/eivindfjeldstad/iframe-multipart))

## 0.5.2 (6/4/2014)
 * Adding response `err.body` for error callbacks (includes response body)

## 0.5.1 (5/23/2014)
 * Removing `debug` usage from lib (never used it)
 * Updating documentation
 * Adding `Organization#submissions()`

## 0.5.0 (5/23/2014)
 * Changing `User#favorite()` to use `PUT` instead of `POST`
 * Adding `Organization#participation()` (taken directly from `User`)
 * Changing `User#participation()` to have a 3rd param `key` (changes signature, not backwards compatible)

## 0.4.6 (5/19/2014)
 * Adding `Organization#content([query], callback)` for retrieving organization content
 * Changing `Vertex#get()` and `Vertex#create()` to translate `vertex_type_id` automatically

## 0.4.5 (5/5/2014)
 * Adding `Asset#create(params, callback)` and using HTML5/XHR2 file uploads

## 0.4.4 (4/30/2014)
 * Adding `User#favorite(entity, callback)` and `User#unfavorite(entity, callback)`

## 0.4.3 (4/24/2014)
 * Hotfix for typo in Submission (copy-pasta fail)

## 0.4.2 (4/24/2014)
 * Adding `Submission#unsubmit(callback)`
 * Removing some unnecessary debug output

## 0.4.1 (4/16/2014)
 * Fixing bug response handler that threw an exception upon network errors

## 0.4.0 (4/15/2014)
 * Updating to leverage Component v1.0.0+
 * Adding `tj/debug` for debugging output
 * Updating internals to reflect new structure for moderations/submissions API responses
 * Dropped `Makefile`, using `npm run` for commands instead
 * Dropped coverage testing (waiting for deps to transition to component v1.0)

## 0.3.3 (4/11/2014)
 * Using better repos for component/underscore/jquery deps (preparing for component v1)
 * Updating reference indexes

## 0.3.2 (4/1/2014)
 * Changed init signature to use object for params
 * Added `Client#refresh(callback)` for refreshing user token
 * Updated documentation

## 0.3.1 (3/31/2014)
 * Added Hours Sets to API (missing commits from master during earlier release)

## 0.3.0 (3/31/2014)
 * Massive rewrite, huge list of changes (just refer to the docs instead)


## 0.2.0
 * Adding API docs to the README  (fa89b5775dfe53efb2a24921537d0d22fa5aa87f)
 * Search method option `types` no longer case-sensitive (1cbeaa8ee2f9b07851a25226dae7f87e12e237df)
 * Treating responses of `text/plain` as JSON (80da456819174ae5cb05876490bd3ee0ab8f4667)
 * Adding basic Alerts API support (906c4907cb5365772b4af5162c09a08fe7778df8)

## 0.1.1
 * The Constructor now strips trailing slashes from the API Base URL
 * Fixing bugs with browser test runner

## 0.1.0
 * Adding search method for querying listing of entities

## 0.0.1 (May 16, 2013)
 * Initial Release


Road Map (Upcoming)
===================

 * [Standalone](https://github.com/component/component/wiki/F.A.Q#can-i-use-components-without-component1) Version
 * Node version (for server-side applications)
