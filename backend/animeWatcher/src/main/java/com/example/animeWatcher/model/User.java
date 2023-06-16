package com.example.animeWatcher.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Table
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private String surname;
    private String nickname;
    private String password;
    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<State> articles;
    @Transient
    private String passwordConfirm;
    @ManyToMany
    private Set<Role> roles;
}
