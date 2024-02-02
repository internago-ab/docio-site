import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const QuestionsAnswers = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPlans, setDisplayedPlans] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleVisibility = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  useEffect(() => {
    // Initialize displayedPlans with all questions
    const allQuestions = categories.flatMap((category) =>
      category.questions.map((question) => ({
        ...question,
        categoryNames: category.categoryNames, // Assuming these are arrays
        countryNames: category.countryNames, // Assuming these are arrays
      })),
    );
    setDisplayedPlans(allQuestions);
  }, [categories]);

  useEffect(() => {
    // Filter displayedPlans based on selectedCategory and selectedCountry
    let filtered = categories.flatMap((category) =>
      category.questions.map((question) => ({
        ...question,
        categoryNames: category.categoryNames,
        countryNames: category.countryNames,
      })),
    );

    if (selectedCategory) {
      filtered = filtered.filter((question) =>
        question.categoryNames.includes(selectedCategory),
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter((question) =>
        question.countryNames.includes(selectedCountry),
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (question) =>
          question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    setDisplayedPlans(filtered);
  }, [selectedCategory, selectedCountry, searchQuery, categories]); // Removed displayedPlans from dependencies

  const uniqueCategoryNames = Array.from(
    new Set(
      categories.flatMap((category) => category.categoryNames).filter(Boolean),
    ),
  );
  const uniqueCountryNames = Array.from(
    new Set(
      categories.flatMap((category) => category.countryNames).filter(Boolean),
    ),
  );

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
      <div className="questions_answers-content">
        <div>
          <div className="categories-filter">
            <h3>Categories:</h3>
            <div className="category-buttons filter-tags">
              {uniqueCategoryNames.map((categoryName) => (
                <button
                  key={categoryName}
                  onClick={() => handleCategoryChange(categoryName)}
                  className={`button ${selectedCategory === categoryName ? "is-selected" : ""}`}
                >
                  {categoryName}
                </button>
              ))}
            </div>
          </div>
          <div className="countries-filter">
            <h3 className="country-buttons-header">Countries</h3>
            <div className="country-buttons filter-tags">
              {uniqueCountryNames.map((countryName) => (
                <button
                  key={countryName}
                  onClick={() => handleCountryChange(countryName)}
                  className={`button ${selectedCountry === countryName ? "is-selected" : ""}`}
                >
                  {countryName}
                </button>
              ))}
            </div>
          </div>
        </div>
         
          <div className="questions_answers-grid">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for questions.."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {displayedPlans.map((plan, index) => (
            <div
              key={index}
              className={`questions_answers-card ${activeIndex === index ? "expanded" : "collapsed"}`}
            >
              <button
                className="qa-btn"
                onClick={() => toggleVisibility(index)}
              >
                <span>{activeIndex === index ? "-" : "+"}</span>
                {plan.answer}
              </button>
              {activeIndex === index && (
                <div className="questions_answers_tab">
                  {/* Displaying category and country information */}
                  <div className="category-country-info">
                    <strong>Category:</strong> {plan.categoryNames.join(', ')} <br />
                    <strong>Country:</strong> {plan.countryNames.join(', ')}
                  </div>
                  <p className="questions_answers_paragraph">
                    {plan.description}
                  </p>
                  <div className="price-answer">
                    <p>{plan.subHeader}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

QuestionsAnswers.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.arrayOf(PropTypes.string),
      countryName: PropTypes.arrayOf(PropTypes.string),
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          answer: PropTypes.string,
          description: PropTypes.string,
          subHeader: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default QuestionsAnswers;
