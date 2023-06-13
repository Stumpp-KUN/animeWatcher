package com.example.animeWatcher.repository;

import com.example.animeWatcher.model.Description;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<Description,Long> {
    Description findDescriptionByAnimeId(Long id);
}
