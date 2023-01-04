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
        <ion-content class="ion-padding">
            <div class="input-group">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="series.name">
                </div>
                <div>
                    <label for="startDate">Start Date:</label>
                    <input type="date" id="startDate" v-model="series.startDate">
                </div>
                <div>
                    <label for="endDate">End Date:</label>
                    <input type="date" id="endDate" v-model="series.endDate">
                </div>
            </div>
            <div class="input-group">
                <div>
                    <label for="description">Description:</label>
                    <textarea type="text" id="description" v-model="series.description"></textarea>
                </div>
            </div>
            <button @click="save">Save</button>
            <fieldset>
                <legend>Events</legend>
                <div class="item-list">
                    <a class="item" v-for="event in (events as Event[])" :key="event.id">
                        <div class="item-info" @click="navigateToViewEvent(event.id)">
                            <b>{{ event.name }}</b>
                            <div>
                                <span><b>Date:</b> {{ event.date }}</span>
                                <span><b>Course:</b> {{ event.course?.name }}</span>
                            </div>
                        </div>
                        <button @click="deleteEvent(event.id)">
                            <ion-icon :icon="trashOutline"></ion-icon>
                        </button>
                    </a>
                </div>
                <button @click="navigateToAddEvent()">Add Event</button>
            </fieldset>
            <fieldset>
                <legend>Players</legend>
                <div class="item-list">
                    <a class="item" v-for="player in (players as Player[])" :key="player.userId">
                        <div class="item-info">
                            <b> {{ player.userName }}</b>
                            <div>
                                <span><b>Role:</b> {{ player.role }}</span>
                                <span><b>Hc:</b> {{ player.handicap }}</span>
                                <span><b>Winnings:</b> {{ player.currentWinnings }}</span>
                                <span><b>Points:</b> {{ player.currentPoints }}</span>
                            </div>
                        </div>
                        <button @click="deletePlayer(player.id)">
                            <ion-icon :icon="trashOutline"></ion-icon>
                        </button>
                    </a>
                </div>
                <button @click="addMe" v-if="!userInList">Add me to series</button>
            </fieldset>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import { onMounted, ref } from 'vue'
import { Series } from '../models/series.model';
import { useFirestore } from '../stores/useFirestore';
import Event from '../models/event.model';
import { Player } from '../models/player.model';

const { getItem, updateItem, item: series, init } = useFirestore<Series>(['series'])
const route = useRoute()
const router = useRouter()
const seriesId = route.params.id as string;
const { items: events, init: initEvents, deleteItem: deleteEvent, } = useFirestore<Event>(['series', seriesId, 'events'])
const { items: players, init: initPlayers, deleteItem: deletePlayer, addItem: addPlayer } = useFirestore(['series', seriesId, 'players'])
const { currentUser } = useStoreAuth()
const userInList = ref(false)

onMounted(() => {
    init()
    initPlayers()
    initEvents()
    getItem(seriesId as string)
    if (series.value && currentUser) {
        userInList.value = (players.value as Player[]).find(p => p.userId === currentUser.id) !== undefined
    }
})
const save = () => {
    updateItem(series.value?.id as string, series.value);
    router.push({ name: 'series-list' })
}
const addMe = () => {
    if (currentUser && series.value) {
        if (!series.value.players) {
            series.value.players = []
        }
        if (series.value.players.find(p => p.userId === currentUser.id)) {
            return;
        }
        addPlayer({ userId: currentUser.id, userName: currentUser.userName, role: 'Player', handicap: currentUser.handicap, currentWinnings: 0, currentPoints: 0 } as Player)
    }
}

const navigateToAddEvent = () => {
    router.push('/add-event/' + seriesId)
}
const navigateToViewEvent = (eventId: string) => {
    router.push('/view-event/' + seriesId + '/' + eventId)
}
</script>