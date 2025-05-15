<template>
  <div>
    <!-- Welcome Banner -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-img
            src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <v-card-text class="fill-height d-flex align-center">
              <div class="pa-4 rounded-lg bg-white bg-opacity-90">
                <h1 class="text-h4 font-weight-bold mb-2">Welcome to Vaxpoint</h1>
                <p class="text-subtitle-1 mb-0">Your personal vaccination management system</p>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Health Stats -->
    <v-row>
      <v-col v-for="(stat, key) in [
        { icon: 'mdi-check-circle', title: 'Vaccines Completed', value: healthStats.vaccinesCompleted, color: 'success' },
        { icon: 'mdi-calendar-clock', title: 'Upcoming Appointments', value: healthStats.upcomingAppointments, color: 'primary' },
        { icon: 'mdi-map-marker', title: 'Clinics Nearby', value: healthStats.clinicsNearby, color: 'info' },
        { icon: 'mdi-clock-outline', title: 'Days to Next Vaccine', value: healthStats.daysToNextVaccine, color: 'warning' }
      ]" :key="key" cols="12" sm="6" md="3">
        <v-card class="hover-lift">
          <v-card-text class="d-flex align-center">
            <v-avatar :color="stat.color" size="48" class="me-4">
              <v-icon color="white" size="24">{{ stat.icon }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
              <div class="text-caption">{{ stat.title }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <!-- Upcoming Vaccinations -->
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-needle</v-icon>
            Upcoming Vaccinations
          </v-card-title>
          <v-list lines="two">
            <v-list-item v-for="vaccine in upcomingVaccines" :key="vaccine.id" class="hover-lift">
              <template v-slot:prepend>
                <v-avatar :color="getPriorityColor(vaccine.priority)" size="36">
                  <v-icon color="white">mdi-syringe</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>{{ vaccine.name }}</v-list-item-title>
              <v-list-item-subtitle>Due: {{ formatDate(vaccine.dueDate) }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-chip :color="getPriorityColor(vaccine.priority)" size="small" variant="elevated">
                  {{ vaccine.priority }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn color="primary" block variant="tonal" @click="navigateTo('/vaccines')">
              View All Vaccines
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Quick Actions -->
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-lightning-bolt</v-icon>
            Quick Actions
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-btn color="secondary" block height="100" @click="navigateTo('/vaccines')" class="text-body-1 hover-lift">
                  <v-icon size="36" class="mb-2">mdi-calendar-plus</v-icon>
                  <div>Add Vaccine</div>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="info" block height="100" @click="navigateTo('/clinics')" class="text-body-1 hover-lift">
                  <v-icon size="36" class="mb-2">mdi-map-search</v-icon>
                  <div>Find Clinic</div>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="success" block height="100" @click="navigateTo('/debunk')" class="text-body-1 hover-lift">
                  <v-icon size="36" class="mb-2">mdi-lightbulb-outline</v-icon>
                  <div>Myth Debunker</div>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="warning" block height="100" @click="navigateTo('/news')" class="text-body-1 hover-lift">
                  <v-icon size="36" class="mb-2">mdi-newspaper-variant-outline</v-icon>
                  <div>Latest News</div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Health News -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-newspaper-variant-outline</v-icon>
            Health News
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="article in recentNews" :key="article.id" cols="12" sm="6">
                <v-card variant="outlined" class="hover-lift">
                  <v-img :src="article.image" height="150" cover></v-img>
                  <v-card-title>{{ article.title }}</v-card-title>
                  <v-card-subtitle>{{ formatDate(article.date) }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn color="primary" variant="text">Read More</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block variant="tonal" @click="navigateTo('/news')">
              View All News
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'

const router = useRouter()

const upcomingVaccines = ref([
  { id: 1, name: 'Influenza (Flu)', dueDate: new Date(2025, 9, 15), priority: 'high' },
  { id: 2, name: 'COVID-19 Booster', dueDate: new Date(2025, 8, 22), priority: 'medium' },
  { id: 3, name: 'Tetanus Booster', dueDate: new Date(2025, 11, 5), priority: 'low' }
])

const healthStats = ref({
  vaccinesCompleted: 12,
  upcomingAppointments: 2,
  clinicsNearby: 8,
  daysToNextVaccine: 15
})

const recentNews = ref([
  {
    id: 1,
    title: 'New RSV Vaccine Approved for Adults 60+',
    date: new Date(2025, 6, 28),
    image: 'https://images.pexels.com/photos/5863365/pexels-photo-5863365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
  },
  {
    id: 2,
    title: 'Public Health Department Launches Vaccination Campaign',
    date: new Date(2025, 6, 25),
    image: 'https://images.pexels.com/photos/3952240/pexels-photo-3952240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
  }
])

const formatDate = (date) => {
  return format(date, 'MMM d, yyyy')
}

const getPriorityColor = (priority) => {
  const colors = {
    'high': 'error',
    'medium': 'warning',
    'low': 'success'
  }
  return colors[priority] || 'primary'
}

const navigateTo = (path) => {
  router.push(path)
}
</script>