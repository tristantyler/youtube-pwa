import React, { Component } from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap';

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
    const videos = await JSON.parse(localStorage.getItem('videos'))
    this.setState({videos})

    var i = 0
    var found = false
    for(i; i < this.state.videos.length; i++){
        if(this.state.videos[i].id === this.props.match.params.id){
          found = true
          break;
       }
     }

    if (found){
      const video = this.state.videos[i]
      this.setState({video})
    }

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
