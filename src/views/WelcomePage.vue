<template>
  <v-container fluid class="welcome-background">
    <v-row justify="center" align="center" class="pt-16">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="welcome-card" elevation="10">
          <!-- Welcome header -->
          <v-card-title class="text-center primary darken-2 white--text py-4">
            <h1 class="text-h3 font-weight-bold w-100">WELCOME TO VAXPOINT</h1>
          </v-card-title>
          
          <!-- User profile section -->
          <v-card-text v-if="isAuthenticated" class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img
                :src="userPhotoUrl"
                alt="User Photo"
                cover
              ></v-img>
            </v-avatar>
            
            <div class="text-uppercase text-h4 font-weight-bold my-2">
              {{ userName }}
            </div>
            
            <div class="text-uppercase text-h6 font-weight-medium grey--text text--darken-1 mb-2">
              {{ userEmail }}
            </div>
            
            <div class="text-uppercase text-body-1 primary--text text--darken-2 font-weight-medium">
              {{ userRole }}
            </div>
            
            <v-divider class="my-6"></v-divider>
            
            <!-- Welcome message -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%;">
              Welcome to Vaxpoint, your personal vaccination management system. 
              Track your immunizations, find nearby clinics, and stay informed about important health updates.
            </p>
            
            <!-- Action buttons -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="primary"
                  dark
                  large
                  :to="'/vaccines'"
                >
                  <v-icon left>mdi-needle</v-icon>
                  My Vaccines
                </v-btn>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  outlined
                  color="primary"
                  large
                  :to="'/clinics'"
                >
                  <v-icon left>mdi-map-marker</v-icon>
                  Find Clinics
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          
          <!-- Guest view -->
          <v-card-text v-else class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img
                src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg"
                alt="Healthcare"
                cover
              ></v-img>
            </v-avatar>
            
            <div class="text-h4 font-weight-bold my-2">
              YOUR HEALTH MATTERS
            </div>
            
            <v-divider class="my-6"></v-divider>
            
            <!-- Welcome message for guests -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%;">
              Join Vaxpoint to track your vaccinations, find nearby clinics, and stay informed about 
              important health updates. Your journey to better health starts here.
            </p>
            
            <!-- Action buttons for guests -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="primary"
                  dark
                  large
                  :to="'/login'"
                >
                  <v-icon left>mdi-login</v-icon>
                  Login
                </v-btn>
              </v-col>
              
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  outlined
                  color="primary"
                  large
                  :to="'/register'"
                >
                  <v-icon left>mdi-account-plus</v-icon>
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuth } from '../services/auth.service'

const { isAuthenticated, currentUser, loadUserInfo } = useAuth()

// Load user data on component mount
onMounted(async () => {
  await loadUserInfo()
})

// Computed properties for user info
const userName = computed(() => {
  return currentUser.value?.name || 'GUEST USER'
})

const userEmail = computed(() => {
  return currentUser.value?.email || 'guest@example.com'
})

const userRole = computed(() => {
  return currentUser.value?.role?.name || 'Member'
})

const userPhotoUrl = computed(() => {
  if (currentUser.value?.user_photo) {
    return `/storage/${currentUser.value.user_photo}`
  } else {
    return 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg'
  }
})
</script>

<style scoped>
.welcome-background {
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%);
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.welcome-card {
  border-radius: 16px;
  overflow: hidden;
}
</style>