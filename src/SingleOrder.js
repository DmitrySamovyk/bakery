import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { breadForms, breadTypes } from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const SingleOrder = ({ addOrder }) => {
  const classes = useStyles();
  const [ breadState, setBreadState ] = useState({
    formId: breadForms[0]?.id ?? 0,
    typeId: breadTypes[0]?.id ?? 0,
  });

  const setBreadType = useCallback((e) => {
    setBreadState({
      ...breadState,
      typeId: parseInt(e.target.value, 10),
    })
  }, [ breadState ]);

  const setBreadForm = useCallback((e) => {
    setBreadState({
      ...breadState,
      formId: parseInt(e.target.value, 10),
    })
  }, [ breadState ]);

  return (
    <FormControl className={classes.formControl}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
      >
        Bread Types
      </Typography>
      <Select
        native
        value={breadState.typeId}
        onChange={setBreadType}
      >
        {
          breadTypes?.map(({ name, id }) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))
        }
      </Select>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
      >
        Bread Forms
      </Typography>
      <RadioGroup
        aria-label="breadForms1"
        name="breadForms"
        value={breadState.formId}
        onChange={setBreadForm}
      >
        {
          breadForms?.map(({ name, id }) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio />}
              label={name}
            />
          ))
        }
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addOrder({
          ...breadState,
          uuid: uuid(),
        })}
      >
        Add Order to List
      </Button>
    </FormControl>
  )
};

export default SingleOrder;
