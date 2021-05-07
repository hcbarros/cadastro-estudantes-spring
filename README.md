# cadastro-estudantes-spring

Trata-se de uma aplicação utilizando o framework Spring Boot (Java) para criar a API (branch main), 
e a biblioteca do React para a inteface gráfica e consumo da API (branch react).

O usuário pode criar, editar e deletar estudante com as seguintes informações:

- nome, data de nascimento, série de ingresso
- Endereço
- Dados da mãe

A aplicação exibe uma lista paginada de todos os estudantes.

Endpoint base -> http://localhost:8080/estudante

Possui os seguintes verbos:

GET/list/{page}\
GET/{id}\
GET/count\
POST/\
PUT/{id}\
DELETE/{id}

Também pode ser acessada por meio da URL :
### https://cadastro-estudantes.herokuapp.com/estudante/

Para testar toda a aplicacao e so acessar a seguinte URL: 
### https://estudantes-react.herokuapp.com/

Para executar o projeto Java, usando a linha de comando, 
deve-se digitar: mvn clean install, em seguida: mvn spring-boot:run

Para executar o projeto React, é só digitar na raiz do projeto:
npm install, e em seguida, npm start

**É importante que se utilize o java na versao 11.
