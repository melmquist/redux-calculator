import React from 'react';
import styles from './assets/stylesheets/calculator.css';
import Calculator from './containers/CalculatorContainer.jsx';

class App extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Calculator />
            </div>
        );
    }
}

export default App;