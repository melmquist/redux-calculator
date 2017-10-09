import React from 'react';

import styles from '../assets/stylesheets/calculator.css';

const babbelLogo = require('../assets/images/babbelLogo.png');


export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        // KEEPING BUTTONS THAT ARE PRESSED ON COMPONENT LEVEL STATE
        // LATER WHEN OPERATORS ARE HIT, THEN VALUES GET PUT ON REDUX STATE
        this.state = {
            values: [],
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.clearValues = this.clearValues.bind(this);
    }

    clearValues() {
        this.setState({
            values: []
        })
    }

    handleButtonClick(e) {
        let numbers = '1234567890.'.split('');
        let operators = '/*-+'.split('');        

        // MAKE COPY OF NEW ARRAY SO NOT TO MODIFY COMPONENT STATE
        var arrCopy = this.state.values.slice()

        let newVal = e.target.id

        // IF NUMBER BUTTON PRESSED, PUSH TO COMPONENT STATE "VALUES"
        if (numbers.indexOf(newVal) > -1) {
            // console.log("PROPS CHECK", this.props)
            // if we have result, then call BOTH CLEARS, then proceed to below
            if(this.props.result) {
                console.log("YES RESULT")
                this.props.onClearResult();
                this.props.onClearEvalQueue();
            } 

            arrCopy.push(newVal)
            this.setState({ 
                values: arrCopy 
            })
            // this.props.onResetLastItemOnEvalQueue(this.state.values)
        }

        // IF OPERATOR BUTTON PRESSED, JOIN ALL VALUES FROM COMPONENT STATE (so that 
        // "1" and "2" are treated as "12" 2 digits) AND ADD TO REDUX'S "evalQueue", 
        // ADD OPERATOR TO "evalQueue", THEN RESET COMPONENT STATE "values" BACK TO
        // EMPTY SO THAT IT CAN ACCEPT NEW NUMBER INPUTS 

        if(operators.indexOf(newVal) > -1) {
            if(this.props.result) {
                console.log("YES RESULT")
                this.props.onClearEvalQueue();
                let resultToAddToEvalQueue = this.props.result;
                this.props.onAddItemToQueue(resultToAddToEvalQueue);
                this.props.onClearResult();
                this.props.onAddItemToQueue(newVal)
                this.setState({ values: [] })
            } else {
                // check if last entered item was an operator, and if so, replace it not just append it with new operator
                console.log("EVAL QUEUE", this.props.evalQueue)
                let lastItemInEvalQueue = this.props.evalQueue[this.props.evalQueue.length-1]
                console.log("*****lastItemInEvalQueue", lastItemInEvalQueue)

                if(operators.indexOf(lastItemInEvalQueue) > -1) {
                    console.log("BOOM 1")

                    this.props.onResetLastItemOnEvalQueue(newVal);


                } else if(/[0-9]/.test(lastItemInEvalQueue)) {
                    console.log("LAST ITEM WAS A NUMBER< TIME TO RESET")
                    // this.props.onClearEvalQueue();
                    let joinedValuesToOneNumber = this.state.values.join('');
                    this.props.onResetLastItemOnEvalQueue(joinedValuesToOneNumber)
                    this.props.onAddItemToQueue(newVal)
                    this.clearValues();
                } else {
                    console.log("BOOM 2 VALS", this.state.values.length)

                    // let joinedValuesToOneNumber = this.state.values.join('');

                    let joinedValuesToOneNumber; 
                    if (this.state.values.length === 0) {                         // PREPEND A "0" TO THIS.STATE.VALUES IF IT'S EMPTY AND OPERATOR IS HIT
                        console.log("BOOBOOBSOBOFOB")
                        // this.setState({ values: ["0"] });
                        // joinedValuesToOneNumber = this.state.values.join('');
                        // console.log("BOOM joinedValuesToOneNumber", joinedValuesToOneNumber)

                        this.props.onAddItemToQueue("0")
                        this.props.onAddItemToQueue(newVal)
                        this.setState({ values: [] })
                    } else {
                        console.log("NAAAAAAAA")
                        console.log("NAAAAAAAA")
                        joinedValuesToOneNumber = this.state.values.join('');
                        this.props.onAddItemToQueue(joinedValuesToOneNumber)
                        this.props.onAddItemToQueue(newVal)
                        this.setState({ values: [] })
                    }
                    // console.log("BOOM joinedValuesToOneNumber", joinedValuesToOneNumber)
                    // this.props.onAddItemToQueue(joinedValuesToOneNumber)
                    // this.props.onAddItemToQueue(newVal)
                    // this.setState({ values: [] })
                }
            }            
            // arrCopy.push(newVal)
            // this.setState({ 
            //     values: arrCopy 
            // })
        }

        // IF "=" BUTTON IS PRESSED, JOIN ALL VALUES ON COMPONENT STATE AND ADD TO REDUX
        // STATE, THEN CALL DISPATCHER "onExecuteEvelQueue" TO INITIATE EVALUATION OF
        // REDUX STORE'S 'evalQueue'
        if(newVal === "=") {
            
            let joinedValuesToOneNumber = this.state.values.join('');
            this.props.onAddItemToQueue(joinedValuesToOneNumber)
            this.setState({ 
                values: [],
            })
            this.props.onExecuteEvalQueue();
            this.props.onClearEvalQueue();
        }
        if(newVal === "AC") {
            console.log("AC HIT")
            // R SHOOT OFF DISPATCHER TO CLEAR RESULT
            this.props.onClearResult();
            // R CLEAR EVAL QUUEUE
            this.props.onClearEvalQueue();
            // C CLEAR VALUES 
            this.setState({ values: [] });
        }
        if(newVal === "STORE") {
            // console.log("STORE HIT")
            /*
            if there is a result and EQ, take the result
            if there is no result and yes EQ, take the EQ
            CLEAR THE VALS/EQ/RESULT
            */ 
            if(this.props.result && !this.props.evalQueue) {
                console.log("YES RESULT, NO EQ")
                // if there is a result and no EQ, take the result
               
                this.props.onSaveToStorageAction(this.props.result)
            } else if(this.props.result && this.props.evalQueue) {
                console.log("YES RESULT, YES EQ")
                // TAKE RESULT
                this.props.onSaveToStorageAction(this.props.result)

            } else if(!this.props.result && this.props.evalQueue.length > 0) {
                console.log("NO RESULT, YES EQ")
                // TAKE EQ
                console.log("EQ TO TAKE>>>>>>", this.props.evalQueue)
                let resultToTake = this.props.evalQueue[this.props.evalQueue.length - 2]
                this.props.onSaveToStorageAction(resultToTake)

            } else if(!this.props.result && this.props.evalQueue.length === 0) {
                console.log("NO R, NO EQ")
                let resultToTake = this.state.values.join('')
                this.props.onSaveToStorageAction(resultToTake)
            }
            else {
                console.log("NO RESULT")
            }
            // ALWAYS RESET
            this.props.onClearEvalQueue();
            this.props.onClearResult();
            this.clearValues();
        }
        if(newVal === "RETREIVE") {
            if(this.props.storage) {
                console.log("YES RESULT")
                let storageToRetreive = this.props.storage;
                this.props.onRetreiveFromStorageAction();
                this.props.onClearEvalQueue();
                this.props.onClearResult();
                this.clearValues();
                this.props.onAddItemToQueue(storageToRetreive);
            } else {
                console.log("NO RESULT")
            }
        }
    }




    render() {
        console.log("STATE: ", this.state)
        console.log("PROPS: ", this.props)
        return (
            <div className={styles.containerDiv}>
                
                <div className={styles.headerDiv}>
                    <img className={styles.headerImg} src={babbelLogo} alt="babbelLogo"/>
                    <div className={styles.headerText}>
                        Coding Challenge Calculator
                    </div>
                </div>

                <div className={styles.inputOutputDiv}>
                    <div className={styles.resultDiv}>
                        {this.props.result}
                    </div>
                    <div className={styles.evalQueueDiv}>
                        {this.props.evalQueue}
                    </div>
                    <div className={styles.inputValuesDiv}>
                        {this.state.values}
                    </div>
                </div>
                
                <div className={styles.storageDiv}>
                    <div className={styles.storageBtn}>
                        <button type="button" className="btn-block btn-outline-primary" id="STORE" onClick={this.handleButtonClick}>STORE</button>
                    </div>
                    <div className={styles.storageBtn}>
                        <button type="button" className="btn-block btn-outline-primary" id="RETREIVE" onClick={this.handleButtonClick}>RETREIVE</button>
                    </div>
                </div>

                <div className={styles.numbersDiv}>
                    <div className={styles.numbersDivRow}>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="7" onClick={this.handleButtonClick}>7</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="8" onClick={this.handleButtonClick}>8</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="9" onClick={this.handleButtonClick}>9</button>
                        </div>
                    </div>  
                    <div className={styles.numbersDivRow}>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="4" onClick={this.handleButtonClick}>4</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="5" onClick={this.handleButtonClick}>5</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="6" onClick={this.handleButtonClick}>6</button>
                        </div>
                    </div>
                    <div className={styles.numbersDivRow}>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="1" onClick={this.handleButtonClick}>1</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="2" onClick={this.handleButtonClick}>2</button>
                        </div>
                        <div className={styles.numbersDivButton}>
                            <button type="button" className="btn-block btn-outline-primary" id="3" onClick={this.handleButtonClick}>3</button>
                        </div>
                    </div>
                    <div className={styles.numbersDivRow}>
                        <div className={styles.storageBtn}>
                            <button type="button" className="btn-block btn-outline-primary" id="0" onClick={this.handleButtonClick}>0</button>
                        </div>
                        <div className={styles.storageBtn}>
                            <button type="button" className="btn-block btn-outline-primary" id="." onClick={this.handleButtonClick}>.</button>
                        </div>
                    </div>    

                    <div className={styles.equalsDiv}>
                        <button type="button" className="btn-block btn-outline-primary" id="=" onClick={this.handleButtonClick}>=</button>
                    </div>
                </div>

                <div className={styles.operatorsDiv}>
                    <div className={styles.operatorsDivRow}>
                        <button type="button" className="btn-block btn-outline-primary" id="AC" onClick={this.handleButtonClick}>AC</button>
                    </div>
                    <div className={styles.operatorsDivRow}>
                        <button type="button" className="btn-block btn-outline-primary" id="/" onClick={this.handleButtonClick}>/</button>
                    </div>
                    <div className={styles.operatorsDivRow}>
                        <button type="button" className="btn-block btn-outline-primary" id="*" onClick={this.handleButtonClick}>*</button>
                    </div>
                    <div className={styles.operatorsDivRow}>
                        <button type="button" className="btn-block btn-outline-primary" id="-" onClick={this.handleButtonClick}>-</button>
                    </div>
                    <div className={styles.operatorsDivRow}>
                        <button type="button" className="btn-block btn-outline-primary" id="+" onClick={this.handleButtonClick}>+</button>
                    </div>
                </div>

            </div>
        );
    }
}

/*



*/