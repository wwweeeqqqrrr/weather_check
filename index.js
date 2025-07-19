const API_KEY = "ca04839e2b794d87a61182018250304";
const word = document.querySelector(".word");


function animateWord(word) {
  let text = word.dataset.text;
  text.split("").forEach((letter, ind) => {
    let div = document.createElement("div");
    div.innerText = letter;
    setTimeout(() => word.append(div), ind * 200);
  });
}

animateWord(word);

const buttonip = document.querySelector(".main_button");
buttonip.addEventListener("click", (event) => {
  if (event) {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => data.ip)
      .then((ip) => fetch(`https://api.2ip.io/${ip}?token=eum7v2moo62xduyy`))
      .then((resp) => resp.json())
      .then((data) => {
          getWeather(`https://api.weatherapi.com/v1/current.json?key=ca04839e2b794d87a61182018250304&q=${data.city}&aqi=no`)
      })

       
  }
});

async function getWeather(url) {
   const response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
      key: API_KEY,
    },
  })
  
  const needData =  await response.json()
  console.log(needData)
  showWeather(needData)

  
}

function showWeather(data) {
  const weatherEl = document.querySelector(".container");

  weatherEl.innerHTML = `
                <div class="info">
                   <div id="country"> ${data.location.name}</div>
                   <div id="text"> ${data.current.condition.text}</div>
                   <div id="temp">temp: ${Math.round(data.current.temp_c)}</div>
                   <img src=" https:${data.current.condition.icon}" id="icon">
                 </div>
                    `;
}



