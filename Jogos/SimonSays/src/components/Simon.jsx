import { createSignal, createEffect, createMemo } from "solid-js";

export default function Simon() {
    
    const colors = ["green", "red", "yellow", "blue"];

    const [score, setScore] = createSignal(0);

    const [randomPattern, setRandomPattern] = createSignal([]);
    const [playerPattern, setPlayerPattern] = createSignal([]);    

    const [activeColor, setActiveColor] = createSignal("");
    const [colorIndex, setColorIndex] = createSignal(0);

    const [isShowingPattern, setIsShowingPattern] = createSignal(false);

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function drawColor() {        
        setActiveColor(randomPattern()[colorIndex()]);
    }

    function handlePlayBtn() {        
        setRandomPattern([getRandomColor()]);
        setIsShowingPattern(true);
        setScore(0);
        drawColor();        
    }

    function handlePlayerClick(color) {
        if (!isShowingPattern()) {
            setActiveColor(color);
            setPlayerPattern(prev => [...prev, color]);
        }
    }

    function changeColor() {
        setActiveColor("");
        if (isShowingPattern()) {
            if (randomPattern().length - 1 > colorIndex()) {
                setColorIndex(prev => prev + 1);            
                drawColor();
            } else {
                setColorIndex(0);
                setIsShowingPattern(false);
            }
        } else {
            if (randomPattern()[playerPattern().length - 1] != playerPattern().at(-1)) {
                setIsShowingPattern(true);
                setRandomPattern([getRandomColor()]);
                setPlayerPattern([]);
                drawColor();
                setScore(0);
            } else if (playerPattern().length == randomPattern().length) {
                setIsShowingPattern(true);
                setPlayerPattern([]);
                setRandomPattern(prev => [...prev, getRandomColor()]);                    
                drawColor();
                setScore(prev => prev + 1);
            }
        }
    }

    return (
        <div class="simon-says">
            {colors.map((color) => (
                <Show 
                    when={activeColor() == color}
                    fallback={<div class={`btn ${color}`} onClick={() => handlePlayerClick(color)}></div>}>
                    <div 
                        class={`btn ${color} on`}
                        onAnimationEnd={changeColor}>                    
                    </div>
                </Show>
            ))}
            <div class="center">
                <h6 class="counter">{score()}</h6>
                <h4>Simon</h4>
                <button class="btn-play" onClick={handlePlayBtn}>Jogar</button>
            </div>
        </div>
    )
}