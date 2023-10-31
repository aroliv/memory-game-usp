import './styles/index.scss'

import 'firebase/database'

import './js/AudioController'
import './js/Results'
import './js/Mix'
import './js/Match'
import './js/Results'
import DataBase from'./js/DataBase'
import Game from './js/Game'

const game = new Game(50);
const dataBase= new DataBase();

dataBase.getData();




game.render();


