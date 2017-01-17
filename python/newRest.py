import urllib
import urllib2

url = 'http://xxxxxxx'
params = urllib.urlencode({
  'Sensor': 'Car',
  'Temperature': '11'
})
response = urllib2.urlopen(url, params).read()

print(response)

