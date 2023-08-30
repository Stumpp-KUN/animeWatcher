package com.example.animeWatcher.web.dto.user;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.Image;
import com.example.animeWatcher.model.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTORead extends UserDTO{
    private String email;
    private List<Anime> liked;
    private Image image;
    private Role role;
}

