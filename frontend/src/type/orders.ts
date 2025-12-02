export type Orders = {
  _id: string;
  createdAt: Date;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  orderItems: {
    productId: string;
    name: string;
    image: string;
    price: string | number;
    quantity: string | number;
  }[];
  totalPrice: number;
  isPaid: boolean;
}[];

export type OrdersDetail = {
  _id: string | undefined;
  createdAt: Date;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  orderItems: {
    productId: string;
    name: string;
    image: string;
    price: string | number;
    quantity: string | number;
  }[];
};
