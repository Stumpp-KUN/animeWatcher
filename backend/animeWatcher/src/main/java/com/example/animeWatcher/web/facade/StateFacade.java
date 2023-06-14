package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.web.service.StateService;
import com.example.animeWatcher.web.dto.state.StateDTORead;
import com.example.animeWatcher.web.dto.state.StateToDTOStateConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class StateFacade {
    private final StateService stateService;
    private final StateToDTOStateConverter stateToDTOStateConverter;

    public StateDTORead getState(Long id){
        return stateToDTOStateConverter.convertStateToReadDto(stateService.getState(id));
    }

    public List<StateDTORead> getStates(){
        List<StateDTORead> states=new ArrayList<>();
        stateService.getStates().stream().forEach(n->states.add(stateToDTOStateConverter.convertStateToReadDto(n)));
        return states;
    }
}
