<template>
    <ion-content class="ion-padding">
        <ion-menu-toggle>
            <ion-button>Click to open the menu</ion-button>
        </ion-menu-toggle>
    </ion-content>
</template>
<script setup lang="ts">
import { useStoreUI } from "../stores/storeUI"
import { useRouter } from 'vue-router'
</script>