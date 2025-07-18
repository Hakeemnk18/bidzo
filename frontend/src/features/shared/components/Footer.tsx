
import { FaPhone, FaFacebookF, FaInstagram, FaLocationDot } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6"; // for the X (Twitter) icon

const Footer = () => {
  return (
    <footer className="bg-[#1e0842] text-white px-6 py-6 rounded-t-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left Section */}
        <div>
          <h2 className="text-sm font-semibold mb-2">Contact us</h2>
          <div className="flex items-center gap-2 text-sm mb-1">
            <FaPhone />
            <span>+91 9457200479</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <FaLocationDot />
            <div>
              <p>OP Jindal University</p>
              <p>Raigarh, Chhattisgarh</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 text-lg">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter">
            <FaXTwitter />
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-right space-y-1">
          <a href="#" className="block hover:underline">FAQs</a>
          <a href="#" className="block hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
