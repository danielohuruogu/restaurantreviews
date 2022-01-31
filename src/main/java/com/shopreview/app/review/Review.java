package com.shopreview.app.review;

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
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @SequenceGenerator(name="review_sequence",sequenceName="review_sequence",allocationSize = 1)
    @GeneratedValue(generator="review_sequence",strategy = GenerationType.SEQUENCE)
    private Long review_Id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_Id")
    private SiteUser author;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_Id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Shop shop;
    @Column
    private Rating rating;
    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> keywords;
    @Column(nullable = false)
    private String title;
    @Column
    private String body;
    @Column
    private Date date_of_visit;
    @Column
    private Timestamp created_at;
//    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    private List<Comment> comments = new ArrayList<>();
    
    public Review(Rating rating, List<String> keywords, String title, String body){
        this.rating = rating;
        this.title = title;
        this.body = body;
        long now = System.currentTimeMillis();
//        this.date_of_visit = new Date(now);
        this.created_at = new Timestamp(now);
        this.keywords = keywords;
    }
}
