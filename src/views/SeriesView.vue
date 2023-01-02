<template>
    <ion-page v-if="series">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ series.name }}</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="series">
            <div class="item-view-info">
                <span><b>Description:</b> {{ series.description }}</span>
                <span><b>Start date:</b> {{ series.startDate }}</span>
                <span><b>End date:</b> {{ series.endDate }}</span>
            </div>
            <div class="button-group">
                <button @click="editSeries">Edit series</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { Series } from '../models/series.model'
import { useFirestore } from '../stores/useFirestore';

const { getItem: getSeries, item: series, init } = useFirestore<Series>(['series'])
const route = useRoute()
const router = useRouter()
const id = route.params.id;

getSeries(id as string);
const editSeries = () => {
    router.push({ name: 'edit-series', params: { id: series.value?.id } })
}

onMounted(() => {
    init()
})
</script>