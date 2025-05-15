<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-needle</v-icon>
            My Vaccinations
            <v-spacer></v-spacer>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="addVaccine">
              Add Vaccine
            </v-btn>
          </v-card-title>
          
          <v-card-text>
            <v-data-table
              :headers="[
                { title: 'Vaccine', key: 'name' },
                { title: 'Brand', key: 'brand' },
                { title: 'Date Received', key: 'date' },
                { title: 'Next Dose', key: 'nextDose' },
                { title: 'Status', key: 'status' },
                { title: 'Actions', key: 'actions', sortable: false }
              ]"
              :items="vaccines"
              class="elevation-1"
            >
              <template v-slot:item.date="{ item }">
                {{ formatDate(item.date) }}
              </template>
              
              <template v-slot:item.nextDose="{ item }">
                <template v-if="item.nextDose && !item.completed">
                  {{ formatDate(item.nextDose) }}
                  <div class="text-caption">
                    {{ daysRemaining(item.nextDose) }} days remaining
                  </div>
                </template>
                <span v-else>N/A</span>
              </template>
              
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="item.completed ? 'success' : (item.nextDose && daysRemaining(item.nextDose) < 30 ? 'warning' : 'info')"
                  size="small"
                >
                  {{ item.completed ? 'Completed' : (item.nextDose ? 'Due Soon' : 'Active') }}
                </v-chip>
              </template>
              
              <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="editVaccine(item)">
                  mdi-pencil
                </v-icon>
                <v-icon
                  v-if="!item.completed"
                  size="small"
                  @click="markCompleted(item)"
                >
                  mdi-check
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-chart-timeline-variant</v-icon>
            Vaccination Timeline
          </v-card-title>
          <v-card-text>
            <v-timeline side="end">
              <v-timeline-item
                v-for="vaccine in [...vaccines].sort((a, b) => b.date.getTime() - a.date.getTime())"
                :key="vaccine.id"
                :dot-color="vaccine.completed ? 'success' : 'primary'"
                size="small"
              >
                <template v-slot:opposite>
                  {{ formatDate(vaccine.date) }}
                </template>
                <v-card variant="outlined" class="mb-2">
                  <v-card-title class="text-subtitle-1">{{ vaccine.name }}</v-card-title>
                  <v-card-text>
                    <div class="text-caption">
                      Brand: {{ vaccine.brand }}<br>
                      Location: {{ vaccine.location }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-calendar-month</v-icon>
            Upcoming Doses
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="vaccine in vaccines.filter(v => v.nextDose && !v.completed)"
              :key="vaccine.id"
              :subtitle="formatDate(vaccine.nextDose)"
            >
              <template v-slot:prepend>
                <v-avatar
                  :color="vaccine.nextDose && daysRemaining(vaccine.nextDose) < 30 ? 'warning' : 'info'"
                  size="36"
                >
                  <v-icon color="white">mdi-calendar</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title>{{ vaccine.name }}</v-list-item-title>
              <template v-slot:append>
                <v-chip
                  :color="vaccine.nextDose && daysRemaining(vaccine.nextDose) < 30 ? 'warning' : 'info'"
                  size="small"
                >
                  {{ vaccine.nextDose ? daysRemaining(vaccine.nextDose) + ' days' : '' }}
                </v-chip>
              </template>
            </v-list-item>
            
            <v-list-item v-if="!vaccines.some(v => v.nextDose && !v.completed)">
              <v-list-item-title>No upcoming doses</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Edit Vaccine' : 'Add Vaccine' }}</span>
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Vaccine Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.brand"
                  label="Brand/Manufacturer"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.location"
                  label="Location"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="editedItem.completed"
                  label="Series Completed"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-dialog
                  ref="dateDialog"
                  v-model="dateDialog"
                  width="290px"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date Received"
                      readonly
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.date"></v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6">
                <v-dialog
                  ref="nextDateDialog"
                  v-model="nextDateDialog"
                  width="290px"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="editedItem.nextDose"
                      label="Next Dose Date"
                      readonly
                      v-bind="props"
                      :disabled="editedItem.completed"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.nextDose"></v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="text" @click="saveVaccine">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'

// Vaccine records data
const vaccines = ref([
  { 
    id: 1, 
    name: 'COVID-19', 
    brand: 'Pfizer-BioNTech', 
    date: new Date(2024, 1, 15), 
    location: 'City Hospital',
    nextDose: new Date(2025, 9, 15),
    completed: false
  },
  { 
    id: 2, 
    name: 'Influenza (Flu)', 
    brand: 'Fluzone Quadrivalent', 
    date: new Date(2024, 9, 5), 
    location: 'Wellness Clinic',
    nextDose: new Date(2025, 9, 5),
    completed: false
  },
  { 
    id: 3, 
    name: 'Tetanus/Diphtheria/Pertussis (Tdap)', 
    brand: 'Adacel', 
    date: new Date(2020, 3, 22), 
    location: 'Family Care Center',
    nextDose: new Date(2030, 3, 22),
    completed: false
  },
  { 
    id: 4, 
    name: 'Hepatitis B', 
    brand: 'Engerix-B', 
    date: new Date(2018, 7, 10), 
    location: 'University Health Services',
    nextDose: null,
    completed: true
  }
])

// Form state
const dialog = ref(false)
const isEditing = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
  id: 0,
  name: '',
  brand: '',
  date: new Date(),
  location: '',
  nextDose: null,
  completed: false
})
const defaultItem = {
  id: 0,
  name: '',
  brand: '',
  date: new Date(),
  location: '',
  nextDose: null,
  completed: false
}

// Format dates for display
const formatDate = (date) => {
  return date ? format(date, 'MMM d, yyyy') : 'N/A'
}

// Calculate days remaining
const daysRemaining = (date) => {
  if (!date) return null
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

// Open dialog for adding new vaccine
const addVaccine = () => {
  isEditing.value = false
  editedItem.value = { ...defaultItem, id: vaccines.value.length + 1 }
  dialog.value = true
}

// Open dialog for editing vaccine
const editVaccine = (item) => {
  editedIndex.value = vaccines.value.findIndex(v => v.id === item.id)
  editedItem.value = { ...item }
  isEditing.value = true
  dialog.value = true
}

// Save vaccine data
const saveVaccine = () => {
  if (isEditing.value) {
    Object.assign(vaccines.value[editedIndex.value], editedItem.value)
  } else {
    vaccines.value.push({ ...editedItem.value })
  }
  dialog.value = false
}

// Mark vaccine as completed
const markCompleted = (item) => {
  const index = vaccines.value.findIndex(v => v.id === item.id)
  if (index !== -1) {
    vaccines.value[index].completed = true
  }
}
</script>

<script>
export default {
  data() {
    return {
      dateDialog: false,
      nextDateDialog: false
    }
  }
}
</script>