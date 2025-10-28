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
