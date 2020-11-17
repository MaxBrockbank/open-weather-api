import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../src/css/styles.css';


$(document).ready(function(){


  
    $("#uploadButton").on('click', ()=>{
    let uploadGif = new XMLHttpRequest();
    let source = $("#upload-input").val();
    const uploadGifUrl = `https://upload.giphy.com/v1/gifs?api_key=${process.env.GIPHY_KEY}&source_image_url=${source}&source_post_url=${postUrl}`;
      uploadGif.onreadystatechange = function (){
        if(this.readyState ===4 && this.status === 200){
        console.log(this.responseText);
      }
    }
    uploadGif.open("POST", uploadGifUrl, true);
    uploadGif.send();
  });

  $("#gifButton").on('click',function() {
    let gifRequest = new XMLHttpRequest()
    const userInput = $("#gif-input").val();
    const gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&tag=${userInput}&rating=g`;

    gifRequest.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200){
        const responseGif = JSON.parse(this.responseText);
        console.log(responseGif);
          showGif(responseGif.data.images.original.url);
      }
    };
    gifRequest.open("GET", gifUrl, true);
    gifRequest.send();

    function showGif(response){
      $('.gif').html(`<img src="${response}" alt="${userInput} gif"</img>`);
      }
  });

    let ipRequest = new XMLHttpRequest();

    const ipUrl = `http://api.ipstack.com/check?access_key=${process.env.LOCATION_KEY}`;
    ipRequest.onreadystatechange = function() {

      if(this.readyState === 4 && this.status === 200){
        const responseIP = JSON.parse(this.responseText);
        let ipCity = responseIP.city;
        let ipState = responseIP.region_name;
        weather(ipCity, ipState);
      }
    }

    function weather(ipCity, ipState) {
      let weatherRequest = new XMLHttpRequest();
      // console.log(weatherRequest);
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ipCity},${ipState}&units=imperial&appid=${process.env.WEATHER_KEY}`;
      weatherRequest.onreadystatechange = function(){
        console.log(this.readyState);
        console.log(this.status);
        if(this.readyState === 4 && this.status === 200){
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
      }
      weatherRequest.open("GET", url, true);
      weatherRequest.send();

      function getElements(response){
        $('.showHumidity').text(`The humidity in ${ipCity} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
      }
    }

      ipRequest.open("GET", ipUrl, true)
      ipRequest.send();


  })
