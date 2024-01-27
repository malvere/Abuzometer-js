<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import CalcInputs from '@/components/calc/CalcInputs.vue'
import { kNavbar, kApp } from 'konsta/vue'
</script>

<template>
  <k-navbar title="КАЛькулятор" />
  <k-app theme="ios">
    <CalcInputs />
  </k-app>
</template>
