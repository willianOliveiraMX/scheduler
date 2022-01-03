# Scheduler Message API - Magalu**

Para utilizar o sistema basta clonar o repositório e rodar localmente. É possível fazer isso através da instalação das dependências localmente ou com o docker.

Se a sua escolha for rodar localmente através do docker, basta seguir os seguintes passos:


## Rodando localmente com docker

Primeiro verifique sua instalação do docker e docker-compose através dos comandos - --abaixo. 
- **docker -v**
- **docker-compose -v**
- Caso não tenha um dois software instalados, por favor instale através do site Empowering App Development for Developers | Docker
- Então por fim rode a API executando o seguinte comando na pasta principal do projeto. 
**docker-compose up**


## Rodando localmente 

*Caso não queira utilizar o docker siga os passos a seguir:*
-   verifique a instalação do node
    
-   instale as dependências do projeto utilizando `npm install`
    
-   instale o banco de dados postgreSQL
    
-   utilize o arquivo .env_example e crie um novo arquivo .env com as credenciais do seu banco de dados local
    
-   rode na pasta principal do projeto os comandos a seguir
    

-   `npm run migration`
    
-   `npm run seed` (opcional) - este comando irá gerar alguns dados no banco de dados
    
-   `npm run start:dev`

**Após seguir os passos descritos acima, a aplicação deverá rodar localmente através do endereço [http://localhost:5000](http://localhost:5000) na porta 5000.**

## Utilizando a API
A API possui dois domínios principais, addressee que lida com os destinatários e schedulerMessage responsável pelas mensagens.

**Endpoints**:
endpoint: /create/schedulerMessage
método: POST
descrição: Através desse endpoint é possível agendar uma mensagem a ser enviada.  

Exemplo de objeto a ser enviado:

{

	"text": "Lorem impsum.",
	"timeToSend": "Sat Jan 03 2022 14:00:00 GMT-0300 (Horário Padrão de Brasília)",
	"addresseeIds": [1],
	"communicationTypeId": 3
	
}

Text:  É o texto da mensagem a ser enviado.

TimeToSend: deve ser a data e a hora que a mensagem será enviada.

AddresseeIds: pode receber uma lista de ids de destinatários previamente cadastrados.

CommunicationTypeId: pode receber o ID do tipo de comunicação previamente cadastrado. Como valores padrão, o banco de dados iniciará com os seguintes valores.

| ID |Description|
|----|-----------|
| 1  |Email      |
| 2  |SMS        |
| 3  |Push       |
| 4  |Whatsapp   |


**endpoint**: /consulting/schedulerMessage/{messageId}

método: GET

descrição: Retorna as informações referentes a uma mensagem específica cadastrada previamente. Recebendo como argumento um ID válido.

  
**Exemplo de retorno:**
{
"content": 
      {

	 "messageId": 3,
	"text": "Quadros super legais com 99% de desconto",
	"timeToSend": "2022-01-03T17:00:00.000Z",
	"status": "waiting",
	"messageType": "email",
	"addressees": [
        {
        "id": 1,
        "messageId": 3,
        "addresseeId": 1,
        "name": "luiz",
        "lastName": "ribeiro",
        "email": "luiz.ribeiro@yahoo.com.br",
        "phoneNumber": "11910203040",
        "pushUserId": "z2345678",
        "isValid": true,
        "created_at": "2022-01-02T22:44:02.277Z",
        "updated_at": null
        }
    ]
    }
}


No objeto temos as informações de status da mensagem, que pode variar entre "waiting", "sended" e "canceled". Do tipo da mensagem e as informações dos destinatários selecionados. Entre outras informações referente a mensagem.

**endpoint:** /cancel/schedulerMessage

método: PUT

descrição: Aqui podemos alterar o status da mensagem cadastrada para “canceled”, assim informando para um futuro serviço que a mensagem não pode ser mais enviada.

No corpo da requisição deve constar um objeto com o ID da mensagem a ser cancelado. 

Como no exemplo a seguir:
{

	"messageId": 2

}

**endpoint:** /create/addressee

método: POST

descrição: É possível adicionar manualmente um novo destinatário através desse endpoint.


Exemplo do corpo da requisição:


{

    "name": "dagoberto",
    
    "lastName": "pereira",
    
    "email": "dagoberto.pereira@gamil.com.br",
    
    "phoneNumber": "11910203040",
    
    "pushUserId": "12c45678"
    
}

Além do nome e sobrenome, é necessário enviar um email válido e único na base de dados, número de telefone celular com o DDD sem espaços ou caracteres especiais. O pushUserId deve ser composto por 8 caracteres alpha número e não pode ser repetido na base de dados.

**endpoint:** /list/addressee/?page={pageNumber}

método: GET

descrição: Lista dos destinatários registrados. Cada página retorna dez registros.



Exemplo de retorno:

{

"content": [

    {

    "id": 1,
    "name": "luiz",
    "lastName": "ribeiro",
    "email": "luiz.ribeiro@yahoo.com.br",
    "phoneNumber": "11910203040",
    "pushUserId": "z2345678",
    "isValid": true,
    "created_at": "2022-01-02T22:44:02.277Z",
    "updated_at": null
    },
    {

    "id": 2,
    "name": "felipe",
    "lastName": "gonçalves",
    "email": "lip.jandirao@gamil.com.br",
    "phoneNumber": "11910203040",
    "pushUserId": "1b345678",
    "isValid": true,
    "created_at": "2022-01-02T23:40:56.802Z",
    "updated_at": null
    },

    {

    "id": 3,
    "name": "dagoberto",
    "lastName": "pereira",
    "email": "dagoberto.pereira@gamil.com.br",
    "phoneNumber": "11910203040",
    "pushUserId": "12c45678",
    "isValid": true,
    "created_at": "2022-01-02T23:41:26.650Z",
    "updated_at": null
    },
]}

## Testes unitários:
Rode os testes automatizados com o seguinte comando:
-   `npm run test`
