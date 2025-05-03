import InteractiveLesson from './InteractiveLesson/InteractiveLesson'
import { Game } from './InteractiveMap/_Types/GameType'

const lesson = new InteractiveLesson()
await lesson.init(Game.DND, '/levelsData/test.json', '/models/dices/dices.gltf')
