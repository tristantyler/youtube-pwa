import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Media} from 'react-bootstrap';

export class VideoItem extends Component {

  render() {

    return (
      <Media><Link to={`/select/${this.props.video.id}`}><img src={this.props.video.image} className="img-fluid img-thumbnail" alt={this.props.video.id}/></Link></Media>
    )
  }
}

export default VideoItem;
