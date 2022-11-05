<p align="center">
  <img src="https://user-images.githubusercontent.com/64763336/200126795-635b0ffe-e947-404a-97f7-d178f27659a5.png" width=800 alt="banner mensageria" />
</p>
# Node.js RabbitMQ

## Sobre!
Projeto feito para estudar mensageria utilizando a ferramenta RabbitMQ com o tipo de exchange topic.  

### Explicando o projeto
<table>
<tr>
 <td valign="top"><p align="left">
O projeto simula o processamento do recebimento de "orders"  
ou de compras finalizadas do ambiente online e offline (loja física) de uma grande empresa, e a partir desse cenário enviar para serviços de persistência e para a criação do PDF e posterior envio por e-mail somente do ambiente online, onde ocorre a maioria das vendas, neste caso com 2 consumidores.</p
   
   ><p align="left">Como essas funções podem ser processadas de forma assíncrona, a mensageria pode ser utilizada para evitar gargalos, facilitando a escalabilidade caso seja necessário, sem prejudicar os processamentos mais demorados como a criação de PDFs.</p>
   
   <p align="left">A exchange topic faz o envio das mensagens para as filas de acordo com as "routing key" passadas pelo producer, sendo possível utilizar máscaras como # ou *, e as filas por sua vez direciona para o consumer apropriado, que pode ser mais de um como no exemplo criado.  
     Sendo demonstrado nas imagens abaixo.
 </p>
 </td>
 <td><img src="https://user-images.githubusercontent.com/64763336/200126889-61fc6525-6500-4cf2-8fca-d11f098fa326.png" width=1804 alt="fluxo mensageria" /></td>
</tr>
</table>

    
<table>
<tr>
 <th scope="col">simulação de online orders sendo enviadas para ambos tipos consumers</th>
 <th scope="col">simulação de offline orders sendo enviada apenas para o consumer de persistência de dados</th>
</tr>
<tr>
 <td><img src="https://user-images.githubusercontent.com/64763336/200126923-74370635-c753-4d38-b2ac-73d13ba56b65.gif"  alt="banner mensageria" /></td>
 <td><img src="https://user-images.githubusercontent.com/64763336/200126925-11d81444-82cf-4373-935f-f46e8af7bf74.gif"  alt="banner mensageria" /></td>
</tr>
</table>

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
