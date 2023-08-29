package com.example.animeWatcher.web.dto.anime;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.State;
import com.example.animeWatcher.web.dto.state.StateDTORead;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AnimeToDTOAnimeConverter {
    private ModelMapper modelMapper=new ModelMapper();

    public AnimeDTORead convertAnimeToReadDto(Anime entity) {
        AnimeDTORead dto = modelMapper.map(entity, AnimeDTORead.class);
        return dto;
    }

    public Anime convertReadDtoToAnime(AnimeDTORead dto){
        Anime anime=modelMapper.map(dto,Anime.class);
        return anime;
    }

    public AnimeDTOReadDescription convertAnimeToReadDtoDescription(Anime entity){
        AnimeDTOReadDescription dto = modelMapper.map(entity, AnimeDTOReadDescription.class);
        return dto;
    }

    public Anime convertAnimeDtoDescToAnime(AnimeDTOReadDescription dto){
        Anime anime=modelMapper.map(dto,Anime.class);
        return anime;
    }
}
