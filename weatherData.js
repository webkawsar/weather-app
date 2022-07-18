import UI from './ui.js';




const weatherData = {
    country: "",
    city: "",
    API_KEY: "3369900f5b58c49516413f8ecdb9439d",
    async getWeather() {
      try {

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`
        );
        const data = await response.json();
        return data;
        
      } catch (error) {
        UI.showMessage("Error in fetching data");
      }
    },
};

export default weatherData;


