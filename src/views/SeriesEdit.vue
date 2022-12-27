<template>
    <nav v-if="series">
        <div class="nav-left" v-if="series">
            <ion-icon @click="navigateToItem(series?.id as string)" name="arrow-back-outline"></ion-icon>
            <h1>{{ series.name }}</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container" v-if="series">
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
        <h1>Players</h1>
        <div id="player-list" v-for="player in series.players" :key="player.userId">
            <div class="item-view-info">
                <span><b>Name:</b> {{ player.userName }}</span>
                <span><b>Role:</b> {{ player.role }}</span>
                <button @click="deletePlayer(player.userId)">Delete</button>
            </div>
        </div>
        <div class="button-group">
            <button @click="addMe" :disabled="userInList">Add me to series</button>
            <button @click="save">Save</button>
        </div>
        <h1>Events</h1>
        <div id="player-list" v-for="event in (events as Event[])" :key="event.id">
            <div class="item-view-info">
                <span @click="navigateToViewEvent(event.id)"><b>Name:</b> {{ event.name }}</span>
                <span><b>Date:</b> {{ event.date }}</span>
                <span><b>Course:</b> {{ event.course?.name }}</span>
                <button @click="deleteEvent(event.id)">Delete</button>
            </div>
        </div>
        <button @click="navigateToAddEvent()">Add Event</button>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStoreUI } from "../stores/storeUI"
import { useStoreAuth } from '../stores/storeAuth'
import { onMounted, ref } from 'vue'
import { Series } from '../models/series.model';
import { useFirestore } from '../stores/useFirestore';
import Event from '../models/event.model';

const { showOverlay } = useStoreUI()
const { getItem, updateItem, item: series, init } = useFirestore<Series>(['series'])
const route = useRoute()
const router = useRouter()
const seriesId = route.params.id as string;
const { items: events, init: initEvents, deleteItem: deleteEvent, } = useFirestore<Event>(['series', seriesId, 'events'])
const { currentUser } = useStoreAuth()
const userInList = ref(false)

onMounted(() => {
    init()
    initEvents()
    getItem(seriesId as string)
    if (series.value && currentUser) {
        userInList.value = series.value.players.find(p => p.userId === currentUser.id) !== undefined
    }
})
const save = () => {
    updateItem(series.value?.id as string, series.value);
    router.push({ name: 'series-list' })
}
const navigateToItem = (seriesId: string) => {
    router.push('/view-series/' + seriesId)
}
const addMe = () => {
    if (currentUser && series.value) {
        if (!series.value.players) {
            series.value.players = []
        }
        if (series.value.players.find(p => p.userId === currentUser.id)) {
            return;
        }
        series.value.players.push({ userId: currentUser.id, userName: currentUser.userName, role: 'Player' })
        updateItem(series.value.id as string, series.value);
    }
}
const deletePlayer = (playerId: string) => {
    if (series.value) {
        series.value.players = series.value.players.filter(p => p.userId !== playerId)
        updateItem(series.value.id as string, series.value);
    }
}
const navigateToAddEvent = () => {
    router.push('/add-event/' + seriesId)
}
const navigateToViewEvent = (eventId: string) => {
    router.push('/view-event/' + seriesId + '/' + eventId)
}
</script>