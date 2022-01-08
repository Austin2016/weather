//API call structure of URL:
//https://api.openweathermap.org/data/2.5/weather?q=houston&APPID=30e5d1b531b978f71d75434e0b221232

var c
var f
var x


const getData = async (location) => {
  
  let callString = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=30e5d1b531b978f71d75434e0b221232`
  
  
  return new Promise( (resolve,reject) => { 

    fetch(callString,{mode:'cors'})
    .then(response => {
      if (!response.ok){
        console.log(response)
      }
      else {
       return response  
      }
    })
    .then(response => response.json() )
    .then(data => {
      resolve(data)  
    })
    .catch(error=> {
      reject(error) 
    })
    
  }).catch(error => { reject(error) })
  //return fetchResult

}


function processDataToFarenheit(data) {
  
  return (9.0/5.0)*(data.main.temp - 273.15) + 32
  
}
function processDataToCelcius(data) {
  return data.main.temp - 273.15
}

async function myFunction(city) {
  let result = 1
  try {
    const obj = await getData(city) 
      c = processDataToCelcius(obj)
      f = processDataToFarenheit(obj)
  }
  catch(e) {
    result = 0

  } 
  return result
}




//myFunction()


window.onload = function () {
  
  const submit =document.getElementById("submit")
  const span = document.querySelector("span.error")
  const input = document.getElementById("text")
  const div = document.getElementById("div")
  const p = document.createElement("p")
  
  async function logValues(city) {
    let isError = await myFunction(city)
    if (isError == 1) {
      p.innerHTML =`In ${city}, the temperature is ${c} degrees celcius and ${f} degrees farenheit `
    } 
    else {
      p.innerHTML = "Enter a valid city please"
    }
    document.body.appendChild(p)
  

}
  
  submit.addEventListener("click", function(event){

    if (!input.validity.valid) {
      span.innerText="only letters allowed"
      event.preventDefault()

    }
    else {
      span.innerText = ""
      logValues(input.value)

    }
  })
}