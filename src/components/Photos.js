import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PhotoItem from './PhotoItem'

class Photos extends Component {

  render() {
    return this.props.photos.map((photo) => (<PhotoItem key={photo.id} photo={photo}/>));
  }
}

// PropTypes
Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos;
