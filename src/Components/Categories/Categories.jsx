import React from "react";
import { FaClipboardList, FaBolt, FaMobileAlt, FaStar } from "react-icons/fa";

const Categories = () => {
  const categories = [
    {
      title: "Surveys",
      description: "Share your opinions on products, services, or trends.",
      icon: <FaClipboardList className="text-4xl text-blue-500" />,
    },
    {
      title: "Micro-tasks",
      description:
        "Complete quick tasks like tagging, entry, or small actions.",
      icon: <FaBolt className="text-4xl text-yellow-500" />,
    },
    {
      title: "App Testing",
      description: "Try out apps and give feedback on usability & performance.",
      icon: <FaMobileAlt className="text-4xl text-green-500" />,
    },
    {
      title: "Reviews & Feedback",
      description: "Write honest reviews and provide helpful feedback.",
      icon: <FaStar className="text-4xl text-pink-500" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Categories of Tasks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center border hover:shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-4">{cat.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
            <p className="text-gray-600 text-sm">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
