import {MemoryGameController} from "./controller/MemoryGameController";
import {MemoryGameView} from "./view/MemoryGameView";
import {MemoryGameModel} from "./model/MemoryGameModel";

import "../styles/index.scss";

window.addEventListener("load", initGame);

function initGame() {
    const memoryGameModel = new MemoryGameModel();
    const memoryGameView = new MemoryGameView();
    new MemoryGameController(memoryGameModel, memoryGameView);
}
