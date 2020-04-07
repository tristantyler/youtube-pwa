import React, {Component} from 'react'
import VideoItem from './VideoItem'

const API = ""
const channelID = "UCBY5hSLBKHpaVLo61cN7tJA"
// const channelID = "UC4a-Gbdw7vOaccHmFo40b9g"
const result = 50;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
var playURL = `https://www.googleapis.com/youtube/v3/playlists?key=${API}&channelId=${channelID}&part=snippet&regionCode=US&maxResults=${result}`

export class Categories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      videos: [],
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id) {

      const urlsa = playURL;
      const responses = await fetch(urlsa);
      const datas = await responses.json();
      const playlists = datas.items.map(obj => obj.snippet.title)

      if (this.props.match.params.id === 'all') {
          const url = finalURL;
          const response = await fetch(url);
          const data = await response.json();

          const videos = data.items.map(obj => obj = {
            id: obj.id.videoId,
            url: "https://www.youtube.com/watch?v="+obj.id.videoId,
            image: obj.snippet.thumbnails.high.url,
          })
          this.setState({videos})

        } else {
          var i = 0
          for(i; i < playlists.length; i++){
              if(this.props.match.params.id === playlists[i]){
                var pi = datas.items[i].id
                const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API}&part=snippet&playlistId=${pi}`
                const response = await fetch(url);
                const data = await response.json();

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
    const urlsa = playURL;
    const responses = await fetch(urlsa);
    const datas = await responses.json();
    const playlists = datas.items.map(obj => obj.snippet.title)

    if (this.props.match.params.id === 'all') {
        const url = finalURL;
        const response = await fetch(url);
        const data = await response.json();

        const videos = data.items.map(obj => obj = {
          id: obj.id.videoId,
          url: "https://www.youtube.com/watch?v="+obj.id.videoId,
          image: obj.snippet.thumbnails.high.url,
        })
        this.setState({videos})

      } else {
        var i = 0
        for(i; i < playlists.length; i++){
            if(this.props.match.params.id === playlists[i]){
              var pi = datas.items[i].id
              const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API}&part=snippet&playlistId=${pi}`
              const response = await fetch(url);
              const data = await response.json();

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
