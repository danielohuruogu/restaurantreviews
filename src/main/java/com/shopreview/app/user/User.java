package com.shopreview.app.user;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String first_name;
    private String last_name;
    private String password;
    private String email;
    private Long created_at;
    private String role;
}
