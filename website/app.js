// base URL and key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' ; 
const apiKey = '&appid=9e0b8a30ddb783b30d83258df15e6f6c&units=imperial' ;

// Event listener to add function to the "generate" button
document.getElementById('generate').addEventListener('click', whenClicked);

/* Function called by event listener of the "generate" button*/
function whenClicked()
{
    // get and validate the zip code entered by user
    zipCode = getZip() ;
    // get the weather data from the OpenWeatherMap endpoint 
    getWeatherData(baseURL + zipCode + apiKey)
    // send the weather data to the server endpoint then dynamically update UI with our end point data
    .then(function (data) {sendData(data).then(updateUI())}) ;
}

/* Function to get a valid zip code*/
function getZip ()
{
    // get zip code from user 
    candidateZipCode = document.getElementById('zip').value ;
    // return zip code if it is in the valid format using regular expression 
    if (/^\d{5}(-\d{4})?$/.test(candidateZipCode))
    {
        return candidateZipCode ;
    } 
    else 
    {
        alert('Invalid Zip code, undefined temperature. Please Re-Enter a valid zip code') ;
    }
}

/* Function to GET Web API Data*/
async function getWeatherData(url)
{
    const weatherDataRes = await fetch(url) ;
    try
    {
        const weatherData = await weatherDataRes.json() ;
        // access the temperature only from the wetaherData
        return weatherData.main.temp ;
    }
    catch(error)
    {
        console.log(error) ;
    }
}

/* Function to POST data */
const sendData = async function(temp)
{
    // get feeling from UI 
    feeling = document.getElementById('feelings').value ;
    // get time dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    // preparing data to be sent in one object
    const sentData = {date : newDate,  temperature : temp, feeling : feeling} ;
    // adjusting the settings of the post request  
    const settings =
    {
        method : 'POST',
        credentials : 'same-origin',
        headers : {'Content-Type' : 'application/json'},
        // turn the data type into JSON string
        body : JSON.stringify(sentData) 
    } ;
    const resp = await fetch('/saveToEndPoint', settings) ;
    try
    {
        const respData = await resp.json() ;
        return respData ;
    }
    catch(error)
    {
        console.log(error) ;
    }
}

/* Function to update UI dynamically */
const updateUI = async function ()
{
    const updateDataRes = await fetch('/updateUI') ;
    try
    {
        const updateData = await updateDataRes.json() ;
        document.getElementById('date').innerHTML = updateData.date ;
        document.getElementById('temp').innerHTML = updateData.temperature ;
        document.getElementById('content').innerHTML = updateData.feeling ;
    }
    catch(error)
    {
        console.log(error) ;
    }
}