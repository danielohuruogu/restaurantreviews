package com.shopreview.app.shop;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Entity(name="Shop")
@Builder
@Table(name="shops")
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
    private Integer no_of_ratings;
    private Float average_rating;
    @Embedded
    private Address address;
    @Embedded
    private GeoLocation geoLocation;
    private String website;
//    HAVE TO FORMAT PHONE NUMBER FOR DATABASE
    @OneToMany(mappedBy="shop",cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Review> shop_reviews;

    private boolean geoProcessed = false;

    public Shop(String name,
                Address address,
                String website){
        this.shop_name = name;
//        this.address = address;
        this.website = website;
        // will have to add up all that restaurant's ratings and work out the average
        // geolocation and keywords can be set from data gathered from the maps API
    }


    public void addReview(Review review) {
        shop_reviews.add(review);
        review.setShop(this);
    }

    public void removeReview(Review review) {
        shop_reviews.remove(review);
        review.setShop(null);
    }

    // setter with small calculation
    public void findNoRatings() {
        for (Review review : shop_reviews) {
            this.no_of_ratings++;
        }
    }

    // setter with small calculation
    public void findAveRating() {
        int sumRatings = 0;
        for (Review review : shop_reviews) {
            sumRatings += review.getRating();
        }
        this.average_rating = Float.valueOf(sumRatings/getNo_of_ratings());
    }

//  this function here would take an address for a location and create a Geocode for it to be stored
    // on a database
    //
}
