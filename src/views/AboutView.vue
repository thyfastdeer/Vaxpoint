<template>
  <v-container class="about-us">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-h3 my-6 primary--text">About Vaxpoint</h1>
      </v-col>
    </v-row>

    <!-- Hero Section -->
    <v-row class="hero-section mb-12">
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <h2 class="text-h4 mb-4 font-weight-medium">Our Mission</h2>
          <p class="text-body-1">
            At Vaxpoint, we're dedicated to making vaccination management simple, accessible, and efficient. 
            Founded in 2025, our platform helps individuals track their immunization history, find nearby clinics, 
            and stay informed about important vaccine-related information.
          </p>
          <p class="text-body-1 mt-4">
            We believe in the power of preventive healthcare and work tirelessly to ensure everyone has 
            access to accurate vaccination information and quality healthcare services.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg"
          alt="Healthcare professional"
          class="rounded-lg elevation-3"
          height="400"
          cover
        ></v-img>
      </v-col>
    </v-row>

    <!-- Our Values -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Values</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="primary" class="mb-4">mdi-shield-check</v-icon>
          <h3 class="text-h5 mb-3">Health Protection</h3>
          <p>We prioritize public health by providing accurate, science-based information and easy access to vaccination services.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="primary" class="mb-4">mdi-database-check</v-icon>
          <h3 class="text-h5 mb-3">Data Accuracy</h3>
          <p>We maintain precise vaccination records and provide reliable information to help you make informed health decisions.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="primary" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h5 mb-3">Community Health</h3>
          <p>We work with healthcare providers and communities to improve vaccination rates and public health awareness.</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Team Section -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Team</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg" height="250" cover></v-img>
          <v-card-title class="justify-center">Dr. Sarah Chen</v-card-title>
          <v-card-subtitle>Chief Medical Officer</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg" height="250" cover></v-img>
          <v-card-title class="justify-center">Dr. Michael Patel</v-card-title>
          <v-card-subtitle>Head of Research</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg" height="250" cover></v-img>
          <v-card-title class="justify-center">Emma Rodriguez</v-card-title>
          <v-card-subtitle>Clinic Relations</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg" height="250" cover></v-img>
          <v-card-title class="justify-center">James Wilson</v-card-title>
          <v-card-subtitle>Technology Director</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Achievements -->
    <v-row class="my-10 achievements-section py-6">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Impact</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">1M+</span>
        </div>
        <h3 class="mb-2">Vaccinations Tracked</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">500+</span>
        </div>
        <h3 class="mb-2">Partner Clinics</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">50+</span>
        </div>
        <h3 class="mb-2">Cities Covered</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">98%</span>
        </div>
        <h3 class="mb-2">User Satisfaction</h3>
      </v-col>
    </v-row>

    <!-- Contact CTA -->
    <v-row class="mt-12 mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 mb-4">Have Questions About Vaccines?</h2>
        <p class="mb-6 text-body-1">Our team of healthcare professionals is here to help you make informed decisions about your health.</p>
        <v-btn 
          color="primary" 
          size="large" 
          class="white--text" 
          to="/contact-us"
        >
          Contact Our Team
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional setup logic needed
</script>

<style scoped>
.about-us {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.achievements-section {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stat-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 137, 123, 0.1);
  border: 2px solid #00897b;
  color: #00897b;
}

h1, h2, h3, h4 {
  font-family: 'Roboto', sans-serif;
}

.hero-section p {
  line-height: 1.8;
}
</style>