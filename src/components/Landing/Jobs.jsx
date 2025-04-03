import { motion } from "framer-motion";

// Company Logos (Scrolling Strip)
const companies = [
  { logo: "https://cdn.logojoy.com/wp-content/uploads/20230801145635/Google_logo_2013-2015-600x206.png" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg" },
  { logo: "https://nforceit.com.au/wp-content/uploads/2023/09/nforceit-partner-microsoft-logo.png" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/640px-Tesla_logo.png" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Netflix_Logomark.png" },
  { logo: "https://images.ctfassets.net/drk57q8lctrm/4QgGDTtQYDx6oDaW3aU7KS/34163f3bef6d82fd354a7455d07102eb/flipkart-logo.webp" },
  { logo: "https://cdn.iconscout.com/icon/free/png-256/free-samsung-logo-icon-download-in-svg-png-gif-file-formats--phone-technology-brands-and-logos-pack-icons-2673897.png?f=webp" },
];

// Duplicate logos for seamless looping
const repeatedCompanies = [...companies, ...companies];

const Jobs = () => {
  return (
    <div className="py-20 bg-white text-black text-center">
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Find Your Dream Job
      </motion.h2>
      <p className="mt-2 text-gray-500">
        Explore top job opportunities at leading companies
      </p>

      {/* Scrolling Logos */}
      <div className="overflow-hidden mt-10 relative">
        <motion.div
          className="flex gap-10 w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        >
          {repeatedCompanies.map((company, index) => (
            <div key={index} className="flex items-center">
              <img
                src={company.logo}
                alt={`Company ${index}`}
                className="w-24 h-24 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
