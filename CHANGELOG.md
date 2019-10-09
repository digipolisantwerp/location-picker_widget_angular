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

## [Unreleased]

- [FIXED] "choose selected coordinate" will no longer show for non coordinate searches
- [ADDED] Added markers can now be dragged to a new position

## [Unreleased]

- [ADDED] New option for fetching user location on Init

## [Unreleased]

- [FIXED] 'scroll to' when selecting a location that has a geoShape.
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

[Unreleased]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v2.0.1...v3.0.0
[2.0.1]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/digipolisantwerp/location-picker_widget_angular/compare/v0.0.1...v1.0.0
