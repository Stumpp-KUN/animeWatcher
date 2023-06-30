package com.example.animeWatcher.repository;

import com.example.animeWatcher.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByNickname(String nickname);
    Optional<User> findByEmail(String email);
}
