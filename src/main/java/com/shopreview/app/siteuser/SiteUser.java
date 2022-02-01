package com.shopreview.app.siteuser;

import com.shopreview.app.comment.Comment;
import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class SiteUser {

    @Id
    @SequenceGenerator(
            name="user_sequence",
            sequenceName="user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "user_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long userId;
    @Column(nullable = false)
    private String first_name;
    @Column(nullable = false)
    private String last_name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column
//            (nullable = false)
    private Date created_at;
    @Column(nullable = false)
    private Role role;
    @OneToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "user_Id", referencedColumnName = "userId")
    private List<Review> reviews = Arrays.asList();
//    @OneToMany(mappedBy = "comment_author", cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
//    private List<Comment> comments = new ArrayList<>();

    public SiteUser(
            String first_name,
            String last_name,
            String password,
            String email,
            Role role
    ) {
        long now = System.currentTimeMillis();

        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
        this.created_at = new Date(now);
        this.role = role;
    }

    String getFullName() {
        return first_name + last_name;
    }
}
