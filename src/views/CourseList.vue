<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Courses</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="item-list">
                <a class="item" v-for="course in courses" :key="course.id">
                    <div class="item-info" @click="navigateToItem(course.id)">
                        <b>{{ course.name }}</b>
                        <div>
                            <span>{{ course.slope }} slope</span>
                            <span>{{ course.par }} par</span>
                            <span>{{ course.city }}, {{ course.state }}</span>
                        </div>
                    </div>
                    <button @click="deleteCourse(course.id)">
                        <ion-icon :icon="trashOutline"></ion-icon>
                    </button>
                </a>
            </div>
            <router-link to="/add-course">
                <button>Add course</button>
            </router-link>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage, IonButton, IonIcon } from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { useFirestore } from '../stores/useFirestore'
import { useRouter } from 'vue-router'
import { Course } from '../models/course.model'
import { onMounted } from 'vue'

const { deleteItem: deleteCourse, items: courses, init } = useFirestore<Course>(['courses'])
const router = useRouter()

const navigateToItem = (courseId: string) => {
    router.push('/view-course/' + courseId)
}

onMounted(() => {
    init()
})
</script>