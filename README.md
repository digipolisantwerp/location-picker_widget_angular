# Location Picker Smart Widget UI (Angular) - v1

>> Important! There are several versions of this package. The reason we introduced this version is to use multiple versions in one app that would otherwise conflict with each other. The scope of this (deprecated) version is `@acpaas-ui-widgets/ngx-location-picker-v1`. The scope of the newer version is `@acpaas-ui-widgets/ngx-location-picker`. Also note that the name of the module has also changed.

This is the Angular 6+ UI for a Smart Widget implementing a picker field to choose a location (street, address or point of interest). It is matched by a [corresponding back-end service](https://github.com/digipolisantwerp/location-picker_service_nodejs) which is needed when running it in remote mode. A default implementation for selecting locations in antwerp is provided.

![screenshot](example.png)

There is a demo app, see below for instructions on running it.

## How to use

### Installing

```sh
> npm install @acpaas-ui-widgets/ngx-location-picker-v1
```

### Using

A BFF service should be running (see demo app instructions below for how to start one).

Import the component in your module:

```ts
import { LocationPickerV1Module } from '@acpaas-ui-widgets/ngx-location-picker-v1';

@NgModule({
  imports: [
    ...,
    LocationPickerV1Module
  ],
  ...
})
```

In the index.html, include the core branding stylesheet:

```html
<link rel="stylesheet" href="https://cdn.antwerpen.be/core_branding_scss/4.1.1/main.min.css">
```

### In your template:

```html
<aui-location-picker-v1
    url="http://localhost:9999/api/locations"
    [(value)]="location">
</aui-location-picker-v1>
```

(replace the url of the BFF service)

In the component code:

```ts
class YourComponent {

    // you can assign an initial value here
    location: LocationPickerV1Value;

    ...
}
```

Every value in the backing list must have a unique id.

### Supported attributes

- **url**: the URL of the back-end service feeding this widget
- **bufferInputMs**: how long to buffer keystrokes before fetching remote results
- **value**: The current value of the picker, represented as a value object
- **placeholder**: specify the text to show in an empty field
- **noDataMessage**: the text shown in the list when there are no matching results

### Events

- **valueChange**: triggers when the current value is changed (or cleared)

### Protocol

The back-end service implements the following protocol:

- GET /path/to/endpoint?search=...&types=...
- search = the text that the user typed on which to match
- types = a comma-separated list of types to return, default value = "street,number,poi"
- result = JSON-encoded array of [LocationPickerV1Value](src/location-picker-v1/location-picker-v1.types.ts) objects

## Run the demo app

```sh
> npm install
> npm start
```

Browse to [localhost:4200](http://localhost:4200)

To use the location picker widget, you will need to have also started the corresponding back-end service.

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## License

This project is published under the [MIT license](LICENSE.md).
