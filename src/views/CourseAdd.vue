<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Add Course</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="input-group">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="newCourse.name">
                </div>
                <div>
                    <label for="Number of sides">No. of sides:</label>
                    <input type="number" id="Number of sides" v-model="newCourse.numberOfSides">
                </div>
                <div>
                    <label for="slope">Slope:</label>
                    <input for="slope" type="number" v-model="newCourse.slope">
                </div>
                <div>
                    <label for="par">Par:</label>
                    <input for="par" type="number" v-model="newCourse.par">
                </div>
                <div>
                    <label for="city">City:</label>
                    <input for="city" type="string" v-model="newCourse.city">
                </div>
                <div>
                    <label for="state">State:</label>
                    <StateSelect :selectedState="newCourse.state" @stateChanged="(newCourse as Course).state = $event" />
                </div>
            </div>
            <div class="button-group">
                <button @click="add()">Add Course</button>
            </div>
            <div class="table-container">
                <table class="side-table edit-table" v-for="side of newCourse.sides" :key="side.name">
                    <thead>
                        <tr>
                            <th colspan="3" class="edit-thead">
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
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonContent, IonPage } from '@ionic/vue';
import { ref, onMounted } from 'vue'
import { Course } from '../models/course.model';
import router from '../router';
import { useFirestore } from '../stores/useFirestore';
import StateSelect from '../components/StateSelect.vue';

const { addItem: addCourse, init } = useFirestore<Course>(['courses'])
const newCourse = ref({
    name: '', numberOfSides: 2, slope: 110, par: 72, city: '', state: '', sides: [
        {
            name: 'Front', holes: [
                { holeNumber: 1, par: 4, handicap: 1 },
                { holeNumber: 2, par: 4, handicap: 1 },
                { holeNumber: 3, par: 4, handicap: 1 },
                { holeNumber: 4, par: 4, handicap: 1 },
                { holeNumber: 5, par: 4, handicap: 1 },
                { holeNumber: 6, par: 4, handicap: 1 },
                { holeNumber: 7, par: 4, handicap: 1 },
                { holeNumber: 8, par: 4, handicap: 1 },
                { holeNumber: 9, par: 4, handicap: 1 }
            ]
        },
        {
            name: 'Back', holes: [
                { holeNumber: 10, par: 4, handicap: 1 },
                { holeNumber: 11, par: 4, handicap: 1 },
                { holeNumber: 12, par: 4, handicap: 1 },
                { holeNumber: 13, par: 4, handicap: 1 },
                { holeNumber: 14, par: 4, handicap: 1 },
                { holeNumber: 15, par: 4, handicap: 1 },
                { holeNumber: 16, par: 4, handicap: 1 },
                { holeNumber: 17, par: 4, handicap: 1 },
                { holeNumber: 18, par: 4, handicap: 1 }
            ]
        },
    ]
});

const add = () => {
    addCourse(newCourse.value)
    router.push({ name: 'course-list' })
}

onMounted(() => {
    init()
})
</script>