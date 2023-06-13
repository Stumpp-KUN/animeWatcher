package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.service.AnimeService;
import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.anime.AnimeToDTOAnimeConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AnimeFacade {
    private final AnimeService animeService;
    private final AnimeToDTOAnimeConverter animeToDTOAnimeConverter;

    public List<AnimeDTORead> getRandomAnimes(){
        List<AnimeDTORead> animes=new ArrayList<>();
        animeService.getRandomAnimes()
                .stream()
                .sorted(Comparator.comparingInt(Anime::getLikes).reversed())
                .forEach(anime -> animes.add(animeToDTOAnimeConverter.convertAnimeToReadDto(anime)));

        if(animes.size()>10) animes.subList(0,10);
        return animes;
    }
}
