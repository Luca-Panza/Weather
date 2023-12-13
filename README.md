# <p align = "center"> Weather </p>

<p align="center">
   <img width=176px; src="./src/assets/coat.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Luca_Panza-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Luca-Panza/projeto24-weather?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description
Weather is a web application designed to provide real-time weather information and forecasts for the upcoming days. Customized to the user's location, it displays data such as current, maximum, and minimum temperatures, along with guidance on whether to wear a jacket based on the weather conditions. The application, with its user-friendly interface, aims to simplify the decision-making process for users planning outdoor activities or trips, ensuring they are appropriately dressed for the weather.

Deployment on Render: <a href="https://weather-coral-chi.vercel.app/" target="_blank">Weather Deploy</a>
***

## :computer:	 Technologies and Concepts

- React
- JavaScript
- Styled Components
- Recharts
- OpenWeatherMap API
- OpenCage Data API

***

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/Luca-Panza/projeto24-weather
```

Then, navigate to the project folder and install the dependencies with the following command:

```
npm install
```

Before running the application, you need to set up the required API keys. You'll need the OpenWeatherMap API key for weather data and the OpenCage Data API key for geocoding. Follow these steps:

1. For the OpenWeatherMap API key, visit [OpenWeatherMap](https://openweathermap.org/api) and sign up to obtain your key.
2. For the OpenCage Data API key, visit [OpenCage Data](https://opencagedata.com/api) and sign up to get your key.

Once you have the keys, proceed with the setup:

1. Locate the `.env.example` file in the project directory.
2. Create a new file in the same directory and name it `.env`.
3. Open the `.env.example` file. You will see example entries for the required API keys:
    - `VITE_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY`
    - `VITE_GEOCODING_API_KEY=YOUR_OPENCAGE_DATA_API_KEY`
4. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual OpenWeatherMap API key.
5. Replace `YOUR_OPENCAGE_DATA_API_KEY` with your actual OpenCage Data API key.
6. Copy these entries with your actual keys into the `.env` file you created.

After setting up the API keys, you can start the server:

```
npm start
```

Or to test on a production server.

```
npm run dev
```
