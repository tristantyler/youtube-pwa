import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export class FilterHeader extends Component {


  render() {
    return (<div className="row justify-content-left">
      <Link to="/categories/all">
        <button type="button" className="btn btn-outline-primary" onClick={this.props.setTab.bind(this, "all")}>All</button>
      </Link>
      <Link to="/categories/water">
        <button type="button" className="btn btn-outline-primary" onClick={this.props.setTab.bind(this, "water")}>Water</button>
      </Link>
      <Link to="/categories/bridge">
        <button type="button" className="btn btn-outline-primary" onClick={this.props.setTab.bind(this, "bridge")}>Bridge</button>
      </Link>
      <Link to="/categories/nature">
        <button type="button" className="btn btn-outline-primary" onClick={this.props.setTab.bind(this, "nature")}>Nature</button>
      </Link>
    </div>)
  }
}


export default FilterHeader;
