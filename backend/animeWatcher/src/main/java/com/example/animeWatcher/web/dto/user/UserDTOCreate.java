package com.example.animeWatcher.web.dto.user;

import lombok.Data;

@Data
public class UserDTOCreate extends UserDTO{
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
}
