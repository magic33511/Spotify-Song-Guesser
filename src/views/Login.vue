<template>
  <div>
    <h1>Login with Spotify</h1>
    <button @click="redirectToSpotify">Login with Spotify</button>
  </div>
</template>

<script>
import { redirectToAuthCodeFlow } from '../utils/spotify/auth';

export default {
  name: 'Login',
  methods: {
    async redirectToSpotify() {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your actual client ID
        await redirectToAuthCodeFlow(clientId);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>
