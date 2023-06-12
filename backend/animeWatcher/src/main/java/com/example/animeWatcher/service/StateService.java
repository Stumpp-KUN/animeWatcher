package com.example.animeWatcher.service;

import com.example.animeWatcher.model.State;
import com.example.animeWatcher.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StateService {
    private final StateRepository stateRepository;

    public State getState(Long id){
        return stateRepository.findById(id).orElseThrow(()-> new NoSuchElementException("There is not element with id "+id));
    }

    public List<State> getStates(){
        List<State> states=stateRepository.findAll();
        if(states.isEmpty()) new NoSuchElementException("There is not states");
        return states;
    }
}
