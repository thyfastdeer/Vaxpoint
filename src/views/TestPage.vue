<template>

    <v-main>
        <!-- Hero Section -->
        <v-sheet color="primary" dark class="py-12" width="100%">
          <v-container fluid>
            <v-row align="center" class="py-12">
              <v-col cols="12" md="6">
                <h1 class="text-h2 font-weight-bold mb-4">Your Health, Our Priority</h1>
                <p class="text-h6 mb-8">VaxPoint provides convenient, reliable vaccination services for your entire family. Stay protected with our professional healthcare solutions.</p>
                <v-btn x-large color="white" class="mr-4 text-capitalize" elevation="2" dark>
                  <v-icon left>mdi-calendar-check</v-icon>
                  Schedule Now
                </v-btn>
                <v-btn x-large outlined class="text-capitalize" color="white">
                  Learn More
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-img src="/api/placeholder/600/400" max-width="500" alt="Vaccination Services" rounded></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
    
        <!-- Features Section -->
        <v-sheet color="grey lighten-4" class="py-12">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" class="text-center mb-8">
                <h2 class="text-h3 font-weight-bold">Our Services</h2>
                <p class="text-subtitle-1 mt-3">Comprehensive vaccination services for all ages</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" v-for="(service, index) in services" :key="index">
                <v-hover v-slot="{ hover }">
                  <v-card 
                    class="pa-4" 
                    height="100%" 
                    :elevation="hover ? 8 : 2"
                    :class="{ 'transform-y-n5': hover }"
                    transition="scale-transition"
                  >
                    <div class="d-flex justify-center mb-4">
                      <v-icon color="primary" size="64">{{ service.icon }}</v-icon>
                    </div>
                    <v-card-title class="text-h5 font-weight-bold text-center">{{ service.title }}</v-card-title>
                    <v-card-text class="text-center">
                      <p>{{ service.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
    
        </v-main>
    </template>
    
    <script>
    export default {
      data() {
        return {
          services: [
            { icon: 'mdi-hospital', title: 'Child Vaccination', description: 'Safe and effective vaccines for children.' },
            { icon: 'mdi-shield-check', title: 'Adult Vaccination', description: 'Stay protected with adult immunizations.' },
            { icon: 'mdi-needle', title: 'Travel Vaccination', description: 'Prepare for your travels with required vaccines.' }
          ]
        };
      }
    };
    </script>