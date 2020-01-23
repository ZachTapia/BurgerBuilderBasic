import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

// Just an object to iterate over, they could just be hardcoded instead
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map(control => {
                return (
                    <BuildControl
                        key={control.label}
                        label={control.label}
                        ingredientAdded={() => props.ingredientAdded(control.type)}
                        ingredientRemoved={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabled[control.type]}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchase}>
                ORDER NOW
            </button>
        </div>
    );
};

export default BuildControls;
