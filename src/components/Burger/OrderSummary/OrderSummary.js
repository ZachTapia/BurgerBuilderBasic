import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

const OrderSummary = props => {
    // First get an array of ingredient names using Object.keys()
    // prettier-ignore
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingredientName, key) => {
            return <li key={ingredientName}><span style={{textTransform: 'capitalize'}}>{ingredientName}</span>: {props.ingredients[ingredientName]}</li>
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout</p>
        </Auxiliary>
    );
};

export default OrderSummary;
