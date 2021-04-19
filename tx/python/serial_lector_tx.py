from socketIO_client import SocketIO
import serial
import time

print("Comenzando...")
socketIO = SocketIO('localhost', 5001)
print("Conectado al servidor.")

arduino=serial.Serial('COM6',9600, timeout = 3.0) #Linux: /dev/ttyUSBn
arduino.isOpen()
while True:
    arduino.write("s".encode())
    sig = arduino.readline().strip()
    sig = int(sig)
    #sig = str(input ("Value: "))
    if not sig:
        continue
    print(sig)
    socketIO.emit("nuevo_mensaje",sig)
    time.sleep(0.1)

arduino.close()
