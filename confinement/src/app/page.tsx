import React from "react";
import PackagesSection from "../sections/Home/PackagesSection";
import TrustedSection from "../sections/Home/TrustedSection";
import Banner from "../sections/Home/Banner";
import Article from "../sections/Home/HomeLatestArticles";

export default function Home() {
  return (
    <div>
      <Banner/>
      <PackagesSection/>
      <TrustedSection/>
      <Article/>
    </div>
  );
}
// This is a simple React component that renders a heading and a paragraph.