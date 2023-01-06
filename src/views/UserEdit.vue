<template>
  <ion-page v-if="user">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Edit {{ user.userName }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="input-group" v-if="currentUser">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="user.firstName">
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName">
        </div>
        <div>
          <label for="userName">User Name:</label>
          <input type="text" id="userName" v-model="user.userName">
        </div>
        <div>
          <label for="handicap">Handicap:</label>
          <input type="text" id="handicap" v-model="user.handicap">
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" id="city" v-model="user.city">
        </div>
        <div>
          <label for="state">State:</label>
          <StateSelect :selectedState="user.state" @stateChanged="(user as User).state = $event" />
        </div>
        <div v-if="currentUser.role === 'admin'">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div class="button-group">
        <button @click="save">Save</button>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useStoreAuth } from '../stores/storeAuth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import User  from '../models/user.model'
import StateSelect from '../components/StateSelect.vue'

const { currentUser, saveUser } = useStoreAuth();
const router = useRouter();

const user = ref({ ...currentUser })

const save = () => {
  if (currentUser !== undefined) {
    saveUser(currentUser.id, user.value);
    router.push({ name: "home" });
  }
}
</script>
