let cityNameInput = document.getElementById('cityName');
let findBtn = document.querySelector(".findBtn");
let locationData = [];
let current = [];
let forecastDays = [];




async function getData(city){
    try{
        let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5be645f326154948889104314240712&q=${city}&days=3`);
        if(!data.ok){
            console.log("Failed To get data");
        }
        let finalResult = await data.json();
        locationData = finalResult.location;
        current = finalResult.current;
        forecastDays = finalResult.forecast.forecastday;
        console.log(locationData);
        console.log(current);
        console.log(forecastDays);
        display();
    }
    catch(error){
        console.error("Error : " , error.message);
    }
    
}

findBtn.addEventListener('click' , function(){
    console.log(cityNameInput.value);
     
    
    if(cityNameInput.value){
        getData(cityNameInput.value);
    }else{
        console.log("Enter Correct City");
        
    }
    
})

function display(){
    const dayDate1 = new Date(forecastDays[0].date);
    const dayDate2 = new Date(forecastDays[1].date);
    const dayDate3 = new Date(forecastDays[2].date);
    let cartona = ' ';

    cartona = `
        <div class="card-item col-md-4">
                <div class="inner h-100 d-flex flex-column">
                    <div class="card-header d-flex justify-content-between bg-inner-color p-2">
                        <h4 class="text-white-50 fs-6 ">${dayDate1.toLocaleDateString('en-US' , {weekday : 'long'})}</h4>
                        <h4 class="text-white-50 fs-6 ">${dayDate1.toLocaleDateString('en-US' , {day : 'numeric'})}${dayDate1.toLocaleDateString('en-US' , {month : 'long'})}</h4>
                    </div>
                    <div class="card-body1 p-2">
                        <h3 class="text-white-50 my-4">${locationData.name}</h3>
                        <h1 class="text-white">${current.temp_c}<sup>o</sup>C</h1>
                        <img class="body-img" src="https:${current.condition.icon}" alt="Night">
                        <span class="d-block ms-2 mb-3">${current.condition.text}</span>
                        <div class="weather-info d-flex mb-4">
                            <div class="item d-flex me-5 ms-2">
                                <img class="me-1" src="./images/icon-umberella.png" alt="umberella"> 
                                <p class="text-white-50 mb-1">20%</p>
                            </div>
                            <div class="item d-flex me-5">
                                <img class="me-1" src="./images/icon-wind.png" alt="wind"> 
                                <p class="text-white-50 mb-1">${current.wind_kph}km/h</p>
                            </div>
                            <div class="item d-flex me-5">
                                <img class="me-1" src="./images/icon-compass.png" alt="compass"> 
                                <p class="text-white-50 mb-1">East</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="card-item col-md-4">
                <div class="inner h-100 d-flex flex-column">
                    <div class="card-header d-flex justify-content-center bg-main-color p-2">
                        <h4 class="text-white-50 fs-6">${dayDate2.toLocaleDateString('en-US' , {weekday : 'long'})}</h4>
                    </div>
                    <div class="card-body2">
                        <div class="weather-img d-flex justify-content-center py-5">
                            <img src="https:${forecastDays[1].day.condition.icon}" alt="sunny">
                        </div>                            
                        <h2 class="text-center text-white">${forecastDays[1].day.maxtemp_c}<sup>o</sup>C</h2>
                        <h3 class="text-center text-white-50 fs-6">${forecastDays[1].day.mintemp_c}<sup>o</sup></h3>
                        <span class="text-center d-block mt-4">${forecastDays[1].day.condition.text }</span>
                        
                    </div>
                </div>
            </div>
            <div class="card-item col-md-4">
                <div class="inner h-100 d-flex flex-column">
                    <div class="card-header d-flex justify-content-center bg-inner-color p-2">
                        <h4 class="text-white-50 fs-6">${dayDate3.toLocaleDateString('en-US' , {weekday : 'long'})}</h4>
                    </div>
                    <div class="card-body3">
                        <div class="weather-img d-flex justify-content-center py-5">
                            <img src="https:${forecastDays[2].day.condition.icon}" alt="sunny">
                        </div>                            
                        <h2 class="text-center text-white">${forecastDays[2].day.maxtemp_c}<sup>o</sup>C</h2>
                        <h3 class="text-center text-white-50 fs-6">${forecastDays[2].day.mintemp_c}<sup>o</sup></h3>
                        <span class="text-center d-block mt-4">${forecastDays[2].day.condition.text }</span>
                        
                    </div>
                </div>
            </div>
    `

    document.querySelector('.weather-cards').innerHTML = cartona;

}


function getCurrentLocation(){

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getData(`${lat},${lon}`)
        }, function(error){
            console.log("Error" , error.message);
            getData('New York')
        })
    }else{
        console.log("Not Supported by browser");
        getData('New York')

    }
}

getCurrentLocation();