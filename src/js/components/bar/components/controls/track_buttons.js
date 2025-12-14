import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { resume, pause, nextSong, prevSong } from '../../../../audio/actions';
import { constants } from '../../../../toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   min-height: 14vh;
   margin-top: 16px;
`;

const IconButton = styled.button`
   background: transparent;
   border: none;
   padding: 0;
   margin: 0 8px;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   transition: transform 0.1s ease;

   &:hover {
      transform: scale(1.1);
      background-color: rgba(0,0,0,0.05);
   }

   &:active {
      transform: scale(0.95);
   }

   &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${color.blue[4]};
   }
`;

const Icon = styled.img`
   height: 32px;
   width: 32px;
   display: block;
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      resume: () => dispatch(resume()),
      pause: () => dispatch(pause()),
      nextSong: () => dispatch(nextSong()),
      prevSong: () => dispatch(prevSong()),
   };
};

class TrackButtons extends Component {
   resume = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.resume();
      }
   }

   pause = () => {
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;

      if (hasAudio && isPlaying) {
         this.props.pause();
      }
   }

   nextSong = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.nextSong();
      }
   };

   prevSong = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.prevSong();
      }
   };

   render() {
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;
      const path = `images`;

      return (
         <Container>
            <IconButton onClick={this.prevSong} aria-label="Previous Song">
               <Icon src={`${path}/skip_back.svg`} alt="" />
            </IconButton>
            {!(!!hasAudio && !!isPlaying) && (
               <IconButton onClick={this.resume} aria-label="Play">
                  <Icon src={`${path}/play.svg`} alt="" />
               </IconButton>
            )}
            {!!isPlaying && (
               <IconButton onClick={this.pause} aria-label="Pause">
                  <Icon src={`${path}/pause.svg`} alt="" />
               </IconButton>
            )}
            <IconButton onClick={this.nextSong} aria-label="Next Song">
               <Icon src={`${path}/skip_next.svg`} alt="" />
            </IconButton>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackButtons);
