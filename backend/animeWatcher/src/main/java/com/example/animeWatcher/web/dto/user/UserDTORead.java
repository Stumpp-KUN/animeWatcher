package com.example.animeWatcher.web.dto.user;

import com.example.animeWatcher.model.Role;
import lombok.Data;

@Data
public class UserDTORead extends UserDTO{
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
}

