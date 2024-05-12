import {
  PayPalButtons,
  PayPalScriptProvider,
  // usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/useCart";
import { pay } from "../../services/orderService";

// From Payment Page
export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ae7fpWV-87k3qS1DIhST5E_ID8Gu247LBLlDW0zIQA0ofuJb95xnWsK2rqxc6eE2EJbeuNF0qnlI1oeH",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  // const [{ isPending }] = usePayPalScriptReducer();

  // useEffect(() => {
  //   isPending ? "Loading" : "";
  // });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success("Payment Saved Successfully", "Success");
      navigate("/track/" + orderId);
    } catch (error) {
      toast.error("Payment Save Failed");
    }
  };

  const onError = (err) => {
    toast.error("Payment Failed");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
