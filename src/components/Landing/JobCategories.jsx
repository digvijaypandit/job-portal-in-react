import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaShoppingBag, FaPenNib, FaUserShield, FaChartBar, FaLaptopCode, FaUniversity, FaProjectDiagram, FaBullhorn, FaLock, FaDatabase, FaNetworkWired, FaUserTie, FaFileMedical, FaHardHat, FaWrench, FaChalkboardTeacher, FaFilm, FaHotel, FaTruck, FaHome, FaLeaf } from "react-icons/fa";

const jobCategories = [
  { title: "Retail & Product", jobs: 3, icon: <FaShoppingBag /> },
  { title: "Content Writer", jobs: 6, icon: <FaPenNib /> },
  { title: "Human Resource", jobs: 3, icon: <FaUserTie /> },
  { title: "Market Research", jobs: 4, icon: <FaChartBar /> },
  { title: "Software Development", jobs: 4, icon: <FaLaptopCode /> },
  { title: "Finance", jobs: 5, icon: <FaUniversity /> },
  { title: "Management", jobs: 5, icon: <FaProjectDiagram /> },
  { title: "Marketing & Sales", jobs: 4, icon: <FaBullhorn /> },
  { title: "Cyber Security", jobs: 7, icon: <FaLock /> },
  { title: "Data Science", jobs: 8, icon: <FaDatabase /> },
  { title: "Networking & IT Support", jobs: 6, icon: <FaNetworkWired /> },
  { title: "Healthcare & Medical", jobs: 5, icon: <FaFileMedical /> },
  { title: "Engineering & Construction", jobs: 7, icon: <FaHardHat /> },
  { title: "Manufacturing & Production", jobs: 6, icon: <FaWrench /> },
  { title: "Education & Training", jobs: 5, icon: <FaChalkboardTeacher /> },
  { title: "Media & Entertainment", jobs: 4, icon: <FaFilm /> },
  { title: "Hospitality & Tourism", jobs: 3, icon: <FaHotel /> },
  { title: "Logistics & Supply Chain", jobs: 5, icon: <FaTruck /> },
  { title: "Real Estate & Property", jobs: 3, icon: <FaHome /> },
  { title: "Agriculture & Farming", jobs: 4, icon: <FaLeaf /> }
];

const JobCategories = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const cardsPerPage = 8;

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 220; // Approximate width of one card including spacing
      const scrollAmount = cardWidth * (cardsPerPage / 2); // Move by 8 cards (4 per row)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="text-center py-12 relative max-w-6xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
      <p className="text-gray-600 mt-2">Find the job that’s perfect for you. About 800+ new jobs every day.</p>

      {/* Job Categories Scrollable Container */}
      <div className="relative mt-8">
        {/* Left Scroll Button */}
          <button
            className="absolute -left-14 top-[47%] hover:bg-gray-300 cursor-pointer transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10"
            onClick={() => scroll("left")}
          >
            <IoIosArrowDropleft size={28} />
          </button>

        {/* Scrollable Job Categories */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:w-2 px-10 space-x-6"
          style={{ scrollSnapType: "x mandatory" }}
          onScroll={updateScrollButtons}
        >
          {/* Grid with 2 rows, 4 columns */}
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border cursor-pointer rounded-lg p-6 shadow-md flex flex-col items-center min-w-[275px] space-y-2"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="text-3xl">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.title}</h3>
                <p className="text-gray-500">{category.jobs} Jobs Available</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
          <button
            className="absolute -right-12 top-[47%] hover:bg-gray-300 cursor-pointer transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10"
            onClick={() => scroll("right")}
          >
            <IoIosArrowDropright size={28} />
          </button>
      </div>
    </div>
  );
};

export default JobCategories;
