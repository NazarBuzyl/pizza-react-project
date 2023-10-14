import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={480}
    viewBox="0 0 290 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="295" rx="10" ry="10" width="250" height="90" />
    <circle cx="120" cy="110" r="110" />
    <rect x="15" y="240" rx="10" ry="10" width="210" height="25" />
    <rect x="10" y="415" rx="10" ry="10" width="70" height="30" />
    <rect x="130" y="408" rx="30" ry="30" width="110" height="40" />
  </ContentLoader>
);

export default PizzaSkeleton;
