
/*----------------------------------*/ 
function getCountries(){
    var currentLang = document.querySelector("#currentLang").value;

    fetch("https://restcountries.com/v3.1/lang/" + currentLang)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        //console.log(json);
        //document.querySelector("#countryCount").innerHTML = "Country count " + json.length + " Coutrries";
        document.querySelector("#currentLang").style.display = "block"; 
        document.querySelector("#countryCount").innerHTML = `Country count ${json.length}  Coutrries`;
        document.querySelector("#chooseCountry").innerHTML ="";
       
        var countryTag = "";
        for(var i=0; i<json.length ; i++){
            countryTag += `<div class='oneCountry' onclick="getCountryDetails(this);" ><img width='70' src='${json[i]["flags"]["svg"]}'> <br> <span id="currentCountry">${json[i]["name"]["common"]}</span> </div>`;

        }
        document.querySelector("#container").innerHTML = countryTag;

    })
    .catch(function (error) {
        console.log('Request failed', error);
    });

   
}
/*---------------------------------------------------*/
function getCountryDetails(currentCountry){
   

    var currentCountry = currentCountry.textContent.trim();
    fetch("https://restcountries.com/v3.1/name/" + currentCountry)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        
        var currentLang = document.querySelector("#currentLang").value;
    
        countryDetail=
        `<div class="countryDetailPage">
        <div id="backButton">
        
            <input  type="button" value="Back" onclick="back();">
            </div>
        <div class='countryDetail'>
            <img  src='${json[0]["flags"]["svg"]}'>
            <br>
            <div>
                <span> Country Name:</span>
                <span> ${currentCountry} </span>
            </div>
            <br>
            <div> 
                <span> Capital:</span>
                <span> ${json[0]["capital"][0]}</span> 
            </div>
            <br>
            <div>
                <span> Language:</span>
                <span>${json[0]["languages"][currentLang]}</span>     
             </div>
            <br>
            <div> 
                <span> Continent:</span>
                <span> ${json[0]["region"]}</span>
            </div>
            <br>
            <div> 
                <span> subRegion:</span>
                <span> ${json[0]["subregion"]}</span>
            </div>
            <br>
            <div> 
                <span> Start Of Week:</span>
                <span>${json[0]["startOfWeek"]}</span> 
            </div>
            <br>
            <div> 
                <span> Car Side:</span>
                <span> ${json[0]["car"]["side"]} </span>
            </div>
            <br>
             </div>
            </div>`   
        document.querySelector("#container").innerHTML = countryDetail; 
        document.querySelector("#countryCount").innerHTML = ""; 
        document.querySelector("#currentLang").style.display = "none"; 
        // document.querySelector("#container2").style.display= "block";
        /* -------   get the key from object inside an array ------------
           -------   languages: Object { eng: "English" }    ------------*/
        var firstKey = Object.keys(json[0]["languages"])[0];
                   
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
 /* -------------------------------------*/ 
function back(){

var currentLang =document.querySelector("#currentLang").value;
 getCountries();
}