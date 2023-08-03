package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.anime.AnimeDTOReadDescription;
import com.example.animeWatcher.web.facade.AnimeFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/popular")
    public ResponseEntity<AnimeDTOReadDescription> getPopularAnime(){
        return new ResponseEntity<>(animeFacade.getPopAnime(),HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimeDTOReadDescription> getAnime(@PathVariable Long id){
        return new ResponseEntity<>(animeFacade.getAnime(id),HttpStatus.ACCEPTED);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<AnimeDTORead>> getAllAnimes(
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AnimeDTORead> animePage = animeFacade.getAllAnimes(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("TotalPages", String.valueOf(animePage.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(animePage);
    }

}
