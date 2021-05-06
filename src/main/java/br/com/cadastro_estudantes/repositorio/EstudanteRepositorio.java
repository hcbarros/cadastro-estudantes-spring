package br.com.cadastro_estudantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.cadastro_estudantes.model.Estudante;

@Repository
public interface EstudanteRepositorio extends PagingAndSortingRepository<Estudante, Long> {
	
}
