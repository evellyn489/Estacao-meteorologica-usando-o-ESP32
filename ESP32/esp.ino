#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define SERVER_IP ""
#define SERVER_PORT 3000

#define DHT_PIN 4 

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
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (!isnan(temperatura) && !isnan(umidade)) {
    HTTPClient http;
    String url = "http://" + String(SERVER_IP) + ":" + String(SERVER_PORT) + "/data";
    http.begin(url);

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

  delay(60000); 
}