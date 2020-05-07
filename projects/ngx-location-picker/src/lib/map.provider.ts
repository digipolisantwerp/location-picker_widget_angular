import {MapService} from '@acpaas-ui/ngx-components/map';
import {Provider} from '@angular/core';

export function mapServiceFactory() {
  return new MapService('browser');
}

export const MAP_SERVICE_PROVIDER: Provider = {
  provide: MapService,
  useFactory: mapServiceFactory
};
