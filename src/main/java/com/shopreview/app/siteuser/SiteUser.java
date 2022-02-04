package com.shopreview.app.siteuser;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Date;
import java.util.List;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="User")
@Builder
@Table(name="users")
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
    private Date created_at;
    @Column(nullable = false)
    private Role role;
//    @OneToMany(mappedBy="review_author",cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Review> reviews;

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
