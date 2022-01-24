package com.example.springdatajpapaginationandsorting.repository;

import com.example.springdatajpapaginationandsorting.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
