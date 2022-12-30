<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Login</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
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
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useStoreAuth } from "../stores/storeAuth";
import { ref } from "vue"
import { useRouter } from 'vue-router'

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