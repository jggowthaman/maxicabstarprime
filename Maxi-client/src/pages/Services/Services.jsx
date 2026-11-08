import SEO from "../../components/SEO";

import Services1 from "./Services1";
import Services2 from "./Services2";
import Services3 from "./Services3";

export default function Services() {
  return (
    <>
      {/* Services Page SEO */}
      <SEO
        title="Maxicab Services Singapore | MaxiCabStar Prime"
        description="Explore MaxiCabStar Prime's maxicab services in Singapore, including airport transfers, group transportation, and comfortable private travel."
        path="/services"
      />

      {/* Services Page Sections */}
      <Services1 />
      <Services2 />
      <Services3 />
    </>
  );
}