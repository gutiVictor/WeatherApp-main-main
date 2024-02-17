const apiKey = '5be98d7b8d347523539f4f2323d18ced';

async function obtenerTiempo(place) {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`);
  const data = await response.json();

  return data;
}

async function obtenerprono(place) {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`);
  const data = await response.json();


  return data;
}


async function tiempoCor() {

  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await response.json();

  return data;
}



async function pronostico() {

  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await response.json();

  return data;
}



export {

  obtenerTiempo,

  obtenerprono,

  tiempoCor,

  pronostico
};
