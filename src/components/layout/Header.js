import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Header extends Component {

  render() {
      return (<Navbar bg="dark" variant="dark">
                <Navbar.Brand>Photos</Navbar.Brand>
                <Nav className="mr-auto">
                  <Link className="nav-link" onClick={this.props.setTab.bind(this, 'home')} to="/">
                    Home
                  </Link>
                  <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link to="/categories/all" onClick={this.props.setTab.bind(this, "all")}>All</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/categories/water" onClick={this.props.setTab.bind(this, "water")}>Water</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/categories/bridge" onClick={this.props.setTab.bind(this, "bridge")}>Bridge</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/categories/nature" onClick={this.props.setTab.bind(this, "nature")}>Nature</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar>)
      }
    }


export default Header;
