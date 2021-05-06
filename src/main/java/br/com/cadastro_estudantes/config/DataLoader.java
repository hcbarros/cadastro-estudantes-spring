package br.com.cadastro_estudantes.config;

import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.List;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

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
			
			long pay = LocalDateTime.now().atZone(ZoneId.systemDefault())
										.toInstant().toEpochMilli() + 864000000;
			Date datePay = new Date(Long.valueOf(""+pay));
			
			
			Endereco endereco = new Endereco("52041-170", "Rua Fernando César", 65, 
					null, "Encruzilhada", "Recife", "PE");
			Mae mae = new Mae("Andrea Curie","540.571.030-07", datePay);
			Estudante e1 = new Estudante("Marie Curie", new Date(Long.valueOf("-3234470400000")), 3 , endereco, mae);
			
			endereco = new Endereco("58042-110", "Rua Vandick Pinto Filho Filgueiras", 601, 
					"Apt. 102", "Tambauzinho", "João Pessoa", "PB");
			mae = new Mae("Maria Einstein","790.474.960-27", datePay);
			Estudante e2 = new Estudante("Albert Einstein", new Date(Long.valueOf("-2865456000000")), 3 , endereco, mae);

			endereco = new Endereco("57020-050", "Rua Cincinato Pinto", 265, 
					null, "Bairro do Centro", "Maceió", "AL");
			mae = new Mae("Maria Galilei","793.942.280-47", datePay);
			Estudante e3 = new Estudante("Galileu Galilei", new Date(Long.valueOf("-12808281600000")), 3 , endereco, mae);
			
			endereco = new Endereco("57020-050", "Rua Cincinato Pinto", 265, 
					null, "Bairro do Centro", "Maceió", "AL");
			mae = new Mae("Maria Newton","476.588.560-70", datePay);
			Estudante e4 = new Estudante("Isaac Newton", new Date(Long.valueOf("-10319702400000")), 3 , endereco, mae);

			endereco = new Endereco("49060-000", "Av. Coelho e Campos", 1300, 
					"Bloco A", "Getúlio Vargas", "Aracaju", "SE");
			mae = new Mae("Maria Hawking","480.089.940-02", datePay);
			Estudante e5 = new Estudante("Stephen William Hawking", new Date(Long.valueOf("-883008000000")), 3 , endereco, mae);
			
			endereco = new Endereco("59063-380", "Rua Sérgio Severo", 2037, 
					null, "Lagoa Nova", "Natal", "RN");
			mae = new Mae("Maria Bohr","419.122.010-11", datePay);
			Estudante e6 = new Estudante("Niels Henrik David Bohr", new Date(Long.valueOf("-2654553600000")), 3 , endereco, mae);
			
			endereco = new Endereco("60120-013", "Av. Barão de Studart", 505, 
					null, "Meireles", "Fortaleza", "CE");
			mae = new Mae("Maria Faraday","992.320.840-07", datePay);
			Estudante e7 = new Estudante("Michael Faraday", new Date(Long.valueOf("-5625849600000")), 3 , endereco, mae);
			
			endereco = new Endereco("41194-015", "Rua Ivonne Silveira", 213, 
					null, "Doron", "Salvador", "BA");
			mae = new Mae("Maria Franklin","464.282.970-94", datePay);
			Estudante e8 = new Estudante("Rosalind Elsie Franklin", new Date(Long.valueOf("-1560124800000")), 3 , endereco, mae);
			
			endereco = new Endereco("30441-194", "Av. Raja Gabaglia", 1626, 
					null, "Gutierrez", "Belo Horizonte", "MG");
			mae = new Mae("Maria Darwin","063.764.970-20", datePay);
			Estudante e9 = new Estudante("Charles Robert Darwin", new Date(Long.valueOf("-5077036800000")), 3 , endereco, mae);
			
			endereco = new Endereco("04546-001", "Rua Casa do Ator", 294, 
					null, "Vila Olímpia", "São Paulo", "SP");
			mae = new Mae("Maria King","637.299.050-40", datePay);
			Estudante e10 = new Estudante("Augusta Ada Byron King", new Date(Long.valueOf("-4861728000000")), 3 , endereco, mae);
			
			endereco = new Endereco("16201-013", "Rua Silvares", 509, 
					null, "Patrimônio Silvares", "Birigüi", "SP");
			mae = new Mae("Maria Tesla","168.002.550-33", datePay);
			Estudante e11 = new Estudante("Nikola Tesla", new Date(Long.valueOf("-3581020800000")), 3 , endereco, mae);
			
			endereco = new Endereco("16074-160", "Rua Paraíso", 1738, 
					null, "Boa Vista", "Araçatuba", "SP");
			mae = new Mae("Maria Tesla","168.002.550-33", datePay);
			Estudante e12 = new Estudante("Cesare Mansueto Giulio Lattes", new Date(Long.valueOf("-1435104000000")), 3 , endereco, mae);
			
			endereco = new Endereco("13088-851", "Avenida Esther Moretzshon Camargo", 1826, 
					null, "Jardim Nilópolis", "Campinas", "SP");
			mae = new Mae("Maria Crick","721.853.710-37", datePay);
			Estudante e13 = new Estudante("Francis Harry Compton Crick", new Date(Long.valueOf("-1690416000000")), 3 , endereco, mae);
			
			endereco = new Endereco("13400-853", "Av. Dr. Paulo de Morais", 555, 
					"Sala 20", "Paulista", "Piracicaba", "SP");
			mae = new Mae("Maria Edison","063.601.290-51", datePay);
			Estudante e14 = new Estudante("Thomas Alva Edison", new Date(Long.valueOf("-3877977600000")), 3 , endereco, mae);			
			
			endereco = new Endereco("20031-905", "Rua México", 41, 
					"10º andar", "Centro", "Rio de Janeiro", "RJ");
			mae = new Mae("Maria Goble","402.860.010-39", datePay);
			Estudante e15 = new Estudante("Katherine Coleman Goble Johnson", new Date(Long.valueOf("-1620518400000")), 3 , endereco, mae);
			
			endereco = new Endereco("25625-290", "Rua Buarque de Macedo", 128, 
					null, "Centro", "Petrópolis", "RJ");
			mae = new Mae("Maria Watson","636.993.460-72", datePay);
			Estudante e16 = new Estudante("James Dewey Watson", new Date(Long.valueOf("-1317168000000")), 3 , endereco, mae);
			
			endereco = new Endereco("80020-180", "Rua Barão do Serro Azul", 316, 
					null, "Centro", "Curitiba", "PR");
			mae = new Mae("Maria Babbage","166.665.050-18", datePay);
			Estudante e17 = new Estudante("Charles Babbage", new Date(Long.valueOf("-5617641600000")), 3 , endereco, mae);
			
			endereco = new Endereco("89012-000", "Rua São Paulo", 1302, 
					"Sala 07", "Victor Konder", "Blumenau", "SC");
			mae = new Mae("Maria Mendeleev","516.686.190-67", datePay);
			Estudante e18 = new Estudante("Dmitri Ivanovic Mendeleev", new Date(Long.valueOf("-4288464000000")), 3 , endereco, mae);

			endereco = new Endereco("88020-901", "Rua Álvaro Millen da Silveira", 208, 
					"Torre 02", "Centro", "Florianópolis", "SC");
			mae = new Mae("Maria Chagas","574.203.420-24", datePay);
			Estudante e19 = new Estudante("Carlos Ribeiro Justiniano das Chagas", new Date(Long.valueOf("-2855347200000")), 3 , endereco, mae);
			
			endereco = new Endereco("90010-140", "Rua Uruguai", 155, 
					"4º andar", "Centro", "Porto Alegre", "RS");
			mae = new Mae("Maria Pasteur","491.135.100-45", datePay);
			Estudante e20 = new Estudante("Louis Pasteur", new Date(Long.valueOf("-4639334400000")), 3 , endereco, mae);
			
			endereco = new Endereco("79011-450", "Rua São João Bosco", 49, 
					null, "Monte Castelo", "Campo Grande", "MS");
			mae = new Mae("Maria Lavoisier","028.596.940-48", datePay);
			Estudante e21 = new Estudante("Antoine-Laurent de Lavoisier", new Date(Long.valueOf("-7142947200000")), 3 , endereco, mae);
			
			endereco = new Endereco("78060-900", "Av. Fernando Correa da Costa", 2367, 
					null, "Boa Esperança", "Cuiabá", "MT");
			mae = new Mae("Maria Lutz","112.142.430-96", datePay);
			Estudante e22 = new Estudante("Adolfo Lutz", new Date(Long.valueOf("-3598732800000")), 3 , endereco, mae);

			endereco = new Endereco("69025-010", "Av. Ferreira Pena", 1109, 
					null, "Centro", "Manaus", "AM");
			mae = new Mae("Maria Copérnico","780.339.490-66", datePay);
			Estudante e23 = new Estudante("Nicolau Copérnico", new Date(Long.valueOf("-15679526400000")), 3 , endereco, mae);
			
			endereco = new Endereco("69900-078", "Av. Brasil", 402, 
					null, "Centro", "Rio Branco", "AC");
			mae = new Mae("Maria Cruz","881.490.570-30", datePay);
			Estudante e24 = new Estudante("Oswaldo Gonçalves Cruz", new Date(Long.valueOf("-3073852800000")), 3 , endereco, mae);
			
			endereco = new Endereco("29050-260", "Rua Eng. Guilherme José Monjardim Varejão", 225, 
					"Ed. Enseada Plaza", "Enseada do Suá", "Vitória", "ES");
			mae = new Mae("Maria Freud","226.998.750-07", datePay);
			Estudante e25 = new Estudante("Sigmund Schlomo Freud", new Date(Long.valueOf("-3586636800000")), 3 , endereco, mae);
			
			List<Estudante> list = Arrays.asList(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,
										e14,e15,e16,e17,e18,e19,e20,e21,e22,e23,e24,e25);
			
			repo.saveAll(list);					
			
		};
	}

}