<template>
    <nav>
        <div class="nav-left" v-if="course">
            <router-link to="/course-list">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </router-link>
            <h1>{{ course.name }}</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav>
    <div class="content-container" v-if="course">
        <div class="item-view-info">
            <span><b>Number of sides:</b> {{ course.numberOfSides }}</span>
            <span><b>Slope:</b> {{ course.slope }}</span>
            <span><b>Par:</b> {{ course.par }}</span>
            <span><b>City:</b> {{ course.city }}</span>
            <span><b>State:</b> {{ course.state }}</span>
        </div>
        <div class="table-container">
            <table class="side-table" v-for="side of course.sides" :key="side.name">
                <thead>
                    <tr>
                        <th colspan="3">
                            {{ side.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Hole</th>
                        <th>Par</th>
                        <th>HCP</th>
                    </tr>
                    <tr v-for="hole of side.holes" :key="hole.holeNumber">
                        <td>{{ hole.holeNumber }}</td>
                        <td>{{ hole.par }}</td>
                        <td>{{ hole.handicap }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="button-group">
            <button @click="editCourse">Edit course</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFirestore } from '../stores/useFirestore'
import { useRoute, useRouter } from 'vue-router'
import { useStoreUI } from "../stores/storeUI"
import { Course } from '../models/course.model';
import { onMounted } from 'vue'

const { showOverlay } = useStoreUI()
const { getItem: getCourse, item: course, init } = useFirestore<Course>(['courses'])

const route = useRoute()
const router = useRouter()
const id = route.params.id;
getCourse(id as string);
const editCourse = () => {
    router.push({ name: 'edit-course', params: { id: course.value?.id } })
}
onMounted(() => {
    init()
})
</script>
