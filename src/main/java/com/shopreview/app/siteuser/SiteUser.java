package com.shopreview.app.siteuser;

import lombok.*;
import java.sql.Date;
import java.sql.Timestamp;
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
//    @Column(nullable = false)
//    private Date created_at;
    @Column(nullable = false)
    private Role role;

//    long now = System.currentTimeMillis();

    public SiteUser(String first_name, String last_name, String password, String email, Role role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
//        this.created_at = new Date(now);
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return first_name;
    }

    public String getLastName() {
        return last_name;
    }

    public String getFullName() {
        return first_name + " " + last_name;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

//    public Date getDateCreated() {
//        return created_at;
//    }

    public Role getRole() {
        return role;
    }
}
