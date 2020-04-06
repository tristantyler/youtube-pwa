import React, {Component} from 'react'

import PhotoItem from './PhotoItem'

class Photos extends Component {


  render() {
    return this.props.photos.map((photo) => (
      <PhotoItem key={photo.id} photo={photo}/>
    ));
  }
}

export default Photos;
