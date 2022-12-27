<template>
    <nav>
        <div class="nav-left">
            <ion-icon @click="navigateToItem(seriesId as string)" name="arrow-back-outline"></ion-icon>
            <h1>Add Event</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div class="input-group">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="newEvent.name">
            </div>
            <div>
                <label for="date">Date:</label>
                <input type="date" id="date" v-model="newEvent.date">
            </div>
            <!-- <div>
                <label for="course">Course:</label>
                <select id="course" v-model="course">
                    <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
                </select>
            </div> -->
        </div>
        <div class="button-group">
            <button @click="save">Save</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStoreUI } from '../stores/storeUI'
import { useFirestore } from '../stores/useFirestore'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const seriesId = route.params.seriesId as string
const { showOverlay } = useStoreUI()
const { addItem, init } = useFirestore<Event>(['series', seriesId, 'events'])
const newEvent = ref({
    name: '',
    date: new Date().toUTCString(),
})

const navigateToItem = (seriesId: string) => {
    router.push('/view-series/' + seriesId)
}
const save = () => {
    addItem(newEvent.value as Partial<Event>)
    router.push({ path: '/edit-series/' + seriesId })
}
onMounted(() => {
    init()
})
</script>