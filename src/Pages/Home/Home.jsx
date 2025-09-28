import React from "react";
import Banner from "../../Components/Banner/Banner";
import Feedback from "../../Components/Feedback/Feedback";
import Faq from "../../Components/Faq_Section/Faq";
import Categories from "../../Components/Categories/Categories";
import SecurityTrust from "../../Components/SecurityTrust/SecurityTrust";
import Title from "../../Sheared/Title/Title";
import BestWorkers from "./BestWorkers/BestWorkers";

const Home = () => {
  Title("Home")
  return (
    <div>
      <Banner></Banner>
      <BestWorkers></BestWorkers>
      <Feedback></Feedback>
      <Categories></Categories>
      <SecurityTrust></SecurityTrust>
      <Faq></Faq>
    </div>
  );
};

export default Home;
