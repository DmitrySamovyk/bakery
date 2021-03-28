import React from 'react';
import { breadForms, breadTypes } from '../constants'
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const SingleOrderView = ({ index, formId, typeId, uuid, removeOrder, needRefind }) => (
  <Box color={needRefind ? 'error.main' : ''}>
    <Typography
      variant="h5"
      gutterBottom
    >
      Order {index + 1} {' '}
      <Button
        variant="contained"
        onClick={() => removeOrder(uuid)}
      >
        Remove Order
      </Button>
    </Typography>
    <Typography
      variant="body1"
      gutterBottom
    >
      You need to contact the client to clarify the order
    </Typography>
    <Divider light/>
    <Typography
      variant="h6"
      gutterBottom
    >
      Bread Type: {breadTypes?.find(({ id }) => id === typeId).name}
    </Typography>
    <Typography
      variant="h6"
      gutterBottom
    >
      Bread Form: {breadForms?.find(({ id }) => id === formId).name}
    </Typography>
    <Divider />
  </Box>
);

export default SingleOrderView;
