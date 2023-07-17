package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.Description;
import com.example.animeWatcher.web.service.AnimeService;
import com.example.animeWatcher.web.service.DescriptionService;
import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.anime.AnimeDTOReadDescription;
import com.example.animeWatcher.web.dto.anime.AnimeToDTOAnimeConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class AnimeFacade {
    private final AnimeService animeService;
    private final DescriptionService descriptionService;
    private final AnimeToDTOAnimeConverter animeToDTOAnimeConverter;
    private Random random = new Random();

    public List<AnimeDTORead> getRandomAnimes(){
        List<AnimeDTORead> animes=new ArrayList<>();

        animeService.getRandomAnimes()
                .stream()
                .sorted(Comparator.comparingInt(Anime::getLikes).reversed())
                .forEach(anime -> animes.add(animeToDTOAnimeConverter.convertAnimeToReadDto(anime)));

        if(animes.size()>5){
            for(int i=animes.size()-1;i>=5;i--)
                animes.remove(i);
        }
        return animes;
    }

    public AnimeDTOReadDescription getPopAnime(){
        List<AnimeDTORead> animes=new ArrayList<>();

        animeService.getRandomAnimes()
                .stream()
                .sorted(Comparator.comparingInt(Anime::getLikes).reversed())
                .forEach(anime -> animes.add(animeToDTOAnimeConverter.convertAnimeToReadDto(anime)));
        int k = random.nextInt(3) ;
        AnimeDTOReadDescription dto=new AnimeDTOReadDescription();
        dto.setAnimeDTORead(animes.get(k));
        return  reUpdateAnimeDtoReadDescription(dto,descriptionService.getDescriptionByAnimeId(dto.getAnimeDTORead().getId()));
    }

    public Page<AnimeDTORead> getAllAnimes(Pageable pageable) {
        Page<Anime> animePage = animeService.getAllAnimes(pageable);
        return animePage.map(animeToDTOAnimeConverter::convertAnimeToReadDto);
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
        anime.setPhotoURL(description.getPhotoURL());
        anime.setVideoURL(description.getVideoURL());
        return anime;
    }
}
