import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Photos from './components/Photos';
import Header from './components/layout/Header';
import FilterHeader from './components/layout/FilterHeader';
import PhotoSelect from './components/PhotoSelect';
import { Helmet } from 'react-helmet';

import data from './data.json';

class App extends Component {

  loadData = JSON.parse(JSON.stringify(data));

  state = {
    photos: [ ],
    photocopy: [ ],
    photoselect:{ },
    tabselect: { tab: 'home' },
  }

  componentDidMount(){
    this.setState({photos: [...this.loadData]});
    this.setState({photocopy: [...this.loadData]});
    this.setState({photoselect: [...this.state.photos.filter( photo =>
      photo.id === 1)]});
  }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Categories
  getCategory = (category) => {
    if (category === "all"){
      this.setState({ photocopy: [...this.state.photos]});
    }else{
      this.setState({ photocopy: [...this.state.photos.filter( photo =>
        photo.category === category)]});
    }
    this.setTab('category')
    document.title = "Categories | " + this.capitalizeFirstLetter(category)
  }

  // Select
  getSelect = (category, id, psrc) => {
    this.setState(prevState =>({
      photoselect: {
        ...prevState.photoselect,
        id: id,
        psrc: psrc,
        category: category
      }}))
    this.setTab('select')
  }

  // Set Tab
  setTab = (tab) => {
    this.setState(prevState =>({
      tabselect: {
        ...prevState.tabselect,
        tab: tab
      }}))
    if(tab !== "category"){
      this.setState({ photocopy: [...this.state.photos]});
    }
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Header setTab={this.setTab} tabselect={this.state.tabselect} getCategory={this.getCategory}/>
          <div className="container-fluid">
          <Route exact path="/" render={props => (
            <div>
              <Helmet>
                <title>Home | Recent</title>
              </Helmet>
              <FilterHeader tabselect={this.state.tabselect} getCategory={this.getCategory}/>
              <React.Fragment>
                <Photos photos={this.state.photos} getCategory={this.getCategory}
                  getSelect={this.getSelect} tabselect={this.state.tabselect}/>
              </React.Fragment>
            </div>
            )} />
          <Route path="/categories/" render={props => (
              <div>
                <Helmet>
                  <title>Categories | All</title>
                </Helmet>
                <FilterHeader tabselect={this.state.tabselect} getCategory={this.getCategory}/>
                <React.Fragment>
                  <Photos photos={this.state.photocopy} getCategory={this.getCategory}
                    getSelect={this.getSelect} tabselect={this.state.tabselect} />
                </React.Fragment>
              </div>
            )} />
          <Route exact path="/select" render={props => (
            <div>
              <Helmet>
                <title>Photo Select</title>
              </Helmet>
              <React.Fragment>
                <PhotoSelect photo={this.state.photoselect}  />
              </React.Fragment>
            </div>
            )} />
          </div>
          </div>
      </Router>
    );
  }
}

export default App;
