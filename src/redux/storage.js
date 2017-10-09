/*---------- ACTIONS ----------*/

const SAVE_TO_STORAGE = "SAVE_TO_STORAGE"
const RETREIVE_FROM_STORAGE = "RETREIVE_FROM_STORAGE"


/*---------- ACTION CREATORS ----------*/

export function saveToStorageAction(storageVal) {
    console.log("saveToStorageAction CALLED with STORAGE VAL -", storageVal)
    return {
        type: SAVE_TO_STORAGE,
        storageVal
    }
}

export function retreiveFromStorageAction() {
    return {
        type: RETREIVE_FROM_STORAGE
    }
}

/*---------- REDUCERS ----------*/

export function storageReducer(state = "", action) {
    switch(action.type) {
        
        case SAVE_TO_STORAGE:
            return action.storageVal;
            // return state;  
            
        case RETREIVE_FROM_STORAGE:
            return state;

        default: 
            return state;
    }
}



/*---------- DISPATCHERS ----------*/

// export function addItemToEvalQueue(item) {

//     return (dispatch) => {
//         dispatch(addItemToEvalQueueAction(item))
//     }
// }






