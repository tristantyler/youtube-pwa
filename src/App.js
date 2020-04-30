import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { Container, Col } from 'react-bootstrap';

const Videos = lazy(() => import('./components/Videos'));
const Header = lazy(() => import('./components/layout/Header'));
const VideoSelect = lazy(() => import('./components/VideoSelect'));
const Categories = lazy(() => import('./components/Categories'));

const NoMatch = ({ location }) => (
  <div>
    <h3>404 Error! No match for <code>{location.pathname}</code></h3>
  </div>
)

const API = process.env.REACT_APP_GOOGLE_API_KEY
const channelID = "UCBY5hSLBKHpaVLo61cN7tJA"
const result = 20;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
var playURL = `https://www.googleapis.com/youtube/v3/playlists?key=${API}&channelId=${channelID}&part=snippet&regionCode=US&maxResults=${result}`

class App extends Component {

  state = {
    videos: [],
    playlists: [],
    tabselect: {
      tab: 'home'
    }
  }

  async componentDidMount(){
    const url = finalURL;
    const response = await fetch(url);
    const data = await response.json();
    // console.log("APP API called", data)
    const videos = data.items.map(obj => obj = {
      id: obj.id.videoId,
      url: "https://www.youtube.com/watch?v="+obj.id.videoId,
      image: obj.snippet.thumbnails.high.url,
      title: obj.snippet.title,
      channel: obj.snippet.channelTitle,
    })
    this.setState({videos})
    localStorage.setItem('videos', JSON.stringify(videos))

    const urlp = playURL;
    const responsep = await fetch(urlp);
    const datap = await responsep.json();
    // console.log("Header API Called")
    const playlists = datap.items.map(obj => obj ={
      title: obj.snippet.title,
      id: obj.id
    })
    this.setState({playlists})
    localStorage.setItem('playlists', JSON.stringify(playlists))

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
              <Suspense fallback={<div>Loading...</div>}>
                <Container fluid >
                  <Header setTab={this.setTab} playlists={this.state.playlists} />
                  <Col sm>
                    <Switch>
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
                          <Categories {...props} key={this.state.tabselect.tab} />
                        </React.Fragment>
                      </div>)}/>
                    <Route exact="exact" path="/select/:id" render={props => (<div>
                        <Helmet>
                          <title>Video Select</title>
                        </Helmet>
                        <React.Fragment>
                          <VideoSelect {...props} tabselect={this.state.tabselect} />
                        </React.Fragment>
                      </div>)}/>
                    <Route component={NoMatch} />
                  </Switch>
                  </Col>
                </Container>
              </Suspense>
            </Router>);
      }
}

export default App;
