export async function createPaymentOrder(amount) {
  // Replace this mock with Razorpay/Stripe/etc. on the server.
  return { id: `PAY-${Date.now()}`, amount, currency: "INR", status: "created" };
}

export async function verifyPayment(payment) {
  return Boolean(payment?.id);
}
