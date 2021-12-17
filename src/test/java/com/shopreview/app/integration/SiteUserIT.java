package com.shopreview.app.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopreview.app.siteuser.Role;
import com.shopreview.app.siteuser.SiteUser;
import com.shopreview.app.siteuser.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.*;
import com.github.javafaker.Faker;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.StringUtils;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class SiteUserIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private final Faker faker = new Faker();

    @Test
    // can we add a user in to the app
    void canRegisterNewUser() throws Exception {
        // given
        SiteUser user = new SiteUser(
                1L,
                "name",
                "faker",
                "dagsdrgsd",
                "faker@fake.com",
                Role.Reader
        );

        // when
        // ResultActions is an interface that allows for applying actions on the result
        // of an executed request
        // so here, the action performed is the post route being used
        ResultActions resultActions = mockMvc
                .perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)));
        // then
        // we expect the request to be made OK
        resultActions.andExpect(status().isOk());

        // check the repo for the user
        List<SiteUser> users = userRepository.findAll();

        // assert that the list of people pulled from the repo contains the posted user
        assertThat(users)
                .usingElementComparatorIgnoringFields("id")
                .contains(user);
    }


}
