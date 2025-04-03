import React from "react";

const jobCategories = [
  { title: "Retail & Product", jobs: 3, icon: "🛍️" },
  { title: "Content Writer", jobs: 6, icon: "✍️" },
  { title: "Human Resource", jobs: 3, icon: "🔑" },
  { title: "Market Research", jobs: 4, icon: "📊" },
  { title: "Software", jobs: 4, icon: "💻" },
  { title: "Finance", jobs: 5, icon: "🏦" },
  { title: "Management", jobs: 5, icon: "📈" },
  { title: "Marketing & Sale", jobs: 4, icon: "📢" },
];

const JobCategories = () => {
  return (
    <div className="text-center py-12">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900">Browse by category</h2>
      <p className="text-gray-600 mt-2">
        Find the job that’s perfect for you. About 800+ new jobs every day.
      </p>

      {/* Job Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
        {jobCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-6 shadow-md flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="text-3xl">{category.icon}</div>
            <h3 className="font-semibold text-gray-800 mt-2">
              {category.title}
            </h3>
            <p className="text-gray-500">{category.jobs} Jobs Available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
