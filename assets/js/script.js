
var weathre_Icons = {
    snowing:""
}
var getWeather = function (city) {


    // Weather API sample javascript code
    // Requires: jQuery and crypto-js (v3.1.9)
    // 
    // Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.

    var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
    var method = 'GET';
    var app_id = 'A7iVG62p';
    var consumer_key = 'dj0yJmk9N3ZuUUh0d2FUZENPJmQ9WVdrOVFUZHBWa2MyTW5BbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWUx';
    var consumer_secret = 'c98e7b798e8a34bfee129f9ec173f80a76ec0f26';
    var concat = '&';
    var query = {'location': city,'format': 'json','u':'c'};
    var oauth = {
        'oauth_consumer_key': consumer_key,
        'oauth_nonce': Math.random().toString(36).substring(2),
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
        'oauth_version': '1.0'
    };

    var merged = {}; 
    $.extend(merged, query, oauth);
    // Note the sorting here is required
    var merged_arr = Object.keys(merged).sort().map(function(k) {
        return [k + '=' + encodeURIComponent(merged[k])];
    });
    var signature_base_str = method
    + concat + encodeURIComponent(url)
    + concat + encodeURIComponent(merged_arr.join(concat));

    var composite_key = encodeURIComponent(consumer_secret) + concat;
    var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
    var signature = hash.toString(CryptoJS.enc.Base64);

    oauth['oauth_signature'] = signature;
    var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
        return [k + '="' + oauth[k] + '"'];
    }).join(',');

    $.ajax({
        url: url + '?' + $.param(query),
        headers: {
            'Authorization': auth_header,
            'X-Yahoo-App-Id': app_id
    },
   
    method: 'GET',
    success: function(data){
            console.log(data);
            var date_ = document.querySelector("#currentDate");
            var search_date = new Date();
            date_.innerText = search_date.toDateString();

            var current_city = document.getElementById("currentHeader");
            current_city.innerText = data.location.city;

            var gadegtTemp = document.getElementById("temperature");
            var gadegthumid = document.getElementById("humidity");
            var gadegtWind = document.getElementById("windSpeed");
            var gadegtUv = document.getElementById("uv");

            // gadgets
            gadegtTemp.innerHTML = data.current_observation.condition.temperature + '&deg';
            gadegthumid.innerHTML = data.current_observation.atmosphere.humidity + '%';
            gadegtWind.innerHTML = data.current_observation.wind.speed + 'kmh';
            gadegtUv.innerHTML = data.current_observation.atmosphere.rising;
            
            //forcast
            var day_zero = document.querySelectorAll("[data-index='0']")
            day_zero[0].innerHTML = data.forecasts[1].day;
           // var tag_ = day_zero[1]; //varible for tag
            // weatherIcon(data, 1 , tag_); //function call
            day_zero[2].innerHTML = "High " + data.forecasts[1].high;
            day_zero[3].innerHTML = "Low " + data.forecasts[1].low;

            var day_one = document.querySelectorAll("[data-index='1']")
            day_one[0].innerHTML = data.forecasts[2].day;
            day_one[2].innerHTML = "High " + data.forecasts[2].high;
            day_one[3].innerHTML = "Low " + data.forecasts[2].low;

            var day_two = document.querySelectorAll("[data-index='2']")
            day_two[0].innerHTML = data.forecasts[3].day;
            day_two[2].innerHTML = "High " + data.forecasts[3].high;
            day_two[3].innerHTML = "Low " + data.forecasts[3].low;
            
            var day_three = document.querySelectorAll("[data-index='3']")
            day_three[0].innerHTML = data.forecasts[4].day;
            day_three[2].innerHTML = "High " + data.forecasts[4].high;
            day_three[3].innerHTML = "Low " + data.forecasts[4].low;
           
            var day_four = document.querySelectorAll("[data-index='4']")
            day_four[0].innerHTML = data.forecasts[5].day;
            day_four[2].innerHTML = "High " + data.forecasts[5].high;
            day_four[3].innerHTML = "Low " + data.forecasts[5].low;
        }
    });
}
var weatherIcon = function (weatherData,index,tag){
    // create list object that correspond to weather code
    //get weather code from data object
    //get corresponding string from list
    //set tag to source to that image
   var data__ = weatherData.forecasts[index].text.toString();
   var source__ = "../assets/images/"+ data__ + ".png";
   tag.src = source__;
}
var presistance = function () {
    if (localStorage.search){
      var previous_search = localStorage.getItem("search");
      getWeather(previous_search)
    }else{
         getWeather("barrie,on")
    }
   
}

var weatherSearch = function () {
    var search_input = document.querySelector('#weather_search');
    var search_btn = document.querySelector('.searchBtn');
    var current_header = document.querySelector('#currentHeader');
    
    search_btn.addEventListener('click',(event) =>{
       
          event.preventDefault();
        if (search_input.value === ""){
            current_header.innerText = "Search field is empty";
        }
        else {
            var city_serch = search_input.value;
            getWeather(city_serch)
            localStorage.setItem("search",city_serch);
            search_input.value = "";
        }
    });
}

var current_city = document.getElementById("currentHeader");

document.querySelector('.form').addEventListener('click',(event)=>{
    event.preventDefault();
});

document.getElementById('to').onclick = (event) =>{
    if (event.target.value === current_city.innerHTML){/* empty */}
    else{  getWeather('toronto,on') }
};
document.getElementById('cal').onclick = (event) =>{
    if (event.target.value === current_city.innerHTML){}
    else{ getWeather('calgary,ab') }
};
var mont_city = document.getElementById('mont').onclick = (event) => {
    if (event.target.value === current_city.innerHTML){}
    else{ getWeather('montreal,qc') }
};
var van_city = document.getElementById('van').onclick = (event) => {
    if (event.target.value === current_city.innerHTML){}
    else{ getWeather('vancouver,bc') }
};
document.getElementById('ed').onclick = (event) => {
    if (event.target.value === current_city.innerHTML){}
    else{getWeather('mumbai,mh') }
};

document.getElementById('ny').onclick = (event) => {
    if (event.target.value === current_city.innerHTML){}
    else{ getWeather('new york,ny') }
};

document.getElementById('ams').onclick = (event)=> {
    if (event.target.value === current_city.innerHTML){}
    else {getWeather('amsterdam,nh');}
}

document.getElementById('lon').onclick = (event) => {
    if (event.target.value === current_city.innerHTML){}
    else{ getWeather('london,uk') }
};

presistance();
weatherSearch();


