## 2024-05-23 - [Redux Oversubscription Pattern]
**Learning:** Legacy views (`AlbumListView`, `ArtistListView`, etc.) subscribe to the entire `apiState`. This causes them to re-render whenever *any* API call completes (e.g. fetching playlists triggers album list re-render).
**Action:** When optimizing connected components, always check `mapStateToProps` first. Select ONLY the specific slice of data needed (e.g., `state.apiState.data.albums`). This is a high-impact, low-risk optimization.
