import { Link } from "react-router";

import heroImg from "/bunny-hero.jpg";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/5 flex flex-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase md-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="/collection/all"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:bg-white/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
