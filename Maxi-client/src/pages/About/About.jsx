import SEO from "../../components/SEO";

import About1 from "./About1";
import About2 from "./About2";
import About3 from "./About3";

export default function About() {
  return (
    <>
      {/* About Page SEO */}
      <SEO
        title="About MaxiCabStar Prime | Singapore Maxicab Service"
        description="Discover MaxiCabStar Prime, your trusted choice for maxicab services in Singapore. Learn about our airport transfers, group transportation, and comfortable travel solutions."
        path="/about"
      />

      {/* About Page Sections */}
      <About1 />
      <About2 />
      <About3 />
    </>
  );
}