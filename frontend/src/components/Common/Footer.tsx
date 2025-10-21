import { Link } from "react-router";

import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  PhoneCallIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-x-12 xl:gap-8 px-4 xl:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new product, exclusive events, and online
            offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email..."
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2  text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men&apos;s Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women&apos;s Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men&apos;s Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women&apos;s Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2  text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-2">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://github.com/Khanhbroo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              <GithubIcon size={20} className="" />
            </a>

            <a
              href="https://www.facebook.com/khanhdq1120/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              <FacebookIcon size={20} className="" />
            </a>

            <a
              href="https://www.linkedin.com/in/%C4%91o%C3%A0n-qu%E1%BB%91c-khanh-b9458738a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              <LinkedinIcon size={20} className="" />
            </a>
          </div>
          <p className="text-gray-500 mb-2">Call Us</p>
          <p>
            <PhoneCallIcon className="inline-block mr-2" />
            <span className="inline-block translate-y-[1px]">035-751-9498</span>
          </p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025, BunnyShop. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
