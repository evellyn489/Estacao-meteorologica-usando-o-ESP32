#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define SERVER_IP ""
#define SERVER_PORT 3000

#define DHT_PIN 4 // Pino do sensor DHT11

DHT dht(DHT_PIN, DHT11);

void setup() {
  Serial.begin(115200);

  // Conectar-se à rede Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Conectado ao Wi-Fi");

  dht.begin();
}

void loop() {
  // Ler temperatura e umidade do sensor DHT11
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  // Verificar se a leitura do sensor é válida
  if (!isnan(temperatura) && !isnan(umidade)) {
    // Enviar dados para o servidor
    HTTPClient http;
    String url = "http://" + String(SERVER_IP) + ":" + String(SERVER_PORT) + "/data";
    http.begin(url);

    // Montar os dados em formato JSON
    String dadosJSON = "{\"temperatura\":" + String(temperatura) + ",\"umidade\":" + String(umidade) + "}";

    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(dadosJSON);

    if (httpResponseCode > 0) {
      Serial.print("Resposta do servidor: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Erro na requisição HTTP: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("Falha na leitura do sensor.");
  }

  // Aguardar um intervalo antes da próxima leitura
  delay(60000); // Leitura a cada 60 segundos
}