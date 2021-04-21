# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

<!--
"### Added" for new features.
"### Changed" for changes in existing functionality.
"### Deprecated" for soon-to-be removed features.
"### Removed" for now removed features.
"### Fixed" for any bug fixes.
"### Security" in case of vulnerabilities.
-->

### Added
- Distance property to location model

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

[Unreleased]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v4.8.0...HEAD
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
