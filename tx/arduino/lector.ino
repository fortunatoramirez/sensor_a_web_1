int pinA0 = A0;
int val;
char car;

void setup() {
 Serial.begin(9600);
}

void loop() {
  if(Serial.available()>0)
  {
    car = Serial.read();
    if(car == 's')
    {
      val = analogRead(pinA0);
      Serial.println(val);
    }
  }
}
