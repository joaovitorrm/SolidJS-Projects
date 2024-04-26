export default function Hand(props) {

    return (
        <div class={`hand ${props.class}`}>
            <div 
                class={`emoji-container ${props.animation ? "animate" : ""}`}
                onAnimationEnd={props.animationend}>
                    <Switch fallback={<div class="emoji">{props.emoji}</div>}>
                        <Match when={props.status == "win"}>
                            <div class="emoji win">{props.emoji}</div>
                        </Match>
                        <Match when={props.status == "lose"}>
                            <div class="emoji lose">{props.emoji}</div>
                        </Match>
                        <Match when={props.status == "draw"}>
                            <div class="emoji draw">{props.emoji}</div>
                        </Match>
                    </Switch>
                    
            </div>            
            <div class="name">{props.name}</div>
        </div>
    )
}