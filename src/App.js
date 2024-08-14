import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImgs = [
  {"src": "/imgs/helmet-1.png", matched: false},
  {"src": "/imgs/potion-1.png", matched: false},
  {"src": "/imgs/ring-1.png", matched: false},
  {"src": "/imgs/scroll-1.png", matched: false},
  {"src": "/imgs/shield-1.png", matched: false},
  {"src": "/imgs/sword-1.png", matched: false}
] 

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //compare two choices

  useEffect(()=> {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {
                ...card, matched: true
              } 
            } else {
              return card;
            }
          })
        })
        console.log('Cards match')
        resetTurn()
      } 
      else {
        console.log('Cards do not match')
        setTimeout(()=> resetTurn(), 1000)
      } 
    }
  }, [choiceOne, choiceTwo])

  // start new game automatically

  useEffect(() => {
    shuffleCards()
  }, [])

  //duplicate cards
  //shuffle cards
  //apply random ID to each card

  function shuffleCards() {
    const shuffledCards = [...cardImgs, ...cardImgs]
    shuffledCards.sort(() => Math.random() - 0.5);
    const cardsWithIds = shuffledCards.map(card => {
      return {...card, id: Math.random()}
    })
    setCards(cardsWithIds);
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }  

  // handle choice

  const handleChoice = (card) => {
    if(!disabled) {
      if (!choiceOne) {
        setChoiceOne(card)
      } 
      else if (choiceOne.id === card.id) {
        return;
      }
      else  {
        setChoiceTwo(card)
      }
    }
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn=> prevTurn + 1)
    setDisabled(false)
  }

 

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card card={card} 
          key={card.id} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched }/>
        ))}
      </div>

        <p>Turns: {turns}</p>

    </div>
  );
}

export default App;
