// hexa.ino

void setup() {
  Serial.begin(115200);
}

void loop() {
  handleWifiMode(2);

  delay(10);  // debounce switch state changes
}
