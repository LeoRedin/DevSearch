import {normalizeString} from './utils.mjs'

async function init() {
  console.log('%ciniciando ...', 'color:#FF492D')
  const appState = {
    devs: [],
    filteredDevs: [],
  }

  // lidar com erro na requisição
  const devsResponse = await loadDevs()
  appState.devs = [...devsResponse.devs]
  appState.filteredDevs = [...devsResponse.devs]

  const inputSearch = document.getElementById('search')
  inputSearch.addEventListener('keyup', (event) => {
    const search = normalizeString(event.target.value)

    console.log(`%cFiltro: ${search}`, 'color:#FFCFA4')

    const {devs} = appState
    const filtered = devs.filter((dev) => dev.searchName.includes(search))

    appState.filteredDevs = filtered
  })

  console.log('%caplicação pronta', 'color:#FF492D')
}

async function loadDevs() {
  console.log('%ccarregando devs ...', 'color:#FF492D')
  try {
    const response = await fetch('http://localhost:3001/devs')
    const parsed = await response.json()

    parsed.map((dev) => {
      dev.searchName = normalizeString(dev.name)
    })

    return {success: true, devs: parsed}
  } catch (error) {
    return {success: false, devs: []}
  } finally {
    console.log('%cfinalizado carregamento de devs', 'color:#FF492D')
  }
}

init()
