package com.example.animeWatcher.web.dto.anime;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class AnimeDTOReadDescription extends AnimeDTO{
    private Long id;
    private int likes;
    private int dislikes;
    private String longDescription;
    private String studio;
    private Integer episodes;
    private String ageRestrictions;
    private String mangaName;
}
