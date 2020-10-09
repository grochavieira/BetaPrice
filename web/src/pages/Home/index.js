import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Hire from "../../components/Hire";
import Footer from "../../components/Footer";

import "./styles.css";

const Home = () => {
  return (
    <>
      <Header isActiveHome={true} />
      <div className="home-container">
        <Hero />
        <Hire />
      </div>
      <Footer />
    </>
  );
};

export default Home;
