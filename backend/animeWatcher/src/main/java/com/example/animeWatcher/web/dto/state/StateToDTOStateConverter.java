package com.example.animeWatcher.web.dto.state;

import com.example.animeWatcher.model.State;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class StateToDTOStateConverter {
    private ModelMapper modelMapper=new ModelMapper();

    public StateDTORead convertStateToReadDto(State entity) {
        StateDTORead dto = modelMapper.map(entity, StateDTORead.class);
        return dto;
    }

    public State convertReadDtoToState(StateDTORead dto){
        State state=modelMapper.map(dto,State.class);
        return state;
    }
}
