import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class PhotoSelect extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render () {
    const { id, psrc, category} = this.props.photo;
    console.log(id, psrc, category);
    return(
      <div>
      <div className="row">
       <div className="col-8">
             <img src={psrc} className="img-fluid img-thumbnail rounded float-left" alt={id}/>
       </div>
      </div>
      <div className="row">
      <div className="col-5">
        <div className="list-group-fluid">
          <div className="list-group-item list-group-item-action"><h5>Width:</h5> 600</div>
          <div className="list-group-item list-group-item-action"><h5>Height:</h5> 400</div>
          <div className="list-group-item list-group-item-action"><h5>Category:</h5> {this.capitalizeFirstLetter(category)}</div>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

// PropTypes
PhotoSelect.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoSelect;
