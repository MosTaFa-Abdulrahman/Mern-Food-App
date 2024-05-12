import { makeRequest } from "../requestMethod";

export const createOrder = async (order) => {
  try {
    const { data } = makeRequest.post("order/create", order);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await makeRequest.get("/order/newOrderForCurrentUser");
  return data;
};

export const pay = async (paymentId) => {
  try {
    const { data } = await makeRequest.put("/order/pay", {
      paymentId,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const trackOrderById = async (orderId) => {
  const { data } = await makeRequest.get(`/order/track/${orderId}`);
  return data;
};

export const getAll = async (state) => {
  const { data } = await makeRequest.get(`/order/${state ?? ""}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await makeRequest.get(`/order/allstatus`);
  return data;
};
