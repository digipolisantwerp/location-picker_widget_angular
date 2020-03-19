export interface InitialLocationModel {
  label?: string;
  position?: {
    lat: number;
    lng: number;
  };
  options?: InitialLocationOptions;
}

interface InitialLocationOptions {
  triggerSearch?: boolean;
}
