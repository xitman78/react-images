import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import PlayButton from '../icons/playButton';

const MIN_SWIPE_LENGTH = 40.0;

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

  onVideoTouch(e) {
    /**
     * track touch swipes
     */

    let self = this;

    this.touchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    let onTouchEnd = function(e) {
      self.swipeStarted = false;

      let offsetX = self.touchPos.x - e.changedTouches[0].clientX;
      let offsetY = self.touchPos.y - e.changedTouches[0].clientY;

      if (Math.abs(offsetX) > (3.0 * Math.abs(offsetY)) && Math.abs(offsetX) > MIN_SWIPE_LENGTH) {
        if (offsetX < 0) {
          // swipe left
          if (self.props.onSwipeLeft) self.props.onSwipeLeft();
        } else {
          // swipe right
          if (self.props.onSwipeRight) self.props.onSwipeRight();
        }
      }

      window.removeEventListener("touchend", onTouchEnd);
    };
    window.addEventListener("touchend", onTouchEnd);
  }

  render()
  {
    return (<div style={{textAlign: 'center'}}>
      <div style={{position: 'relative', display: 'inline-block', maxWidth: '100vw', pointerEvents: 'auto', backgroundColor: 'black', maxHeight: `calc(100vh - ${this.props.heightOffset}px)`}}>
        <div onClick={this.onWrapperClick.bind(this)}
             onTouchStart={this.onVideoTouch.bind(this)}
             style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '90%', zIndex: 100, cursor: this.props.style.cursor ? this.props.style.cursor : 'auto'}}>
          <PlayButton
            fill="#FFFFFF"
            className={css(classes.play)}
            style={{opacity: this.state.play ? 0 : 0.8 }}
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
      </div>
    </div>);
  }

}

Video.propTypes = {
  className: PropTypes.string.isRequired,
  heightOffset: PropTypes.number.isRequired,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  poster: PropTypes.string.isRequired,
  preload: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
};

Video.defaultProps = {
  preload: "auto",
};

const classes = StyleSheet.create({
  play: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '18%',
    height: '18%',
    minWidth: 20,
    minHeight: 20,
    margin: 'auto',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  },
});