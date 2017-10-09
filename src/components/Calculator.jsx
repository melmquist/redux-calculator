import React from 'react';

import styles from '../assets/stylesheets/calculator.css';

const babbelLogo = require('../assets/images/babbelLogo.png');


export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.clearValues = this.clearValues.bind(this);
    }

    clearValues() {
        this.setState({ values: [] });
    }

    handleButtonClick(e) {
        let numbers = '1234567890.'.split('');
        let operators = '/*-+'.split('');        

        var arrCopy = this.state.values.slice()
        let newVal = e.target.id

        if (numbers.indexOf(newVal) > -1) {         
            if(this.props.result) {
                this.props.onClearResult();
                this.props.onClearEvalQueue();
            } 
            arrCopy.push(newVal)
            this.setState({ values: arrCopy })
        }

        if(operators.indexOf(newVal) > -1) {                   
            if(this.props.result) {                             
                this.props.onClearEvalQueue();                  
                let resultToAddToEvalQueue = this.props.result;
                this.props.onAddItemToQueue(resultToAddToEvalQueue);
                this.props.onClearResult();
                this.props.onAddItemToQueue(newVal)             
                this.setState({ values: [] })
            } else {                                                          
                let lastItemInEvalQueue = this.props.evalQueue[this.props.evalQueue.length-1]   
                if(operators.indexOf(lastItemInEvalQueue) > -1) {                           
                    if(/[0-9]/.test(this.state.values[this.state.values.length-1])) {       
                        let joinedValuesToOneNumber = this.state.values.join('');           
                        this.props.onAddItemToQueue(joinedValuesToOneNumber)
                        this.props.onAddItemToQueue(newVal)
                        this.setState({ values: [] })
                    } else {                                                                
                        this.props.onResetLastItemOnEvalQueue(newVal);
                    }
                } else if(/[0-9]/.test(lastItemInEvalQueue)) {                              
                    this.props.onAddItemToQueue(newVal)                                    
                    this.clearValues();
                } else {
                    let joinedValuesToOneNumber; 
                    if (this.state.values.length === 0) {                         
                        this.props.onAddItemToQueue("0")
                        this.props.onAddItemToQueue(newVal)
                        this.setState({ values: [] })
                    } else {
                        joinedValuesToOneNumber = this.state.values.join('');
                        this.props.onAddItemToQueue(joinedValuesToOneNumber)
                        this.props.onAddItemToQueue(newVal)
                        this.setState({ values: [] })
                    }
                }
            }            
        }

        
        if(newVal === "=") {
            let joinedValuesToOneNumber = this.state.values.join('');
            this.props.onAddItemToQueue(joinedValuesToOneNumber)
            this.setState({ values: [] })
            this.props.onExecuteEvalQueue();
            this.props.onClearEvalQueue();
        }
        if(newVal === "AC") {
            this.props.onClearResult();         
            this.props.onClearEvalQueue();      
            this.setState({ values: [] });      
        }
        if(newVal === "STORE") {
            if(this.props.result && !this.props.evalQueue) {            
                this.props.onSaveToStorageAction(this.props.result)
            } else if(this.props.result && this.props.evalQueue) {      
                this.props.onSaveToStorageAction(this.props.result)
            } else if(!this.props.result && this.props.evalQueue.length > 0) {  
                let resultToTake = this.props.evalQueue[this.props.evalQueue.length - 2]
                this.props.onSaveToStorageAction(resultToTake)
            } else if(!this.props.result && this.props.evalQueue.length === 0) {    
                let resultToTake = this.state.values.join('')
                this.props.onSaveToStorageAction(resultToTake)
            }
            else {
                // console.log("NO RESULT")
            }
            this.props.onClearEvalQueue();      
            this.props.onClearResult();
            this.clearValues();
        }
        if(newVal === "RETREIVE") {
            if(this.props.storage) {
                let storageToRetreive = this.props.storage;
                this.props.onRetreiveFromStorageAction();
                this.props.onClearEvalQueue();
                this.props.onClearResult();
                this.clearValues();
                this.props.onAddItemToQueue(storageToRetreive);
            } else {
                // console.log("NO RESULT")
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
