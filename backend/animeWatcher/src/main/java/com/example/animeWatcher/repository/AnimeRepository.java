package com.example.animeWatcher.repository;

import com.example.animeWatcher.model.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimeRepository extends JpaRepository<Anime, Long> {
}
