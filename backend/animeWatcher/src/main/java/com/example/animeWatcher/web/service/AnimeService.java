package com.example.animeWatcher.web.service;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.repository.AnimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;

    public List<Anime> getRandomAnimes(){
        return animeRepository.findAll();
    }

    public Anime getAnime(Long id){
        return animeRepository.findById(id).orElseThrow(()->new NoSuchElementException("There is not anime with id "+id));
    }
}
