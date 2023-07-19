package com.example.animeWatcher.web.dto.user;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.User;
import com.example.animeWatcher.web.dto.anime.AnimeDTORead;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserToDTOConverter {
    private ModelMapper modelMapper=new ModelMapper();

    public UserDTORead convertUserToReadDto(User entity) {
        return modelMapper.map(entity, UserDTORead.class);
    }

    public User convertReadDtoToUser(UserDTORead dto){
        return modelMapper.map(dto,User.class);
    }

    public UserDTOCreate convertUserToCreateDto(User entity){
        return modelMapper.map(entity, UserDTOCreate.class);
    }

    public User convertCreateDtoToUser(UserDTOCreate dto){
        return modelMapper.map(dto,User.class);
    }
}
