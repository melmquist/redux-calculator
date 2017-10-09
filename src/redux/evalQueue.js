import { setResultAction } from './result.js'

/*---------- ACTIONS ----------*/

export const ADD_ITEM_TO_EVAL_QUEUE = "ADD_ITEM_TO_EVAL_QUEUE"
export const RESET_LAST_ITEM_ON_EVAL_QUEUE = "RESET_LAST_ITEM_ON_EVAL_QUEUE"
export const CLEAR_EVAL_QUEUE = "CLEAR_EVAL_QUEUE"
export const EXECUTE_EVAL_QUEUE = "EXECUTE_EVAL_QUEUE"


/*---------- ACTION CREATORS ----------*/

export function addItemToEvalQueueAction(item) {
    console.log("addItemToEvalQueueAction CALLED with item: ", item)
    return {
        type: ADD_ITEM_TO_EVAL_QUEUE,
        item
    }
}

export function resetLastItemOnEvalQueueAction(item) {
    console.log("RESETLastItemOnEvalQueueAction CALLED with item: ", item)
    return {
        type: RESET_LAST_ITEM_ON_EVAL_QUEUE,
        item
    }
}

export function clearEvalQueueAction() {
    console.log("CLEAREvalQueueAction CALLED")    
    
    return {
        type: CLEAR_EVAL_QUEUE
    }
}

export function executeEvalQueueAction(toBeEvaluated) {
    console.log("EXECUTEEvalQueueAction CALLED")    
    return {
        type: EXECUTE_EVAL_QUEUE,
        toBeEvaluated
    }
}

/*---------- REDUCERS ----------*/

export function evalQueueReducer(state = [], action) {
    switch(action.type) {
        
        case ADD_ITEM_TO_EVAL_QUEUE:
            return [...state, action.item];
            // return state;
            
        case RESET_LAST_ITEM_ON_EVAL_QUEUE:
            return state.slice(0, state.length - 1).concat(action.item);
            
        case CLEAR_EVAL_QUEUE:
            // return state;
            // BETTER WAY TO THIS WITH SPREAD, BUT I'M JUST TRYING TO CLEAR THE ARRAY WITHOUT MUTATING, HENCE USING SLICE()
            return state.slice(state.length);
            
        
        case EXECUTE_EVAL_QUEUE:
            return state;

        default: 
            return state;
    }
}



/*---------- DISPATCHERS ----------*/


// I AM SURE THAT THIS IS AN INCORRECT IMPLEMENTATION OF REDUX-THUNK BUT THE REASON I AM
// USING IT IS SO THAT I CAN GRAB ONE PART OF STATE (evalQueue) AND THEN UTILIZE THUNK 
// TO DISPATCH AND AFFECT ANOTHER PART OF STATE (result) --> THIS MAY BE A USE CASE FOR 
// STORE.SUBSCRIBE?? EITHER WAY, I KNOW REDUX THUNK IS FOR ASYNC AND THESE OPERATIONS
// CAN AND SHOULD ALL BE SYNCHRONOUS.
export function executeEvalQueueDispatcher() {
    return (dispatch, getState) => {
        let valuesToExecute = getState().evalQueue.join('')
        let result = eval(valuesToExecute)
        dispatch(setResultAction(result))
    }
}





