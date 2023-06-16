package com.example.animeWatcher.web.dto.receive;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.User;
import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.user.UserDTORead;
import lombok.Data;

@Data
public class ReceiveDTORead {
    private Long id;
    private UserDTORead receiver;
    private String description;
    private Boolean isLike;
    private AnimeDTORead anime;
}
