<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Add Series</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="input-group">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="newSeries.name">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <input type="text" id="description" v-model="newSeries.description">
                </div>
                <div>
                    <label for="startDate">Start Date:</label>
                    <input type="date" id="startDate" v-model="newSeries.startDate">
                </div>
                <div>
                    <label for="endDate">End Date:</label>
                    <input type="date" id="endDate" v-model="newSeries.endDate">
                </div>
            </div>
            <div class="button-group">
                <button @click="add">Add</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { ref, onMounted } from 'vue'
import router from '../router';
import { useFirestore } from '../stores/useFirestore'
import { Series } from '../models/series.model'

const { addItem: addSeries, init } = useFirestore<Series>(['series'])
const newSeries = ref({
    name: '',
    description: '',
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),
})
const add = () => {
    addSeries(newSeries.value)
    router.push({ name: 'series-edit' })
}

onMounted(() => {
    init()
})
</script>
