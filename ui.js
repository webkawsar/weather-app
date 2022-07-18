import storage from './storage.js';
import weatherData from './weatherData.js';


const UI = {
    loadSelector() {
      const cityElm = document.querySelector("#city");
      const cityInfoElm = document.querySelector("#w-city");
      const iconElm = document.querySelector("#w-icon");
      const temperatureElm = document.querySelector("#w-temp");
      const pressureElm = document.querySelector("#w-pressure");
      const humidityElm = document.querySelector("#w-humidity");
      const feelElm = document.querySelector("#w-feel");
      const formElm = document.querySelector("#form");
      const countryElm = document.querySelector("#country");
      const messageElm = document.querySelector("#messageWrapper");
  
      return {
        cityElm,
        cityInfoElm,
        iconElm,
        temperatureElm,
        pressureElm,
        humidityElm,
        feelElm,
        formElm,
        countryElm,
        messageElm,
      };
    },
    hideMessage() {
      const messageElm = document.querySelector("#message");
      setTimeout(() => {
        messageElm.remove();
      }, 2000);
    },
    showMessage(msg) {
      const { messageElm } = this.loadSelector();
      const elm = `<div class="alert alert-danger" id="message" role="alert">
                          ${msg}
                      </div>`;
      messageElm.insertAdjacentHTML("afterbegin", elm);
      this.hideMessage();
    },
    validateInput(country, city) {
      if ((country === "") | (city === "")) {
        this.showMessage("Please provide necessary information");
        return true;
      } else {
        return false;
      }
    },
    getInputValues() {
      const { countryElm, cityElm } = this.loadSelector();
  
      //get the result
      const isInValid = this.validateInput(countryElm.value, cityElm.value);
      if (isInValid) return;
  
      return {
        country: countryElm.value,
        city: cityElm.value,
      };
    },
    resetInputs() {
      const { countryElm, cityElm } = this.loadSelector();
      countryElm.value = "";
      cityElm.value = "";
    },
    async handleRemoteData() {
      const data = await weatherData.getWeather();
      return data;
    },
    getIcon(iconCode) {
      return `http://openweathermap.org/img/wn/${iconCode}.png`
    },
    populateUI({ name, main: {temp, pressure, humidity}, weather: [{description, icon}] }) {
      const {
        cityInfoElm,
        iconElm,
        temperatureElm,
        pressureElm,
        humidityElm,
        feelElm,
      } = this.loadSelector();
      
      // set to UI
      cityInfoElm.textContent = name;
      temperatureElm.textContent = `Temperature: ${temp}°C`;
      pressureElm.textContent = `Pressure: ${pressure}Kpa`;
      humidityElm.textContent = `Humidity: ${humidity}`;
      feelElm.textContent = description;
      iconElm.setAttribute('src', this.getIcon(icon));
      
    },
    setToWeatherData(country, city) {
      weatherData.country = country? country : 'Bangladesh';
      weatherData.city = city ? city : 'Dhaka';
    },
    setDataToStorage(country, city) {
      storage.country = country;
      storage.city = city;
    },
    
    init() {
      const { formElm } = this.loadSelector();
      formElm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        // get input values
        const { country, city } = this.getInputValues();
  
        // set data to data layer
        this.setToWeatherData(country, city);
              
        // set data to storage
        this.setDataToStorage(country, city);
        
        //save to local storage
        storage.saveItem();
        
        // reset input
        this.resetInputs();
  
        // send data to API Server
        const data = await this.handleRemoteData();
  
        // show data to UI
        this.populateUI(data);
      });
  
  
      // DOM loaded function
      window.addEventListener('DOMContentLoaded', async ()=> {
        
        const {country, city} = storage.getItem();
        this.setToWeatherData(country, city);
  
        // send data to API Server
        const data = await this.handleRemoteData();
        
        // show data to UI
        this.populateUI(data);
      })
    },
};






export default UI;
