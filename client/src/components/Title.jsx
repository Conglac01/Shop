import React from "react";

const Title = ({
  title1,
  title2,
  titleStyles,
  titlestyles,
  paraStyles,
  para,
}) => {
  return (
    <div className={titleStyles}>
      <h3 className={`${titlestyles} h3 capitalize`}>
        {title1}
        <span className="text-secondary font-light underline ml-2">{title2}</span>
      </h3>
      <p className={`${paraStyles} max-w-2xl text-gray-30 mt-2`}>
        {para ? para : "Explore our collection of stylish clothing and footwear made for comfort, quality, and everyday confidence."}
      </p>
    </div>
  );
};

export default Title;