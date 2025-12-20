import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchAlbums } from '../../api/actions';
import { pushView } from '../actions';
import { AlbumButton, constants } from '../../toolbox';

const { color } = constants;

const Container = styled.div`
   margin-top: 48px;
   border-top: 1px solid ${color.gray[2]};
`;

const ButtonContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-top: 16px;
`;

const mapStateToProps = state => {
   return {
      // ⚡ PERFORMANCE OPTIMIZATION:
      // Previously, we selected { viewState, apiState }, causing re-renders whenever
      // ANY part of apiState changed (e.g. playlists, artists) or viewState changed.
      // Now we only select 'albums', ensuring this component only re-renders when
      // the album list actually changes.
      albums: state.apiState.data.albums,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      fetchAlbums: () => dispatch(fetchAlbums()),
   };
};

export class AlbumListView extends Component {
   viewAlbum = ({ artist, album }) => {
      this.props.pushView({
         name: 'Album',
         title: album,
         props: {
            hideTitle: true,
            artist,
            album
         }
      });
   }

   componentDidMount() {
      const { albums, fetchAlbums } = this.props;

      // Ensure we have data, but avoid infinite loops or redundant calls
      if (!albums || albums.length === 0) {
         fetchAlbums();
      }
   }

   render() {
      const { albums } = this.props;

      return (
         <Container>
            <ButtonContainer>
               {albums &&
                  albums.map((item, index) => {
                     const { album, artist, artwork } = item;
                     const url = `https://tannerv.ddns.net/SpotiFree/${artwork}`;

                     return (
                        <AlbumButton
                           key={album}
                           label={album}
                           sublabel={artist}
                           artwork={url}
                           onClick={() => this.viewAlbum({ artist, album })}
                        />
                     );
                  })}
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListView);
