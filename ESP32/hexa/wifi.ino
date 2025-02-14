// wifi.ino
#include <WiFi.h>

int currentState = 0;  // 0 disconnected, 1 wifi, 2 ap

const char* ssid = "VM0467470";
const char* password = "2xfTtrp7fyVpvzka";

void connectToWiFi() {
  Serial.println();
  Serial.print("Connecting to wifi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
void disconnectWifi() {
  Serial.print("Disconnecting");
  WiFi.disconnect();
  while (WiFi.status() != WL_DISCONNECTED) {
    delay(1000);
    Serial.println(".");
  }

  Serial.println("");
  Serial.print("Disconnected from ");
  Serial.println(ssid);
}

void startAP(const char *ssid, const char *password) {
  Serial.print("Access Point Starting: ");
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);
  Serial.print("Access Point started with SSID: ");
  Serial.println(ssid);
}
void stopAP() {
  WiFi.disconnect();
  Serial.println("Access Point stopped.");
}

void handleWifiMode(const int pin) {
  int switchState = digitalRead(pin);  // assume pin 2 is connected to the switch

  if (switchState == HIGH) {  // switch in access point mode position
    if (currentState != 2) {  // Only toggle state when it's different from current state
      if (currentState == 1){
        disconnectWifi();
      }
      startAP("ESP32-AP", "your-password");
      currentState = 2;  // Set state to ap
    }
  } else {  // switch in wifi mode position
    if (currentState != 1) {  // Only toggle state when it's different from current state
      if (currentState == 2){
        stopAP();
      }
      connectToWiFi();
      currentState = 1;  // Set state to wifi
    }
  }
}