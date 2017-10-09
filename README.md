# redux-calculator

## TO VIEW THIS PROJECT
1. `git clone `
2. `npm install`
3. `npm start ` and navigate browser to `http://localhost:8080/`
4. `npm test` and view in console


## SUMMARY: 

The input values get registered, evaluated and displayed using a cobination of 3 elements:
1. `this.state.values` (array on component level)
2. `this.props.evalQueue` (array on redux store with methods/access through container)
3. `this.props.result` (string on redux store with methods/access through container)

### Basic Flow: 
- The Calculator component takes button inputs and categorizes them based on their IDs
- When an operator button ('/*+-') or "=" is hit, `this.state.values` are joined together and redux puts them on the `evalQueue` with `onAddItemToQueue()`.
- When the "=" button is clicked, `onExecuteEvalQueue()` grabs all strings inside redux store's `evalQueue` array, joins and perfoms `eval()` on them and then takes that return value and sets redux's `result` string
- When the "STORE" button is clicked, either the `result`, `evalQueue`, or `values` (precedence in that order) are taken and set to redux's `storage` string.
- When "RETREIVE" is clicked, current `values` & `evalQueue` are first cleared and then value of Redux's `storage` is added to the `evalQueue` so further input and arithmetic may be chained.

**The main reason for separating the this.state.values and this.props.evalQueue was so that I could 1) keep track of continious user input (numbers 1 and 2 and 3 should be treated as '123' until an operator or "=" is hit) and 2) chain arithmetic on the evalQueue and end up with a nice string to pass into eval()**


### Possible Optimazations if time was no object: 
- Separate the input categorization logic outside of the Calculator component
⋅⋅1. The component seems bloated with a lot of logic/computation and my design choices on how to construct the Redux store meant that I had to do a lot of control flow if/then's. Upon a major refactor, I might consider adding more to the Redux store to keep things more intuitive
⋅⋅2. Maybe take most of the functions on the Calculator component and make an external module so that the component stays more lightweight.
- Create a custom `<Button />` component and utilize `Array.Prototype.Map` to dynamically create all the buttons and pass down ID's so that the Component code can be a little more DRY
- UI testing with Nightmare or similar library to test something along the lines of "if user clicks buttons ("1", "2", "+", "1", "0", "="), then result on Redux store is set to 22" 
- Better CSS styleing and overall UI refinements
