import React from 'react'
import "./ThankedListItem.css"

function ThankedListItem(props) {

    return (
        <div className="list-item">

            {props.gift.recipient.substring(0,6) + " says thanks for " + (props.gift.amount / 1e18).toString() + " " + props.gift.symbol + "!"}
            

            
        </div>
    )
}

export default ThankedListItem
