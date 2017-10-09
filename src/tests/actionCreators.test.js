import {
    ADD_ITEM_TO_EVAL_QUEUE,
    RESET_LAST_ITEM_ON_EVAL_QUEUE,
    CLEAR_EVAL_QUEUE,
    EXECUTE_EVAL_QUEUE,
    addItemToEvalQueueAction,
    resetLastItemOnEvalQueueAction,
    clearEvalQueueAction,
    executeEvalQueueAction
} from '../redux/evalQueue.js';

import {
    SET_RESULT,
    CLEAR_RESULT,
    setResultAction,
    clearResultAction,
} from '../redux/result.js';


const testNumberEvalQueueItem = "34";
const testOperatorEvalQueueItem = "+";
const toBeEvaluated = "34 + 2";
const testNumberToSetResult = "22";

describe('addItemToEvalQueueAction', () => {
    it('should create an action that will add a NUMBER item to the evalQueue', () => {
        // const item = testNumberEvalQueueItem
        const expectedNumberAction = {
            type: ADD_ITEM_TO_EVAL_QUEUE,
            item: testNumberEvalQueueItem
        }
        expect(addItemToEvalQueueAction(testNumberEvalQueueItem)).toEqual(expectedNumberAction)
    })

    it('should create an action that will add an OPERATOR item to the evalQueue', () => {
        const expectedOperatorAction = {
            type: ADD_ITEM_TO_EVAL_QUEUE,
            item: testOperatorEvalQueueItem
        }
        expect(addItemToEvalQueueAction(testOperatorEvalQueueItem)).toEqual(expectedOperatorAction)
    })
})

describe('resetLastItemOnEvalQueueAction', () => {
    it('should create an action to reset the last evalQueue item', () => {
        const expectedAction = {
            type: RESET_LAST_ITEM_ON_EVAL_QUEUE,
            item: testNumberEvalQueueItem
        }
        expect(resetLastItemOnEvalQueueAction(testNumberEvalQueueItem)).toEqual(expectedAction)
    })
})

describe('clearEvalQueueAction', () => {
    it('should create an action to clear the entire evalQueue', () => {
        const expectedAction = {
            type: CLEAR_EVAL_QUEUE,
        }
        expect(clearEvalQueueAction()).toEqual(expectedAction)
    })
})

describe('executeEvalQueueAction', () => {
    it('should create an action to execute the evaluation of the evalQueue', () => {
        const expectedAction = {
            type: EXECUTE_EVAL_QUEUE,
            toBeEvaluated: toBeEvaluated
        }
        expect(executeEvalQueueAction(toBeEvaluated)).toEqual(expectedAction)
    })
})


describe('setResultAction', () => {
    it('should create an action to set result', () => {
        const expectedAction = {
            type: SET_RESULT,
            result: testNumberToSetResult
        }
        expect(setResultAction(testNumberToSetResult)).toEqual(expectedAction)
    })
})

describe('clearResultAction', () => {
    it('should create an action to clear the result', () => {
        const expectedAction = {
            type: CLEAR_RESULT,
        }
        expect(clearResultAction()).toEqual(expectedAction)
    })
})



/*
saveToStorageAction
saveToStorageAction
*/ 