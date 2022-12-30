<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <div id="side-container">
            <div id="side-top" v-if="loggedIn">
              <h1 id="brand"><ion-icon :icon="trophyOutline"></ion-icon> <span>Golf Series</span></h1>
              <div id="user-info">
                <p>Hello, <b>{{ currentUser?.firstName }}</b></p>
                <p>Handicap: <b>{{ currentUser?.handicap }}</b></p>
              </div>
              <div class="button-group">
                <router-link to="/admin-panel">
                  <button>Admin panel</button>
                </router-link>
                <router-link to="/edit-user">
                  <button>User settings</button>
                </router-link>
              </div>
            </div>
            <router-link to="/login">
              <button>Login</button>
            </router-link>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonContent, IonIcon, IonMenu, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { onMounted } from "vue"
import { trophyOutline } from 'ionicons/icons';
import { useStoreAuth } from "./stores/storeAuth";
import { storeToRefs } from 'pinia'

const authStore = useStoreAuth();
const { init } = useStoreAuth()
const { currentUser, loggedIn } = storeToRefs(authStore);

onMounted(() => {
  init()
})


</script>

<style>
/* Navigation */
#side-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#side-top {
  display: flex;
  flex-direction: column;
}

#user-info {
  margin-bottom: 1rem;
}

#user-info p {
  margin: 0;
}

#brand {
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 1rem;
}

/* Universal */
* {
  box-sizing: border-box;
  font-family: Tahoma;
}

body {
  margin: 0;
  color: #008763;
}

a {
  cursor: pointer;
  text-decoration: none;
}

button {
  background: #008763;
  color: white;
  border: none;
  padding: 10px 15px !important;
  border-radius: 0;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

button:hover {
  background: #006c4f;
}

button:disabled {
  background: lightgray;
  cursor: not-allowed;
}

.circle-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  border: none;
}

input,
textarea,
select {
  border: 3px solid #008763;
  padding: 10px;
  font-size: 1rem;
  color: #008763;
}

.content-container {
  margin: 1rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

@media screen and (max-width: 1000px) {
  .hidden-on-mobile {
    display: none;
  }
}

/* Item list */
.item-list {
  margin-bottom: 1rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #008763;
  transition: .3s;
  margin: 0;
}

.item:hover {
  background: lightgray;
}

.item-info {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1;
}

.item-info div {
  display: flex;
  gap: 1rem;
}

.item button {
  padding: 10px;
  margin-right: 1rem;
  width: initial;
}

.item button ion-icon {
  color: white;
  font-size: 1.25rem;
}

/* Nav */

nav {
  background: #008763;
  min-height: 60px;
  max-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  width: 100%;
}

nav ion-icon {
  color: white;
  font-size: 1.5rem;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.nav-left ion-icon {
  cursor: pointer;
}

.nav-left h1 {
  color: white;
  font-weight: normal;
}

.hamburger ion-icon {
  font-size: 2rem;
  display: none;
}

@media screen and (max-width: 1000px) {
  .hamburger ion-icon {
    display: flex;
  }
}

/* Input group  */
.input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

.input-group label {
  font-size: .85rem;
  font-weight: bold;
}

.input-group>div {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  width: 100%;
}

.input-group textarea {
  width: 100%;
}

.item-view-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Side table */

.table-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.side-table {
  flex: 1;
}

.side-table,
.side-table th,
.side-table td {
  border: 3px solid #008763;
  text-align: center;
}

.side-table th {
  background: #008763;
  color: white;
}

.side-table input {
  border: none;
  padding: 0;
  width: 50px;
  width: 100%;
}

.edit-table input {
  padding-left: .25rem;
  padding: 10px;
}

@media screen and (max-width: 1000px) {
  .table-container {
    gap: 0;
  }
}
</style>