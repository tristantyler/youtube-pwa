import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Photos from './components/Photos';
import Header from './components/layout/Header';
import PhotoSelect from './components/PhotoSelect';
import Categories from './components/Categories'
import {Helmet} from 'react-helmet';
import { Container, Col } from 'react-bootstrap';

import data from './data.json';

class App extends Component {

  loadData = JSON.parse(JSON.stringify(data));

  state = {
    photos: [],
    tabselect: {
      tab: 'home'
    }
  }

  componentDidMount() {
    this.setState({
      photos: [...this.loadData]
    });
  }

  // Set Tab
  setTab = (tab) => {
    this.setState(prevState => ({
      tabselect: {
        ...prevState.tabselect,
        tab: tab
      }
    }))
  }

  render() {

    return (<Router>
      <Container fluid >
        <Header setTab={this.setTab} />
        <Col sm>
          <Route exact="exact" path="/" render={props => (<div>
              <Helmet>
                <title>Home | Recent</title>
              </Helmet>
              <React.Fragment>
                <Photos photos={this.state.photos}/>
              </React.Fragment>
            </div>)}/>
          <Route exact="exact" path="/categories/:id" render={props => (<div>
              <Helmet>
                <title>Categories</title>
              </Helmet>
              <React.Fragment>
                <Categories {...props} key={this.state.tabselect.tab}/>
              </React.Fragment>
            </div>)}/>
          <Route exact="exact" path="/select/:id" render={props => (<div>
              <Helmet>
                <title>Photo Select</title>
              </Helmet>
              <React.Fragment>
                <PhotoSelect {...props} tabselect={this.state.tabselect}/>
              </React.Fragment>
            </div>)}/>
        </Col>
      </Container>
    </Router>);
  }
}

export default App;
