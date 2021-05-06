package br.com.cadastro_estudantes.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.cadastro_estudantes.model.Estudante;
import br.com.cadastro_estudantes.repositorio.EstudanteRepositorio;


@Service
public class EstudanteService {

	private int index = 0;	
	
	@Autowired
	private EstudanteRepositorio repoEstudante;
	
	
	public Estudante salvar(Estudante estudante) {
		return repoEstudante.save(estudante);
	}	
	
	public Estudante editarEstudante(Long id, Estudante estudante) {		
		
		Estudante e = buscarPorId(id);
		e.setData_nasc(estudante.getData_nasc());
		e.setEndereco(estudante.getEndereco());
		e.setMae(estudante.getMae());
		e.setNome(estudante.getNome());
		e.setSerie(estudante.getSerie());				
		return salvar(e);
	}	
	
	public List<Estudante> buscarEstudantes(int pageNum) {
		
		Pageable paging = PageRequest.of(pageNum, 10);
        Page<Estudante> pagedResult = repoEstudante.findAll(paging);

		return pagedResult.toList();
	}
	
	public Estudante buscarPorId(Long id) {
		return repoEstudante.findById(id)
				   .orElseThrow(() -> new EntityNotFoundException());
	}

	public void delete(Long id) {
		repoEstudante.deleteById(id);
	}
	
	public long count() {
		return repoEstudante.count();
	}
}
