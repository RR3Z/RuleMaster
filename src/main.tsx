import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './React/App'
import InteractiveMap from './InteractiveMap/InteractiveMap'
import { MapType } from './InteractiveMap/_Types/MapType'
import { loadFileData } from './Utils/FileUtils'

createRoot(document.getElementById('UI')!).render(<App />)
const data = await loadFileData('/levelsData/test.json')
const interactiveMap = new InteractiveMap(MapType.GRID_OF_CELLS, data)
await interactiveMap.init()
