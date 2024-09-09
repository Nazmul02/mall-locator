<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Login</h2>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
        <input
          v-model="email"
          @blur="validateEmail"
          type="email"
          id="email"
          class="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
      </div>

      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
        <input
          v-model="password"
          @blur="validatePassword"
          type="password"
          id="password"
          class="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
      </div>

      <div class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>

      <!-- Submit Button -->
      <button
        @click="loginWithEmail"
        :disabled="!isFormValid"
        class="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
      >
        Login
      </button>

      <div class="text-center mt-4">
        <p>or</p>
        <button
          @click="loginWithGoogle"
          class="w-full bg-red-500 text-white p-2 mt-4 rounded-lg hover:bg-red-600"
        >
          Login with Google
        </button>
      </div>

      <p class="text-center mt-4">
        Don't have an account? <router-link to="/register" class="text-blue-500">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";  // Import Firebase auth

export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      errorMessage: ''
    };
  },
  computed: {
    isFormValid() {
      return !this.emailError && !this.passwordError && this.email && this.password;
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Email is required.';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email.';
      } else {
        this.emailError = '';
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password is required.';
      } else if (this.password.length < 8) {
        this.passwordError = 'Password must be at least 8 characters long.';
      } else {
        this.passwordError = '';
      }
    },
    loginWithEmail() {
      this.validateEmail();
      this.validatePassword();

      if (this.isFormValid) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/home');
          })
          .catch(error => {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
              this.errorMessage = "User not found, please register.";
            } else {
              this.errorMessage = error.message;
            }
          });
      }
    },
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          this.$router.push('/home');
        })
        .catch(error => console.error(error));
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
