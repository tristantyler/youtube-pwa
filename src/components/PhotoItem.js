import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Media} from 'react-bootstrap';

export class PhotoItem extends Component {

  render() {
    const {id, psrc} = this.props.photo;

    return (<Media>
      <Link to={`/select/${this.props.photo.id}`}><img src={psrc} className="img-fluid img-thumbnail" alt={id}/>
      </Link>
    </Media>)
  }
}

export default PhotoItem;
