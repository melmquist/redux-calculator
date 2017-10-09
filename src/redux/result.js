/*---------- ACTIONS ----------*/

export const SET_RESULT = "SET_RESULT"
export const CLEAR_RESULT = "CLEAR_RESULT"


/*---------- ACTION CREATORS ----------*/

export function setResultAction(result) {
    return {
        type: SET_RESULT,
        result
    }
}

export function clearResultAction() {
    return {
        type: CLEAR_RESULT,
    }
}
/*---------- REDUCERS ----------*/

export function resultReducer(state = "", action) {
    switch(action.type) {
        
        case SET_RESULT:
            return action.result;
            // return state;  
            
        case CLEAR_RESULT:
            // FROM MY UNDERSTANDING, I THINK IT IS OKAY TO DIRECTLY RETURN AN EMPTY ""
            // RATHER THAN COPY IT FIRST LIKE ARRAYS & OBJECTS BECAUSE STRINGS ARE IMMUTABLE
            // AND THUS JS CREATES A COPY UNDER THE HOOD ANYWAY
            // https://github.com/reactjs/redux/issues/768#issuecomment-196463613
            return "";

        default: 
            return state;
    }
}



