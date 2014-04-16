Version History
===============

## 0.4.1 (4/16/2014)
 * Fixing bug response handler that threw an exception upon network errors

## 0.4.0 (4/15/2014)
 * Updating to leverage Component v1.0.0+
 * Adding `visionmedia/debug` for debugging output
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
