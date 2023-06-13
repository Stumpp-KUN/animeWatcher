package com.example.animeWatcher.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
public class Description {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(length = 1555)
    private String longDescription;
    private String studio;
    private Integer episodes;
    private String ageRestrictions;
    private String mangaName;
    @OneToOne
    private Anime anime;
}
