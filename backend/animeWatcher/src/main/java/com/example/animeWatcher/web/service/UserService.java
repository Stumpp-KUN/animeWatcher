package com.example.animeWatcher.web.service;

import com.example.animeWatcher.model.User;
import com.example.animeWatcher.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public Page<User> getAllUsers(Pageable pageable){
        return userRepository.findAll(pageable);
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow(()->new NoSuchElementException());
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()->new NoSuchElementException());
    }
}

