import React, { Component, PropTypes } from 'react';
import PlayButton from '../icons/playButton';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {play: false};
  }

  onWrapperClick(e)
  {
    e.stopPropagation();
    if (this.state.play) {
      this.refs.video_player.pause();
    } else {
      this.refs.video_player.play();
    }
  }

  componentDidMount()
  {
    let self = this;
    let video = this.refs.video_player;

    video.addEventListener("play", () => {
      self.setState({play: true});
    }, false);

    video.addEventListener("pause", () => {
      self.setState({play: false});
    }, false);
  }

  render()
  {
    return (<div style={{position: 'relative', pointerEvents: 'auto', backgroundColor: 'black'}}>
      <div onClick={this.onWrapperClick.bind(this)}
           style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '90%', zIndex: 100, cursor: this.props.style.cursor ? this.props.style.cursor : 'auto'}}>
        <PlayButton
          fill="#FFFFFF"
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '18%', height: '18%', margin: 'auto', opacity: this.state.play ? 0 : 0.8 , cursor: 'pointer', transition: 'opacity 0.3s'}}
          />
      </div>
      <video
        ref="video_player"
        src={this.props.src}
        preload={this.props.preload}
        controls
        className={this.props.className}
        poster={this.props.poster}
        style={this.props.style}>
      <source key={this.props.src} src={this.props.src}/>
      {
        this.props.srcset.map((src) => {
          return <source key={src} src={src}/>
        })
      }
      </video>
    </div>);
  }

}

Video.propTypes = {
  className: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  preload: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
};

Video.defaultProps = {
  preload: "auto",
};