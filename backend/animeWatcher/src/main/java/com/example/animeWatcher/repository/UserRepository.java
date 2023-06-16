package com.example.animeWatcher.repository;

import com.example.animeWatcher.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByNickname(String nickname);
}
