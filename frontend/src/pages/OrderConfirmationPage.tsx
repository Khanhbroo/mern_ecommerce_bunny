const checkout = {
  _id: "123123",
  createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "T-shirt",
      color: "white",
      size: "L",
      price: 250,
      quantity: 3,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "Ha Noi",
    country: "Vietnam",
  },
};

const OrderConfirmationPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex justify-between mb-20">
            {/* Order ID and date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order Id: {checkout._id}
              </h2>
              <p className="text-grau-500">
                Order date:{" "}
                {new Date(checkout.createdAt).toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
