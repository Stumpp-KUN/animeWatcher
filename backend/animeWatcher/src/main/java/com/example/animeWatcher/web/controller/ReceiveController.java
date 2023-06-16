package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import com.example.animeWatcher.web.dto.receive.ReceiveDTORead;
import com.example.animeWatcher.web.facade.ReceiveFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/receives")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiveController {
    private final ReceiveFacade receiveFacade;

    @GetMapping("/")
    public ResponseEntity<Page<ReceiveDTORead>> getAllReceives(
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ReceiveDTORead> receivePage = receiveFacade.getAllReceives(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("TotalPages", String.valueOf(receivePage.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(receivePage);
    }
}
