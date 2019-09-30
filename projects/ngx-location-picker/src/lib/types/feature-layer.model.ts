export interface FeatureLayerModel {
    /* url to the mapServer containing the required features */
    url: string;
    /* icon to visualize the features. */
    icon?: FeatureLayerIconModel;
}

interface FeatureLayerIconModel {
    /* font-awesome icon class eg: fa-map-marker */
    iconClass: string;
    /* icon color, default: #0064B */
    color?: string;
    /* icon size in pixels, default: 40px */
    size?: string;
}
