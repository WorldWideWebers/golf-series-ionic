<template>
    <nav>
        <div class="nav-left">
            <router-link to="login">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <h1>Register</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div class="input-group">
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="firstName">
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="lastName">
            </div>
            <div>
                <label for="userName">User Name:</label>
                <input type="text" id="userName" v-model="userName">
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <div>
                <label for="handicap">Handicap:</label>
                <input type="number" id="handicap" v-model="handicap">
            </div>
            <div>
                <label for="city">City:</label>
                <input type="text" id="city" v-model="city">
            </div>
            <div>
                <label for="state">State:</label>
                <input type="text" id="state" v-model="state">
            </div>
            <div class="button-group">
                <button @click="register">Register</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useStoreAuth } from "../stores/storeAuth";
import { ref } from "vue"
import { useStoreUI } from "../stores/storeUI"

const { showOverlay } = useStoreUI()
const { registerUser } = useStoreAuth();
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const userName = ref("");
const password = ref("");
const handicap = ref(0);
const city = ref("");
const state = ref("");

const register = () => {
    registerUser({ email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value, userName: userName.value, handicap: handicap.value, city: city.value, state: state.value })
}
</script>