package com.shopreview.app.shop;

import com.shopreview.app.review.Review;
import lombok.*;

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
public class Shop {

    @Id
    @SequenceGenerator(
            name="restaurant_sequence",
            sequenceName = "restaurant_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator="restaurant_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long shop_Id;
    private String shop_name;
	@ElementCollection(targetClass=String.class)
	private List<String> Type_Of_Food;
    @Transient
    private Integer no_of_ratings;
    @Transient
    private Float average_rating;
    @Embedded
    private Address address;
    @Embedded
    private GeoLocation geoLocation;
    private String website;
//    HAVE TO FORMAT PHONE NUMBER FOR DATABASE
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @ElementCollection(targetClass=String.class)
    private List<Review> shop_reviews = new ArrayList<>();

    private boolean geoProcessed = false;

    public Shop(String name, Address address, String website){
        this.shop_name = name;
        this.address = address;
        this.website = website;
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
