import React from 'react';
import PropTypes from 'prop-types';
import { QaPageTemplate } from '../../templates/qa-page';

const QaPagePreview = ({ entry, getAsset }) => {

  const entryQaCategories = entry.getIn(['data', 'qa', 'categories']);
  const qaCategories = entryQaCategories ? entryQaCategories.toJS() : [];

  const ctaData = entry.getIn(['data', 'cta']) ? entry.getIn(['data', 'cta']).toJS() : {};

  if (ctaData.image) {
    ctaData.image = getAsset(ctaData.image);
  }
  return (
    <QaPageTemplate
      image={getAsset(entry.getIn(['data', 'image']))}
      title={entry.getIn(['data', 'title'])}
      alt={entry.getIn(['data', 'alt'])}
      heading={entry.getIn(['data', 'heading'])}
      subheading={entry.getIn(['data', 'subheading'])}
      button={entry.getIn(['data', 'button'])}
      href={entry.getIn(['data', 'href'])}
      qa={{
        heading: entry.getIn(['data', 'qa', 'heading']),
        description: entry.getIn(['data', 'qa', 'description']),
        categories: qaCategories, 
      }}
      cta={ctaData}
    />
  );
};

QaPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default QaPagePreview;
