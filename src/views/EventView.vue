<template>
    <ion-page v-if="event">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ event.name }}</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="event">
            <div class="item-view-info" >
                <span><b>Name:</b> {{ event.name }}</span>
                <span><b>Date:</b> {{ event.date }}</span>
                <span><b>Course:</b> {{ event.course }}</span>
            </div>
            <button @click="edit">Edit event</button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useFirestore } from '../stores/useFirestore'
import { useRoute } from 'vue-router'
import Event from '../models/event.model'
import { onMounted } from 'vue'
import router from '../router'

const route = useRoute()
const seriesId = route.params.seriesId
const eventId = route.params.eventId

const { getItem: getEvent, item: event, init } = useFirestore<Event>(['series', seriesId as string, 'events'])
getEvent(eventId as string)
const edit = () => {
    router.push(`/edit-event/${seriesId}/${eventId}`)
}
onMounted(() => {
    init()
    getEvent(eventId as string)
})
</script>