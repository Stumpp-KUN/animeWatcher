package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.user.UserDTORead;
import com.example.animeWatcher.web.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserFacade userFacade;

    @GetMapping("/list")
    public ResponseEntity<Page<UserDTORead>> getAllUsers(
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTORead> userPage = userFacade.getAllUsers(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("TotalPages", String.valueOf(userPage.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(userPage);
    }
}
