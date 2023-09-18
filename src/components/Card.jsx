import React from 'react'
import './Card.css'

import eclipse6 from '../images/Ellipse 6.svg'
import eclipse3 from '../images/Ellipse 3.svg'
import eclipse4 from '../images/Ellipse 4.svg'
import eclipse5 from '../images/Ellipse 5.svg'
import eclipse7 from '../images/Ellipse 7.svg'

function Card(props) {
    // console.log(props)
    return (
        <div className='card-container'>
            <div className="card front">
                <div className="gradient-pieces">
                    <img id='eclipse3' src={eclipse3} alt="" />
                    <img id='eclipse4' src={eclipse4} alt="" />
                    <img id='eclipse5' src={eclipse5} alt="" />
                    <img id='eclipse6' src={eclipse6} alt="" />
                    <img id='eclipse7' src={eclipse7} alt="" />
                    <img id='eclipse8' src={eclipse5} alt="" />
                </div>
                
                <div id='visible-part'>
                    <div id="dots">
                        <div id='large-dot'></div>
                        <div id="hollow-dot"></div>
                    </div>
                    <div id='card-details'>
                        <p id='card-number'>
                            {props.cardNumber?props.cardNumber:"0000 0000 0000 0000"}
                        </p>
                        <div id='name-exp-display'>
                            <p id='cardholder-display'>
                                {props.cardholderName
                                ?props.cardholderName.toUpperCase()
                                :"JANE APPLESEED"}
                            </p>
                            <p id='exp-display'>
                                {String(props.expMonth).length===1
                                ?'0'+props.expMonth
                                :props.expMonth?props.expMonth:'00'}
                                /
                                {props.expYear?props.expYear:"00"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card back">
                <div className="black-strip"></div>
                <div id='cvc-display'>
                    {props.cvc?props.cvc:"000"}
                </div>
                <div className="lines-group">
                    <div>
                        <div className="line large"></div>
                        <div className="line small"></div>
                        <div className="line small"></div>
                        <div className="line extra-small"></div>
                    </div>
                    <div>
                        <div className="line small"></div>
                        <div className="line medium"></div>
                        <div className="line medium"></div>
                        <div className="line extra-small"></div>
                    </div>
                    <div>
                        <div className="line extra-small"></div>
                        <div className="line small"></div>
                        <div className="line small"></div>
                        <div className="line large"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card