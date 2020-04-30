import React, {Component, lazy} from 'react'

const VideoItem = lazy(() => import('./VideoItem'));

class Videos extends Component {

  render() {
    return this.props.videos.map((vid, i) => (
      <VideoItem key={vid.id} video={vid}/>
    ));
  }
}

export default Videos;
