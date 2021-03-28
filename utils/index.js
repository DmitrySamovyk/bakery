import { stableBakeryConstants, breadForms } from '../constants';

export const theBestSolution = (ordersArray) => {
  const panFormId = breadForms.find(({ name }) => name === 'Pan').id;
  const roundFormId = breadForms.find(({ name }) => name === 'Round').id;
  const {
    totalSquare,
    totalPossibleApproaches,
    squareForRound,
    squareForPan,
  } = stableBakeryConstants;
  const totalSquarePerDay = totalSquare * totalPossibleApproaches;
  const totalOrdersSquare = ordersArray.reduce((totalSquare, { formId }) => {
    const currentOrderSquare = formId === panFormId
      ? squareForPan : squareForRound;
    return totalSquare + currentOrderSquare
  }, 0);
  if (totalOrdersSquare <= totalSquarePerDay) {
    return {
      ordersCantBeDone: []
    }
  }

  const allPansOrders = ordersArray.filter(({ formId }) => formId === panFormId);
  const totalPanOrdersSquare = allPansOrders.reduce((square) => (
    square + squareForPan
  ), 0)

  if (totalPanOrdersSquare > totalSquarePerDay) {
    const ordersCantBeDone = ordersArray.filter(({ formId }) => formId === roundFormId);
    const lackOfSquare = totalPanOrdersSquare - totalSquarePerDay;
    const ordersCountCantBeDone = Math.ceil(lackOfSquare / squareForPan);
    let orderIndexToRemove = Math.ceil(totalSquarePerDay / squareForPan);
    if (orderIndexToRemove <= 1) {
      orderIndexToRemove = 0
    } else if (orderIndexToRemove >= allPansOrders?.length) {
      orderIndexToRemove = orderIndexToRemove - 1;
    }
    const panOrderCantBeDone = allPansOrders.splice(
      orderIndexToRemove,
      ordersCountCantBeDone
    );
    return {
      ordersCantBeDone: [
        ...ordersCantBeDone,
        ...panOrderCantBeDone
      ]
    }
  } else {
    const allRoundOrders = ordersArray.filter(({ formId }) => formId === roundFormId);
    const totalRoundOrdersSquare = allRoundOrders.reduce((square) => (
      square + squareForRound
    ), 0)
    const remainingSquareForRound = totalSquarePerDay - totalPanOrdersSquare;
    const lackOfSquare = totalRoundOrdersSquare - remainingSquareForRound;
    const ordersCountCantBeDone = Math.ceil(lackOfSquare / squareForRound);
    let orderIndexToRemove = Math.ceil(remainingSquareForRound / squareForRound);
    if (orderIndexToRemove <= 1) {
      orderIndexToRemove = 0
    } else if (orderIndexToRemove >= allPansOrders?.length) {
      orderIndexToRemove = orderIndexToRemove - 1;
    }
    const roundOrderCantBeDone = allRoundOrders.splice(
      orderIndexToRemove,
      ordersCountCantBeDone
    );
    return {
      ordersCantBeDone: [
        ...roundOrderCantBeDone
      ]
    }
  }
}
