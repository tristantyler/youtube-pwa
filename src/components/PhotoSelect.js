import React, { Component } from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap';
import data from '../data.json';

export class PhotoSelect extends Component {

  loadData = JSON.parse(JSON.stringify(data));

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      photo: {},
      photos: []
    }
  }

  async componentDidMount() {
      await this.setState({photos: [...this.loadData]});
      const photo = await this.state.photos.filter(photo => photo.id === this.props.match.params.id);

      this.setState({loaded: true})
      for(var prop in photo) {
        this.setState({photo: photo[prop]})
      }
    }

  content () {
    return(
      <div>
        <Row>
         <Col>
               <img src={this.state.photo.psrc} className="img-fluid img-thumbnail rounded float-left" alt={this.state.photo.id}/>
         </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup variant="flush" className="block-example border border-dark">
              <ListGroup.Item variant="light"><h5>Width:</h5> {this.state.photo.w} </ListGroup.Item>
              <ListGroup.Item variant="light"><h5>Height:</h5> {this.state.photo.h} </ListGroup.Item>
              <ListGroup.Item variant="light"><h5>Category:</h5> {this.state.photo.category}</ListGroup.Item>
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

export default PhotoSelect;
