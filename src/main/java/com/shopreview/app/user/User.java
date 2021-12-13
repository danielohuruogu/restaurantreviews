package com.shopreview.app.user;

import lombok.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class User {

    @Id
    @SequenceGenerator(name="user_sequence",sequenceName="student_sequence", allocationSize = 1)
    @GeneratedValue(generator = "user_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = false)
    private String first_name;
    @Column(nullable = false)
    private String last_name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private Long created_at;
    @Column(nullable = false)
    private String role;

    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    Date date = new Date();

    public User(String first_name, String last_name, String password, String email, String role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
        this.created_at = Long.valueOf(formatter.format(date));
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

    public Long getDateCreated() {
        return created_at;
    }

    public String getRole() {
        return role;
    }
}
