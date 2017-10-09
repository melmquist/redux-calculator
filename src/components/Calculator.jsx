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
    }


    handleButtonClick(e) {
        let numbers = '1234567890.'.split('');
        let operators = '/*-+'.split('');        

        // MAKE COPY OF NEW ARRAY SO NOT TO MODIFY COMPONENT STATE
        var arrCopy = this.state.values.slice()

        let newVal = e.target.id

        // IF NUMBER BUTTON PRESSED, PUSH TO COMPONENT STATE "VALUES"
        if (numbers.indexOf(newVal) > -1) {
            console.log("PROPS CHECK", this.props)
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
                if(operators.indexOf(lastItemInEvalQueue) > -1) {
                    this.props.onResetLastItemOnEvalQueue(newVal);
                } else {
                    let joinedValuesToOneNumber = this.state.values.join('');
                    this.props.onAddItemToQueue(joinedValuesToOneNumber)
                    this.props.onAddItemToQueue(newVal)
                    this.setState({ values: [] })
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
            if(this.props.result) {
                console.log("YES RESULT")
                let resultToStore = this.props.result
                this.props.onSaveToStorageAction(resultToStore)
            } else {
                console.log("NO RESULT")
            }
        }
        if(newVal === "RETREIVE") {
            if(this.props.storage) {
                console.log("YES RESULT")
                let storageToRetreive = this.props.storage;
                this.props.onRetreiveFromStorageAction();
                this.props.onAddItemToQueue(storageToRetreive);
            } else {
                console.log("NO RESULT")
            }
        }
    }




    render() {
        // console.log("STATE: ", this.state)
        // console.log("PROPS: ", this.props)
        return (
            <div className={styles.containerDiv}>
                
                <div className={styles.headerDiv}>
                    <img className={styles.headerImg} src={babbelLogo} alt="babbelLogo"/>
                    <div className={styles.headerText}>
                        Babbel Coding Challenge Calculator
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
