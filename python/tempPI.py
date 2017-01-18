import os
import glob
import time
import datetime
import urllib
import urllib2

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
 
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
url = 'http://dockeriot.cloudapp.net:5000/iot' 
seconds = 5

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

while True:
	tempval = str(read_temp()) 
	json = "[ { 'datetime' : '" + datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "', 'temperature' : '" + tempval +"'}]"
	print(json)
	send_data('PI',tempval)
	time.sleep(seconds)

// TODO : Host as sensorname, variable timesetting (poss pull from rest? - if not there create default etc) - why is pi loosing wifi all the time?
