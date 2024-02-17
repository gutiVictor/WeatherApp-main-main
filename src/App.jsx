import { useEffect, useState } from 'react'

import { obtenerprono, pronostico, obtenerTiempo, tiempoCor } from './components/api/consulta'

import { agregarLugar } from './obt/obtener'

import { FlechaIcon, LoIcon, SIcon } from './components/Iconos'
import { Search } from './components/Buscar'
import Centigrados from './components/Centigrados'





function App() {

  const [datosTiempo, setdatosTiempo] = useState({ temp: 0, dateFormat: '', windStatus: 0, humidity: 0, airPressure: 0, visibilityInMiles: 0, weather: '', locationName: '' })
  const [pronosticoDatos, setPronosticoDatos] = useState({})

  const [keys, setKeys] = useState([])

  const cambioClima = (data) => {
    const { weather, main, visibility, wind, name } = data

    const date = new Date() // se saca la la fecha actual
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' }




    setdatosTiempo({

      //sacar los datos del Clima pprincipal
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString('en-US', dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),

      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? 'Shower',
      locationName: name
    })


    const progreso = document.getElementById('progress')
    const windStatus = document.getElementById('windStatus')
    progreso.style.width = Math.round(main?.humidity ?? 0) + '%'
    windStatus.style.transform = `rotate(${wind.deg}deg)`

  }

  const changeForecast = (data) => {

    const dailyForecast = []

    //  tiempo en el pronostico extendido recorriendo la informacio que probiene  de la Data
    data.list.forEach(segment => {
      const fechaTexto = segment.dt_txt

      const fecha = new Date(fechaTexto)
      const dia = fecha.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })



      // un nuevo día


      if (!dailyForecast[dia]) {
        dailyForecast[dia] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main
        }


      } else {
        // Actualizar las temperaturas mínima y máxima 



        dailyForecast[dia].minTemp = Math.min(dailyForecast[dia].minTemp, segment.main.temp)
        dailyForecast[dia].maxTemp = Math.max(dailyForecast[dia].maxTemp, segment.main.temp)
      }

    })
    const dayKeys = Object.keys(dailyForecast)
    setPronosticoDatos(dailyForecast)
    setKeys(dayKeys)
  }

  const cords = () => {


    //  geolocalización
    if ('geolocation' in navigator) {

      // Obtener la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude



        // obtener datos del clima
        tiempoCor(lat, lon)
          .then(data => cambioClima(data))
        pronostico(lat, lon)
          .then(data => changeForecast(data))
      })
    } else {



    }
  }

  const buscar = (place) => {
    agregarLugar(place)
    obtenerTiempo(place)
      .then(data => cambioClima(data))
    obtenerprono(place)
      .then(data => changeForecast(data))
  }




  useEffect(() => {
    obtenerTiempo('colombia')
      .then(data => cambioClima(data))
    obtenerprono('colombia')
      .then(data => changeForecast(data))
  }, [])

  return (


    <main className='mx-auto md:flex max-w-8xl'>
      <section className='md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative'>
        <Search buscar={buscar} />
        <article className='h-screen px-4 py-20 bg-blue-1' style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('Cloud-background.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            opacity: 0.1 // Ajusta la opacidad 
          }}></div>




          <button className='absolute p-3 rounded-full -top-66 right-4 ' onClick={cords}>
            <SIcon />
          </button>
          <div className='flex flex-col items-center'>
            <img className='w-36' src={`/${datosTiempo.weather}.png`} alt={`/${datosTiempo.weather}`} />
            <p className='text-[144px] font-medium'>{datosTiempo.temp}<span className='text-5xl text-gray-2'>°C</span></p>
            <p className='pb-12 text-4xl font-semibold text-gray-2'>{datosTiempo.weather}</p>
            <div className='flex gap-4 pb-6 text-lg font-medium text-gray-2'>
              <span>Today</span>
              <span>•</span>
              <span>{datosTiempo.dateFormat}</span>
            </div>
            <div className='flex gap-3'>
              <LoIcon />
              <p className='text-lg font-semibold text-gray-2'>{datosTiempo.locationName}</p>
            </div>
          </div>
        </article>
      </section>
      <section className='md:flex-1 md:pl-[400px] md:m-10 '>
        

      {/*    <ul className="ml-[700px] flex space-x-4">
          <button className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full cursor-pointer hover:bg-gray-300 active:bg-blue-500">°C</button>
          <button className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full cursor-pointer hover:bg-gray-300 active:bg-blue-500">°F</button>
        </ul> 
  */}
  
     <Centigrados/>  



        <section className='grid grid-cols-2 p-12 mt-12 b- md:p-0 md:pb-12 lg:grid-cols-3 xl:grid-cols-5 gap-7'>

          {

            keys.slice(0, 5).map((day) => {
              const minTemp = Math.floor(pronosticoDatos[day].minTemp)
              const maxTemp = Math.floor(pronosticoDatos[day].maxTemp)
              const weather = pronosticoDatos[day].weather
              return (
                <article className='flex flex-col items-center px-5 py-4 m-auto bg-blue-1 ' key={day}>
                  <p className='pb-3 text-base font-medium'>{day}</p>
                  <img className='pb-8 w-14' src={`/${weather}.png`} alt={`/${weather}.png`} />
                  <div className='flex gap-8'>
                    <span>{maxTemp}°C</span>
                    <span className='text-gray-2'>{minTemp}°C</span>
                  </div>
                </article>
              )
            })
          }


        </section>

        <section className='p-14'>
          <h3 className='pb-8 text-2xl font-bold'>Today’s Hightlights </h3>
          <div className='grid grid-cols-1 gap-8 pl-4 md:grid-cols-2'>
            <article className='flex flex-col items-center w-full p-6 bg-blue-1'>
              <p className='pb-2 text-base font-medium'>Wind status</p>
              <p className='text-6xl font-bold'>{datosTiempo.windStatus}<span className='text-5xl font-medium'>mph</span></p>
              <div className='flex items-center gap-4 pt-5'>
                <span id='windStatus' className='p-3 rounded-full bg-gray-4'><FlechaIcon /></span>
                <span>WSW</span>
              </div>
            </article>
            <article className='flex flex-col items-center w-full px-12 py-6 bg-blue-1'>
              <p className='pb-2 text-base font-medium'>Humidity</p>
              <p className='text-6xl font-bold'>{datosTiempo.humidity}<span className='text-5xl font-medium'>%</span></p>
              <div className='flex justify-between w-full pt-4'>
                <span>0.0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>


              <div className='w-full h-2 overflow-hidden rounded-full bg-gray-1'>
                <div id='progress' className='h-full transition-all duration-300 bg-yellow-1' />
              </div>
              <span className='flex justify-end w-full'>%</span>
            </article>
            <article className='flex flex-col items-center w-full p-6 bg-blue-1'>
              <p className='pb-2 text-base font-medium'>Visibility</p>
              <p className='text-6xl font-bold'>{datosTiempo.visibilityInMiles.toFixed(1)} <span className='text-5xl font-medium'>miles</span></p>
            </article>
            <article className='flex flex-col items-center w-full p-6 bg-blue-1'>
              <p className='pb-2 text-base font-medium'>Air Pressure</p>
              <p className='text-6xl font-bold'>{datosTiempo.airPressure} <span className='text-5xl font-medium'>mb</span></p>
            </article>
          </div>

        </section>
        <footer className='p-8 text-sm font-medium text-center'>created by Victor Gutierrez - Funval 3 nivel</footer>
      </section>
    </main>
  )
}

export default App
