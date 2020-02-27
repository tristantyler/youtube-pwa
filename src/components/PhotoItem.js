import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export class PhotoItem extends Component {

  render() {
    const {id, psrc} = this.props.photo;

    return (<div className="row ">
      <div className="col-8 ">
        <Link to={`/select/${this.props.photo.id}`}><img src={psrc} className="img-fluid img-thumbnail rounded float-left" alt={id}/>
        </Link>
      </div>
    </div>)
  }
}

// PropTypes
PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoItem;
