import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

const API = ""
const channelID = "UCBY5hSLBKHpaVLo61cN7tJA"
// const channelID = "UC4a-Gbdw7vOaccHmFo40b9g"
const result = 50;

var playURL = `https://www.googleapis.com/youtube/v3/playlists?key=${API}&channelId=${channelID}&part=snippet&regionCode=US&maxResults=${result}`

export class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  async componentDidMount(){
    const urlsa = playURL;
    const responses = await fetch(urlsa);
    const datas = await responses.json();
    const playlists = datas.items.map(obj => obj.snippet.title)
    this.setState({playlists})

  }

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
                      this.state.playlists.map((item, i) => {
                        const s = `/categories/${item}`
                        var frame = <NavDropdown.Item>
                                      <Link to={s} onClick={this.props.setTab.bind(this, item)}>{item}</Link>
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
