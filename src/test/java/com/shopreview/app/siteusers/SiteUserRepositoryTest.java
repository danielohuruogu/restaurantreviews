package com.shopreview.app.siteusers;

import com.shopreview.app.siteuser.Role;
import com.shopreview.app.siteuser.SiteUser;
import com.shopreview.app.siteuser.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

/*
* this is all that's needed for testing the repo. We're only testing the query
* made to the database and the boolean that comes off it
* we create a mock repo and database, save a user to it and make sure the code
* does what we want it to do
* */

@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class SiteUserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfUserExistsByEmail() {
        // given
        String email = "famila@gmail.com";
        SiteUser user = new SiteUser(
                "alex",
                "flalex",
                "saadrgsr",
                email,
                Role.Reader
        );
        // save the user to the repo
        underTest.save(user);
        // when
        boolean exists = underTest.selectExistingEmail(email);
        // then
        assertThat(exists).isTrue();
        // basically saying that the saved user should appear in the repo and be able to be checked
    }

    @Test
    void itShouldCheckIfUserDoesNotExist() {
        // given
        String email = "famila@gmail.com";

        // when
        boolean exists = underTest.selectExistingEmail(email);

        // then
        assertThat(exists).isFalse();
    }
}
