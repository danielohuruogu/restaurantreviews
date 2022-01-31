package com.shopreview.app.siteusers;

/*
* here, the test is for whether we can pull info out of the repo as we think
* we should
*
* */

import com.shopreview.app.review.Review;
import com.shopreview.app.siteuser.Role;
import com.shopreview.app.siteuser.SiteUser;
import com.shopreview.app.siteuser.UserRepository;
import com.shopreview.app.siteuser.UserService;
import com.shopreview.app.siteuser.exception.BadRequestException;
import com.shopreview.app.siteuser.exception.UserNotFoundException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.sql.Date;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SiteUserServiceTest {

    @Mock
    private UserRepository userRepository;
    private UserService underTest;
    private List<Review> reviews = Arrays.asList();
    private ArrayList comments;
    private Date created_at = new Date(System.currentTimeMillis());

    // new user service is to be set up before each test,
    // making use of the repo already in place
    @BeforeEach
    void setUp() {
        underTest = new UserService(userRepository);
    }

    @Test
    void canGetAllUsers() {
        // given

        // when
        underTest.getAllUsers();
        // then
        verify(userRepository).findAll();
    }

    @Test
    @Disabled
    void canGetOneUser() {
        // given

        mock(SiteUser.class);
        SiteUser fakeUser = new SiteUser(
                1L,
                "Jaime",
                "Torres",
                "saeadrg",
                "jtorres@gmail.es",
                created_at,
                Role.Reader,
                reviews
                );
        userRepository.save(fakeUser);
        long testId = fakeUser.getUser_Id();
        // testUser needs to be already saved to the mock repository
        // needs to be a mock object saved to a mock repo, with service method tested


        // when
        underTest.getUserById(testId);

        // then
        // verify that the method was invoked on the repo
        verify(userRepository).findById(testId).get();
        // assertThat(saved.getFirstName()).isEqualTo(testUser.getFirstName());
        // assertThat(saved.getLastName()).isEqualTo(testUser.getLastName());
        // assertThat(saved.getEmail()).isEqualTo(testUser.getEmail());
    }

    @Test
    void canAddUser() {
        // given
        SiteUser user = new SiteUser(
                "harry",
                "smalls",
                "adjkghs",
                "harrys@hello.com",
                Role.Reader
        );
        // when
        underTest.addUser(user);

        // then
        // assert two things
        // one, that the repo was invoked with the save method
        // this captures the argument being passed through to a method
        ArgumentCaptor<SiteUser> userArgumentCaptor = ArgumentCaptor.forClass(SiteUser.class);
        // verifying that a SiteUser was actually passed through and saved
        verify(userRepository).save(userArgumentCaptor.capture());

        // two, that the captured user saved to the repo is the same as what was passed in
        SiteUser capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser).isEqualTo(user);
    }

    @Test
    void testToCheckErrorIsThrownWhenStudentIsTaken() {
        // given
        SiteUser user = new SiteUser(
                "Jaime",
                "Rodriguez",
                "248sdfgs",
                "jrodri@gmail.es",
                Role.Admin
        );
        given(userRepository.selectExistingEmail(user.getEmail())).willReturn(true);
        // when

        // then
        // used to manually fail a test
        assertThatThrownBy(() -> underTest.addUser(user))
                // error instance is a bad request exception
                .isInstanceOf(BadRequestException.class)
                // that the correct error message comes up
                .hasMessageContaining("Email " + user.getEmail() + " taken");
        // verify that there was never any kinda save at any time
        verify(userRepository, never()).save(any());
    }

    @Test
    void canDeleteUser() {
        // given
        // there's an id to be deleted
        long userId = 10;

        // and that it is true that the id exists in the repo
        given(userRepository.existsById(userId)).willReturn(true);
        // when
        // the user is deleted using the service
        underTest.deleteUser(userId);
        // then
        // verify that the deletion has happened in the repo
        verify(userRepository).deleteById(userId);
    }

    @Test
    void testToCheckErrorThrownWhenThereIsNoUser() {
        // given
        long userId = 10;
        given(userRepository.existsById(userId)).willReturn(false);

        // when
        // underTest.deleteUser(userId); not needed - already said it's false above

        // then check that the error's been thrown
        assertThatThrownBy(()-> underTest.deleteUser(userId))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("User with id " + userId + " does not exist");
        // verify that no deletion of any object ever took place - FOR DELETEUSER
        verify(userRepository, never()).deleteById(any());
        // verify that no getting took place - FOR GETBYID
        verify(userRepository, never()).findById(any());
        // verify that no updating took place - FOR UPDATE
        verify(userRepository, never()).save(any());
    }

    @Test
    void canUpdateUser() {
        // given
        SiteUser initialUser = new SiteUser(
                1L,
                "harry",
                "smalls",
                "adjkghs",
                "harrys@hello.com",
                created_at,
                Role.Reader,
                reviews
        );
        given(userRepository.existsById(initialUser.getUser_Id())).willReturn(true);

        // when
        SiteUser userToUpdate = new SiteUser(
                1L,
                "jacob",
                "biggs",
                "agargra",
                "jbiggs@hello.com",
                created_at,
                Role.Admin,
                reviews
        );
        underTest.replaceUser(userToUpdate);

        // then
        // assert two things
        // one, that the repo was invoked with the save method
        // this captures the argument being passed through to a method
        ArgumentCaptor<SiteUser> userArgumentCaptor = ArgumentCaptor.forClass(SiteUser.class);
        // verifying that a SiteUser was actually passed through and saved
        verify(userRepository).save(userArgumentCaptor.capture());

        // two, that the captured user saved to the repo is the same as what was passed in
        SiteUser capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser).isEqualTo(userToUpdate);
    }
}
