package com.example.animeWatcher.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table
public class Receive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User receiver;
    @Column(length = 5000)
    private String description;
    private Boolean isLike;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "anime_id")
    private Anime anime;
}
