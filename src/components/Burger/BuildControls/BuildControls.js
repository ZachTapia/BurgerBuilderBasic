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
      {controls.map(control => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            ingredientAdded={() => props.ingredientAdded(control.type)}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;
