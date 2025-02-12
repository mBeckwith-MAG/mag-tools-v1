<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
        <p class="display-4 text-center">VW Calculator</p>
        <nav class="row justify-content-center">
          <RouterLink class="col col-md-3 col-xl-2 btn btn-outline-info m-1" active-class="btn-secondary" to="/">Home</RouterLink>
          <!-- <RouterLink class="col col-md-3 col-xl-2 btn btn-outline-info m-1" active-class="btn-secondary" to="/about">About</RouterLink>
          <RouterLink class="col col-md-3 col-xl-2 btn btn-outline-info m-1" active-class="btn-secondary" to="/other">Other</RouterLink> -->
          <RouterLink class="col col-md-3 col-xl-2 btn btn-outline-info m-1" active-class="btn-secondary" to="/vw-calc">VW Calcuator</RouterLink>
        </nav>
    </header>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>
