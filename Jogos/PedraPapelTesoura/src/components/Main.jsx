import { createSignal } from "solid-js"

import Hand from "./Hand"

export default function Main() {

    const data = {
        "papel": <>&#9995;</>,
        "pedra": <>&#9994;</>,
        "tesoura": <>&#9996;</>
    }

    const animatedTitle = ["Pedra", "Papel", "Tesoura"];
    const [titleWord, setTitleWord] = createSignal({
        index: 0,
        show: false
    })
    let intervalId;

    const [playerHand, setPlayerHand] = createSignal(data.pedra);    
    const [newHand, setNewHand] = createSignal();

    const [botHand, setBotHand] = createSignal(data.pedra);    

    const [isPlayerAnimation, setIsPlayerAnimation] = createSignal(false);
    const [winnerStatus, setWinnerStatus] = createSignal({
        player: "",
        bot: ""
    })

    function handleHandInput(hand) {
        setPlayerHand(data.pedra)
        setBotHand(data.pedra)
        setIsPlayerAnimation(true);
        setNewHand(hand);
        setWinnerStatus({
            player: "",
            bot: ""
        });
        setTitleWord(prev => {
            return {
                ...prev,               
                show: true
            }
        });
        intervalId = setInterval(() => {
            setTitleWord(prev => {
                return {
                    index: prev.index + 1,
                    show: true
                }
            })
        }, 600);
    }

    function generateRandomHand() {
        const hands = Object.keys(data);
        return data[hands[Math.floor(Math.random() * hands.length)]]
    }

    function setPlayerWinStatus(playerStatus, botStatus) {
        setWinnerStatus({
            player: playerStatus,
            bot: botStatus
        })
    }

    function showChooseHands() {
        setPlayerHand(newHand());
        setBotHand(generateRandomHand());
        setIsPlayerAnimation(false);
        clearInterval(intervalId);
        setTitleWord({
            index: 0,
            show: false
        })

        switch(playerHand()) {
            case data.pedra:
                if (botHand() == data.tesoura) {
                    setPlayerWinStatus("win", "lose");
                }
                break;
            case data.papel:
                if (botHand() == data.pedra) {
                    setPlayerWinStatus("win", "lose");
                }
                break;
            case data.tesoura:
                if (botHand() == data.papel) {
                    setPlayerWinStatus("win", "lose");
                }
                break;
        }
        if (winnerStatus().player == "") {
            if (playerHand() == botHand()) {
                setPlayerWinStatus("draw", "draw");
            } else {
                setPlayerWinStatus("lose", "win");
            }
        }
    }

    return (
        <main class="main-container">

            <Show when={titleWord().show} fallback={<div class="title-word"></div>}>
                <div class="title-word">
                    {animatedTitle[titleWord().index]}
                </div>
            </Show>

            <Hand 
                name={"Player"}
                emoji={playerHand()}
                class={"player"}
                animation={isPlayerAnimation()}
                animationend={showChooseHands}
                status={winnerStatus().player}
            />
            <Hand 
                name={"Bot"}
                emoji={botHand()}
                class={"bot"}
                animation={isPlayerAnimation()}
                status={winnerStatus().bot}
            />
            
            <div class="options">
                <button class="opt-button" onClick={() => handleHandInput(data.pedra)}>{data.pedra}</button>
                <button class="opt-button" onClick={() => handleHandInput(data.papel)}>{data.papel}</button>
                <button class="opt-button" onClick={() => handleHandInput(data.tesoura)}>{data.tesoura}</button>
            </div>

        </main>
    )
}