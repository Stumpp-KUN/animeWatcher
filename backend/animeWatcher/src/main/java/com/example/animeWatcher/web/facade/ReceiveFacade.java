package com.example.animeWatcher.web.facade;

import com.example.animeWatcher.model.Anime;
import com.example.animeWatcher.model.Receive;
import com.example.animeWatcher.web.dto.receive.ReceiveDTORead;
import com.example.animeWatcher.web.dto.receive.ReceiveToDtoReceiveConverter;
import com.example.animeWatcher.web.service.ReceiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReceiveFacade {
    private final ReceiveService receiveService;
    private final ReceiveToDtoReceiveConverter receiveToDtoReceiveConverter;

    public Page<ReceiveDTORead> getAllReceives(Pageable pageable){
        return receiveService.getAllReceive(pageable).map(receiveToDtoReceiveConverter::getDtoFromReceive);
    }
}
