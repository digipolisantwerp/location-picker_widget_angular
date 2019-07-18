export interface FeatureLayerModel {
    /* url to the mapServer containing the required features */
    url: string;
    /* icon to visualize the features. */
    icon: FeatureLayerIconModel;
}

interface FeatureLayerIconModel {
    /* font-awesome icon class eg: fa-map-marker */
    faIcon: string;
    /* background color, default: transparent */
    backgroundColor: string;
    /* icon color, default: #0064B */
    textColor: string;
}
