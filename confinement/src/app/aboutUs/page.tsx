import React from "react";
import Root from "../../sections/AboutUs/Root";
import Mission from "../../sections/AboutUs/Mission";
import CTA from "../../sections/AboutUs/CTA";
import Missionpoint from "../../sections/AboutUs/Missionpoint";


export default function Home() {
  return (
    <div>
      <Root />
      <Mission />
      <Missionpoint /> 
      <CTA />
    </div>
  );
}