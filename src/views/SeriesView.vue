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
            <fieldset>
                <legend>Events</legend>
                <div class="item-view-info" v-for="event of events" :key="event.id">
                    <span><b>Name:</b> {{ event.name }}</span>
                    <span><b>Date:</b> {{ event.date }}</span>
                    <span><b>Course:</b> {{ event.course }}</span>
                </div>
            </fieldset>
            <fieldset>
                <legend>Players</legend>
                <div class="item-view-info" v-for="player of (players as Player[])" :key="player.id">
                    <span><b>Name:</b> {{ player.userName }}</span>
                    <span><b>Role:</b> {{ player.role }}</span>
                    <span><b>Hc:</b> {{ player.handicap }}</span>
                    <span><b>Winnings:</b> {{ player.currentWinnings }}</span>
                    <span><b>Points:</b> {{ player.currentPoints }}</span>
                </div>
            </fieldset>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { Series } from '../models/series.model'
import { useFirestore } from '../stores/useFirestore';
import Event from '../models/event.model'
import { Player } from '../models/player.model';

const route = useRoute()
const router = useRouter()
const seriesId = route.params.id as string;
const { getItem: getSeries, item: series, init } = useFirestore<Series>(['series'])
const { items: events, init: initEvents } = useFirestore<Event>(['series', seriesId, 'events'])
const { items: players, init: initPlayers } = useFirestore(['series', seriesId, 'players'])
const id = route.params.id;

getSeries(id as string);
const editSeries = () => {
    router.push({ name: 'edit-series', params: { id: series.value?.id } })
}

onMounted(() => {
    init()
    initPlayers()
    initEvents()
})
</script>