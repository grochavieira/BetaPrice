import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Hire from "../../components/Hire";
import Footer from "../../components/Footer";

import "./styles.scss";

const Home = () => {
  return (
    <>
      {/* <Header isActiveHome={true} /> */}
      <div className="home">
        <Hero />
        <Hire />
      </div>
      <Footer />
    </>
  );
};

export default Home;
