package com.shopreview.app.siteuser;

import com.shopreview.app.comment.Comment;
import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class SiteUser {

    @Id
    @SequenceGenerator(name="siteuser_sequence",sequenceName="siteuser_sequence", allocationSize = 1)
    @GeneratedValue(generator = "siteuser_sequence", strategy = GenerationType.SEQUENCE)
    private Long user_Id;
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
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch=FetchType.LAZY, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    long now = System.currentTimeMillis();

    public SiteUser(String first_name, String last_name, String password, String email, Role role) {
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
