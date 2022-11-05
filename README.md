# Node.js RabbitMQ

## Sobre
Projeto feito para estudar mensageria utilizando a ferramenta RabbitMQ com o tipo de exchange topic.
### Explicando o projeto
O projeto simula o processamento do recebimento de "orders" ou de compras finalizadas do ambiente online e offline (loja física) de uma grande empresa, e a partir desse cenário enviar para serviços de persistência e para a criação do PDF e posterior envio por e-mail somente do ambiente online, onde ocorre a maioria das vendas, neste caso com 2 consumidores.
Como essas funções podem ser processadas de forma assíncrona, a mensageria pode ser utilizada para evitar gargalos, facilitando a escalabilidade caso seja necessário, sem prejudicar os processamentos mais demorados como a criação de PDFs.
Sendo demonstrado nas imagens abaixo.


## Rodando o projeto
Inicie seu servidor RabbitMQ e configure o `.env` com suas credenciais ou execute 
usando o Docker com o comando abaixo e utilize a credencial do `.env.example`
```bash
docker-compose up -d rabbitmq
```
Instale as dependencias
```bash
npm install
```
Executando a API no modo desenvolvedor
```bash
npm run dev
```

Executando os Consumers no modo desenvolvedor. Observação: inicie cada consumer em um terminal separado.
```bash
npm run consumer:orders
```
```bash
npm run consumer:pdfa
```
```bash
npm run consumer:pdfb
```
Caso prefira pode rodar todos os serviços usando somente o docker-compose, utilize o comando:
```bash
docker-compose up
```
Os endpoints para execução estão no arquivo `requests.http` e caso tenha a extensão do VSCode chamada "REST Client" pode enviar a request diretamente por ele.
```bash
### Sending 30 orders to rabbitmq, 19 online for pdf consumer
GET http://localhost:3000/api/publish/samples

### Send a message using type online
POST http://localhost:3000/api/publish
Content-Type: application/json

{
    "data": {
        "type": "online",
        "message": "testing"
    }
}

### Send a message using type offline
POST http://localhost:3000/api/publish
Content-Type: application/json

{
    "data": {
        "type": "offline",
        "message": "testing"
    }
}
```