package br.com.cadastro_estudantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cadastro_estudantes.model.Estudante;


public interface EstudanteRepositorio extends JpaRepository<Estudante, Long> {

}
