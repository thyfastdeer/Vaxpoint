<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavbarPage.vue'

</script>

<template>
   <v-app>
    <NavBar/>
    
    <v-content class="main-content">
      <RouterView/>
    </v-content>

   
    
  </v-app>

  
</template>

<style>
.main-content{
  padding-top: 20px; 
  min-height: 90vh; 
  flex-grow: 1;
}
</style>

