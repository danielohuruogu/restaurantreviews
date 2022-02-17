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
                    "User with id " + id + " does not exist"
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
                    "User with id " + id + " does not exist"
            );
        }
        userRepository.deleteById(id);
    }

    public SiteUser replaceUser(SiteUser newUserDetails) {
        // grab the id of the person coming in
        Long userId = newUserDetails.getUserId();
        // if it doesn't already exist in the database, add it in
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(
                    "User with id " + userId + " does not exist"
            );
        }
//        SiteUser userToUpdate = userRepository.getById(userId);
//        userToUpdate.setFirst_name(newUserDetails.getFirstName());
//        userToUpdate.setLast_name(newUserDetails.getLastName());
//        userToUpdate.setPassword(newUserDetails.getPassword());
//        userToUpdate.setEmail(newUserDetails.getEmail());
//        userToUpdate.setRole(newUserDetails.getRole());
//        // should run a map function over the object, so only the keys with values
//        // are mapped onto the values that match
//
//        userRepository.save(userToUpdate);
        return userRepository.findById(userId)
                .map(userToUpdate -> {
                    userToUpdate.setFirstName(newUserDetails.getFirstName());
                    userToUpdate.setLastName(newUserDetails.getLastName());
                    userToUpdate.setPassword(newUserDetails.getPassword());
                    userToUpdate.setEmail(newUserDetails.getEmail());
                    userToUpdate.setRole(newUserDetails.getRole());
                    return userRepository.save(userToUpdate);
                })
                .orElseGet(() -> {
                    newUserDetails.setUserId(userId);
                    return userRepository.save(newUserDetails);
                });
    }

    public SiteUser updateUser(SiteUser newUserDetails) {
        Long userId = newUserDetails.getUserId();
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(
                    "User with id " + userId + " does not exist"
            );
        }
        // this may not work - need to make sure it works for empty fields
        return userRepository.findById(userId)
                .map(userToUpdate -> {
                    userToUpdate.setFirstName(newUserDetails.getFirstName());
                    userToUpdate.setLastName(newUserDetails.getLastName());
                    userToUpdate.setPassword(newUserDetails.getPassword());
                    userToUpdate.setEmail(newUserDetails.getEmail());
                    userToUpdate.setRole(newUserDetails.getRole());
                    return userRepository.save(userToUpdate);
                })
                .orElseGet(() -> {
                    newUserDetails.setUserId(userId);
                    return userRepository.save(newUserDetails);
                });
    }
}
