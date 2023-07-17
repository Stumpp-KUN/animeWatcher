package com.example.animeWatcher.web.dto.anime;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class AnimeDTOReadDescription extends AnimeDTO{
    private Long id;
    private String longDescription;
    private String studio;
    private Integer episodes;
    private String ageRestrictions;
    private String mangaName;
    private String photoURL;
    private String videoURL;
    private AnimeDTORead animeDTORead;
}
