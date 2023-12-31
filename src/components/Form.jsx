import React, { useState } from 'react'
import './Form.css'
import rect from '../images/Rectangle.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Form({sendData}) {
    const notify=()=>toast.success("Success", {
        position:toast.POSITION.TOP_CENTER,
        theme:'colored',
        toastId: 'toastMessage'
    })
    

    let [values, setValues] = useState({
        cardholderName: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvc: ""
    })

    // For required filed validation on submit
    let [req, setReq] = useState(false)
    // For Valid data validation on submit
    let [dataStatus, setDataStatus] = useState('valid')

    // Patterns for input entry validation
    let inputPattern={
        cardholderName:/^([a-zA-Z]+\s?)*$/,
        cardNumber:/^(\d{4}\s){0,3}\d{0,4}$/,
        expMonth:/^\d{0,2}$/,
        expYear:/^\d{0,2}$/,
        cvc:/^\d{0,3}$/
    }

    // Patterns for Valid data validation
    let validationPattern = {
        cardholderName:/^([a-zA-Z]+\s?){3,}$/,
        cardNumber:/^(\d{4}\s){3}\d{4}$/,
        expMonth:/^(0?[1-9]|1[012])$/,
        expYear:/^\d{2}$/,
        cvc:/^\d{3}$/
    }

    // Function for adding space after every 4 digits
    function addSpace(e){
        let a=values.cardNumber.length
        if(a===3||a===8||a===13){
            if(a<e.target.value.length){
                e.target.value+=' '
            }
        }
        else if(a===5||a===10||a===15){
            if(a>=e.target.value.length){
                e.target.value=e.target.value.slice(0,-1)
            }
        }
    }

    // For status of input type is required data type or not
    let onlyAllowedDefault={
        cardholderName:false,
        cardNumber:false,
        expMonth:false,
        expYear:false,
        cvc:false
    }
    let [onlyAllowed, setOnlyAllowed]=useState(onlyAllowedDefault)

    // Function for handling change of input fields
    const changeHandler = (e) => {
        let {name} = e.target
        // Getting the values only on valid entry
        if(e.target.value.match(inputPattern[name])){
            // If Card number field, calling func for adding space after every 4 digits
            if(name==='cardNumber'){
                addSpace(e)
            }

            let {value} = e.target
            setValues({ ...values, [name]: value })
            setOnlyAllowed(onlyAllowedDefault)
        }
        else{
            setOnlyAllowed({...onlyAllowed, [name]:true})
        }
    }

    // Function for handling submit
    const submitHandler = (e) => {
        e.preventDefault();
        
        let data=Object.keys(values)
        
        // Checking if every field is Filled
        let reqStatus=data.some(value=>values[value].length===0)
        reqStatus?setReq(true)
            :setReq(false)
        
        // Checking if every field contains valid data
        let valStatus=data.every(key=>values[key].match(validationPattern[key]))
        valStatus?setDataStatus('valid')
            :setDataStatus('invalid')

        // Submitting the form data only if every field is filled and valid
        if(!reqStatus && valStatus){
            // console.log(values)
            sendData(values)
            notify()
        }
        // else{
        //     console.log('Invalid data')
        // }
        
        setOnlyAllowed(onlyAllowedDefault)
    }


    return (
        <div className='Form'>
            <img src={rect} alt="" />
            <form className='form-container' onSubmit={(e)=>{submitHandler(e);}}>
                <div>
                    <label htmlFor="cardholder-name">CARDHOLDER NAME</label><br />
                    <input
                        value={values.cardholderName} 
                        onChange={changeHandler}
                        type="text"
                        name="cardholderName"
                        id="cardholder-name"
                        placeholder='e.g. Jane Appleseed'
                        onBlur={()=>setOnlyAllowed(onlyAllowedDefault)}
                    />
                        {onlyAllowed.cardholderName===true
                            ?<small>Only characters allowed</small>
                            :req===true && values.cardholderName.length===0
                            ?<small>Cardholder name required</small>
                            :dataStatus==='invalid' && values.cardholderName.length<5
                            ?<small>Minimum length required is 5</small>
                            :''
                        }
                </div>

                <div>
                    <label htmlFor="card-number">CARD NUMBER</label><br />
                    <input
                        value={values.cardNumber}
                        onChange={changeHandler}
                        name="cardNumber"
                        id="card-number"
                        placeholder='e.g. 1234 5678 9123 0000'
                        onBlur={()=>setOnlyAllowed(onlyAllowedDefault)}
                    />
                        {onlyAllowed.cardNumber===true
                            ?<small>Only numbers allowed</small>
                            :req===true && values.cardNumber.length===0
                            ?<small>Card number required</small>
                            :dataStatus==='invalid' && values.cardNumber.length<19
                            ?<small>Enter valid card number</small>
                            :''
                        }
                </div>

                <div className='two-columns'>
                    <div onBlur={()=>setOnlyAllowed(onlyAllowedDefault)}>
                        <label htmlFor="exp-month">EXP. DATE (MM/YY)</label>
                        <div className='two-columns' id='exp-date'>
                            <input 
                                value={values.expMonth}
                                onChange={changeHandler}
                                name="expMonth"
                                id="exp-month"
                                placeholder='MM'
                            />
                            <input 
                                value={values.expYear}
                                onChange={changeHandler}
                                name="expYear"
                                id="exp-year"
                                placeholder='YY'
                            />
                        </div>
                        {onlyAllowed.expMonth===true || onlyAllowed.expYear===true
                            ?<small>Only numbers allowed</small>
                            :req===true && (values.expMonth.length===0||values.expYear.length===0)
                            ?<small>Expiry date required</small>
                            :dataStatus==='invalid' && (values.expMonth<1||values.expMonth>12)
                            ?<small>Enter valid month</small>
                            :dataStatus==='invalid' && values.expYear.length<2
                            ?<small>Enter year in YY format</small>
                            :''
                        }
                    </div>
                    <div>
                        <label htmlFor="cvc">CVC</label><br />
                        <input 
                            value={values.cvc}
                            onChange={changeHandler}
                            name="cvc"
                            id="cvc"
                            placeholder='e.g. 123'
                            onBlur={()=>setOnlyAllowed(onlyAllowedDefault)}
                        />
                        {onlyAllowed.cvc===true
                            ?<small>Only numbers allowed</small>
                            :req===true && values.cvc.length===0
                            ?<small>CVC required</small>
                            :dataStatus==='invalid' && values.cvc.length<3
                            ?<small>Enter valid CVC</small>
                            :''
                        }
                    </div>
                </div>

                <button id='form-submit' type="submit">Confirm</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Form