<template>
    <nav>
        <div class="nav-left">
            <ion-icon @click="$router.go(-1)" name="arrow-back-outline"></ion-icon>
            <h1>Login</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div class="input-group">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <div class="button-group">
                <button @click="login">Login</button>
                <button @click="signInWithGoogle">Login with Google</button>
                <button @click="sendPasswordResetEmail">Forgot password</button>
                <button @click="navigateToRegister">Register</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useStoreAuth } from "../stores/storeAuth";
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useStoreUI } from "../stores/storeUI"

const { showOverlay } = useStoreUI()
const { signInWithGoogle, loginUser, resetPassword } = useStoreAuth();
const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
    loginUser({ email: email.value, password: password.value })
}

const navigateToRegister = () => {
    router.push('/register')
}

const sendPasswordResetEmail = () => {
    resetPassword(email.value)
}
</script>