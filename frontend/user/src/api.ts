import axios from 'axios';

const API_BASE_URL = 'https://api-sandbox.circle.com/v1';
const API_KEY = "";

axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Function to link a bank account
export const linkBankAccount = async (bankDetails: any) => {
  const response = await axios.post(`${API_BASE_URL}/businessAccount/banks/wires`, bankDetails);
  return response.data;
};

// Function to send a payout
export const sendPayout = async (destinationId: string, amount: string) => {
  const response = await axios.post(`${API_BASE_URL}/businessAccount/payouts`, {
    destination: {
      type: 'wire',
      id: destinationId,
    },
    amount: {
      currency: 'USD',
      amount: amount,
    },
    idempotencyKey: 'unique-key-' + Date.now(),
  });
  return response.data;
};

// Function to check the status of a payout
export const checkPayoutStatus = async (payoutId: string) => {
  const response = await axios.get(`${API_BASE_URL}/businessAccount/payouts/${payoutId}`);
  return response.data;
};
