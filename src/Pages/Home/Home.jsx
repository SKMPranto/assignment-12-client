import React from "react";
import Banner from "../../Components/Banner/Banner";
import Feedback from "../../Components/Feedback/Feedback";
import Faq from "../../Components/Faq_Section/Faq";
import Categories from "../../Components/Categories/Categories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Feedback></Feedback>
      <Categories></Categories>
      <Faq></Faq>
    </div>
  );
};

export default Home;
