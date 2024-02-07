import React from 'react'
import PropTypes from 'prop-types'
import { SolutionPostTemplate} from '../../templates/solution-page'

const SolutionPagePreview = ({ entry, getAsset }) => {
  // Use getAsset to get the correct path for the image
  const image = getAsset(entry.getIn(['data', 'image']));

  return (
    <SolutionPostTemplate
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
      alt={entry.getIn(['data', 'alt'])}
      subheader={entry.getIn(['data', 'subheader'])}
      text={entry.getIn(['data', 'text'])}
      image={image.toString()} 
    />
  )
}

SolutionPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SolutionPagePreview
