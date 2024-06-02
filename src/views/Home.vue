<template>
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p v-if="accessToken">
        <RecommendedPlaylists />
      </p>
      <p v-else>Please login to view your access token.</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import RecommendedPlaylists from '../components/RecommendedPlaylists.vue';

  export default {
    name: 'Home',
    beforeRouteEnter(to, from, next) {
      const store = useStore();
      if (!store.getters.accessToken) {
        next('/login');
      } else {
        next();
      }
    },
    setup() {
      const store = useStore();
      const accessToken = computed(() => store.getters.accessToken);
  
      return { accessToken };
    },
    components: {
    RecommendedPlaylists
  }
  };
  </script>
  