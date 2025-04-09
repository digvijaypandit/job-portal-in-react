import React, { useRef, useEffect } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Add global CSS styles via JS (for scrollbar hiding)
const addGlobalStyles = () => {
    const style = document.createElement("style");
    style.innerHTML = `
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
    `;
    document.head.appendChild(style);
};

const roles = [
    {
        title: "Data Analyst",
        openings: "370+ Openings",
        logos: ["l1", "l2", "l3", "l4"],
    },
    {
        title: "Frontend",
        openings: "250+ Openings",
        logos: ["a", "f", "m", "w"],
    },
    {
        title: "Full-Stack Roles",
        openings: "300+ Openings",
        logos: ["cisco", "jpm", "meesho", "mc"],
    },
    {
        title: "Product Management",
        openings: "246+ Openings",
        logos: ["d", "g", "titan", "paypal"],
    },
    {
        title: "Backend Developer",
        openings: "210+ Openings",
        logos: ["cisco", "m", "mc", "a"],
    },
    {
        title: "DevOps Engineer",
        openings: "180+ Openings",
        logos: ["w", "f", "paypal", "titan"],
    },
    {
        title: "UI/UX Designer",
        openings: "120+ Openings",
        logos: ["g", "meesho", "l2", "jpm"],
    },
];

const logoMap = {
    l1: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_of_Federal_Bank.svg/2048px-Logo_of_Federal_Bank.svg.png",
    l2: "https://1000logos.net/wp-content/uploads/2021/05/Unilever-logo.png",
    l3: "https://1000logos.net/wp-content/uploads/2017/06/Barclays-Logo-2002.png",
    l4: "https://1000logos.net/wp-content/uploads/2021/05/Nokia-logo.png",
    a: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    f: "https://upload.wikimedia.org/wikipedia/commons/1/10/Flipkart_logo.png",
    m: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    w: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    cisco: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Cisco_logo_blue_2016.svg",
    jpm: "https://1000logos.net/wp-content/uploads/2021/06/JP-Morgan-Chase-logo.png",
    meesho: "https://seeklogo.com/images/M/meesho-logo-54633E1A12-seeklogo.com.png",
    mc: "https://1000logos.net/wp-content/uploads/2017/03/MasterCard-Logo-2006.png",
    d: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Deloitte.svg",
    g: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    titan: "https://1000logos.net/wp-content/uploads/2021/05/Titan-logo.png",
    paypal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
};

const JobCategory = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        addGlobalStyles();
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="p-10 bg-gray-50 font-sans relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Find The Right Role For You</h1>
                    <p className="text-gray-500 text-sm">
                        Apply to roles matching your skills from 500+ trending options.
                    </p>
                </div>
                <Link to="/applicant/jobs" className="text-blue-600 text-sm font-medium hover:underline">
                    View All →
                </Link>
            </div>

            {/* Scroll Buttons */}
            <button
                onClick={scrollLeft}
                className="absolute left-2 top-[60%] transform -translate-y-1/2 cursor-pointer bg-white shadow p-2 rounded-full z-10"
            >
                <IoIosArrowDropleft size={20} />
            </button>
            <button
                onClick={scrollRight}
                className="absolute right-2 top-[60%] transform -translate-y-1/2 cursor-pointer bg-white shadow p-2 rounded-full z-10"
            >
                <IoIosArrowDropright size={20} />
            </button>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex space-x-5 overflow-x-auto no-scrollbar"
                style={{ scrollBehavior: "smooth" }}
            >
                {roles.map((role, index) => (
                    <div
                        key={index}
                        className="bg-white cursor-pointer group rounded-xl shadow p-5 min-w-[250px] w-[280px] flex-shrink-0"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">{role.title}</h2>
                            <span className="p-1 text-xl transform translate duration-75 rounded-full group-hover:bg-blue-700 group-hover:text-white"><FiArrowUpRight size={20} /></span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 mb-4">{role.openings}</p>
                        <div className="flex -space-x-2">
                            {role.logos.map((logoKey, i) => (
                                <div
                                    key={i}
                                    className="w-12 h-12 rounded-full bg-white border p-2 overflow-hidden flex items-center justify-center"
                                >
                                    <img
                                        src={logoMap[logoKey]}
                                        alt={logoKey}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobCategory;
