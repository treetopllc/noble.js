Version History
===============
## 0.13.01 (05/01/2018)
 * Add `User.postSubmissions()` endpoint
## 0.13.00 (04/17/2018)
 * Rename `Projects` endpoint to `Activities`

## 0.12.30 (03/30/2018)
 * Add new `Opportunity.relationships()` endpoint

## 0.12.29 (03/26/2018)
 * Add new `COL_Unit.postCoursePrefix()` endpoint

## 0.12.28 (03/19/2018)
 * Add new `User.roles()` endpoint

## 0.12.27 (03/08/2018)
 * Implement new endpoints for Collaboratory Courses/Classes/Portals/Users/Units

## 0.12.26 (03/05/2018)
 * Change impact endpoint to `Opportunity.participation()` and provide 'impact' as a key

## 0.12.25 (02/26/2018)
 * Add new `Opportunity.impact()` endpoint

## 0.12.23 (02/15/2018)
 * Groups -> new endpoints to fetch list of opportunities contributing to this group's hours and hosts of opportunities contributing to this group's hours

## 0.12.22 (02/13/2018)
 * New lists domain for endpoints that fetch mutliple vertices by their IDs
 * Opportunities -> new endpoint to fetch opps by array of IDs

## 0.12.21 (02/12/2018)
 * Swap endpoints for hosted opps and opp hosts

## 0.12.20 (02/09/2018)
 * Add generic `COL_Portal.get()` method to get Portal resource

## 0.12.19 (01/29/2018)
 * Add optional `override` (bool) param to `User.get(id).role()` method

## 0.12.18 (12/27/2017)
 * Add new `User.get()` method

## 0.12.17 (12/20/2017)
 * Adds new `Orgs.submitOpp(oppID)` endpoint to submit an opp for moderation

## 0.12.16 (11/13/2017)
 * Add new Collab `Invite.post()` method

## 0.12.15 (11/06/2017)
 * Update the organization.opportunities endpoint url

## 0.12.14 (11/01/2017)
 * Remove depracated opportunity assets POST endpoint

## 0.12.13 (10/31/2017)
 * Changes `Organization.hosts` to use new endpoint `hosts/of_contributed_hours`

## 0.12.12 (09/13/2017)
 * Added new `Opportunity.userAsset()` endpoint to upload assets to an opp

## 0.12.11 (09/12/2017)
 * Added new `Users.deleteFromNetwork()` endpoint

## 0.12.10 (08/23/2017)
 * Added new `Orgs.Hosts()` endpoint

## 0.12.9 (08/03/2017)
 * Added new `Orgs.GroupsDetailed()` endpoint

## 0.12.8 (07/12/2017)
 * Added new Collab `User.Content()` endpoint

## 0.12.7 (07/11/2017)
 * Added new `Opportunity.Types()` endpoint

## 0.12.6 (07/11/2017)
 * Added new `Groups.deleteContent()` endpoint

## 0.12.5 (06/06/2017)
 * fix dependency: chancejs -> 1.0.6

## 0.12.4 (05/16/2017)
 * Added new endpoint `HoursSets.preview()` to dryrun a patch and preview changes.

## 0.12.3 (04/18/2017)
 * Adding Collabratory `Portal.activityCollaborators()` method
 * include correct scope for instantiating graph entities in product-specific endpoints

## 0.12.2 (04/12/2017)
 * Adding Collaboratory `Users.activities()` method
 * Adding Collaboratory `Users.courses()` method
 * Adding Collaboratory `Users.publicContent()` methods

## 0.12.1 (04/10/2017)
 * Adding Collaboratory `Portal.collaborators()` method

## 0.12.0 (04/07/2017)
 * Adding product specific endpoints

## 0.11.22 (03/01/2017)
 * Adding `Users.Activities)` method
 * Adding `Users.Courses)` method

## 0.11.21 (02/27/2017)
 * Updating `Organizations.publicActivities()` method

## 0.11.20 (02/21/2017)
 * Adding `Organizations.publicActivities()` method

## 0.11.19 (02/07/2017)
 * Return success callback on Vertex DELETE

## 0.11.18 (02/07/2017)
 * Adding portal POST method

## 0.11.17 (01/25/2017)
 * Adding query params to `Vertex.get()`

## 0.11.16 (01/12/2017)
 * Adding portal search method

## 0.11.15 (12/10/2016)
 * Adding User's public content method

## 0.11.14 (11/28/2016)
 * Adding `HoursSet.hours()` method
 * Adding `User#oppsHoursByStatus` method

## 0.11.13 (10/31/2016)
 * Adding `Users.postRelationship()` method
 * Adding `Users.updateRelationship()` method
 * Adding `Users.profile()` method
 * Adding `Users.createProfile()` method
 * Adding `Users.updateProfile()` method

## 0.11.12 (09/28/2016)
 * Adding `Users.oppsWroked()` method

## 0.11.10 (09/08/2016)
 * Adding `Invite.open()` method

## 0.11.9 (09/05/2016)
 * Adding `Users.oppHoursSummary()` method

## 0.11.8 (08/16/2016)
 * Adding `Users.incomingRoleSubmissions()` method

## 0.11.7 (08/01/2016)
 * Adding `Users.sentInvites()` method

## 0.11.6 (07/31/2016)
 * Adding `Users.receivedInvites()` method

## 0.11.5 (07/26/2016)
 * Updated component version to treetopllc fork
 * Adding `Users.incomingSubmissions()` method

## 0.11.4 (04/18/2016)
 * Added `Organization.membersdetails()` method
 * Added `Organization.groupsdetails()` method

## 0.11.3 (04/11/2016)
 * Added `User.groups()` method
 * Added `User.relationships()` method
 * Added `User.projects()` method

## 0.11.2 (04/11/2016)
 * Added `Group.partnerships()` method

## 0.11.1 (03/08/2016)
 * Added `Organization.destinations()` method
 * Added `Organization.opportunities()` method
 * Added `Organization.hosts()` method
 * Added `Organization.statuses()` method
 * Added `Organization.contributors()` method

## 0.11.0 (03/02/2016)
 * Updating dependency to use treetopllc fork

## 0.10.19 (02/25/2016)
 * Pinning Superagent dependency to stable version

## 0.10.18 (02/12/2016)
 * Adding `User#passwordUpdate()`

## 0.10.17 (01/21/2016)
 * Updating dependency version to use treetopllc fork

## 0.10.16 (12/8/2015)
 * Adding `User.emailUpdate()`

## 0.10.15 (10/2/2015)
 * Fix typo in bulkUnArchive()

## 0.10.14 (10/20/2015)
 * Adding `Organization#reportPartners()`

## 0.10.13 (10/16/2015)
 * Adding `Submission#alert()`

## 0.10.12 (9/10/2015)
 * Add `Event.users` method
 * Add `Opportunity.users` method

## 0.10.11 (9/10/2015)
 * Add `Group.users` method

## 0.10.10 (8/05/2015)
 * Add `User.roleDelete` method

## 0.10.9 (7/30/2015)
 * Remove trailing slash from bulkArchive method

## 0.10.8 (7/27/2015)
 * Adjust no_cache, use superagent fork

## 0.10.7 (7/21/2015)
 * Added `User.roleUpdate()` method

## 0.10.6 (7/14/2015)
 * Adding `Vertex#head()` method
 * Adding no-cache to search requests

## 0.10.5 (5/19/2015)
 * Adding `Organization#relationships()`

## 0.10.4 (5/8/2015)
 * Adding `Organization#users()` and `Organization#user()`

## 0.10.3 (5/5/2015)
 * Adding `Affiliation` vertex object
 * Adding `Organization#affiliations()` and `Organization#affiliation()`

## 0.10.2 (5/1/2015)
 * Adding `Program` vertex object
 * Adding `Organization#programs()` and `Organization#program()`

## 0.10.1 (3/19/2015)
 * Adding Group#participation()

## 0.10.0 (2/25/2015)
 * Adding `User#moderationsSummary()`

## 0.9.13 (2/19/2015)
 * Adding `User#authorModify()`

## 0.9.12 (2/1/2015)
 * Adding `Vertex#bulkArchive()` and `Vertex#bulkUnArchive()`

## 0.9.11 (2/4/2015)
 * Adding `User#emailList()`, `User#emailAdd()`, and `User#emailDelete()`

## 0.9.10 (2/3/2015)
 * Modifies archive methods include json body

## 0.9.9 (2/3/2015)
 * Modifies archive methods to use PATCH

## 0.9.8 (2/3/2015)
 * Adding `archive() and unarchive()`

## 0.9.7 (1/27/2015)
 * Adding `User#content()`

## 0.9.6 (1/27/2015)
  * Adding `Organization#track()`

## 0.9.5 (12/19/2014)
 * Adding `Event#alert()`
 * Adding `User#preference()`

## 0.9.4 (12/18/2014)
 * Adding `Opportunity#alert()`
 * Adding `User#preferences()`

## 0.9.3 (11/10/2014)
 * Add missing tests

## 0.9.2 (10/27/2014)
 * Add no-cache option to superagent requests

## 0.9.1 (10/27/2014)
 * Hotfix for repo name update

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
                                                 
