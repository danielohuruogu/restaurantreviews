package com.shopreview.app.shop;

import java.util.Optional;

public interface GeoLocationService {
    Optional<GeoLocation> computeGeoLocation(String fullAddressLine);
}
