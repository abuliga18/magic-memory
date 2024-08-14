import React from "react";
import './Card.css'

function Card({card, handleChoice, flipped}) {

    const handleClick = () => {
        handleChoice(card)

    }


    return (
        <div className='card'>
            <div>
                {flipped ? <img className='front' src={card.src} alt='card front'></img> :
                <img src='/imgs/cover.png' className='back' alt='card back' onClick={handleClick}></img>
                }
            </div>
        </div>
    )
}

export default Card;