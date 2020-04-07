import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Videos from './components/Videos';
import Header from './components/layout/Header';
import VideoSelect from './components/VideoSelect';
import Categories from './components/Categories'
import {Helmet} from 'react-helmet';
import { Container, Col } from 'react-bootstrap';

const API = ""
const channelID = "UCBY5hSLBKHpaVLo61cN7tJA"
// const channelID = "UC4a-Gbdw7vOaccHmFo40b9g"
const result = 30;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

class App extends Component {

  state = {
    videos: [],
    tabselect: {
      tab: 'home'
    }
  }

  async componentDidMount(){
    const url = finalURL;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (data){
      const videos = data.items.map(obj => obj = {
        id: obj.id.videoId,
        url: "https://www.youtube.com/watch?v="+obj.id.videoId,
        image: obj.snippet.thumbnails.high.url,
      })
      this.setState({videos})
    }

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
                <Videos videos={this.state.videos} />
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
                <title>Video Select</title>
              </Helmet>
              <React.Fragment>
                <VideoSelect {...props} tabselect={this.state.tabselect}/>
              </React.Fragment>
            </div>)}/>
        </Col>
      </Container>
    </Router>);
  }
}

export default App;
