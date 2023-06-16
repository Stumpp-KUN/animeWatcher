package com.example.animeWatcher.web.dto.receive;

import com.example.animeWatcher.model.Receive;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReceiveToDtoReceiveConverter {
    private ModelMapper modelMapper=new ModelMapper();

    public ReceiveDTORead getDtoFromReceive(Receive entity){
        return modelMapper.map(entity,ReceiveDTORead.class);
    }
}
