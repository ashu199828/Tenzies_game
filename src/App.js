import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Win from "./components/WIn";




function App() {
  const[diceNumbers, setDiceNumbers] = useState(allNewDice)
  const[tenzies, setTenzies] = useState(false)

 

  useEffect(() => {
    const allHeld = diceNumbers.every(die=> die.isHeld)
    const firstVlaue = diceNumbers[0].value
    const allSameVAlue = diceNumbers.every(die=> die.value===firstVlaue)
    if(allHeld && allSameVAlue){
      setTenzies(true)
      console.log('you won')
    }
  
    
  }, [diceNumbers])
  
  
  function generateNewDice(){
    return {
      value: Math.floor(Math.random()*6)+1,
      isHeld: false,
      id: nanoid()
    }

  }

  function holdDice(id){
  setDiceNumbers(prevDice=>prevDice.map(dice=>{
    return dice.id===id?
    {...dice,
    isHeld: !dice.isHeld}:
    dice
  }))
}

function rollDice(){
  if(!tenzies){

    setDiceNumbers(prevDice=>prevDice.map(dice=>{
    return dice.isHeld?dice: generateNewDice()
    
    }))  
  }
  else{
    setTenzies(false)
    setDiceNumbers(allNewDice)
  }
}


  function allNewDice(){
    let newDice = []
    for(let i = 0; i<10; i++){
      newDice.push(generateNewDice())
    
    }
    return newDice
   
  
  }
  
  let diceElements = diceNumbers.map(x=> <Die onClick={()=>holdDice(x.id)} isHeld={x.isHeld} key={x.id} value={x.value}/>)



  return (
    <div className="background">
     {tenzies && <Win/>}
      <h1 className="heading">Tenzies</h1>
      <p className="paragraph">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
  
    <div className="main">
      <div className="grid">
       {diceElements}
      </div>
    
      </div>
      <button onClick={rollDice}className="rollButton">{tenzies?'New Game':'Roll Dice'}</button>
      
     
    </div>
   
    
  );
}

export default App;
