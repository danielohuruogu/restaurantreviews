package com.shopreview.app.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopreview.app.review.Review;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.StringUtils;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    // this is just used to generate a fake piece of data
    // don't really need it - can make up rubbish on my own. don't need a package for that
    private final Faker faker = new Faker();

    // just empty arraylists to complete the user to be sent through to the repo
    private List<Review> reviews = Arrays.asList();
    private ArrayList comments;
    private Date created_at = new Date(System.currentTimeMillis());

    // can we add a user in to the app
    @Test
    @Disabled
    void canRegisterNewUser() throws Exception {
        // given
        SiteUser user = new SiteUser(
                1L,
                "name",
                "faker",
                "dagsdrgsd",
                "faker@fake.com",
                created_at,
                Role.Reader
//                ,
//                reviews
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

    // need a test for deleting a user
    @Test
    @Disabled
    void canDeleteUser() throws Exception {
        // given
        Long id = faker.number().randomNumber();
        String firstname = String.format("%s", faker.name().firstName());
        String lastname = String.format("%s", faker.name().lastName());
        String password = String.format("%s", faker.random());
        String email = String.format("%s@danielsworld.com",
                StringUtils.trimAllWhitespace(firstname.trim().toLowerCase()));
        SiteUser user = new SiteUser(
                id,
                firstname,
                lastname,
                password,
                email,
                created_at,
                Role.Reader
//                ,
//                reviews
        );

        // using mock controller to send data to repo
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        // result of grabbing all the users out of the repo
        MvcResult getUsersResult = mockMvc.perform(get("/api/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // convert the content that comes back from the server to a string
        String contentAsString = getUsersResult
                .getResponse()
                .getContentAsString();

        // use the object mapper to read the string above and generate a list of
        // users as java objects
        List<SiteUser> users = objectMapper.readValue(
                contentAsString,
                new TypeReference<List<SiteUser>>() {
                }
        );

        // this is fancy Java tech that I'm not so clued up on.
        // way to find the first id that has an email that matches that of the user
        long idToFind = users.stream()
                .filter(u -> u.getEmail().equals(user.getEmail()))
                .map(SiteUser::getUserId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "user with email: " + email + " not found"));

        // when
        // *that* id is the one you then want to delete
        ResultActions resultActions = mockMvc
                .perform(delete("/api/users/" + idToFind));

        // then
        resultActions.andExpect(status().isOk());
        boolean exists = userRepository.existsById(idToFind);
        assertThat(exists).isFalse();
    }

    // need a test for grabbing a single user??

    // need a test for updating a user
    // copied and pasted from above
    @Test
    @Disabled
    void canReplaceUser() throws Exception {
        // given
        String firstname = String.format("%s", faker.name().firstName());
        String lastname = String.format("%s", faker.name().lastName());
        String password = String.format("%s", faker.random());
        String email = String.format("%s@danielsworld.com",
                StringUtils.trimAllWhitespace(firstname.trim().toLowerCase()));

        SiteUser user = new SiteUser(
//                id,
                firstname,
                lastname,
                password,
                email,
                Role.Reader
        );

        // using mock controller to send data to repo
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        // result of grabbing all the users out of the repo
        MvcResult getUsersResult = mockMvc.perform(get("/api/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // convert the content that comes back from the server to a string
        String contentAsString = getUsersResult
                .getResponse()
                .getContentAsString();

        // use the object mapper to read the string above and generate a list of
        // users as java objects
        List<SiteUser> users = objectMapper.readValue(
                contentAsString,
                new TypeReference<List<SiteUser>>() {
                }
        );

        // way to find the first id that has an email that matches that of the user
        long idToFind = users.stream()
                .filter(u -> u.getEmail().equals(user.getEmail()))
                // lambda expression - method reference to the class
                // so getting all the users that have the same email as the user
                // that got sent in
                // then mapping out the ids for each of them
                .map(SiteUser::getUserId)
                // grabbing the first
                .findFirst()
                // or saying that the email doesn't exist
                .orElseThrow(() ->
                        new IllegalStateException(
                                "user with email: " + email + " not found"));

        // when
        // *that* id is the one you then want to replace
        // have to generate a new user

        String newFirstName = "Archibald";
//        Long id = faker.number().randomNumber();
        SiteUser userToUpdate = new SiteUser(
                idToFind,
                newFirstName,
                lastname,
                password,
                email,
                created_at,
                Role.Reader
//                ,
//                reviews
        );

        ResultActions resultActions = mockMvc
                .perform(put("/api/users/" + idToFind)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userToUpdate)));

        // then
        resultActions.andExpect(status().isOk());
        boolean exists = userRepository.existsById(idToFind);
        // will assert that the ids are the same but the first names are different
        assertThat(exists).isTrue();
        // ids should be the same, as I've set them to be the same
//        assertThat(user.getId()).isEqualTo(userToUpdate.getId());
        // but the first name should be updated
        assertThat(user.getFirst_name()).isNotEqualTo(userToUpdate.getFirst_name());
    }

}
