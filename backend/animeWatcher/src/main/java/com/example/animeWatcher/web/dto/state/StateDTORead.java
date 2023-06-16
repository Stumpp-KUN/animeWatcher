package com.example.animeWatcher.web.dto.state;

import com.example.animeWatcher.model.User;
import lombok.Data;

@Data
public class StateDTORead extends StateDTO{
    private Long id;
    private User author;
}
