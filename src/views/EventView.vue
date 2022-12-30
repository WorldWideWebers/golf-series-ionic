<template>
    <nav>
        <div class="nav-left" v-if="event">
            <ion-icon @click="navigateToItem(seriesId as string)" name="arrow-back-outline"></ion-icon>
            <h1>{{ event.name }}</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <h1>Event</h1>
        <div v-if="event">
            <div>
                <label>Event Name</label>
                <input v-model="event.name" />
            </div>
            <div>
                <label>Event Date</label>
                <input v-model="event.date" />
            </div>
            <div>
                <label>Event Course</label>
                <input v-model="event.course" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFirestore } from '../stores/useFirestore'
import { useRoute, useRouter } from 'vue-router'
import Event from '../models/event.model'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const seriesId = route.params.seriesId
const eventId = route.params.eventId

const { getItem: getEvent, item: event, init } = useFirestore<Event>(['series', seriesId as string, 'events'])
    const navigateToItem = (seriesId: string) => {
    router.push('/view-series/' + seriesId)
}
getEvent(eventId as string)
onMounted(() => {
    init()
    getEvent(eventId as string)
})
</script>