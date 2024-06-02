// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    accessToken: null,
    selectedPlaylist: null,
    playlistTracks: [],
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setSelectedPlaylist(state, playlist) {
      state.selectedPlaylist = playlist;
    },
    setPlaylistTracks(state, tracks) {
      state.playlistTracks = tracks;
    },
  },
  actions: {
    setAccessToken({ commit }, token) {
      commit('setAccessToken', token);
    },
    setSelectedPlaylist({ commit }, playlist) {
      commit('setSelectedPlaylist', playlist);
    },
    async fetchPlaylistTracks({ commit, state }, playlistId) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      const data = await response.json();
      commit('setPlaylistTracks', data.items.map(item => item.track));
    },
  },
  getters: {
    accessToken: (state) => state.accessToken,
    selectedPlaylist: (state) => state.selectedPlaylist,
    playlistTracks: (state) => state.playlistTracks,
  },
});
