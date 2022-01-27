package com.example.springdatajpapaginationandsorting.controller;

import com.example.springdatajpapaginationandsorting.model.Persona;
import com.example.springdatajpapaginationandsorting.repository.PersonaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/personas")
public class PersonaController {

    private static final Logger logger = LoggerFactory.getLogger(PersonaController.class);

    @Value("${page.default.size}")
    private int pageDefaultSize;

    @Value("${page.default.sortField}")
    private String pageDefaultSortField;

    @Value("${page.default.sortDirection}")
    private String pageDefaultSortDirection;

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping("/page/{pageNumber}")
    public Page<Persona> getPageByPageNumber(@PathVariable Integer pageNumber,
                                             @RequestParam(required = false) Integer pPageSize,
                                             @RequestParam(required = false) String pSortField,
                                             @RequestParam(required = false) String pSortDirection) {

        Integer pageSize =  getOrDefault(pPageSize, pageDefaultSize);
        String sortField = getOrDefault(pSortField, pageDefaultSortField);
        String sortDirection = getOrDefault(pSortDirection, pageDefaultSortDirection);

        logger.info("Page {} requested (Settings: pageSize={}, sortField={}, sortDirection={}) ", pageNumber, pageSize, sortField, sortDirection);

        Sort sort = Sort.by(Sort.Direction.valueOf(sortDirection), sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        return this.personaRepository.findAll(pageable);
    }

    @GetMapping("/page/simple/{pageNumber}")
    public Page<Persona> getPageSimple(@PathVariable int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, pageDefaultSize);

        return this.personaRepository.findAll(pageable);
    }

    private <T> T getOrDefault(T value, T defaultValue) {
        return value == null ? defaultValue : value;
    }


}
