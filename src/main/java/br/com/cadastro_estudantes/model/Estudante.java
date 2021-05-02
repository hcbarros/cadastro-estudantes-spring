package br.com.cadastro_estudantes.model;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
public class Estudante {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull(message = "O nome não deve ser nulo!")
	@NotBlank(message = "O nome não deve estar em branco!")
	@Size(max = 100, message = "O nome deve possuir no máximo 100 caracteres!")
	private String nome;
	
	@NotNull(message = "O data de nascimento não deve ser nula!")
	private Date data_nasc;
	
	@Min(value = 1, message = "A série deve ser maior ou igual a 1!")
	@Max(value = 9, message = "A série deve ser menor ou igual a 9!")
	private Integer serie;
	
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "endereco_id", referencedColumnName = "id")
	private Endereco endereco;
	
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "mae_id", referencedColumnName = "id")
	private Mae mae;
	
	
	public Estudante() {
		
	}

	public Estudante(@Size(max = 100, message = "O nome deve possuir no máximo 100 caracteres!") String nome,
			Date data_nasc, @Min(1) @Max(9) Integer serie, Endereco endereco, Mae mae) {
		
		this.nome = nome;
		this.data_nasc = data_nasc;
		this.serie = serie;
		this.endereco = endereco;
		this.mae = mae;
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

	public Date getData_nasc() {
		return data_nasc;
	}

	public void setData_nasc(Date data_nasc) {
		this.data_nasc = data_nasc;
	}

	public Integer getSerie() {
		return serie;
	}

	public void setSerie(Integer serie) {
		this.serie = serie;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Mae getMae() {
		return mae;
	}

	public void setMae(Mae mae) {
		this.mae = mae;
	}
	
	
}
