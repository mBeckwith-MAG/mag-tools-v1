<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CalculatorVariantIcon from 'vue-material-design-icons/CalculatorVariant.vue'
import CashIcon from 'vue-material-design-icons/Cash.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
</script>
<template>
  <main role="main">
    <div class="container-fluid">
      <div class="row d-flex">
        <div class="col-sm-12 col-md-2 col-lg-1 order-1 order-md-1 mt-3">
          <ul class="nav nav-pills nav-flush flex-row flex-md-column mb-auto text-center">
            <li class="nav-item">
              <RouterLink to="/" active-class="active" class="nav-link py-3 border-bottom" aria-current="page" title=""
                data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                <home-icon />
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/vw-calc" active-class="active" class="nav-link py-3 border-bottom" title=""
                data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Calculate">
                <calculator-variant-icon />
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/sls-bns" active-class="active" class="nav-link py-3 border-bottom" title=""
                data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Calculate">
                <cash-icon />
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-md-8 col-lg-11 order-2 order-md-2 mt-3">
          <div class="container">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
