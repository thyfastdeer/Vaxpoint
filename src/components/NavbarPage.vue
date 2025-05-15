<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../services/auth.service'
import { useRouter } from 'vue-router'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  hideForUnauthenticated: {
    type: Boolean,
    default: true,
  },
})

const drawer = ref(true)
const router = useRouter()

// Use the authentication service
const { isAuthenticated, currentUser, isAdmin, logout, loadUserInfo,  } = useAuth()

// Load user info on component mount
onMounted(async () => {
  await loadUserInfo()
})

// Computed properties for user info
const userName = computed(() => {
  return currentUser.value ? currentUser.value.name || 'User' : 'Guest'
})

const userAvatar = computed(() => {
  return currentUser.value && currentUser.value.user_photo
    ? currentUser.value.user_photo
    : 'https://picsum.photos/1920/1080?random'
})

// Handle logout
function handleLogout() {
  logout()
  router.push('/login')
}

// Define all possible navigation paths with required roles
const allPaths = [
  // Public paths
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-view-dashboard-outline', text: 'Dashboard', route: '/dashboard', public: true },
  { icon: 'mdi-needle', text: 'My Vaccines', route: '/vaccines', public: true },
  { icon: 'mdi-map-marker-outline', text: 'Find Clinics', route: '/clinics', public: true },
  { icon: 'mdi-lightbulb-outline', text: 'Myth Debunker', route: '/debunk', public: true },
  { icon: 'mdi-newspaper-variant-outline', text: 'Health News', route: '/news', public: true },
  {icon: 'mdi-help', text: 'AboutUs', route: '/about-us', public: true },
  {icon: 'mdi-', text: 'ContactUs', route: '/contact-us', public: true },
  
  // Authentication paths
  { icon: 'mdi-lock', text: 'Login', route: '/login', showWhenLoggedOut: true },
 
]

// Filter paths based on authentication status and user role
const filteredPaths = computed(() => {
  return allPaths.filter((path) => {
    // Public paths are always visible
    if (path.public) return true

    // Paths that should only show when logged out
    if (path.showWhenLoggedOut && !isAuthenticated.value) return true

    // Paths that require authentication
    if (path.requiresAuth && isAuthenticated.value) {
      // Admin-only paths
      if (path.requiresAdmin) {
        return isAdmin.value
      }
      return true
    }

    return false
  })
})
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="isAuthenticated ? 'primary' : 'primary-darken-1'"
    dark
    class="elevation-3"
  >
    <div class="pa-4">
      <div class="d-flex align-center justify-center mb-4">
        <v-avatar size="80" class="elevation-2">
          <v-img :src="userAvatar" :alt="userName"></v-img>
        </v-avatar>
      </div>
      <div class="text-center">
        <h2 class="text-h6 font-weight-medium mb-1">{{ userName }}</h2>
        <p class="text-caption text-medium-emphasis">{{ isAuthenticated ? 'Member' : 'Guest' }}</p>
      </div>
    </div>

    <v-divider class="mb-2"></v-divider>

    <v-list nav density="compact">
      <v-list-item
        v-for="path in filteredPaths"
        :key="path.text"
        :to="path.route"
        :prepend-icon="path.icon"
        :title="path.text"
        class="mb-1 rounded-lg"
        active-class="list-item-active"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-4">
        <v-btn
          v-if="isAuthenticated"
          block
          color="error"
          variant="tonal"
          prepend-icon="mdi-logout"
          @click="handleLogout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar 
    :color="isAuthenticated ? 'primary' : 'primary-darken-1'"
    density="comfortable"
    class="elevation-2"
  >
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      color="white"
    ></v-app-bar-nav-icon>

    <v-app-bar-title class="text-white">
      <span class="font-weight-light">VAX</span>
      <span class="font-weight-bold">POINT</span>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="isAuthenticated"
      icon="mdi-bell-outline"
      color="white"
      variant="text"
    ></v-btn>

    <v-btn
      v-if="isAuthenticated"
      icon="mdi-cog-outline"
      color="white"
      variant="text"
    ></v-btn>
  </v-app-bar>
</template>

<style scoped>
.list-item-active {
  background-color: rgba(255, 255, 255, 0.1);
  border-right: 4px solid white;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

.v-navigation-drawer {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
</style>