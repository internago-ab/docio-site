import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Pricing = ({ categories }) => {
  // Initialize selectedCategory with a default value
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Set the initial selected category once categories are loaded
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0].categoryName);
    }
  }, [categories]);

  const filterPlans = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const displayedPlans = categories && selectedCategory
    ? categories.find(
        (category) => category.categoryName === selectedCategory
      )?.plans || []
    : [];

  return (
    <div>
      <div className="prices-buttons">
        {categories && categories.map((category, index) => (
          <button
            key={category.categoryName}
            onClick={() => filterPlans(category.categoryName)}
            className={`button ${selectedCategory === category.categoryName ? "is-primary" : ""}`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      <div className="pricing-grid">
        {displayedPlans.map((plan, index) => (
          <div key={index} className="pricing-card">
            <section className="section">
              <h3 className="">{plan.plan}</h3>
              <p className="prices-paragraph">{plan.description}</p>
              <div className="price-plan">
                <p>{plan.priceDescription}</p>
                <h2 className="price-main">{plan.price}</h2>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

Pricing.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string,
      plans: PropTypes.arrayOf(
        PropTypes.shape({
          plan: PropTypes.string,
          price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          description: PropTypes.string,
          priceDescription: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default Pricing;
