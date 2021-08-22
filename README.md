# VisualPublicTransportationAnalysisTool
This project was created for the course DIT355 Distributed System Development / University of Gothenburg. Initially the project was on GitLab and then migrated to GitHub. The idea of the project is to analyze the bottlenecks and the blind spots for the public transport system of the Gothenburg region in Sweden. The project uses the publish subscribe / pipe and filter architecture patterns and uses Västtrafik, VueGoogle maps, Location IQ and onWater APIs. The project has a component that generates random coordinates simulating traffic in certain times. The data is broadcasted over MQTT to a subscriber that checks if the generated coordinates are in Gothenburg and on land. The data is broadcasted over MQTT again to a subscriber which is a web app. The visualization of the data is done by the web app that shows the bottlenecks and the blind spots. More detailed explanation about the project and the software architecture is written in the Documentation.

# The team
* Emad Kikuni
* Erik Tingström
* Florence Afolabi
* George Karageozian
* Kaijie Xiong
* Xuni Huang


