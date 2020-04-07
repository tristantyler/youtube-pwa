import React, { Component } from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap';

const API = "AIzaSyCvRiuQQ2t760UDpI6yd1nF9tlP0tDoERg"
const channelID = "UCBY5hSLBKHpaVLo61cN7tJA"
// const channelID = "UC4a-Gbdw7vOaccHmFo40b9g"
const result = 50;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

export class VideoSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      videos: [],
      video: [],
    }
  }

  async componentDidMount(){
    const urli = finalURL;
    const response = await fetch(urli);
    const data = await response.json();

    const videos = data.items.map(obj => obj = {
      id: obj.id.videoId,
      url: "https://www.youtube.com/watch?v="+obj.id.videoId,
      image: obj.snippet.thumbnails.high.url,
      title: obj.snippet.title,
      channel: obj.snippet.channelTitle,
    })
    this.setState({videos})

    var i = 0
    for(i; i < this.state.videos.length; i++){
        if(this.state.videos[i].id === this.props.match.params.id){
          break;
       }
     }

    const video = this.state.videos[i]
    this.setState({video})

    this.setState({loaded: true})
  }

  content () {
    return(
      <div>
        <Row>
         <Col>
           <img src={this.state.video.image} className="img-fluid img-thumbnail rounded float-left" alt={this.state.video.id}/>
         </Col>
         <Col>
           <ListGroup>
            <ListGroup.Item><a href={this.state.video.url}>Video Link</a></ListGroup.Item>
            <ListGroup.Item>Channel: {this.state.video.channel}</ListGroup.Item>
            <ListGroup.Item>Title: {this.state.video.title}</ListGroup.Item>
           </ListGroup>
         </Col>
        </Row>
    </div>
    )
  }

  render () {
    return(
      <div>
        {this.state.loaded ? this.content() : null}
      </div>
    )
  }
}

export default VideoSelect;
