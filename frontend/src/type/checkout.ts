export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type PaypalUserDetails = {
  id: string;
  intent: string;
  links: { href: string; method: string; rel: string }[];
  payer: {
    address: {
      country_code: string;
    };
    email: string;
    name: {
      given_name: string;
      surname: string;
    };
    payer_id: string;
  };
  purchase_units: {
    amount: { currency_code: string; value: string };
    payee: { email_address: string; merchant_id: string };
    payments: {
      captures: {
        amount: { currency_code: string; value: string };
        created_time: string;
        final_capture: boolean;
        id: string;
        seller_protection: {
          dispute_categories: string[];
          status: string;
        };
        status: string;
        update_time: string;
      }[];
    };
    reference_id: string;
    shipping: {
      address: Record<string, string>;
      name: { full_name: string };
    };
  }[];
  status: string;
  update_time: string;
};
