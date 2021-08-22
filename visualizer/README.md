# Visualizer 
Group 8
DIT355 Mini project

## Installation and set up

Clone the repository by entering the following the command into the terminal: 
```
git clone git@git.chalmers.se:courses/dit355/2019/group-8/visualizer.git
```
Navigate to the client and install dependencies: 
```
cd visualizer/client
npm install
```
Configure the topic, port and ip:
```
echo "requests" | tr -d '\n' > topic.txt
echo "8001" | tr -d '\n' > port.txt
echo "localhost" | tr -d '\n' > ip.txt

# To check it has been updated e.g the topic:
cat topic.txt
```
Start the server
```
npm run serve
```


## Explanation of valid arguments:
**PORT**: sets the port to the given argument. If no argument is given, then the port is set to the default value that is 8001.

**TOPIC**: The topic that we publish to. Changes the topic to the given argument. If no argument is provided, then we use that default value which is “requests”.

**IP**: Sets the IP address to the given argument. If no argument is provided, then we set it to the default value which is “localhost”.

Publisher will run even when the program are given arguments that are not valid or values that will make the publisher not connect to anything. It is up to the user to specify the correct arguments. 


## About the subscription
This component subscribes to the topic:
- **requests** - this receives randomly generated trip requests, filtered to make sure that they are in Gothenburg and on land.
Green Markers: origin of the trip\
Blue Markers: destination of the trip


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Additional commands
Project setup
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

 Compiles and minifies for production
```
npm run build
```

 Lints and fixes files
```
npm run lint
```
## User Instructions
1. On the Map page, there are two modes for the map; Data driven mode and Interactive mode
2. The default mode is Data driven mode, where user can not zoom or move the map. Here, the map will update according to the requests received.
3. User can click the toggle button to switch to Interactive mode.
3. In Interactive mode, user can zoom and move the map. There is a option menu, where user can choose to view requests of different purposes. User can also click the toggle button to switch back to Data driven mode.

## Configure Mosquitto WebSocket

### Mac OS
1. Install Mosquitto: 
```
brew install mosquitto
```
2. Find the file: 
```
/usr/local/etc/mosquitto/mosquitto.conf
```
3. Add the lines at the end of the .conf file
```
listener 1883
protocol mqtt
listener 8001
protocol websockets
```
4. Restart the mosquitto:
```
brew services restart mosquitto
```
#### Notes:
How to find /usr file: https://macpaw.com/how-to/access-usr-folder-mac

### Notes for 'subsciber' machine
1. Connect to the same wifi (using one mobile phone's hotspot) of other machines
2. Run mosquitto (only this machine needs to do this)
