package com.example.animeWatcher.web.controller;

import com.example.animeWatcher.web.dto.state.StateDTORead;
import com.example.animeWatcher.web.facade.StateFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/states")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasAnyRole('USER')")
public class StateController {
    private final StateFacade stateFacade;

    @GetMapping("/{id}")
    public ResponseEntity<StateDTORead> getState(@PathVariable Long id){
        return new ResponseEntity<>(stateFacade.getState(id), HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    public ResponseEntity<List<StateDTORead>> getStates(){
        return new ResponseEntity<>(stateFacade.getStates(), HttpStatus.ACCEPTED);
    }
}
