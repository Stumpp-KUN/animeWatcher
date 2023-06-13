package com.example.animeWatcher.service;

import com.example.animeWatcher.model.Description;
import com.example.animeWatcher.repository.DescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DescriptionService {
    private final DescriptionRepository descriptionRepository;

    public Description getDescriptionByAnimeId(Long id){
        return descriptionRepository.findDescriptionByAnimeId(id);
    }
}
