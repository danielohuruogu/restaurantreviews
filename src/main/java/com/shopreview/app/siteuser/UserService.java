package com.shopreview.app.siteuser;

import com.shopreview.app.siteuser.exception.BadRequestException;
import com.shopreview.app.siteuser.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<SiteUser> getAllUsers() {

        return userRepository.findAll();
    }

    public SiteUser getUserById(Long id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(
                    "User with id" + id + " does not exist"
            );
        }
        return userRepository.findById(id).get();
    }

    public void addUser(SiteUser user) {
        Boolean existsEmail = userRepository.selectExistingEmail(user.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                    "Email " + user.getEmail() + " taken"
            );
        }

        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(
                    "User with id" + id + " does not exist"
            );
        }
        userRepository.deleteById(id);
    }

    public void updateUser(SiteUser newUserDetails) {
        // grab the id of the person coming in
        Long userId = newUserDetails.getId();
        // if it doesn't already exist in the database, add it in
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(
                    "User with id" + userId + " does not exist"
            );
        }
        SiteUser userToUpdate = userRepository.getById(userId);
        userToUpdate.setFirst_name(newUserDetails.getFirstName());
        userToUpdate.setLast_name(newUserDetails.getLastName());
        userToUpdate.setPassword(newUserDetails.getPassword());
        userToUpdate.setEmail(newUserDetails.getEmail());
        userToUpdate.setRole(newUserDetails.getRole());

        userRepository.save(userToUpdate);
    }
}
