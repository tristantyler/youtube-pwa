import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export class FilterHeader extends Component {

  render(){
      return(
        <div className="row">
          <Link to="/categories/all">
            <button type="button" className="btn btn-outline-primary" onClick={this.props.getCategory.bind(this, "all")}>All</button>
          </Link>
          <Link to="/categories/water">
            <button type="button" className="btn btn-outline-primary" onClick={this.props.getCategory.bind(this, "water")}>Water</button>
          </Link>
          <Link to="/categories/bridge">
            <button type="button" className="btn btn-outline-primary" onClick={this.props.getCategory.bind(this, "bridge")}>Bridge</button>
          </Link>
          <Link to="/categories/nature">
            <button type="button" className="btn btn-outline-primary" onClick={this.props.getCategory.bind(this, "nature")}>Nature</button>
          </Link>
        </div>
      )
    }
  }


// PropTypes
FilterHeader.propTypes = {
  tabselect: PropTypes.object.isRequired,
}

export default FilterHeader;
