# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0-beta.3] - Unreleased

- Added sorting option - found locations can now be sorted based on the provided sorting layer.
- Added locationLayers option - an array of searchable layers can now be passed to the component.
- Limit option now works properly for addresses found when using reverse geocoding
- Added minInputLength option to determine when to trigger a search request

## [4.0.0-beta.2] - Unreleased

- Updated gitignore
- Updated marker icon
- improved performance when using featureLayers

## [4.0.0-beta.1] - Unreleased

Complete rewrite of the original location picker. Includes fixes, improvements and new features. This version was built and tested using Angular 7.

### Changed

- Feature layers can now be added to leaflet.
- Custom icons can be set for each feature layer.
- Improved picking a location on leaflet.
- Locations that have geometry available will now be drawn on leaflet.
- Added notification messages when things go bad (eg: no coordinates received from server)
- Added scroll-to-zoom using ctrl + scroll or cmd + scroll.
- Added new configuration options. See readme for more info.
- Bumped Angular version to 7+

### Fixed

- Fixed styling issue with flyout not being full width
- Fixed an issue with flyout opening when focussing the input field
- Fixed an issue where you couldn't update the house number after selecting an address from the dropdown.
- Fixed an issue where using the zoom controls would trigger a submit event if picker was used inside a form.

## [Unreleased]

<!--
"### Added" for new features.
"### Changed" for changes in existing functionality.
"### Deprecated" for soon-to-be removed features.
"### Removed" for now removed features.
"### Fixed" for any bug fixes.
"### Security" in case of vulnerabilities.
-->

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
