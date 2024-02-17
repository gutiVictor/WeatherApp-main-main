import { useState, useEffect } from 'react'
import { Exit, RIcon, SeaIcon } from './Iconos'
import { obtenerLugares } from '../obt/obtener'

export function Search ({ buscar }) {
  const [menuAbrir, setMenuAbrir] = useState(false)
  const [buscarlugar, setBuscarlugar] = useState('')
  const [lugares, setLugares] = useState(null)

  const alternarMenu = () => {
    if (menuAbrir) {
      document.body.classList.remove('no-scrollbar')
    } else {
      document.body.classList.add('no-scrollbar')
    }
    setMenuAbrir(prev => !prev)
  }

  const busca = (event) => {
    event.preventDefault()
    buscar(buscarlugar)
  }

  const selectAndClose = (place) => {
    buscar(place)
    alternarMenu()
  }

  useEffect(() => {
    setLugares(obtenerLugares())
  }, [])
  return (

    <header className='bg-blue-1'>
      <div className='px-4 py-6'>
        <button
          className='px-5 py-3 bg-gray-3'
          onClick={alternarMenu}
        >Seach for places
        </button>
      </div>
      <nav className={`${menuAbrir ? 'fixed' : 'hidden'} top-0 left-0 right-0 bottom-0 md:w-[400px] bg-blue-1 text-center items-center justify-center z-50 overflow-auto no-scrollbar p-3`}>
        <button
          className='flex p-4 ml-auto'
          onClick={alternarMenu}
        ><Exit />
        </button>
        <form className='flex gap-3' onSubmit={busca}>
          <div className='flex items-center w-full gap-3 p-1 pl-3 border border-gray-1'>
            <SeaIcon />
            <input
              className='w-full py-2 bg-transparent focus:outline-none'
              placeholder='Escriba la ciudad '
              type='text'
              value={buscarlugar}
              onChange={(event) => setBuscarlugar(event.target.value)}
            />
          </div>
          <button type='submit' className='px-5 py-3 bg-blue-3'>Search</button>
        </form>
        <div className='flex flex-col gap-10 py-12 ml-10 text-left '>
            <p>London</p>
            <p>Barcelona</p>
            <p>Long Beach</p>
        </div>
        
      </nav>
    </header>

  )
}
