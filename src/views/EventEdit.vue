<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Edit Event</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="input-group" v-if="event">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="event.name">
                </div>
                <div>
                    <label for="endDate">Date:</label>
                    <input type="date" id="endDate" v-model="event.date">
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
import { onMounted } from 'vue'
import { useFirestore } from '../stores/useFirestore'
import { useRoute, useRouter } from 'vue-router'
import Event from '../models/event.model'

const router = useRouter()
const route = useRoute()
const seriesId = route.params.seriesId
const eventId = route.params.eventId
const { getItem: getEvent, item: event, init, updateItem: updateEvent } = useFirestore<Event>(['series', seriesId as string, 'events'])
getEvent(eventId as string)
const save = () => {
    updateEvent((event.value as Event)?.id, event.value as Partial<Event>)
    router.push({ path: '/edit-series/' + seriesId })
}
onMounted(() => {
    init()
})
</script>