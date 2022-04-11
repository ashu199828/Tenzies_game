import React from 'react'

const Die = (props) => {
    const styles ={
        backgroundColor: props.isHeld ? 'limegreen': 'antiquewhite'
    }
  return (
    <div onClick={props.onClick} style={styles} className='die'>
        <h2>
            {props.value}
        </h2>

    </div>
  )
}

export default Die