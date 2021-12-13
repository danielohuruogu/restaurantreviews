package com.shopreview.app.user;

import com.shopreview.app.user.exception.BadRequestException;
import com.shopreview.app.user.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public User getUserById(User user) {
        Long userId = user.getId();
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(
                    "User with id" + userId + " does not exist"
            );
        }
        return userRepository.getById(userId);
    }

    public void addUser(User user) {
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

    public void updateUser(User newUserDetails) {
        // grab the id of the person coming in
        Long userId = newUserDetails.getId();
        // if it doesn't already exist in the database, add it in
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(
                    "User with id" + userId + " does not exist"
            );
        }
        User userToUpdate = userRepository.getById(userId);
        userToUpdate.setFirst_name(newUserDetails.getFirstName());
        userToUpdate.setLast_name(newUserDetails.getLastName());
        userToUpdate.setPassword(newUserDetails.getPassword());
        userToUpdate.setEmail(newUserDetails.getEmail());
        userToUpdate.setRole(newUserDetails.getRole());

        userRepository.save(userToUpdate);
    }
}
