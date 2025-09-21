import React from "react";
import Banner from "../../Components/Banner/Banner";
import Feedback from "../../Components/Feedback/Feedback";
import Faq from "../../Components/Faq_Section/Faq";
import Categories from "../../Components/Categories/Categories";
import SecurityTrust from "../../Components/SecurityTrust/SecurityTrust";
import Title from "../../Sheared/Title/Title";

const Home = () => {
  Title("Home")
  return (
    <div>
      <Banner></Banner>
      <Feedback></Feedback>
      <Categories></Categories>
      <SecurityTrust></SecurityTrust>
      <Faq></Faq>
    </div>
  );
};

export default Home;
