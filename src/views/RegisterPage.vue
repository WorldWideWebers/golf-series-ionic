<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Register</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
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
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useStoreAuth } from "../stores/storeAuth";
import { ref } from "vue"

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
    registerUser({ email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value, userName: userName.value, handicap: handicap.value, city: city.value, state: state.value, role: "user" })
}
</script>