package com.shopreview.app.siteuser;

import com.shopreview.app.review.Review;
import lombok.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class SiteUser {

    @Id
    @SequenceGenerator(name="siteuser_sequence",sequenceName="siteuser_sequence", allocationSize = 1)
    @GeneratedValue(generator = "siteuser_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
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
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch =FetchType.LAZY)
            private Set<Review> reviews = new HashSet<>();

    long now = System.currentTimeMillis();

    public SiteUser(String first_name, String last_name, String password, String email, Role role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
        this.created_at = new Date(now);
        this.role = role;
    }
}
