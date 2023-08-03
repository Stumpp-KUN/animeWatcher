package com.example.animeWatcher;

import com.example.animeWatcher.auth.AuthenticationService;
import com.example.animeWatcher.auth.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.example.animeWatcher.model.Role.ADMIN;
import static com.example.animeWatcher.model.Role.MANAGER;

@SpringBootApplication
public class AnimeWatcherApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimeWatcherApplication.class, args);
	}


}
