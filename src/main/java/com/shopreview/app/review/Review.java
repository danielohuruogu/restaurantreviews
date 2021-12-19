package com.shopreview.app.review;

import lombok.*;
import java.sql.Timestamp;
import java.sql.Date;
import javax.persistence.*;


@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Review {

    @Id
    @SequenceGenerator(name="review_sequence",sequenceName="review_sequence",allocationSize = 1)
    @GeneratedValue(generator="review_sequence",strategy = GenerationType.SEQUENCE);
    private Long id;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Long author_Id;
    @Column(nullable = false)
    private Long restaurant_Id;
    @Column
    private Rating rating;
    @Column(nullable = false)
    private String title;
    @Column
    private String body;
    @Column
    private Date date_of_visit;
    @Column
    private Timestamp created_at;
    
    public Review(Rating rating, String title, String body){
        this.rating = rating;
        this.title = title;
        this.body = body;
        long now = System.currentTimeMillis();
        this. date_of_visit = new Date(now);
        this.created_at = new Timestamp(now);
    }
}
