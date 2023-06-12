package com.example.animeWatcher.web.dto.anime;

import lombok.Data;

@Data
public class AnimeDTORead extends AnimeDTO{
    private int likes;
    private int dislikes;
}
