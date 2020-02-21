import React, { Component } from 'react'

export class PhotoSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      photo: {}
    }
  }

  async componentDidMount() {
      const photo = await this.props.photos.filter(photo => photo.id === this.props.match.params.id);

      this.setState({loaded: true})
      for(var prop in photo) {
        this.setState({photo: photo[prop]})
      }
    }

  content () {
    return(
        <div>
        <div className="row">
         <div className="col-8">
               <img src={this.state.photo.psrc} className="img-fluid img-thumbnail rounded float-left" alt={this.state.photo.id}/>
         </div>
        </div>
        <div className="row">
        <div className="col-5">
          <div className="list-group-fluid">
            <div className="list-group-item list-group-item-action"><h5>Width:</h5> 600</div>
            <div className="list-group-item list-group-item-action"><h5>Height:</h5> 400</div>
            <div className="list-group-item list-group-item-action"><h5>Category:</h5> {this.state.photo.category}</div>
          </div>
        </div>
        </div>
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
