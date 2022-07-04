

// UI
// Data
// LocalStorage
// Single Responsibility Principle

const weatherData = {
    country: '',
    city: '',
    API_KEY: '3369900f5b58c49516413f8ecdb9439d',
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`)
        const data = await response.json();
        console.log(data);
    }
};
const UI = {
    loadSelector() {
        const cityElm = document.querySelector('#city');
        const cityInfoElm = document.querySelector('#w-city');
        const iconElm = document.querySelector('#w-icon');
        const temperatureElm = document.querySelector('#w-temp');
        const pressureElm = document.querySelector('#w-pressure');
        const humidityElm = document.querySelector('#w-humidity');
        const feelElm = document.querySelector('#w-feel');
        const formElm = document.querySelector('#form');
        const countryElm = document.querySelector('#country');
        const messageElm = document.querySelector('#messageWrapper');

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
            messageElm
        }
    },
    hideMessage() {
        const messageElm = document.querySelector('#message');
        setTimeout(() => {
            messageElm.remove();
        }, 2000)
    },
    showMessage(msg) {
        const {messageElm} = this.loadSelector();
        const elm = `<div class="alert alert-danger" id="message" role="alert">
                        ${msg}
                    </div>`
        messageElm.insertAdjacentHTML('afterbegin', elm);
        this.hideMessage();

    },
    validateInput(country, city) {
        if(country === '' | city === '') {
            this.showMessage('Please provide necessary information');
            return true;
        } else {
            return false;
        }
    },
    getInputValues() {
        const { countryElm, cityElm } = this.loadSelector();

        //get the result
        const isInValid = this.validateInput(countryElm.value, cityElm.value);
        if(isInValid) return;

        return { 
           country: countryElm.value, 
            city: cityElm.value
        }
    },
    resetInputs() {

        const { countryElm, cityElm } = this.loadSelector();
        countryElm.value = '';
        cityElm.value = '';
    },
    handleRemoteData() {

        weatherData.getWeather();
    },
    init() {
        const { formElm } = this.loadSelector();
        formElm.addEventListener('submit', (e) => {
            e.preventDefault();

            // get input values
            const {country, city} = this.getInputValues();

            // set data to data layer
            weatherData.country = country;
            weatherData.city = city;
            
            // reset input
            this.resetInputs();

            // send data to API Server
            this.handleRemoteData();

        })

    }
};
UI.init();

const storage = {};

























;