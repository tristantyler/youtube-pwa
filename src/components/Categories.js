import React, {Component, lazy} from 'react'

const VideoItem = lazy(() => import('./VideoItem'));

const API = process.env.REACT_APP_GOOGLE_API_KEY

export class Categories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      videos: [],
      playlists: [],
    }
  }

  async getVideos(){
    const videos = await JSON.parse(localStorage.getItem('videos'))
    this.setState({videos})

    const playlists = await JSON.parse(localStorage.getItem('playlists'))
    this.setState({playlists})
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      await this.getVideos()

      if (nextProps.match.params.id !== 'all') {
          var i = 0
          for(i; i < this.state.playlists.length; i++){
              if(nextProps.match.params.id === this.state.playlists[i].title){
                var pi = this.state.playlists[i].id
                const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API}&part=snippet&playlistId=${pi}`
                const response = await fetch(url);
                const data = await response.json();
                // console.log("Category API called: Other", this.state.playlists[i].title)

                const videos = data.items.map(obj => obj = {
                  id:obj.snippet.resourceId.videoId,
                  url: "https://www.youtube.com/watch?v="+obj.snippet.resourceId.videoId,
                  image: obj.snippet.thumbnails.high.url,
                })
                this.setState({videos})

                break;
             }
           }
        }

        this.setState({loaded: true})
      return true;
    }

    return false;
  }

  async componentDidMount(){
    await this.getVideos()
    if (this.props.match.params.id !== 'all') {
        var i = 0
        for(i; i < this.state.playlists.length; i++){
            if(this.props.match.params.id === this.state.playlists[i].title){
              var pi = this.state.playlists[i].id
              const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API}&part=snippet&playlistId=${pi}`
              const response = await fetch(url);
              const data = await response.json();

              // console.log("Category API called: Other", this.state.playlists[i].title)

              const videos = data.items.map(obj => obj = {
                id:obj.snippet.resourceId.videoId,
                url: "https://www.youtube.com/watch?v="+obj.snippet.resourceId.videoId,
                image: obj.snippet.thumbnails.high.url,
              })
              this.setState({videos})

              break;
           }
         }
      }

      this.setState({loaded: true})
  }


  content() {
    return this.state.videos.map((vid, i) => (
      <VideoItem key={vid.id} video={vid}/>
    ));
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
