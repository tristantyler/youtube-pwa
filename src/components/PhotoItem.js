import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export class PhotoItem extends Component {

  render () {
    const { id, psrc, category } = this.props.photo;

      return(
        <div className="row">
         <div className="col-8">
             <Link onClick={this.props.getSelect.bind(this, category, id, psrc)}
               to={`/select/${this.props.photo.id}`}><img src={psrc} className="img-fluid img-thumbnail rounded float-left" alt={id}/>
             </Link>
         </div>
        </div>
      )
  }
}

// PropTypes
PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  tabselect: PropTypes.object.isRequired,
  getSelect: PropTypes.func.isRequired
}

export default PhotoItem;
