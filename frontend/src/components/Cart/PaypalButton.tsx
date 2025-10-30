import { useState } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { PaypalUserDetails } from "../../type/checkout";
import { Loader2 } from "lucide-react";

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
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <PayPalScriptProvider options={options}>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md">
          <Loader2 className="w-6 h-6 animate-spin text-bunny-red" />
          <span className="ml-2 text-sm text-gray-600">Loading PayPal…</span>
        </div>
      )}

      <PayPalButtons
        style={{ layout: "vertical", color: "silver", shape: "rect" }}
        onInit={() => setIsPending(false)}
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
