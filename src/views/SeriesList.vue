<template>
    <nav>
        <div class="nav-left">
            <router-link to="/admin-panel">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <h1>Series</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div class="item-list">
            <a class="item" v-for="series in seriesArray" :key="series.id">
                <div class="item-info" @click="navigateToItem(series.id)">
                    <b>{{ series.name }}</b>
                    <div>
                        <span><b>Start date: </b>{{ series.startDate }}</span>
                        <span><b>End date: </b>{{ series.endDate }}</span>
                    </div>
                </div>
                <button @click="deleteSeries(series.id)">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </a>
        </div>
        <div class="button-group">
            <router-link to="/add-series">
                <button>Add series</button>
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import { Series } from '../models/series.model';
import { useStoreUI } from "../stores/storeUI"
import { useFirestore } from '../stores/useFirestore';

const { showOverlay } = useStoreUI()
const { deleteItem: deleteSeries, items: seriesArray, init } = useFirestore<Series>(['series'])
const router = useRouter()

const navigateToItem = (seriesId: string) => {
    router.push('/view-series/' + seriesId)
}

onMounted(() => {
    init()
})
</script>