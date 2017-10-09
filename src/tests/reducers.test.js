import {
    ADD_ITEM_TO_EVAL_QUEUE,
    RESET_LAST_ITEM_ON_EVAL_QUEUE,
    CLEAR_EVAL_QUEUE,
    EXECUTE_EVAL_QUEUE,
    addItemToEvalQueueAction,
    resetLastItemOnEvalQueueAction,
    clearEvalQueueAction,
    executeEvalQueueAction,
    evalQueueReducer
} from '../redux/evalQueue.js';

import {
    SET_RESULT,
    CLEAR_RESULT,
    setResultAction,
    clearResultAction,
    resultReducer
} from '../redux/result.js';


const testNumberEvalQueueItem = "34";
const testOperatorEvalQueueItem = "+";
const testEvalQueueWithOneItem = [testNumberEvalQueueItem];
const testEvalQueueWithTwoItems = [testNumberEvalQueueItem, testOperatorEvalQueueItem];
const secondTestOperatorEvalQueueItem = "*";
const testNumberSetResult = "34";
const secondTestNumberSetResult = "44";


describe('evalQueueReducer', () => {
    
    it('should return the initial state', () => {
        expect(evalQueueReducer(undefined, {})).toEqual([])
    }),

    it('should handle ADD_ITEM_TO_EVAL_QUEUE when evalQueue is empty', () => {
        expect(evalQueueReducer(
            undefined,
            {
                type: ADD_ITEM_TO_EVAL_QUEUE,
                item: testNumberEvalQueueItem
            }
        )).toEqual([testNumberEvalQueueItem])
    }),
    
    it('should handle ADD_ITEM_TO_EVAL_QUEUE when evalQueue already has an item', () => {
        expect(evalQueueReducer(
            testEvalQueueWithOneItem,
            {
                type: ADD_ITEM_TO_EVAL_QUEUE,
                item: testOperatorEvalQueueItem
            }
        )).toEqual([testNumberEvalQueueItem, testOperatorEvalQueueItem])
    }),

    it('should handle RESET_LAST_ITEM_ON_EVAL_QUEUE when evalQueue already has 2 items', () => {
        expect(evalQueueReducer(
            testEvalQueueWithTwoItems,
            {
                type: RESET_LAST_ITEM_ON_EVAL_QUEUE,
                item: secondTestOperatorEvalQueueItem
            }
        )).toEqual([testNumberEvalQueueItem, secondTestOperatorEvalQueueItem])
    }),

    it('should handle CLEAR_EVAL_QUEUE', () => {
        expect(evalQueueReducer(
            testEvalQueueWithTwoItems,
            {
                type: CLEAR_EVAL_QUEUE,
            }
        )).toEqual([])
    })
})

describe('resultReducer', () => {

    it('should return the initial state', () => {
        expect(resultReducer(undefined, {})).toEqual("")
    }),

    it('should handle SET_RESULT when there is no result', () => {
        expect(resultReducer("", {
            type: SET_RESULT,
            result: testNumberSetResult
        })).toEqual("34")
    }),

    it('should handle SET_RESULT and reset it when there is already a result', () => {
        expect(resultReducer(testNumberSetResult, {
            type: SET_RESULT,
            result: secondTestNumberSetResult
        })).toEqual("44")
    })
})