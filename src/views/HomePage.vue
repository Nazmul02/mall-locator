<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-4 shadow-md">
      <h1 class="text-xl font-bold">Welcome, {{ userName }}</h1>
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </header>

    <!-- Malls List -->
    <div v-if="userLocation" class="mt-4">
      <h2 class="text-lg font-semibold mb-2">Malls near you:</h2>

      <ul>
        <li
          v-for="(mall, index) in malls"
          :key="index"
          class="bg-white p-4 mb-2 rounded-lg shadow-md flex justify-between items-center"
        >
          <span>{{ mall.name }}</span>
          <button
            @click="openMaps(mall)"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9l-2.487 2.486a1.5 1.5 0 01-2.12 0L5.05 13.95a7 7 0 010-9.9zM6.5 6.5a5 5 0 017 7l-2.487 2.486a.5.5 0 01-.707 0L6.5 13.5a5 5 0 010-7z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M8.5 8.5a3 3 0 014.243 0 .5.5 0 00.707-.707 4 4 0 00-5.657 0 .5.5 0 10.707.707z" clip-rule="evenodd" />
            </svg>
            Directions
          </button>
        </li>
      </ul>
    </div>

    <div v-else class="flex justify-center items-center h-64">
      <p>Loading nearby malls...</p>
    </div>

    <!-- Footer -->
    <footer class="text-center text-gray-500 mt-6">
      <p>&copy; 2024 My Mall App</p>
    </footer>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import axios from "axios";

export default {
  data() {
    return {
      userLocation: null,
      malls: [],
      isLoggedIn: false,
      userName: '',
    };
  },
  created() {
    this.checkAuth();
    this.getUserLocation();
  },
  methods: {
    async checkAuth() {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.userName = user.displayName || "User";
        } else {
          this.$router.push("/login");
        }
      });
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition, this.showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    setPosition(position) {
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Fetch nearby malls using Google Places API
      this.fetchNearbyMalls();
    },
    async fetchNearbyMalls() {
      const googlePlacesAPIKey = "AIzaSyDke0_DXrIVdG_3p4iZjIQeEl72pngSvGU";
const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.userLocation.lat},${this.userLocation.lng}&radius=5000&type=shopping_mall&key=${googlePlacesAPIKey}`;
      try {
        const response = await axios.get(url);
        if (response.data.results) {
          this.malls = response.data.results.slice(0, 5).map(mall => ({
            name: mall.name,
            lat: mall.geometry.location.lat,
            lng: mall.geometry.location.lng
          }));
        }
      } catch (error) {
        console.error("Error fetching nearby malls:", error);
      }
    },
    openMaps(mall) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${this.userLocation.lat},${this.userLocation.lng}&destination=${mall.lat},${mall.lng}&travelmode=driving`;
      window.open(mapsUrl, "_blank");
    },
    logout() {
      const auth = getAuth();
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for mobile-friendly UI */
body {
  font-family: 'Arial', sans-serif;
}

h1, h2 {
  font-weight: bold;
}

button {
  transition: background-color 0.2s ease-in-out;
}
</style>