package br.com.cadastro_estudantes.config;

import java.util.GregorianCalendar;

import java.sql.Date;

import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import br.com.cadastro_estudantes.model.Endereco;
import br.com.cadastro_estudantes.model.Estudante;
import br.com.cadastro_estudantes.model.Mae;
import br.com.cadastro_estudantes.repositorio.EstudanteRepositorio;


@Configuration
@Profile("prod")
public class DataLoader {
	
	
	@Bean
	CommandLineRunner baseLoad(EstudanteRepositorio repo) {
		 
		
		return args -> {
			
			Endereco endereco = new Endereco("54420-050", "Rua da Praia", 10, null, "Centro", "Recife", "PE");
			Mae mae = new Mae("Andrea Barros","026.572.264-00", new Date(Long.valueOf("1617580800000")));
			Estudante e = new Estudante("Alex Barros", new Date(Long.valueOf("1321315135521")), 3 , endereco, mae);
			
			repo.save(e);					
		};
	}

}