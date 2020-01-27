import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

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
            <p>
                <strong>Total Price: ${props.price.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout</p>
            <Button buttonType='Danger' clicked={props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button buttonType='Success' clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </Auxiliary>
    );
};

export default OrderSummary;
