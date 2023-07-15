package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.model.User;
import com.example.animeWatcher.web.dto.user.UserDTORead;
import com.example.animeWatcher.web.dto.user.UserToDTOConverter;
import com.example.animeWatcher.web.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFacade {
    private final UserService userService;
    private final UserToDTOConverter userToDTOConverter;

    public Page<UserDTORead> getAllUsers(Pageable pageable){
        Page<User> users=userService.getAllUsers(pageable);
        return users.map(userToDTOConverter::convertUserToReadDto);
    }

    public UserDTORead getUserByEmail(String email){
        return userToDTOConverter.convertUserToReadDto(userService.getUserByEmail(email));
    }

    public UserDTORead getUser(Long id){
        return userToDTOConverter.convertUserToReadDto(userService.getUser(id));
    }
}
