import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PhotoItem from './PhotoItem'

class Photos extends Component {

  render () {
    return this.props.photos.map((photo) => (
      <PhotoItem key={photo.id} photo={photo} getCategory={this.props.getCategory}
        getSelect={this.props.getSelect} tabselect={this.props.tabselect}/>
    ));
  }
}


// PropTypes
Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  getCategory: PropTypes.func.isRequired,
  tabselect: PropTypes.object.isRequired,
  getSelect: PropTypes.func.isRequired

}

export default Photos;
