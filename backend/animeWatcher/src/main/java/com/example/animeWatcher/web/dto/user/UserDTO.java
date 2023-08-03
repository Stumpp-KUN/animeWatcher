package com.example.animeWatcher.web.dto.user;

import com.example.animeWatcher.model.Image;
import lombok.Data;

@Data
public abstract class UserDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Image image;
}
