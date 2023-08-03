package com.example.animeWatcher.web.dto.user;

import com.example.animeWatcher.model.Image;
import com.example.animeWatcher.model.Role;
import lombok.Data;

@Data
public class UserDTORead extends UserDTO{
    private String email;
    private Image image;
    private Role role;
}

