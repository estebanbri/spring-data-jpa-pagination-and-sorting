package com.example.springdatajpapaginationandsorting.controller;

import com.example.springdatajpapaginationandsorting.model.Persona;
import com.example.springdatajpapaginationandsorting.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/personas")
public class PersonaController {

    private static final int PAGE_SIZE = 5;

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping("/1")
    public Page<Persona> getPersonasByPageAndSortedByAndSortOrder(@RequestParam int pageNumber,
                                                                  @RequestParam String sortField,
                                                                  @RequestParam String sortOrder) {

        Sort sort = Sort.by(Sort.Direction.valueOf(sortOrder), sortField);

        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE, sort);

        return this.personaRepository.findAll(pageable);
    }

    @GetMapping("/2")
    public Page<Persona> getPersonasByPageAndSortedByAscending(@RequestParam int pageNumber,
                                                                  @RequestParam String sortField) {

        Sort sort = Sort.by(Sort.Direction.ASC, sortField);

        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE, sort);

        return this.personaRepository.findAll(pageable);
    }

    @GetMapping("/3")
    public Page<Persona> getPersonasByPageAndSortedByAscendingOneLiner(@RequestParam int pageNumber,
                                                               @RequestParam String sortField) {
        return this.personaRepository.findAll(PageRequest.of(pageNumber, PAGE_SIZE, Sort.by(sortField)));
    }

}
