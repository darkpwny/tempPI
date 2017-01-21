import os
import glob
import time
import datetime
import urllib
import urllib2
import json

 
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

url = 'http://xxxxxxxxx:5000/iot'
sensorPath = '/Sensors/'
seconds = 0
lastCheckedTime = 0
host_name = os.uname()[1]

def init():
    global host_name
    f = open('sensor_name')
    lines = f.read()
    host_name = str.rstrip(lines, '\n')
    getTime();
    os.system('modprobe w1-gpio')
    os.system('modprobe w1-therm')
    base_dir = '/sys/bus/w1/devices/'
    device_folder = glob.glob(base_dir + '28*')[0]
    device_file = device_folder + '/w1_slave'
    return;

def getTime():
    global seconds;
    global lastCheckedTime;
    a = json.load(urllib2.urlopen(url + sensorPath + host_name));
    b = json.loads(a)
    seconds = b['time']
    lastCheckedTime = 1
    return;

def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        return temp_c

def send_data(name,temp):
	params = urllib.urlencode({
  		'Sensor': name,
  		'Temperature': temp
	})
	return urllib2.urlopen(url, params).read()

def mainloop():
    global lastCheckedTime
    while True:
        lastCheckedTime = lastCheckedTime + seconds

        #print("Delay:")
        #print(seconds)
        #print("Last Updated Delay:")
        #print (lastCheckedTime)

        #tempval = 30
        tempval = str(read_temp())

        send_data(host_name, tempval)
        if lastCheckedTime >= 60:
            getTime()
        #print("Sleeping")
        time.sleep(seconds)

init()
mainloop()
