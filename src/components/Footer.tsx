import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick links</h3>
          <ul className="text-pink-500 space-y-2">
            {[
              "Home",
              "About Us",
              "About Our Confinement Dishes",
              "View Our Weekly Menu For Confinement Packages",
              "Confinement Packages",
              "Confinement Trial Meal",
              "Baby Full Moon Gift Boxes",
              "Baby Shower Celebration",
              "Articles",
              "Testimonials",
              "FAQ",
            ].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address</h3>
          <p>3015 Bedok North Street 5</p>
          <p>#04-21</p>
          <p>Shimei East Kitchen</p>
          {/* Clickable Google Maps Link */}
          <a
            href="https://www.google.com/maps/place/%E6%96%B0%E5%8A%A0%E5%9D%A1+486350/@1.3368844,103.9466579,18z/data=!4m6!3m5!1s0x31da3d3aee45777b:0x1d00f7ad8efa8cd3!8m2!3d1.336742!4d103.947448!16s%2Fg%2F1tkjhqh7?entry=ttu&g_ep=EgoyMDI1MDMxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            Singapore 486350
          </a>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <p>
            <strong>Hotline/Messenger Hours</strong>
            <br />
            Mon - Fri: 9.00AM to 6.00PM
            <br />
            Sat: 9.00AM to 12.30PM
            <br />
            Sun, PH: Closed
          </p>
          <p className="mt-4">
            <strong>Phone</strong>
            <br />
            6914 9900
          </p>
          <p className="mt-4">
            <strong>Email</strong>
            <br />
            <a
              href="mailto:confinement@chillipadi.com.sg"
              className="text-pink-500"
            >
              confinement@chillipadi.com.sg
            </a>
          </p>
          <p className="mt-4 text-sm">
            <strong>Please note:</strong> For E.D.D selection/new orders/next
            day activation/meal postponement, we need 1 working day's notice
            (before 2PM) for delivery on weekdays or 2 working days' notice
            (before 2PM) for weekends & PH. Any changes after operating hours
            require 2 working days' notice. Additional $20/trip for delivery to
            Sentosa.
          </p>
        </div>
      </div>

      {/* Botton Section */}
      <hr className="my-10 border-t border-gray-300" />
      <div className="flex items-center justify-between">
        {/* Left: Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
          <FaFacebookF className="text-pink-400 w-6 h-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-pink-400 w-6 h-6" />
          </a>
        </div>

        {/* Center: Copyright Text */}
        <p className="text-gray-600 text-sm text-center flex-1 text-center">
          &copy; 2025{" "}
          <a href="#" className="text-pink-400 hover:underline">
            Confinement Food Delivery
          </a>{" "}
          |{" "}
          <a href="#" className="text-pink-400 hover:underline">
            Chilli Padi Confinement
          </a>{" "}
          All Rights Reserved.
        </p>

        {/* Right: Payment Icons */}
        <div className="flex space-x-2">
          <Image
            src="/images/mastercard.png"
            alt="MasterCard"
            width={40}
            height={25}
          />
          <Image src="/images/unionpay.png" alt="UnionPay" width={40} height={25} />
          <Image src="/images/visa.jpg" alt="Visa" width={40} height={25} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
