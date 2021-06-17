export interface FeatureLayerModel {
  /* url to the mapServer containing the required features */
  url: string;
  /* icon to visualize the features. */
  icon?: FeatureLayerIconModel;
}

interface FeatureLayerIconModel {
  /* Streamline icon class eg: ai-pin */
  iconClass: string;
  /* icon color, default: #0064B */
  color?: string;
  /* icon size in pixels, default: 40px */
  size?: string;
  /* optional icon position */
  position?: {
    top: string;
    left: string;
  };
}
