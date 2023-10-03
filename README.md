# Weather Station
## Projeto

<p>O projeto teve como principal objetivo foi a criação de uma estação meteorológica utilizando o ESP-32 em conjunto com o sensor de temperatura DHT11 para que pudesse monitorar a temperatura e umidade do ambiente. Para isso, criamos uma página com ReactJS que mostrar a temperatura e um gráfico demonstrando tendências de umidade e temperatura ao longo do tempo, além disso utilizamos o arduíno IDE para a obtenção desses valores para que em seguida pudessemos enviar esses resultados para o front-end.</p>

## Materiais necessários

<ul>
  <li>Protoboard</li>
  <li>ESP-32</li>
  <li>Sensor de temperatura (DHT11)</li>
  <li>Jumpers</li>
  <li>Cabo Micro USB</li>
</ul>

## Dependências do projeto

<ul>
  <li>Node 18^</li>
  <li>ESP-32 Framework</li>
</ul>


## Montagem do ESP-32

<img src="./src/images/image1.jpg"> 
<img src="./src/images/image2.jpeg"> 

A montagem do circuito foi feita da seguinte forma:
<ol>
  <li>Conectamos o ESP-32 na protoboard</li>
  <li>Conectamos o sensor na protoboard, se atentando a posição dele, o qual deve estar virado ao lado direito do ESP32, como mostra na foto acima</li>
  <li>Fizemos as conexões com os cabos jumpers: Pino VCC, Data e GND do sensor aos pinos 3V3, D4 e GND da placa ESP32, respectivamente</li>
</ol>

## Instruções para rodar o projeto localmente

Clone o repositório utilizando ´git clone´, em seguida rode o comando "npm install" para instalar todas as depedências do backend do projeto, acesse o diretorio "src/api" e rode "node server.js" em seguida na pasta "src" rode o frontend com npm run dev.

## Desenvolvimento do projeto

### Início
<ul>
  <li>Para iniciar, instalarmos os pacotes necessários para o funcionamento correto do equipamento.</li>
  <li>Em seguida, decidimos executar o projeto mostrado em sala com o objetivo de testar o funcionamento do ESP-32.</li>
  <li>Depois, fizemos um código mais simples para obter a temperatura e umidade com o objetivo de testar o funcionamento do sensor.</li>
  <li>Logo de início obtivemos alguns problemas para obter o valor da temperatura e umidade devido ao posicionamento incorreto do sensor na protoboard.</li>
  <li>Mas antes disso, fizemos vários testes com os jumpers e posicionamento do ESP-32 com o intuito de encontrar o erro</li>
  <li>Além disso, começamos a fazer o projeto no simulador Wokwi, mas encontramos novos erros estavam relacionados a requisição dos dados</li>
  <li>Ao ajustarmos o sensor, conseguimos obter os valores e concluir o teste de funcionamento dos equipamentos.</li>
</ul>

### Desenvolvimento

<ul>
  <li>Começamos criando a página web com ReactJS</li>
  <li>Utilizamos o arduínio IDE para desenvolver os códigos responsáveis pela obtenção da temperatura e umidade</li>
  <li>Criamos um server.js para que o ESP-32 pudesse enviar os dados que obteve do sensor</li>
  <li>Com os dados, atualizamos a página web</li>
</ul>
