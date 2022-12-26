<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <div id="side-container">
            <div id="side-top">
              <h1 id="brand"><ion-icon :icon="trophyOutline"></ion-icon> <span>Golf Series</span></h1>
              <div id="user-info">
                <p>Hello, <b>user</b></p>
                <p>Handicap: <b>1</b></p>
              </div>
              <ion-button expand="full">User settings</ion-button>
              <ion-menu-toggle auto-hide>
                <ion-button expand="full">Home</ion-button>
              </ion-menu-toggle>
              <ion-button expand="full" @click="navigate('admin-panel')">Admin panel</ion-button>
            </div>
            <ion-button expand="full">Login</ion-button>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonContent, IonIcon, IonMenu, IonRouterOutlet, IonSplitPane, IonButton, IonMenuToggle } from '@ionic/vue';
import { trophyOutline } from 'ionicons/icons';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter();
const navigate = (destination: string) => {
  router.navigate(destination);
}
</script>

<style scoped>
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

#brand {
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 1rem;
}

#user-info {
  margin-bottom: 1rem;
}

#user-info p {
  margin: 0;
}
</style>
