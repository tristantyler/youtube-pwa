import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export class Header extends Component {

  setActive(tab) {
    if (this.props.tabselect.tab === tab) {
      return "nav-link active"
    } else {
      return "nav-link"
    }
  }

  render() {

    if (this.props.tabselect.tab === "select") {
      return (<header className="nav alert-dark justify-content-center">
        <ul className="nav nav-pills ">
          <li className="nav-item">
            <Link className={this.setActive("home")} onClick={this.props.setTab.bind(this, 'home')} to="/">
              <h5>Home</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={this.setActive("category")} onClick={this.props.setTab.bind(this, 'category')} to="/categories/all">
              <h5>Categories</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={this.setActive("select")} onClick={this.props.setTab.bind(this, 'select')} to="/select">
              <h5>Photo Select</h5>
            </Link>
          </li>
        </ul>

      </header>)
    } else {
      return (<header className="nav alert-dark justify-content-center">
        <ul className="nav nav-pills ">
          <li className="nav-item">
            <Link className={this.setActive("home")} onClick={this.props.setTab.bind(this, 'home')} to="/">
              <h5>Home</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={this.setActive("category")} onClick={this.props.setTab.bind(this, 'category')} to="/categories/all">
              <h5>Categories</h5>
            </Link>
          </li>
        </ul>

      </header>)
    }
  }
}

// PropTypes
Header.propTypes = {
  tabselect: PropTypes.object.isRequired,
  setTab: PropTypes.func.isRequired
}

export default Header;
