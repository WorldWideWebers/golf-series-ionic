<template>
    <!-- <nav>
        <div class="nav-left" v-if="course">
            <ion-icon name="arrow-back-outline" @click="navigateToItem(course.id)"></ion-icon>
            <h1>Edit Course</h1>
        </div>
        <a class="hamburger" @click="showOverlay">
            <ion-icon name="reorder-three-outline"></ion-icon>
        </a>
    </nav> -->
    <div class="content-container" v-if="course">
        <div class="input-group">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="course.name">
            </div>
            <div>
                <label for="Number of sides">No. of sides:</label>
                <input type="number" id="Number of sides" v-model="course.numberOfSides">
            </div>
            <div>
                <label for="slope">Slope:</label>
                <input id="slope" type="number" v-model="course.slope">
            </div>
            <div>
                <label for="par">Par:</label>
                <input id="par" type="number" v-model="course.par">
            </div>
            <div>
                <label for="city">City:</label>
                <input id="city" type="text" v-model="course.city">
            </div>
            <div>
                <label for="state">State:</label>
                <input id="state" type="text" v-model="course.state">
            </div>
        </div>
        <div class="table-container edit-table">
            <table class="side-table" v-for="side of course.sides" :key="side.name">
                <thead>
                    <tr>
                        <th colspan="3">
                            <input type="text" v-model="side.name">
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
                        <td><input type="number" v-model="hole.holeNumber"></td>
                        <td><input type="number" v-model="hole.par"></td>
                        <td><input type="number" v-model="hole.handicap"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="button-group">
            <button @click="save()">Save</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Course } from '../models/course.model';
import router from '../router';
import { useStoreUI } from "../stores/storeUI"
import { useFirestore } from '../stores/useFirestore';
import { onMounted } from 'vue';

const { showOverlay } = useStoreUI()
const { getItem: getCourse, updateItem: updateCourse, item: course, init } = useFirestore<Course>(['courses'])

const route = useRoute()
const id = route.params.id;
getCourse(id as string);
const save = () => {
    updateCourse(course.value?.id as string, course.value);
    router.push({ name: 'course-list' })
}
const navigateToItem = (courseId: string) => {
    router.push('/view-course/' + courseId)
}

onMounted(() => {
    init()
})
</script>
