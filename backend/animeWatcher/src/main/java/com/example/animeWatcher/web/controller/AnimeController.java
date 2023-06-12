package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.facade.AnimeFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/animes")
@CrossOrigin(origins = "http://localhost:3000")
public class AnimeController {

    private final AnimeFacade animeFacade;

    @GetMapping("/")
    public ResponseEntity<List<AnimeDTORead>> getAnimes(){
        return new ResponseEntity<>(animeFacade.getRandomAnimes(), HttpStatus.ACCEPTED);
    }
}
