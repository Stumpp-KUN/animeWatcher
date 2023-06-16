package com.example.animeWatcher.web.service;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.repository.AnimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;

    public List<Anime> getRandomAnimes() {
        return animeRepository.findAll();
    }

    public Page<Anime> getAllAnimes(Pageable pageable) {
        return animeRepository.findAll(pageable);
    }


    public Anime getAnime(Long id){
        return animeRepository.findById(id).orElseThrow(()->new NoSuchElementException("There is not element with id "+id));

    }
}