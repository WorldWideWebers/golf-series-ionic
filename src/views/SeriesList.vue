<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Series</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="item-list">
                <a class="item" v-for="series in seriesArray" :key="series.id">
                    <div class="item-info" @click="navigateToItem(series.id)">
                        <b>{{ series.name }}</b>
                        <div>
                            <span><b>Start date: </b>{{ series.startDate }}</span>
                            <span><b>End date: </b>{{ series.endDate }}</span>
                        </div>
                    </div>
                    <button @click="deleteSeries(series.id)">
                        <ion-icon :icon="trashOutline"></ion-icon>
                    </button>
                </a>
            </div>
            <div class="button-group">
                <router-link to="/add-series">
                    <button>Add series</button>
                </router-link>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage, IonIcon } from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import { Series } from '../models/series.model'
import { useFirestore } from '../stores/useFirestore'

const { deleteItem: deleteSeries, items: seriesArray, init } = useFirestore<Series>(['series'])
const router = useRouter()

const navigateToItem = (seriesId: string) => {
    router.push('/view-series/' + seriesId)
}

onMounted(() => {
    init()
})
</script>