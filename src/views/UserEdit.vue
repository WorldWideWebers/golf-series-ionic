<template>
  <nav>
    <div class="nav-left">
      <ion-icon @click="$router.go(-1)" name="arrow-back-outline"></ion-icon>
      <h1>User Settings</h1>
    </div>
    <a class="hamburger" @click="showOverlay">
      <ion-icon name="reorder-three-outline"></ion-icon>
    </a>
  </nav>
  <div class="content-container">
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
        <input type="text" id="state" v-model="user.state">
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
  </div>
</template>
<script lang="ts" setup>
import { useStoreAuth } from '../stores/storeAuth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStoreUI } from "../stores/storeUI"

const { showOverlay } = useStoreUI()
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
