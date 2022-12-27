<template>
    <nav>
        <div class="nav-left">
            <router-link to="admin-panel">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <h1>Courses</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container">
        <div class="item-list">
            <a class="item" v-for="course in courses" :key="course.id">
                <div class="item-info" @click="navigateToItem(course.id)">
                    <b>{{ course.name }}</b>
                    <div>
                        <span>{{ course.numberOfSides }} sides</span>
                        <span>{{ course.slope }} slope</span>
                        <span>{{ course.par }} par</span>
                        <span>{{ course.city }}, {{ course.state }}</span>
                    </div>
                </div>
                <button @click="deleteCourse(course.id)">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </a>
        </div>
        <div class="button-group">
            <router-link to="/add-course">
                <button>New course</button>
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFirestore } from '../stores/useFirestore'
import { useRouter } from 'vue-router'
import { useStoreUI } from "../stores/storeUI"
import { Course } from '../models/course.model'
import { onMounted } from 'vue'

const { deleteItem: deleteCourse, items: courses, init } = useFirestore<Course>(['courses'])
const router = useRouter()
const { showOverlay } = useStoreUI()

const navigateToItem = (courseId: string) => {
    router.push('/view-course/' + courseId)
}

onMounted(() => {
    init()
})
</script>