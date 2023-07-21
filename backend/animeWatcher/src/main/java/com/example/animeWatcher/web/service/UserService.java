package com.example.animeWatcher.web.service;

import com.example.animeWatcher.model.Image;
import com.example.animeWatcher.model.User;
import com.example.animeWatcher.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public User updatePhoto(User user, MultipartFile image) throws IOException {
        Image image1;
        if(image.getSize()!=0){
            image1 = toImageEntity(image);
            user.setImage(image1);
        }
        System.out.println(user.getImage().getName());
        return userRepository.save(user);
    }

    private Image toImageEntity(MultipartFile image) throws IOException {
        Image image1=new Image();
        image1.setName(image.getName());
        image1.setOriginalFileName(image.getOriginalFilename());
        image1.setContentType(image.getContentType());
        image1.setSize(image.getSize());
        image1.setBytes(image.getBytes());
        return image1;
    }
}

