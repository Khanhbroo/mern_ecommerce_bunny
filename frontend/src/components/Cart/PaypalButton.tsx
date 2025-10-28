import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { PaypalUserDetails } from "../../type/checkout";

const options = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  currency: "USD",
  locale: "en_VN",
};

const PaypalButton = ({
  amount,
  onSuccess,
  onError,
}: {
  amount: number;
  onSuccess: (details: PaypalUserDetails) => void;
  onError: (err: Record<string, unknown>) => void;
}) => {
  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons
        style={{ layout: "vertical", color: "silver", shape: "rect" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toString() } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
