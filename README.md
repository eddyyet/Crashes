# Traffic Crashes in Chicago - Data Visualization

![Python Badge](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=flat-square)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat-square)
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat-square)
![D3.js Badge](https://img.shields.io/badge/D3.js-F9A03C?logo=d3dotjs&logoColor=fff&style=flat-square)
![Leaflet Badge](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=fff&style=flat-square)

Available at https://crashes.vercel.app

<img src='./public/preview.jpg'>

Data visualization of traffic crashes identifies patterns and trends, which helps prevent accidents and save lives. In a city as busy as Chicago, traffic crashes are unfortunately common, and understanding the data is crucial to improve traffic safety.

This project showcases the use of Python for data processing and React with various visualization packages, including Nivo (based on D3), Vis.js, and Leaflet. It demonstrates the power of combining data processing and visualization to find effective solutions for complex real-life problems.

> This is a course project for MSBD5005 Data Visualization in The Hong Kong University of Science and Technology (HKUST) in Spring 2022-23.
<br />

## Data visualization

The raw data files (refer to the session "Source of data, map engine and images") are combined and pre-processed with Python in `./src/data/data_slicing.ipynb`. The data are loaded into the React application and aggregated by `./src/utils/filter.js` according to the selected year range and region, and then transformed to meet chart-specific requirements.

The following visualizations are implemented:
- Map (Choropleth) with crash rate (per 1000 people per year) by region and top crash areas
- Treemap of crash causes and injury rates
- Line chart of injury rates by speed limit
- Bar chart and waffle chart of people involved by injury levels
- Network graph of environemental conditions and injury level, measured by lift ratio
- Bubble chart of crash forms with image illustration
- Combination of heatmap and bubble chart of crash counts and injury rates by time of day and day of week
<br />

## Local installation 

1. Clone the files down to your directory, `git clone https://github.com/eddyyet/Crashes.git`
2. The repo root directory contains 1 folder, `Crashes`. Use `cd Crashes` to enter the folder.
3. Use `npm install` to install the dependencies.
4. Use `npm start` to start the application in your browser.
<br />

## Source of data, map engine and images

#### Data
- Chicago data portal ([traffic crashes](https://data.cityofchicago.org/Transportation/Traffic-Crashes-Crashes/85ca-t3if), [boundaries](https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas-current-/cauq-8yn6))
- Chicago Metropolitan Agency for Planning ([population](https://www.cmap.illinois.gov/documents/10180/126764/_Combined_AllCCAs.pdf/))

#### Map engine
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/copyright)

#### Images
Images are deviated from the following sources:
- NBC Chicago ([scene](https://www.nbcchicago.com/news/local/stolen-car-was-driving-wrong-way-before-fiery-chicago-crash-that-left-2-dead-16-hurt-police/3005211/))
- Vecteezy ([man](https://www.vecteezy.com/vector-art/7798695-graphics-drawing-businessman-standing-and-using-smartphone-for-connection-online-technology-vector-illustration), [cars (3D)](https://www.vecteezy.com/vector-art/113748-free-illustration-of-hybrid-car), [cars (top view)](https://www.vecteezy.com/vector-art/13037262-collection-of-various-isolated-cars-icons-car-top-view-illustration-vector), [trees](https://www.vecteezy.com/members/104122094326139728765))
- Clipartix.com ([motorcycle](https://clipartix.com/motorcycle-clipart-image-8614/))