package com.shopreview.app.review;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.shopreview.app.shop.Shop;
import com.shopreview.app.siteuser.SiteUser;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.sql.Date;
import java.util.List;
import javax.persistence.*;


@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="Review")
@Builder
@Table(name="reviews")
public class Review {

    @Id
    @SequenceGenerator(name="review_sequence",sequenceName="review_sequence",allocationSize = 1)
    @GeneratedValue(generator="review_sequence",strategy = GenerationType.SEQUENCE)
    private Long reviewId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "author_Id")
    private SiteUser reviewAuthor;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "shop_Id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Shop shop;
    @Column
    private Integer rating;
    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> keywords;
    @Column(nullable = false)
    private String title;
    @Column
    private String body;
    @Column
    private Date dateOfVisit;
    @Column
    private Timestamp createdAt;
    
    public Review (
            Integer rating,
            List<String> keywords,
            String title,
            String body
    ) {
        this.rating = rating;
        this.title = title;
        this.body = body;

        long now = System.currentTimeMillis();
        this.createdAt = new Timestamp(now);

        this.keywords = keywords;
    }
}
