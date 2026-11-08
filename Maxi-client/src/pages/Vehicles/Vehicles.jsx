import SEO from "../../components/SEO";

import Vehicles1 from "./Vehicles1";
import Vehicles2 from "./Vehicles2";
import Vehicles3 from "./Vehicles3";

export default function Vehicles() {
  return (
    <>
      {/* Vehicles Page SEO */}
      <SEO
        title="Maxicab Vehicles Singapore | MaxiCabStar Prime"
        description="Explore MaxiCabStar Prime's maxicab vehicles in Singapore. Find comfortable and spacious vehicles for airport transfers, family trips, and group transportation."
        path="/vehicles"
      />

      {/* Vehicle Page Sections */}
      <Vehicles1 />
      <Vehicles2 />
      <Vehicles3 />
    </>
  );
}