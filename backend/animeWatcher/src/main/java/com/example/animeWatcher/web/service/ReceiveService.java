package com.example.animeWatcher.web.service;

import com.example.animeWatcher.model.Receive;
import com.example.animeWatcher.repository.ReceiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReceiveService {
    private final ReceiveRepository receiveRepository;

    public Page<Receive> getAllReceive(Pageable pageable){
        return receiveRepository.findAll(pageable);
    }
}
