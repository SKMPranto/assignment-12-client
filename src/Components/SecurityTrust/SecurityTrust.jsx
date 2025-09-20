import React from "react";
import { FaLock, FaUserCheck, FaShieldAlt } from "react-icons/fa";

const SecurityTrust = () => {
  const trustPoints = [
    {
      title: "SSL Secure Payments",
      description:
        "All payments are encrypted with SSL to ensure your money is always safe.",
      icon: <FaLock className="text-4xl text-blue-500" />,
    },
    {
      title: "Verified Users",
      description:
        "Only verified users can participate, keeping the community safe and reliable.",
      icon: <FaUserCheck className="text-4xl text-green-500" />,
    },
    {
      title: "Privacy Protection",
      description:
        "Your data is private and never shared without your consent.",
      icon: <FaShieldAlt className="text-4xl text-yellow-500" />,
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Security & Trust
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {trustPoints.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center border hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTrust;
