import { LocationModel } from './location.model';
import { AddressModel, LatLngModel } from './address.model';

export interface CoordinateModel {
  label?: string;
  /**
   * Found location (park, poi, ...)
   */
  location?: LocationModel;
  /**
   * Found address
   */
  address?: AddressModel;
  /**
   * The coordinates used for determining a location or address by reverse lookup.
   */
  actualLocation?: LatLngModel;
}
