import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Header extends Component {


  render() {
      return (<Navbar bg="dark" variant="dark">
                <Navbar.Brand>Videos</Navbar.Brand>
                <Nav className="mr-auto">
                  <Link className="nav-link" onClick={this.props.setTab.bind(this, 'home')} to="/">
                    Home
                  </Link>
                  <NavDropdown title="Categories" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link to="/categories/all" onClick={this.props.setTab.bind(this, "all")}>All</Link>
                    </NavDropdown.Item>

                    {
                      this.props.playlists.map((item, i) => {
                        const s = `/categories/${item.title}`
                        var frame = <NavDropdown.Item>
                                      <Link to={s} onClick={this.props.setTab.bind(this, item.title)}>{item.title}</Link>
                                    </NavDropdown.Item>
                        return frame
                      })
                    }
                    {this.frame}

                  </NavDropdown>
                </Nav>
              </Navbar>)
      }
    }

export default Header;
