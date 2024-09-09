<template>
  <header class="bg-blue-600 p-4 text-white flex justify-between items-center">
    <h1 class="text-2xl font-bold">Mall Locator App</h1>
    <div v-if="isLoggedIn">
      <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </div>
  </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: 'AppHeader',
  computed: {
    isLoggedIn() {
      const auth = getAuth();
      return auth.currentUser !== null;
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => console.error("Error signing out: ", error));
    }
  }
};
</script>
