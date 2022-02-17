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
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column
    private Date createdAt;
    @Column(nullable = false)
    private Role role;
//    @OneToMany(mappedBy="review_author",cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Review> reviews;

    public SiteUser(
            String firstName,
            String lastName,
            String password,
            String email,
            Role role
    ) {
        long now = System.currentTimeMillis();

        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.createdAt = new Date(now);
        this.role = role;
    }

    String getFullName() {
        return firstName + lastName;
    }
}
