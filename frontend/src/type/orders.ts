export type MockOrders = {
  _id: string;
  createdAt: Date;
  shippingAddress: {
    city: string;
    country: string;
  };
  orderItems: {
    name: string;
    image: string;
  }[];
  totalPrice: number;
  isPaid: boolean;
}[];

export type MockOrdersDetail = {
  _id: string | undefined;
  createdAt: Date;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: { city: string; country: string };
  orderItems: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
};
