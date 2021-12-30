package com.shopreview.app.restaurant;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.PlacesSearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class GeoLocationServiceImpl implements GeoLocationService{

    // this is the connection to be made to the Google API - the entry point
    private GeoApiContext geoApiContext;
    @Autowired
    // using the value of the api key, a call is made to the api and a context built
    public GeoLocationServiceImpl(@Value("${gmaps.api.key}") String apiKey){
        geoApiContext = new GeoApiContext.Builder().apiKey(apiKey)
                .maxRetries(2)
                .connectTimeout(30L, TimeUnit.SECONDS)
                .build();
    };
    // the above is going to happen as part of this service. It's a Singleton that is generated one time

    // taken from https://dzone.com/articles/google-maps-api-pitfalls
    // this is the implemented function from the geolocationservice interface
    @Override
    public Optional<GeoLocation> computeGeoLocation(String fullAddressLine) {
        final PlacesSearchResponse placesSearchResponse;
        try {
            // run a text search query and connect using the geoapi context and the address supplied
            placesSearchResponse = PlacesApi.textSearchQuery(geoApiContext, fullAddressLine).await();
            log.info("Processing address line using PlacesApi.textSearchQuery {}", fullAddressLine);

            if (placesSearchResponse != null && placesSearchResponse.results.length > 0) {
                log.info("Obtained following predictions using PlacesApi.textSearchQuery {}", Arrays.toString(placesSearchResponse.results));
                // results can be populated in an array
                // placeId is taken from the result of the PlacesSearchResponse and used to find the geocode
                // placeId seems the most accurate
                final GeocodingResult[] geocodingResults = GeocodingApi.newRequest(geoApiContext).place(placesSearchResponse.results[0].placeId).await();
                log.info("Processing address line using GeocodingApi.newRequest {}", fullAddressLine);

                // if the result array has been populated with data
                if (geocodingResults !=null && geocodingResults.length > 0) {
                    log.info("Obtained following geocoding results using GeocodingApi.newRequest {}", Arrays.toString(geocodingResults));
                    final String placeId = geocodingResults[0].placeId;
                    final double latitude = geocodingResults[0].geometry.location.lat;
                    final double longitude = geocodingResults[0].geometry.location.lng;
                    final GeoLocation geoLocation = new GeoLocation(latitude, longitude);
                    log.info("Computed following coordinates using Geocoding.Api.newRequest {}", geoLocation);
                    return Optional.of(geoLocation);
                } else {
                    log.warn("No coordinates found using GeocodingApi.newRequest {}", fullAddressLine);
                }
            } else {
                log.warn("No coordinates found using PlacesApi.textSearchQuery {}", fullAddressLine);
            }
        }                                          // input/output exception
        catch (ApiException | InterruptedException | IOException e) {
            // catch any of these types of error
            // log.error is coming from the logging framework Slf4j
            // each of the curly brackets takes the arguments in order (presumably...)
            log.error("Encountered error [{}] using GoogleMapsApi for address {} : {}", e.getMessage(), fullAddressLine, e);
        }
        return Optional.empty();
    }
}
