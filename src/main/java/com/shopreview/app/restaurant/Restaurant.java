package com.shopreview.app.restaurant;

import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
    private Type_Of_Food cuisine;
    private String keywords;
    private Integer no_of_ratings;
    private String address;
    private Float latitude;
    private Float longitude;
    private String website;
//    HAVE TO FORMAT PHONE NUMBER FOR DATABASE
    private Float rating_overall;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Review> comments = new ArrayList<>();

    public Restaurant(Type_Of_Food foodtype, String address, String website){
        this.cuisine = foodtype;
        this.address = address;
        this.website = website;

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
}
