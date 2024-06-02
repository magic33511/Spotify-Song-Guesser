<template>
    <div>
      <p>Redirecting...</p>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import { getAccessToken } from '../utils/spotify/auth';
  
  export default {
    name: 'Callback',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      onMounted(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code'); // Adjust parameter name as needed
  
        if (code) {
          try {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your actual client ID
            const accessToken = await getAccessToken(clientId, code);
            store.dispatch('setAccessToken', accessToken);
            router.push('/');
          } catch (error) {
            console.error('Error getting access token:', error);
          }
        } else {
          console.error('No code found in URL');
        }
      });
  
      return {};
    },
  };
  </script>
  