import React from 'react'
import PropTypes from 'prop-types'
import { SolutionPostTemplate} from '../../templates/solution-page'

const SolutionPagePreview = ({ entry, widgetFor }) => {

  return (
    <SolutionPostTemplate
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
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
