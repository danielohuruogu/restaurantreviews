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
@Builder
@Table(name = "shops")
public class Shop {

    @Id
    @SequenceGenerator(
            name="shop_sequence",
            sequenceName = "shop_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator="shop_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long shopId;
    private String shop_name;
	@ElementCollection(targetClass=String.class)
	private List<String> type_Of_Food;
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
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @JoinColumn(
            name="shop_Id",
            referencedColumnName="shopId"
    )
    private List<Review> shop_reviews;

    private boolean geoProcessed = false;

    public void addReview(Review review) {
        shop_reviews.add(review);
    }

    public Shop(String name,
                Address address,
                String website){
        this.shop_name = name;
//        this.address = address;
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
