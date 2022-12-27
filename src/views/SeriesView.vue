<template>
    <nav v-if="series">
        <div class="nav-left">
            <router-link to="/series-list">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <h1>{{ series.name }}</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container" v-if="series">
        <div class="item-view-info">
            <span><b>Description:</b> {{ series.description }}</span>
            <span><b>Start date:</b> {{ series.startDate }}</span>
            <span><b>End date:</b> {{ series.endDate }}</span>
        </div>
        <div class="button-group">
            <button @click="editSeries">Edit series</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Series } from '../models/series.model';
import { useStoreUI } from "../stores/storeUI"
import { useFirestore } from '../stores/useFirestore';

const { showOverlay } = useStoreUI()
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