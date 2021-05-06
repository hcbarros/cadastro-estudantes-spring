
package br.com.cadastro_estudantes.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.cadastro_estudantes.model.Endereco;
import br.com.cadastro_estudantes.model.Estudante;
import br.com.cadastro_estudantes.model.Mae;
import br.com.cadastro_estudantes.service.EstudanteService;


@RestController
@Validated
@RequestMapping("/estudante")
public class CadastroController  {

	@Autowired
	private EstudanteService service;
	
	
	@GetMapping(value = "{id}")
	public Estudante buscarEstudante(@PathVariable Long id) {
		return service.buscarPorId(id);		
	}

	@GetMapping(value = "/count")
	public long count() {
		return service.count();
	}
	
	@GetMapping(value = "/list/{page}")
	public List<Estudante> buscarEstudantes(@PathVariable int page) {
		return service.buscarEstudantes(page);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Estudante salvar(@RequestBody @Valid Estudante estudante) {
		return service.salvar(estudante);
	}
	
	@PutMapping(value = "{id}")
	public Estudante editarEstudante(@PathVariable Long id, @RequestBody @Valid Estudante estudante) {
		return service.editarEstudante(id, estudante);
	}
	
	@DeleteMapping(value = "{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long id) {
		service.delete(id);
	}
	
}

