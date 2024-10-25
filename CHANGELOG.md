# Changelog

All notable changes to this project will be documented in this file.

<!--
"### Added" for new features.
"### Changed" for changes in existing functionality.
"### Deprecated" for soon-to-be removed features.
"### Removed" for now removed features.
"### Fixed" for any bug fixes.
"### Security" in case of vulnerabilities.
-->
## Unreleased

## [7.7.1]

### Fixed

- Added additional check for the feature related to deselecting addresses and locations from streetNameId to streetName.

## [7.7.0]

### Changed

- Changed the priority of showing locations their Polygon geometry instead of their coordinates. First the Polygon will be shown and if not present the coordinate will be used.

### Added

- Added support for showing MultiPolygon geometry locations when searching via searchbar.

### Fixed

- Fixed minor bug related to deselecting addresses from streetNameId to streetName.

## [7.6.0]

### Changed

- When searching for an address, do not send streetname in the query if combination streetnameid and housenumber is available for addresses in Antwerp.
- Change actual location marker color.

## [7.5.0]

### Changed

- Enable search for addresses linked to the selected street.
- Set marker on actual location for all addresses and locations.

## [7.4.0]

### Changed

- Enable search on municiplaity by comma.

## [7.3.1]

### Changed

- With Angular 18 update in dependent projects, there is a breaking update surrounding expressions inside [(ngModel)].
- Based on: https://github.com/angular/angular/tree/18.0.3/packages/core/schematics/migrations/invalid-two-way-bindings

## [7.3.0]

### Added

-   Added support for vector-based layers for basemaps, currently only available for the custom basemap.

## [7.2.1]

### Changed

- Updated location viewer dependency.

## [7.2.0]

### Added

- Added `coordinateSearch` parameter to the widget, it will be used as the center point of the buffer search area for locations and coordinates

## [7.1.0]

### Added

- Added `bufferSearch` parameter to the widget, it will be used for searches on addresses, locations and coordinates

### Fixed

- Fixed `what is here` icons & colors
- Fixed an unwanted router trigger when selecting a location with the mouse

### Changed

- Changed `luchtfoto` to a newer version
- Updated location viewer dependency

## [7.0.3]

### Changed

- Changed default debounce time from 200ms to 400ms for searches.
- Changed endpoints from "https://locationpicker-app1-o.antwerpen.be" (LocationPicker V2) to "https://locationsearchapi-app1-o.antwerpen.be"  (LocationPicker V3)

### Fixed

- Fixed miscellaneous branding issues

## [7.0.2]

### Changed

- Changed `what is here` icons & colors.

## [7.0.1]

### Fixed

- Fixed a hard dependency of location viewer

## [7.0.0]

### Changed

- Out of beta

## [7.0.0-beta.0]

### Changed

- Update to Angular v. 15
- Update to Core branding v. 6

## [6.0.0] - 2023-02-13

### Changed

- [BREAKING] Use of Location Picker API V3

## [5.5.0] - 2022-10-10

### Added

- Added additional circle to improve visibilty of proximity circle

### Fixed

- Fixed bug that loadingspinner is stuck after second click if 'trackingPosition' is enabled
- Fixed import path TrackingOptions model

## [5.4.0] - 2022-09-05

### Changed

- Changed the functionality behind track position: will now show proximity circle and will stop after certain accuracy is reached or time has passed (position options extended)

## [5.3.0] - 2022-07-18

### Added

- Adds space to streetname label, so user can search for address just by adding housenumber
- Sets focus to searchfield after streetname location selection

### Fixed

- Show pin marker after selectedlocation is location with geometry (shapecenter)

## [5.2.1] - 2022-06-20

### Fixed

- Disables operational layer event when picking location
- Show picking marker when hovering over polygon and picking action is active

## [5.2.0] - 2022-02-25

### Added

- Added 'none' option to locationlayers param to disable location search
- Added 'trackPosition' parameter if enabled GPS will track user location for accurate results (ngOnChanges will listen for updates to disable/enable tracking after input change)
- Added 'positionOptions' parameter which will be used to get the device location (GeoLocation API)

## [5.1.0] - 2022-01-28

### Added

- Functionality to search for locations when providing address (uses the streetname)

### Fixed

- Issue when providing a selectedLocation, emitted an empty location on initialization
- Zooms and centers map on selectedLocation

## [5.0.3] - 2022-01-17

### Fixed

- Clears geometry when result marker (icon) is added for location or address

## [5.0.2] - 2022-01-10

### Fixed

- Show result marker (icon) when point is returned for location or address

## [5.0.1] - 2021-07-29

### Fixed

- Picker position to match cursor

## [5.0.0] - 2021-06-18

### Changed

- [BREAKING] Upgraded the component to work with Angular 8
- [BREAKING] Use of Antwerp UI v5 components
- [BREAKING] Upgraded to core branding v5
- [BREAKING] Implemented location viewer widget (was ngx-leaflet):

### Added

- Implemented all location viewer params
- Added location viewer dependencies (geoman, esri, turf)

### Removed

- Removed code that already exists in ngx-location-viewer (zoom in, zoom out & tile layers)

## [4.8.1] - 2021-05-10

### Fixed

- Added locationKeywords param with default value ['kaainummer'], if 'kaainummer number' is entered search for location instead of address
- When param addCoordinateToResultsAt is provided: only add result when search is triggered by coordinate

## [4.8.0] - 2021-04-19

### Fixed

- Updated public API (added used models and fixed CascadingCoordinateRulesType enum import)

### Added

- Added actualLocation property to tempLocation (selectedLocation on marker placement)
- Option to add used coordinate to resultlist

## [4.7.1] - 2020-11-26

### Fixed

- Fixed issue zoomlevel using locate-me: when onSelectZoom is null uses current zoomLevel.

## [4.7.0] - 2020-11-26

### Added

- Made onSelectZoom property nullable. If onSelectZoom is null, zoomlevel doesn't change after location selection.

### Fixed

- Centers map and changes zoom level after using locate-me
- Changes picker position to match cursor

## [4.6.0] - 2020-10-23

### Added

- Search on streetnameid: if previous location was a street, when searching searching for address (street + housenumber) use previous selected streetId
- Zoom level on location select: adds behaviour to size map to geometry size

### Fixed

- Search on housenumer: changes regex for housenumbers with and adds check for seperate letter of housenumber

## [4.5.1] - 2020-07-27

### Added

- LocationModel: added postCode: number AND postCodes: Array<number>
- LocationModel: renamed type postCode: number to postCodes: Array\<number>
- Search by coordinates: added Lambert 72 search functionality
- CascadingCoordinateRules: added custom rules to search map servers by point
- Location selected: sets map size according to selectedGeometry
- Location deselected: removes default set view (view size and center map)

## [4.5.0] - 2020-07-27 - BORKED

## [4.4.0] - 2020-03-30

### Added

- Added debounce time for search queries
- Added proper rounding on coordinate sets (lat/lng)
- Added option to disable triggering a search when providing an initial location

### Changed

- Changed notification position on leaflet
- Renamed `prioritizeLayer` to `prioritizeLayers` (now uses an array of layer names)

## [4.3.1] - 2020-03-24

### Fixed

- Fixed an AOT compilation issue.

## [4.3.0] - 2020-03-11

### Added

- Made the chatbot widget WCAG 2.1 AA compliant.

## [4.2.0] - 2019-11-14

- [FIXED] Setting a location externally now properly cancels geolocation when still locating
- [FIXED] Setting a location externally now properly triggers a search
- [ADDED] Searching for locations that only have geometry data available will now also show a marker at the geometry center.

## [4.1.0] - 2019-10-10

### Added

- [ADDED] Added markers can now be dragged to a new position
- [ADDED] New option for fetching user location on Init

### Fixed

- [FIXED] Selected location will now be properly updated from external sources
- [FIXED] "choose selected coordinate" will no longer show for non coordinate searches
- [FIXED] 'scroll to' when selecting a location that has a geoShape.

### Changed

- [CHANGED] Improved normalization of search query. Adjusting the search query after selecting a location now properly triggers a new search.

## [4.0.0] - 2019-09-30

### Changed

- [BREAKING] Most functionality of the leaflet location picker is now merged into this one (making the other package deprecated).
- [BREAKING] Bumped Angular version to 7 (the widget now works in Angular 6, 7 and 8).
- [BREAKING] Feature layers can now be added to leaflet.
- [BREAKING] Custom icons can be set for each feature layer.
- [BREAKING] Added scroll-to-zoom.
- [BREAKING] Updated core branding version to be WCAG compatible.
- [BREAKING] Added ARIA labels.
- [BREAKING] Removed label option on input.
- [BREAKING] Added other new configuration options.
- Locations that have geometry available will now be drawn on leaflet.
- Added notification messages when things go bad.

## [3.0.0] - 2019-06-20

### Changed

- [BREAKING] An initial location can now be set via the latitude/longitude coordinates.

### Fixed

- Fixed an issue where result label text was not being escaped

## [2.0.1] - 2018-11-23

### Changed

- [BREAKING] Upgraded the widget to work with Angular 6+

## [2.0.0] - 2018-11-20 - BORKED

## [1.1.0] - 2018-11-06

- Show layer name in list entry

## [1.0.0] - 2018-05-18

- Initial release.

[Unreleased]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.7.1...HEAD
[7.7.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.7.0...v7.7.1
[7.7.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.6.0...v7.7.0
[7.6.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.5.0...v7.6.0
[7.5.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.4.0...v7.5.0
[7.4.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.3.1...v7.4.0
[7.3.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.3.0...v7.3.1
[7.3.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.2.1...v7.3.0
[7.2.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.2.0...v7.2.1
[7.2.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.1.0...v7.2.0
[7.1.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.0.3...v7.1.0
[7.0.3]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.0.2...v7.0.3
[7.0.2]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.0.1...v7.0.2
[7.0.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v7.0.0...v7.0.1
[7.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v6.0.0...v7.0.0
[6.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.5.0...v6.0.0
[5.5.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.4.0...v5.5.0
[5.4.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.3.0...v5.4.0
[5.3.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.2.1...v5.3.0
[5.2.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.2.0...v5.2.1
[5.2.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.0.3...v5.1.0
[5.0.3]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.0.2...v5.0.3
[5.0.2]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.0.1...v5.0.2
[5.0.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.8.1...v5.0.0
[4.8.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.8.0...v4.8.1
[4.8.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.7.1...v4.8.0
[4.7.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.7.0...v4.7.1
[4.7.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.6.0...v4.7.0
[4.6.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.5.1...v4.6.0
[4.5.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.5.0...v4.5.1
[4.5.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.4.0...v4.5.0
[4.4.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.3.1...v4.4.0
[4.3.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.3.0...v4.3.1
[4.3.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.2.0...v4.3.0
[4.1.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v2.0.1...v3.0.0
[2.0.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v0.0.1...v1.0.0
