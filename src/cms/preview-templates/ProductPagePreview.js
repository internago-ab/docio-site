import React from 'react';
import PropTypes from 'prop-types';
import { ProductPageTemplate } from '../../templates/product-page';

const ProductPagePreview = ({ entry, getAsset }) => {

  // Retrieve the 'categories' instead of 'plans'
  const entryPricingCategories = entry.getIn(['data', 'pricing', 'categories']);
  const pricingCategories = entryPricingCategories ? entryPricingCategories.toJS() : [];

  return (
    <ProductPageTemplate
      image={getAsset(entry.getIn(['data', 'image']))}
      title={entry.getIn(['data', 'title'])}
      alt={entry.getIn(['data', 'alt'])}
      heading={entry.getIn(['data', 'heading'])}
      subheading={entry.getIn(['data', 'subheading'])}
      button={entry.getIn(['data', 'button'])}
      href={entry.getIn(['data', 'href'])}
      pricing={{
        heading: entry.getIn(['data', 'pricing', 'heading']),
        description: entry.getIn(['data', 'pricing', 'description']),
        categories: pricingCategories, 
      }}
    />
  );
};

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default ProductPagePreview;
