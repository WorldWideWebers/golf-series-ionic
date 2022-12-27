<template>
    <nav>
        <div class="nav-left">
            <h1>Admin Panel</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div id="button-section">
            <router-link to="/course-list">
                <button>Courses</button>
            </router-link>
            <router-link to="/series-list">
                <button>Series</button>
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStoreUI } from "../stores/storeUI"
import { useRouter } from 'vue-router'

const router = useRouter();
const { showOverlay } = useStoreUI()

</script>
<style scoped>
#button-section {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

#button-section button {
    width: 100%;
}
</style>