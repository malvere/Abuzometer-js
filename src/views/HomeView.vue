<script setup>
import CalcInputs from '@/components/calc/CalcInputs.vue'
import { kNavbar, kApp } from 'konsta/vue'
</script>

<template>
  <k-navbar title="Калькулятор" />
  <k-app theme="ios">
    <CalcInputs />
  </k-app>
</template>
