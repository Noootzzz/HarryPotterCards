import network   #import des fonction lier au wifi
import urequests#import des fonction lier au requetes http
import utime#import des fonction lier au temps
import ujson#import des fonction lier aà la convertion en Json

from machine import Pin, PWM
import time

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'Galaxy S20 FE 5GB20E'
password = 'mo2pass2222'
wlan.connect(ssid, password) # connecte la raspi au réseau
#url = "https://hp-api.lainocs.fr/characters" #tous les persos
#url = "https://hp-api.lainocs.fr/characters/harry-potter" #un seul perso en particulier
url = "http://192.168.69.234:3000" #téléphone 4g   IP:PORT


#dictionnaire des couleurs des maisons
houses = {"Gryffindor":(255,0,0),"Slytherin":(0,255,0),"Ravenclaw":(0,0,255),"Hufflepuff":(255,255,0)}

led_pins = [17, 18, 19]  # broches GPIO connectées aux LED (rouge, vert, bleu)
leds = []

for i in leds:
    i.frq(0)
    i.duty_u16(0)
    
# initialise les broches GPIO des LED en mode sortie
for pin in led_pins:
    leds.append(PWM(Pin(pin, mode=Pin.OUT)))

def off() :
    for i in leds:
        i.duty_u16(0)
        

def setColor(house_color):
    for led, color_value in zip(leds, house_color):
        led.duty_u16(color_value * 100)
        

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        
        print("GET")
        r = urequests.get(url) # lance une requete sur l'url
        print(r.json()["message"])
        color = r.json()["message"]
        #print(r.json()["name"]) # traite sa reponse en Json #info d'un seul perso
        setColor(houses[color])
        r.close() # ferme la demande
        utime.sleep(1)  
    except Exception as e:
        print(e)
