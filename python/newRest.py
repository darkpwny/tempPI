import urllib
import urllib2

url = 'http://xxxxxxx'
params = urllib.urlencode({
  'Sensor': 'Garden',
  'Temperature': '12'
})
response = urllib2.urlopen(url, params).read()
print(response)

