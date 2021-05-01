package br.com.cadastro_estudantes.controller.response;

import java.util.Arrays;
import java.util.List;

public class ResponseError {
	
	private List<String> erros;
	private String message;
	
	public ResponseError(List<String> erros) {
		super();
		this.erros = erros;
	}
	
	public ResponseError(String message, String error) {
        super();        
        this.message = message;
        erros = Arrays.asList(error);
    }

	public List<String> getErros() {
		return erros;
	}

	public void setErros(List<String> erros) {
		this.erros = erros;
	}

}