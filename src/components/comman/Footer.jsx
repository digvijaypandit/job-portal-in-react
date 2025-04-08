import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        
        {/* Section 1: Company Info */}
        <div className="col-span-2">
          <h2 className="text-3xl font-bold">Job Portal</h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Find your dream job with the most trusted job marketplace.
            Connect with top companies and kickstart your career today!
          </p>
          <p className="mt-4 text-gray-400">📧 Email: support@jobportal.com</p>
          <p className="text-gray-400">📞 Phone: +1 (123) 456-7890</p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Jobs", "About Us", "Contact", "Pricing", "Blog"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {["FAQs", "Career Tips", "Interview Guide", "Salary Calculator"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            {["Help Center", "Privacy Policy", "Terms of Service", "Report a Problem"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Newsletter Subscription */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Get the latest job updates and career tips straight to your inbox.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full text-gray-900 rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
