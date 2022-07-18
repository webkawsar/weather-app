const storage = {
    country: "",
    city: "",
    saveItem() {
      localStorage.setItem('WeatherAppCountry', JSON.stringify(this.country));
      localStorage.setItem('WeatherAppCity', JSON.stringify(this.city));
    },
    getItem() {
      const country = JSON.parse(localStorage.getItem('WeatherAppCountry'));
      const city = JSON.parse(localStorage.getItem('WeatherAppCity'));
  
      return {
        country,
        city
      }
    }
};




export default storage;