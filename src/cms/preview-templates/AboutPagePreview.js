import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(['data']).toJS(); // This converts the entire data object into a JS object
  const entryTestimonials = entry.getIn(['data', 'testimonials']);
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : [];

  // Check if mainpitch has an image and replace it with the correct URL
  if (data.mainpitch && data.mainpitch.image) {
    const imagePath = getAsset(data.mainpitch.image);
    data.mainpitch.image = imagePath.toString();
  }

  return (
    <AboutPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
      mainpitch={data.mainpitch}
      testimonials={testimonials}
      fullImage={getAsset(entry.getIn(['data', 'full_image']))}
    />
  );
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default AboutPagePreview;
