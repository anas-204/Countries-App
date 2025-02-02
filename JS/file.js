var section2 = document.getElementById("container");
var lightMode = true;
var regions = Array.from(document.querySelectorAll("li"));
var Root = document.documentElement;
var themeBut = document.getElementById("theme");
var filterBtn = document.getElementById("nav-link");
var searchBar = document.getElementById("search");
var cartona;
var data = [];
var region;



async function getdata() {
   var response =  await fetch(`data.json`);
   data = await response.json();
   console.log(data);
   createCard();
}

regions.forEach(element => {
    element.onclick = function(){
        region = element.textContent;
        createCard();    
    }
});

function createCard(){
    cartona = ``;
    if (region === undefined){        
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == "Israel"){
                continue;
            }else{
                cartona += `   
                <div class = "cards " index="${i}">
                     <div class="img-container w-100">
                        <img src="${data[i].flags.png}" alt="img${i}">
                    </div>
                    <div class="country-details">
                        <h3 class="text-center"> ${data[i].name} </h3>
                        <p><b>Population :</b> ${data[i].population} </p>
                        <p><b>Region :</b> ${data[i].region} </p>
                        <p><b>Capital :</b> ${data[i].capital} </p>
                    </div>
                    <button class="btn border-0 " onclick="check(this)"> Expand </button>
                </div>`
            }
        }
    }
    else{     
        filterBtn.textContent = "Region : " + region;
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == "Israel"){
                continue;
            }else{
                if(data[i].region == region){
                    cartona += `   
                    <div class = "cards" index="${i}">
                         <div class="img-container w-100">
                            <img src="${data[i].flags.png}" alt="img${i}">
                        </div>
                        <div class="country-details">
                            <h3 class="text-center"> ${data[i].name} </h3>
                            <p><b>Population :</b> ${data[i].population} </p>
                            <p><b>Region :</b> ${data[i].region} </p>
                            <p><b>Capital :</b> ${data[i].capital} </p>
                        </div>
                        <button class="btn border-0 " onclick="check(this)"> Expand </button>
                    </div>`
                } 
            }  
        }
    }
    section2.innerHTML = cartona;    
}

function check(element){
    curr_borders = "";
    curr_country=element.parentNode.getAttribute("index");
    console.log(curr_country);
    if(data[curr_country].borders){
        data[curr_country].borders.forEach(element =>{
            curr_borders +=`<p class="bg-info mx-2 px-3 py-1 rounded-2"> ${element} </p>`
        })
    }
    console.log(data[curr_country]);
    cartona = ` <div class="w-100">
        <button class="bg-white border-0 my-5 btn px-4 shadow" onclick="createCard()"> <i class="bi bi-arrow-left mx-1"> </i> Back </button>
        <div class="country d-flex justify-content-around flex-wrap  ">
            <div class="flag">
                 <img src="${data[curr_country].flags.png}" alt="img${curr_country}" class="">
            </div>
            <div class="details">
                <h2 class="text-center mb-5 text-primary">${data[curr_country].name}</h2>
                <p> <b>Native Name: </b>${data[curr_country].nativeName} </p>
                <p> <b>Population:  </b> ${data[curr_country].population}</p>
                <p> <b>Region: </b>  ${data[curr_country].region}</p>
                <p> <b>Sub Region:  </b> ${data[curr_country].subregion}</p>
                <p> <b>Capital: </b>  ${data[curr_country].capital}</p>
                <p> <b>Top Level Domain: </b>  ${data[curr_country].topLevelDomain}</p>
                <p> <b>Currencies:  </b>${data[curr_country].currencies[0].name} </p>
                <p> <b>Languages: </b>  ${data[curr_country].languages[0].name} </p>
                <p class="d-flex">
                   <b>Border Countries:</b>
                   <div class="d-flex flex-wrap"> ${curr_borders || undefined}</div> 
                </p>
            </div>
        </div>
    </div>`    
    section2.innerHTML = cartona;
}

themeBut.onclick = ChangeMode;

function ChangeMode(){
    if(lightMode==true){
        Root.style.setProperty("--dark-color","hsl(207, 26%, 17%)");
        Root.style.setProperty("--lighter-color","hsl(209, 23%, 22%)");
        Root.style.setProperty("--light-text","hsl(0, 0%, 100%)");
        Root.style.setProperty("--dark-text","hsl(200, 15%, 8%)");
        Root.style.setProperty("--expand-btn-color-light","rgb(41, 146, 206)");
        themeBut.innerHTML = `<i class="bi bi-sun"></i> light Mode`;  
        lightMode = false;
    }
    else{
        Root.style.setProperty("--dark-color","#f4f4f4");
        Root.style.setProperty("--lighter-color","#fff");
        Root.style.setProperty("--dark-text","hsl(0, 0%, 100%)");
        Root.style.setProperty("--light-text","hsl(200, 15%, 8%)");
        Root.style.setProperty("--expand-btn-color-light","rgba(123, 143, 199, 0.741)");
        themeBut.innerHTML = `<i class="bi bi-moon"></i> Dark Mode`;
        lightMode = true;
    }
}

getdata();

function search(){
    cartona = '';
    for (let i = 0; i < data.length; i++) {
        if(data[i].name.includes(searchBar.value)){
            cartona += `   
            <div class = "cards" index="${i}">
                 <div class="img-container w-100">
                    <img src="${data[i].flags.png}" alt="img${i}">
                </div>
                <div class="country-details">
                    <h3 class="text-center"> ${data[i].name} </h3>
                    <p><b>Population :</b> ${data[i].population} </p>
                    <p><b>Region :</b> ${data[i].region} </p>
                    <p><b>Capital :</b> ${data[i].capital} </p>
                </div>
                <button class="btn border-0 " onclick="check(this)"> Expand </button>
            </div>`
        }
    } 
    if(cartona == '' ){
        cartona = `<img src="./JS/Search Empty Result - Data.aco" alt="">`
    }
    section2.innerHTML = cartona;    
}
searchBar.oninput = search;

        

