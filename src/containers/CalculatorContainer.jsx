import Calculator from '../components/Calculator.jsx';
import { connect } from 'react-redux';
import { 
    // addItemToEvalQueue, 
    addItemToEvalQueueAction, 
    executeEvalQueueAction,
    executeEvalQueueDispatcher,
    clearEvalQueueAction,
    resetLastItemOnEvalQueueAction } from '../redux/evalQueue.js'

import { clearResultAction } from '../redux/result.js'

import { saveToStorageAction, retreiveFromStorageAction } from '../redux/storage.js'
    
const mapStateToProps = state => {
    return {
        evalQueue: state.evalQueue,
        result: state.result,
        storage: state.storage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItemToQueue: (item) => dispatch(addItemToEvalQueueAction(item)),
        // onExecuteEvalQueue: () => dispatch(executeEvalQueueAction()),
        onExecuteEvalQueue: () => dispatch(executeEvalQueueDispatcher()),
        onClearEvalQueue: () => dispatch(clearEvalQueueAction()),
        onClearResult: () => dispatch(clearResultAction()),
        onResetLastItemOnEvalQueue: (item) => dispatch(resetLastItemOnEvalQueueAction(item)),
        onSaveToStorageAction: (storageVal) => dispatch(saveToStorageAction(storageVal)),
        onRetreiveFromStorageAction: () => dispatch(retreiveFromStorageAction())
    }
}

const CalculatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator)

export default CalculatorContainer;