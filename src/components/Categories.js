import React, {Component} from 'react'
import PhotoItem from './PhotoItem'
import data from '../data.json';

export class Categories extends Component {



  constructor(props) {
    super(props)
    this.loadData = JSON.parse(JSON.stringify(data));
    this.state = {
      loaded: false,
      photo: {},
      photos: []
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id) {

      this.setState({loaded: false})
      await this.setState({
        photos: [...this.loadData]
      });
      if (this.props.match.params.id === 'all') {
        await this.setState({
          photo: [...this.state.photos]
        });
      } else {
        await this.setState({
          photo: [...this.state.photos.filter(photo => photo.category.toLowerCase() === this.props.match.params.id)]
        });
      }

      this.setState({loaded: true})
      return true;
    }

    return false;
  }

  async componentDidMount() {
    await this.setState({
      photos: [...this.loadData]
    });
    if (this.props.match.params.id === 'all') {
      await this.setState({
        photo: [...this.state.photos]
      });
    } else {
      await this.setState({
        photo: [...this.state.photos.filter(photo => photo.category.toLowerCase() === this.props.match.params.id)]
      });
    }

    this.setState({loaded: true})

  }

  content() {
    return this.state.photo.map((photo) => (<PhotoItem key={photo.id} photo={photo} />));
  }

  render() {
    return (<div>
      {
        this.state.loaded
          ? this.content()
          : null
      }
    </div>)
  }
}

export default Categories;
