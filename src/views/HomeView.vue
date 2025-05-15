<template>
  <div class="home">
    <!-- Hero Section -->
    <v-sheet class="bg-primary" height="600">
      <v-container class="h-100">
        <v-row class="h-100" align="center">
          <v-col cols="12" md="6">
            <h1 class="text-h2 font-weight-bold text-white mb-6">
              Your Personal Vaccination Management Platform
            </h1>
            <p class="text-h6 text-white mb-8">
              Track your vaccinations, find nearby clinics, and stay informed about your health with VaxPoint's comprehensive healthcare solutions.
            </p>
            <div class="d-flex gap-4">
              <v-btn
                size="x-large"
                color="secondary"
                class="text-uppercase"
                to="/vaccines"
              >
                Get Started
              </v-btn>
              <v-btn
                size="x-large"
                variant="outlined"
                color="white"
                class="text-uppercase"
                to="/about-us"
              >
                Learn More
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-none d-md-flex justify-center">
            <v-img
              src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg"
              max-width="250"
              max-height="350"
              class="rounded-lg"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Stats Section -->
    <v-container class="stats-section my-15">
      <v-row>
        <v-col
          v-for="(stat, index) in stats"
          :key="index"
          cols="6"
          md="3"
          class="text-center"
        >
          <h2 class="text-h3 font-weight-bold primary--text mb-2">
            {{ stat.number }}
          </h2>
          <p class="text-subtitle-1">{{ stat.label }}</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Services Section -->
    <v-container class="my-15">
      <v-row>
        <v-col cols="12" class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-3">Our Services</h2>
          <p class="text-subtitle-1">Comprehensive vaccination management at your fingertips</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(service, index) in services"
          :key="index"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card height="100%" class="hover-lift">
            <v-card-text class="text-center pa-6">
              <v-icon
                :icon="service.icon"
                color="primary"
                size="64"
                class="mb-4"
              ></v-icon>
              <h3 class="text-h5 font-weight-bold mb-4">{{ service.title }}</h3>
              <p class="text-body-1">{{ service.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Testimonials Section -->
    <v-sheet color="grey-lighten-4" class="py-15">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="text-h3 font-weight-bold mb-3">What Our Users Say</h2>
            <p class="text-subtitle-1">Join thousands of satisfied users managing their health with VaxPoint</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(testimonial, index) in testimonials"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card height="100%" class="hover-lift">
              <v-card-text class="pa-6">
                <div class="mb-4">
                  <v-rating
                    :model-value="testimonial.rating"
                    color="amber"
                    density="compact"
                    readonly
                  ></v-rating>
                </div>
                <p class="text-body-1 font-italic mb-6">"{{ testimonial.quote }}"</p>
                <div class="d-flex align-center">
                  <v-avatar color="primary" class="mr-3">
                    <v-icon color="white">mdi-account</v-icon>
                  </v-avatar>
                  <div>
                    <div class="font-weight-medium">{{ testimonial.author }}</div>
                    <div class="text-caption">{{ testimonial.role }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- CTA Section -->
    <v-sheet color="primary" class="py-15">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p class="text-h6 text-white mb-8">
              Join VaxPoint today and experience the easiest way to manage your vaccinations
            </p>
            <v-btn
              size="x-large"
              color="secondary"
              class="text-uppercase"
              to="/sign-up"
            >
              Get Started Now
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    icon: 'mdi-shield-check',
    title: 'Vaccination Tracking',
    description: 'Keep track of your vaccination history and upcoming doses with our easy-to-use digital records.'
  },
  {
    icon: 'mdi-map-marker',
    title: 'Clinic Finder',
    description: 'Find vaccination clinics near you with real-time availability and appointment scheduling.'
  },
  {
    icon: 'mdi-newspaper-variant',
    title: 'Health Updates',
    description: 'Stay informed with the latest vaccine news, research, and health recommendations.'
  },
  {
    icon: 'mdi-lightbulb-outline',
    title: 'Myth Debunker',
    description: 'Get accurate, science-based information about vaccines and combat common misconceptions.'
  }
])

const stats = ref([
  { number: '1M+', label: 'Vaccinations Tracked' },
  { number: '500+', label: 'Partner Clinics' },
  { number: '98%', label: 'User Satisfaction' },
  { number: '24/7', label: 'Support Available' }
])

const testimonials = ref([
  {
    quote: "VaxPoint has made managing my family's vaccination records so much easier. The reminders are invaluable!",
    author: "Sarah M.",
    role: "Parent of 3",
    rating: 5
  },
  {
    quote: "As a healthcare provider, I recommend VaxPoint to all my patients. It's comprehensive and user-friendly.",
    author: "Dr. James Wilson",
    role: "Family Physician",
    rating: 5
  },
  {
    quote: "The clinic finder feature saved me so much time. I found a convenient location and booked instantly.",
    author: "Michael P.",
    role: "Business Traveler",
    rating: 5
  }
])
</script>

<style scoped>
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.stats-section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>