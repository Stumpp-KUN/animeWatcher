package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.user.UserDTORead;
import com.example.animeWatcher.web.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('USER')")
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

    @GetMapping("/email")
    public ResponseEntity<UserDTORead> getUserByEmail(@RequestParam String email){
        System.out.println(userFacade.getUserByEmail(email).toString());
        return ResponseEntity.ok(userFacade.getUserByEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTORead> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userFacade.getUser(id));
    }
}
