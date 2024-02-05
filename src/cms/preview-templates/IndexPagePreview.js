import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  
  // Processing the main image
  const image = data.image ? getAsset(data.image) : '';
  const listsImage = data.lists && data.lists.image ? getAsset(data.lists.image) : null;

  // Processing the mainpitch image
  const mainpitchImage = data.mainpitch && data.mainpitch.image ? getAsset(data.mainpitch.image) : null;

  if (data) {
    return (
      <IndexPageTemplate
        image={image}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        button={data.button}
        description={data.description}
        intro={data.intro || { blurbs: [] }}
        blocks={data.blocks || { grid: [] }}
        lists={data.lists ? { ...data.lists, image: listsImage } : { listItem: [] }}
        mainpitch={data.mainpitch ? { ...data.mainpitch, image: mainpitchImage } : {}}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview