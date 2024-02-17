const menuNombre = 'weatherPlaces'

function agregarLugar(place) {

  const lugares = obtenerLugares()
  if (!lugares.includes(place)) {

    const nuevosLugares = [...lugares, place]

    window.localStorage.setItem(menuNombre, JSON.stringify(nuevosLugares))
  }
}

function obtenerLugares() {

  const lugaresGuardados = window.localStorage.getItem(menuNombre)

  return JSON.parse(lugaresGuardados) ?? []
}

export {

  agregarLugar,
  
  obtenerLugares
}
