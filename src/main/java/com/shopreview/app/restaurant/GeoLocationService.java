package com.shopreview.app.restaurant;

import java.util.Optional;

public interface GeoLocationService {
    Optional<GeoLocation> computeGeoLocation(String fullAddressLine);
}
