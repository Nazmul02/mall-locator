<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Register</h2>

      <!-- Name Input -->
      <div class="mb-4">
        <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
        <input
          v-model="name"
          @blur="validateName"
          type="text"
          id="name"
          class="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <p v-if="nameError" class="text-red-500 text-xs mt-1">{{ nameError }}</p>
      </div>

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

      <!-- Confirm Password Input -->
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">Confirm Password</label>
        <input
          v-model="confirmPassword"
          @blur="validateConfirmPassword"
          type="password"
          id="confirmPassword"
          class="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <p v-if="confirmPasswordError" class="text-red-500 text-xs mt-1">{{ confirmPasswordError }}</p>
      </div>

      <div class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>

      <!-- Submit Button -->
      <button
        @click="register"
        :disabled="!isFormValid"
        class="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
      >
        Register
      </button>


<div class="text-center mt-4">
        <router-link to="/login" class="text-blue-500">Already registered? Login here.</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Use initialized Firebase auth

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      errorMessage: ''
    };
  },
  computed: {
    isFormValid() {
      return !this.nameError && !this.emailError && !this.passwordError && !this.confirmPasswordError && this.name && this.email && this.password && this.confirmPassword;
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.nameError = 'Name is required.';
      } else {
        this.nameError = '';
      }
    },
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
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordError = 'Confirm Password is required.';
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = 'Passwords do not match.';
      } else {
        this.confirmPasswordError = '';
      }
    },
    register() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      if (this.isFormValid) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push('/home');
          })
          .catch(error => {
            this.errorMessage = error.message;
          });
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
