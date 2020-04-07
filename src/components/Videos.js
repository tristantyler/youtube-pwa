import React, {Component} from 'react'
import VideoItem from './VideoItem'

class Videos extends Component {

  render() {
    return this.props.videos.map((vid, i) => (
      <VideoItem key={vid.id} video={vid}/>
    ));
  }
}

export default Videos;
