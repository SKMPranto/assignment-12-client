import React from "react";
import { NavLink } from "react-router";

const coinPacks = [
  { coins: 10, amount: 1 },
  { coins: 150, amount: 10 },
  { coins: 500, amount: 20 },
  { coins: 1000, amount: 35 },
];

const PurchaseCoin = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {coinPacks.map((pack) => (
        <div
          key={pack.coins}
          className="border rounded-xl p-6 text-center hover:shadow-xl transition-transform transform hover:scale-102"
        >
          <h2 className="text-3xl font-bold mb-2">{pack.coins} Coins</h2>
          <p className="text-lg">{pack.amount}$</p>
          <NavLink
            to="/dashboard/payment"
            state={{ pack }} // ✅ pass selected pack
            className="btn btn-wide btn-success text-lg font-bold"
          >
            Buy Now
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;
