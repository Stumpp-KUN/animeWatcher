package com.example.animeWatcher.web.dto.user;

import lombok.Data;

@Data
public abstract class UserDTO {
    private Long id;
    private String nickname;
}
