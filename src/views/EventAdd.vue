<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Add Event</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="input-group">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="newEvent.name">
                </div>
                <div>
                    <label for="endDate">Date:</label>
                    <input type="date" id="endDate" v-model="newEvent.date">
                </div>
            </div>
            <div class="button-group">
                <button @click="save">Save</button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router'
import { useFirestore } from '../stores/useFirestore'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const seriesId = route.params.seriesId as string
const { addItem, init } = useFirestore<Event>(['series', seriesId, 'events'])
const newEvent = ref({
    name: '',
    date: new Date().toUTCString(),
})

const save = () => {
    addItem(newEvent.value as Partial<Event>)
    router.push({ path: '/edit-series/' + seriesId })
}
onMounted(() => {
    init()
})
</script>