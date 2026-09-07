export function calculatePrice({ farmerPrice, quantity, delivery = 0, serviceFee = 0 }) {
  const subtotal = farmerPrice * quantity;
  return {
    subtotal,
    delivery,
    serviceFee,
    total: subtotal + delivery + serviceFee
  };
}

export function farmerEarnings({ farmerPrice, quantity }) {
  return farmerPrice * quantity;
}
