package com.shopreview.app.restaurant;

import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Timestamp;
import java.util.*;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @SequenceGenerator(name="restaurant_sequence", sequenceName = "restaurant_sequence", allocationSize = 1)
    @GeneratedValue(generator="restaurant_sequence", strategy = GenerationType.SEQUENCE)
    private Long restaurant_Id;
    private String restaurant_name;
    private Type_Of_Food cuisine;
    private String keywords;
    private Integer rating;
    private Integer no_of_ratings;
    private Float average_rating;
    @Embedded
    private Address address;
    @Embedded
    private GeoLocation geoLocation;
    private String website;
//    HAVE TO FORMAT PHONE NUMBER FOR DATABASE
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    private boolean geoProcessed = false;

    public Restaurant(String name, Type_Of_Food foodtype, String keywords, Integer rating, Address address, String website){
        this.restaurant_name = name;
        this.cuisine = foodtype;
        this.website = website;
        this.address = address;
//        this.average_rating =
        // will have to add up all that restaurant's ratings and work out the average
        // geolocation and keywords can be set from data gathered from the maps API


//      need to find a way of grabbing all ratings related to this restaurant
//      grab reviews that have this restaurant id as part of its data
//      of those reviews, grab the rating enums
//      convert them to numbers
//      sum them up
//      average them
//      return each result as this.whatever they are
//      and summing them up to get the number of ratings
//      and averaging to get the overall rating
    }

//  this function here would take an address for a location and create a Geocode for it to be stored
    // on a database
    //
}
