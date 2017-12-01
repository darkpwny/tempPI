Contents:
PI code:
Python script to pull config for itself from cloud (nodeJS service) which sets up the delay/timing for the temp reads. Then goes into loop doing read and posting to nodeJS service.
Also included is systemD config file to start/stop the python script on boot.

Server Side code:
NodeJS site:
Has basically 2 operations - one to accept reads and post to influx time series DB and the other to respond to the temp sensor doing a get to pull down config.

Influx DB:
Is designed to run in docker image. There is config file for it in the repository and a systemD service file to start the docker image etc. Take a look at the systemD file to understand paths

Graphana:
Is the gui. Check it out at http://dockeriot.cloudapp.net- all the readings are back in JAN 2017, so you may need to move the window to that point to get data.
There are config files for this in the repository and like Influx is desgined to run as a docker image.
See the systemD file for graphana for filepaths and further info
