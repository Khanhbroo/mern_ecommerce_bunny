const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occassion.",
  brand: "FashionBrand",
  material: "Leather",
  size: ["S", "M", "L", "XL"],
  color: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const ProductDetails = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row"></div>
        {/* Left Thumbnails */}
        <div className="hidden md:flex flex-col space-y-4 mr-6">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
