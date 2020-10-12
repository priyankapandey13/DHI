# DHI
Short assignment for DHI

# Requirement
create a simple React web app that showcases data in physical space (on a map) as well as time (as in changes over time on a graph) in an informative way. This will be used to provide a resident of the city of Copenhagen with insights relevant to their life in the city

# Design consideration:  

1) For designing the UI I have used Material UI. They have React components for faster and easier web development with beautiful UI.
2) To have the real world data for map I have used Opendata.dk api. Open Data DK is an association of Danish municipalities and regions and they have open their data, i.a. on a common open data portal .
3) For the second requirements I needed different type of data which can be updated frequently, like weather. For that I have used MET Weather API.
4) For showing map I have used Mapbox-gl.
5) And, for the graphs I used Recharts.
5) I then used React with functional components(Space, Mapapi, Time) and hooks(UseState, UseEffect). To fetch and filter the data and input feed it to the Mapbox and Recharts.

# How to run this app:
1) First you need to clone this repository in your local machine.
2) Run "npm install" to install npm with other dependencies.
3) Run "npm start".

# Open Issues:
1) Integration pending with map marker.
2) Page alignment 
3) Input location for updated graph details.