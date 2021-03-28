import React, {useCallback, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import SingleOrder from '../src/SingleOrder';
import SingleOrderView from '../src/SingleOrderView';
import Button from '@material-ui/core/Button';
import { theBestSolution } from '../utils';


export default function Index() {
  const [ totalOrderList, setTotalOrderList ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ resultCalculated, setResultCalculated ] = useState(false);
  const [ ordersCantBeDoneArray, setOrdersCantBeDoneArray ] = useState([]);
  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        setError(false);
      }, 2000)
      return () => {
        clearTimeout(errorTimer);
      }
    }
  }, [error]);

  const addOrder = useCallback((newOrder) => {
    if (resultCalculated) {
      setResultCalculated(false);
    }
    setTotalOrderList([
      ...totalOrderList,
      newOrder
    ]);
  }, [ resultCalculated, totalOrderList ]);

  const findTheBestSolution = useCallback(() => {
    if (!totalOrderList?.length) {
      return setError(true);
    }
    const {
      ordersCantBeDone
    } = theBestSolution(totalOrderList);

    if (ordersCantBeDone?.length) {
      setOrdersCantBeDoneArray(ordersCantBeDone);
    }
    setResultCalculated(true);

  }, [ totalOrderList ]);

  const removeOrder = useCallback((orderUuid) => {
    const newOrderList = totalOrderList.filter(({ uuid }) => uuid !== orderUuid);
    setTotalOrderList(newOrderList);
  }, [ totalOrderList ]);

  return (
    <Container maxWidth="sm">
      {
        error && !totalOrderList?.length && (
          <Alert
            severity="error"
          >
            Sorry, can find the Best solution!
            Add at least 1 order, please
          </Alert>
        )
      }
      {
        resultCalculated && !ordersCantBeDoneArray?.length && (
          <Alert
            severity="success"
          >
            Great!!! All orders can be done!!!
          </Alert>
        )
      }
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bakery
        </Typography>
        <SingleOrder
          addOrder={addOrder}
        />
        <Box my={1}>
          {totalOrderList?.length ? (
            <Typography variant="h5" component="h2" gutterBottom>
              Orders List
            </Typography>
          ) : null}
          {
            totalOrderList?.map(({ formId, typeId, uuid }, i) => {
              let orderShouldBeRefined = false;
              if (ordersCantBeDoneArray?.length && resultCalculated) {
                orderShouldBeRefined = !!ordersCantBeDoneArray?.find((order) => (
                  order.uuid === uuid
                ));
              }
              return (
                <SingleOrderView
                  key={`${formId}-${typeId}-${i}`}
                  formId={formId}
                  typeId={typeId}
                  index={i}
                  uuid={uuid}
                  removeOrder={removeOrder}
                  needRefind={orderShouldBeRefined}
                />
              )
            })
          }
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={findTheBestSolution}
        >
          Find the Best Solution!!!
        </Button>
        {
          resultCalculated && !ordersCantBeDoneArray?.length && (
            <Alert
              severity="success"
            >
              Great!!! All orders can be done!!!
            </Alert>
          )
        }
      </Box>
    </Container>
  );
}
