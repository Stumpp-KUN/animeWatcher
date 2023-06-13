package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.Description;
import com.example.animeWatcher.service.AnimeService;
import com.example.animeWatcher.service.DescriptionService;
import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.anime.AnimeDTOReadDescription;
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
    private final DescriptionService descriptionService;
    private final AnimeToDTOAnimeConverter animeToDTOAnimeConverter;

    public List<AnimeDTORead> getRandomAnimes(){
        List<AnimeDTORead> animes=new ArrayList<>();

        animeService.getRandomAnimes()
                .stream()
                .sorted(Comparator.comparingInt(Anime::getLikes).reversed())
                .forEach(anime -> animes.add(animeToDTOAnimeConverter.convertAnimeToReadDto(anime)));

        if(animes.size()>5) animes.subList(0,5);
        return animes;
    }

    public List<AnimeDTORead> getAllAnimes(){
        List<AnimeDTORead> animes=new ArrayList<>();
        animeService.getRandomAnimes().stream().forEach(n->animes.add(animeToDTOAnimeConverter.convertAnimeToReadDto(n)));
        return animes;
    }

    public AnimeDTOReadDescription getAnime(Long id){
        AnimeDTOReadDescription animeDTOReadDescription = animeToDTOAnimeConverter.convertAnimeToReadDtoDescription(animeService.getAnime(id));
        return reUpdateAnimeDtoReadDescription(animeDTOReadDescription,descriptionService.getDescriptionByAnimeId(animeDTOReadDescription.getId()));
    }

    private AnimeDTOReadDescription reUpdateAnimeDtoReadDescription (AnimeDTOReadDescription anime,Description description){
        anime.setLongDescription(description.getLongDescription());
        anime.setEpisodes(description.getEpisodes());
        anime.setAgeRestrictions(description.getAgeRestrictions());
        anime.setMangaName(description.getMangaName());
        anime.setStudio(description.getStudio());
        return anime;
    }
}
