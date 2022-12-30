<template>
    <ion-page v-if="course">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ course.name }}</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
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
            <button @click="editCourse">Edit course</button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { useFirestore } from '../stores/useFirestore'
import { useRoute, useRouter } from 'vue-router'
import { Course } from '../models/course.model';
import { onMounted } from 'vue'

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
