package com.example.animeWatcher.repository;

import com.example.animeWatcher.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
