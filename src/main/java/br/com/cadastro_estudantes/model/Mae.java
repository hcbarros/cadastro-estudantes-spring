package br.com.cadastro_estudantes.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;


@Entity
public class Mae {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull(message = "O nome da mãe não deve ser nulo!")
	@NotBlank(message = "O nome da mãe não deve estar em branco!")
	@Size(max = 100, message = "O nome deve possuir no máximo 100 caracteres!")
	private String nome;

	@CPF(message = "CPF invalido!")
	private String cpf;
	
	@NotNull(message = "A data de pagamento não deve ser nula!")
	private Date data_pagamento;
		
	
	public Mae(@Size(max = 100, message = "O nome deve possuir no máximo 100 caracteres!") String nome,
			String cpf, Date data_pagamento) {
		
		this.nome = nome;
		this.cpf = cpf;
		this.data_pagamento = data_pagamento;
	}
	
	public Mae() {
		
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getData_pagamento() {
		return data_pagamento;
	}

	public void setData_pagamento(Date data_pagamento) {
		this.data_pagamento = data_pagamento;
	}

}
