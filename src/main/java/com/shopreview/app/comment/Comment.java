package com.shopreview.app.comment;

import com.shopreview.app.review.Review;
import com.shopreview.app.siteuser.SiteUser;
import lombok.*;
import java.sql.Timestamp;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @SequenceGenerator(name="comment_sequence", sequenceName = "comment_sequence", allocationSize = 1)
    @GeneratedValue(generator="comment_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_Id")
    private SiteUser author;
    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;
    private String body;
    private Timestamp created_at;

    public Comment(String body){
        this.body = body;
        this.created_at = new Timestamp(System.currentTimeMillis());
    }
}
