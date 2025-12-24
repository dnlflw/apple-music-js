import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchPlaylists } from '../../api/actions';
import { pushView, pushPopup } from '../actions';
import { PlaylistButton } from '../../toolbox';

const Container = styled.div`
   margin-top: 48px;
`;

const ButtonContainer = styled.div``;

export class PlaylistListView extends Component {
   viewPlaylist = ({ playlist, index }) => {
      this.props.pushView({
         name: 'Playlist',
         title: playlist.title,
         props: {
            hideTitle: true,
            index,
            playlist,
         },
      });
   };

   newPlaylist = () => {
      this.props.pushPopup({
         name: 'Playlist Creator',
         props: {},
      });
   };

   componentDidMount() {
      const { playlists } = this.props;
      // ⚡ OPTIMIZATION: Only fetch if we don't have playlists yet
      if (!playlists || Object.keys(playlists).length === 0) {
         this.props.fetchPlaylists();
      }
   }

   getPlaylistButtons = () => {
      // ⚡ OPTIMIZATION: Use props from Redux instead of localStorage.
      // This avoids JSON.parse() on every render (significant perf win)
      // and ensures we render consistent state.
      const { playlists = {} } = this.props;
      const playlistButtons = [];

      for (let [key, playlist] of Object.entries(playlists)) {
         playlistButtons.push(
            <PlaylistButton
               key={`${key}-${playlist.title}-${playlist.description}`}
               title={playlist.title}
               img={playlist.img || 'images/music.jpg'}
               chevron
               onClick={() => this.viewPlaylist({ playlist })}
            />,
         );
      }
      return playlistButtons;
   };

   render() {
      return (
         <Container>
            <ButtonContainer>
               <PlaylistButton
                  key="new-playlist-button"
                  title="New Playlist..."
                  img="images/playlist_add.jpg"
                  color="red"
                  onClick={this.newPlaylist}
               />
               {this.getPlaylistButtons()}
            </ButtonContainer>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   // ⚡ OPTIMIZATION: Select only playlists to prevent re-renders when other api data changes
   // (e.g. albums/artists loading). Previously subscribed to entire state.
   return {
      playlists: state.apiState.data && state.apiState.data.playlists,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      pushPopup: popup => dispatch(pushPopup(popup)),
      fetchPlaylists: () => dispatch(fetchPlaylists()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);
