<template>
    <nav>
        <div class="nav-left">
            <h1>Home</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
</template>
<script setup lang="ts">
import { useStoreUI } from "../stores/storeUI"
import { useRouter } from 'vue-router'

const router = useRouter();
const { showOverlay } = useStoreUI()
</script>