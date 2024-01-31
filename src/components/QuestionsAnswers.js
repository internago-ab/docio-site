import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const QuestionsAnswers = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPlans, setDisplayedPlans] = useState([]);

  useEffect(() => {
    // Initialize displayedPlans with all questions
    const allQuestions = categories.flatMap(category =>
      category.questions.map(question => ({
        ...question,
        categoryName: category.categoryName,
        countryName: category.countryName
      }))
    );
    setDisplayedPlans(allQuestions);
  }, [categories]);

  useEffect(() => {
    // Apply filters
    let filtered = [...categories.flatMap(category =>
      category.questions.map(question => ({
        ...question,
        categoryName: category.categoryName,
        countryName: category.countryName
      }))
    )];

    if (selectedCategory) {
      filtered = filtered.filter(question => question.categoryName === selectedCategory);
    }

    if (selectedCountry) {
      filtered = filtered.filter(question => question.countryName === selectedCountry);
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(question =>
        question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedPlans(filtered);
  }, [selectedCategory, selectedCountry, categories, searchQuery]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedCountry(""); // Reset country filter when changing category
  };

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    setSelectedCategory(""); // Reset category filter when changing country
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for questions"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => handleCategoryChange(category.categoryName)}
            className={`button ${selectedCategory === category.categoryName ? "is-primary" : ""}`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      {/* Country Buttons */}
      <div className="country-buttons">
        {Array.from(new Set(categories.map(category => category.countryName))).map((country) => (
          <button
            key={country}
            onClick={() => handleCountryChange(country)}
            className={`button ${selectedCountry === country ? "is-primary" : ""}`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Displayed Plans */}
      <div className="pricing-grid">
        {displayedPlans.map((plan, index) => (
          <div key={index} className="pricing-card">
            <div>
              <h3>{plan.answer}</h3>
              <p className="prices-paragraph">{plan.description}</p>
              <div className="price-answer">
                <p>{plan.priceDescription}</p>
                <h2 className="price-main">{plan.price}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

QuestionsAnswers.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string,
      countryName: PropTypes.string,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          answer: PropTypes.string,
          price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          description: PropTypes.string,
          priceDescription: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default QuestionsAnswers;
