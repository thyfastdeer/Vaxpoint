<template>
  <div class="clinics-page">
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-map-marker</v-icon>
            Find Vaccination Clinics
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="searchText"
                  label="Search by name or location"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="selectedVaccine"
                  :items="vaccineOptions"
                  label="Filter by vaccine type"
                  prepend-inner-icon="mdi-needle"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="sortBy"
                  :items="[
                    { title: 'Distance (closest first)', value: 'distance' },
                    { title: 'Rating (highest first)', value: 'rating' }
                  ]"
                  label="Sort by"
                  prepend-inner-icon="mdi-sort"
                ></v-select>
              </v-col>
            </v-row>
            <div v-if="filteredClinics.length === 0" class="text-center py-4">
              <v-icon size="64" color="grey">mdi-map-marker-off</v-icon>
              <p class="text-h6 mt-2">No clinics found</p>
              <p class="text-body-1">Try adjusting your search criteria</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Clinics Display -->
    <v-row>
      <v-col
        v-for="clinic in filteredClinics"
        :key="clinic.id"
        cols="12"
        md="6"
      >
        <v-card class="hover-lift">
          <div class="d-flex flex-column flex-md-row">
            <v-img
              :src="clinic.image"
              max-width="200"
              height="100%"
              cover
              class="d-none d-md-flex"
            ></v-img>
            <div class="flex-grow-1">
              <v-card-title class="d-flex">
                {{ clinic.name }}
                <v-chip size="small" color="primary" class="ms-2">
                  {{ clinic.distance.toFixed(1) }} mi
                </v-chip>
              </v-card-title>
              <v-card-text>
                <div class="mb-2">
                  <v-icon size="small" color="primary">mdi-map-marker</v-icon>
                  {{ clinic.address }}
                </div>
                <div class="mb-2">
                  <v-icon size="small" color="primary">mdi-phone</v-icon>
                  {{ clinic.phone }}
                </div>
                <div class="text-caption">
                  <v-rating
                    :model-value="clinic.rating"
                    color="amber"
                    density="compact"
                    size="small"
                    readonly
                  ></v-rating>
                  <span class="ms-2">{{ clinic.rating.toFixed(1) }}</span>
                </div>
                <div class="mt-2">
                  <v-chip
                    v-for="vaccine in clinic.vaccines.slice(0, 3)"
                    :key="vaccine"
                    size="x-small"
                    class="me-1 mb-1"
                    variant="outlined"
                    color="secondary"
                  >
                    {{ vaccine }}
                  </v-chip>
                  <v-chip
                    v-if="clinic.vaccines.length > 3"
                    size="x-small"
                    variant="outlined"
                    color="secondary"
                  >
                    +{{ clinic.vaccines.length - 3 }} more
                  </v-chip>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="showDetails(clinic)"
                >
                  Details
                </v-btn>
                <v-btn
                  color="secondary"
                  variant="text"
                  prepend-icon="mdi-directions"
                >
                  Directions
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Placeholder for Map -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-map</v-icon>
            Clinic Locations
          </v-card-title>
          <v-card-text class="pa-0">
            <div id="map" style="height: 500px; width: 100%;"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Clinic Details Dialog -->
    <v-dialog v-model="showClinicDialog" max-width="600">
      <v-card v-if="selectedClinic">
        <v-card-title class="d-flex justify-space-between align-center">
          {{ selectedClinic.name }}
          <v-btn icon @click="showClinicDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="mb-4">
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-map-marker</v-icon>
              <span>{{ selectedClinic.address }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-phone</v-icon>
              <span>{{ selectedClinic.phone }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-clock-time-four-outline</v-icon>
              <span>Open today: 8:00 AM - 8:00 PM</span>
            </div>
            <div class="d-flex align-center">
              <v-rating
                :model-value="selectedClinic.rating"
                color="amber"
                density="compact"
                size="small"
                readonly
                class="mr-2"
              ></v-rating>
              <span>{{ selectedClinic.rating.toFixed(1) }}</span>
            </div>
          </div>
          <div class="mb-4">
            <h4 class="text-subtitle-1 font-weight-bold mb-2">Available Vaccines:</h4>
            <v-chip
              v-for="(vaccine, index) in selectedClinic.vaccines"
              :key="index"
              size="small"
              class="me-1 mb-1"
              color="secondary"
              variant="outlined"
            >
              {{ vaccine }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="bookAppointment(selectedClinic)">
            Book Appointment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

let map = null;
const mapInitialized = ref(false);
const showClinicDialog = ref(false);
const selectedClinic = ref(null);

// Initialize map when component is mounted
onMounted(() => {
  // Small delay to ensure the DOM is fully rendered
  setTimeout(initMap, 100);
});

// Clean up map when component is unmounted
onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});

const initMap = () => {
  // Check if map container exists
  if (!document.getElementById('map')) return;
  
  // Initialize map centered on a default location (e.g., Nairobi)
  map = L.map('map').setView([-1.286389, 36.817223], 12);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add markers for each clinic
  clinics.value.forEach(clinic => {
    if (clinic.lat && clinic.lng) {
      const marker = L.marker([clinic.lat, clinic.lng])
        .addTo(map)
        .bindPopup(`<b>${clinic.name}</b><br>${clinic.address}`);
      
      // Add click event to show clinic details
      marker.on('click', () => {
        showClinicDetails(clinic);
      });
    }
  });
  
  mapInitialized.value = true;
};

const showClinicDetails = (clinic) => {
  selectedClinic.value = clinic;
  showClinicDialog.value = true;
  
  // Pan to the selected clinic on the map
  if (map && clinic.lat && clinic.lng) {
    map.setView([clinic.lat, clinic.lng], 15);
  }
};

const bookAppointment = (clinic) => {
  // Here you would typically navigate to an appointment page
  console.log('Booking appointment at:', clinic.name);
  // For now, just close the dialog
  showClinicDialog.value = false;
};

// Dummy clinic data with coordinates
const clinics = ref([
  {
    id: 1,
    name: 'City Health Center',
    address: 'Moi Avenue, Nairobi, Kenya',
    phone: '(555) 123-4567',
    rating: 4.5,
    distance: 1.2,
    lat: -1.2864,
    lng: 36.8172,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8b25a02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['COVID-19', 'Influenza', 'Hepatenta B', 'MMR']
  },
  {
    id: 2,
    name: 'Westside Medical Clinic',
    address: 'Westlands, Nairobi, Kenya',
    phone: '(555) 987-6543',
    rating: 4.2,
    distance: 2.5,
    lat: -1.2656,
    lng: 36.8025,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['COVID-19', 'HPV', 'Tetanus', 'Varicella']
  },
  {
    id: 3,
    name: 'Downtown Vaccination Hub',
    address: 'Tom Mboya St, Nairobi, Kenya',
    phone: '(555) 456-7890',
    rating: 4.7,
    distance: 3.1,
    lat: -1.2833,
    lng: 36.8167,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8b25a02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['COVID-19', 'Influenza', 'Pneumonia', 'Shingles']
  },
  {
    id: 4,
    name: 'Pediatric Care Center',
    address: 'Kileleshwa, Nairobi, Kenya',
    phone: '(555) 234-5678',
    rating: 4.8,
    distance: 4.0,
    lat: -1.2667,
    lng: 36.7833,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['MMR', 'DTaP', 'Hib', 'Polio', 'Hepatenta B']
  },
  {
    id: 5,
    name: 'Family Health Plus',
    address: 'Kilimani, Nairobi, Kenya',
    phone: '(555) 345-6789',
    rating: 4.3,
    distance: 5.2,
    lat: -1.3000,
    lng: 36.8000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8b25a02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['COVID-19', 'Influenza', 'Tetanus', 'Hepatenta A']
  },
  {
    id: 6,
    name: 'Community Wellness Center',
    address: 'Kawangware, Nairobi, Kenya',
    phone: '(555) 456-7890',
    rating: 4.6,
    distance: 6.0,
    lat: -1.2833,
    lng: 36.7667,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    vaccines: ['COVID-19', 'MMR', 'Varicella', 'Hepatenta B']
  }
])

// Filter and search
const searchText = ref('')
const selectedVaccine = ref('')
const sortBy = ref('distance')
const vaccineOptions = computed(() => {
  const allVaccines = new Set()
  clinics.value.forEach(clinic => {
    clinic.vaccines.forEach(vaccine => allVaccines.add(vaccine))
  })
  return Array.from(allVaccines).sort()
})

const filteredClinics = computed(() => {
  let filtered = [...clinics.value]
  
  if (selectedVaccine.value) {
    filtered = filtered.filter(clinic => 
      clinic.vaccines.includes(selectedVaccine.value)
    )
  }
  
  if (searchText.value) {
    const search = searchText.value.toLowerCase()
    filtered = filtered.filter(clinic => 
      clinic.name.toLowerCase().includes(search) || 
      clinic.address.toLowerCase().includes(search)
    )
  }
  
  filtered.sort((a, b) => {
    if (sortBy.value === 'distance') {
      return a.distance - b.distance
    } else if (sortBy.value === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })
  
  return filtered
})

// Show clinic details
const showDetails = (clinic) => {
  showClinicDetails(clinic);
  
  // If map is initialized, pan to the selected clinic
  if (mapInitialized.value && clinic.lat && clinic.lng) {
    map.setView([clinic.lat, clinic.lng], 15);
  }
}
</script>

<style scoped>
.clinics-page {
  padding-bottom: 2rem;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Ensure the map container has proper z-index */
#map {
  z-index: 1;
  border-radius: 4px;
}

/* Fix for Vuetify dialogs */
.v-dialog {
  z-index: 2500 !important;
}
</style>
