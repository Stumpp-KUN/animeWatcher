package com.example.animeWatcher.service;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.repository.AnimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;

    public List<Anime> getRandomAnimes(){
        return animeRepository.findAll();
    }
}
