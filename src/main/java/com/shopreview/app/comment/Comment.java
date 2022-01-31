package com.shopreview.app.comment;

import com.shopreview.app.review.Review;
import com.shopreview.app.siteuser.SiteUser;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SiteUser comment_author;
    @ManyToOne
    @JoinColumn(name = "review_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Review review;
    private String body;
    private Timestamp created_at;

    public Comment(String body){
        this.body = body;
        this.created_at = new Timestamp(System.currentTimeMillis());
    }
}
