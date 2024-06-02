<template>
    <div class="playlists-container">
      <h2>Recommended Playlists</h2>
      <div class="playlists">
        <div 
          v-for="playlist in playlists" 
          :key="playlist.id" 
          class="playlist-card" 
          @click="selectPlaylist(playlist)"
        >
          <img :src="playlist.images[0]?.url" alt="Playlist Image" class="playlist-image" />
          <div class="playlist-info">
            <h3>{{ playlist.name }}</h3>
            <p>{{ playlist.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'RecommendedPlaylists',
    setup() {
      const store = useStore();
      const router = useRouter();
      const playlists = ref([]);
  
      const fetchRecommendedPlaylists = async () => {
        try {
          const accessToken = store.getters.accessToken;
          console.log("accessToken", accessToken);
          if (!accessToken) {
            console.warn('Access token not found, redirecting to login...');
            router.push('/login');
            return;
          }
  
          const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          playlists.value = response.data.playlists.items;
        } catch (error) {
          console.error('Error fetching recommended playlists:', error);
          if (error.response && error.response.status === 401) {
            console.warn('Access token expired or invalid, redirecting to login...');
            router.push('/login');
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      };
  
      const selectPlaylist = (playlist) => {
        store.dispatch('setSelectedPlaylist', playlist);
        store.dispatch('fetchPlaylistTracks', playlist.id).then(() => {
          router.push('/quiz');
        });
      };
  
      onMounted(() => {
        fetchRecommendedPlaylists();
      });
  
      return { playlists, selectPlaylist };
    },
  };
  </script>
  
  <style scoped>
  .playlists-container {
    padding: 20px;
  }
  
  .playlists {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .playlist-card {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .playlist-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .playlist-image {
    width: 100%;
    height: auto;
  }
  
  .playlist-info {
    padding: 10px;
  }
  </style>
  