

// UI
// Data
// LocalStorage
// Single Responsibility Principle

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
    showMessage(msg) {
        const {messageElm} = this.loadSelector();
        messageElm.textContent = msg;

    },
    validateInput(country, city) {
        if(country === '' | city === '') {
            this.showMessage('Please provide necessary information');
        }
    },
    getInputValues() {
        const { countryElm, cityElm } = this.loadSelector();
        this.validateInput(countryElm.value, cityElm.value);
        return { 
            ...countryElm.value, 
            ...cityElm.value
        }
    },
    init() {
        const { formElm } = this.loadSelector();
        formElm.addEventListener('submit', (e) => {
            e.preventDefault();

            // get input values
            this.getInputValues();
        })

    }
};
UI.init();

const storage = {};
const weatherData = {};
























;