import { Link } from "react-router";
import { Facebook, Github, Linkedin } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex md:justify-between items-center px-4 py-3">
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Khanhbroo"
            className="hover:text-gray"
            rel="noopener noreferer"
            target="_blank"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.facebook.com/khanhdq1120/"
            className="hover:text-gray"
            target="_blank"
          >
            <Facebook size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/%C4%91o%C3%A0n-qu%E1%BB%91c-khanh-b9458738a/"
            className="hover:text-gray"
            target="_blank"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <div className="text-sm text-center flex-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>

        <div className="hidden md:block text-sm">
          <Link to="tel:+84357519498" className="hover:text-gray-300">
            (+84) 357519498
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
