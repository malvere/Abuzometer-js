<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import CalcView from '@/components/CalcInputs.vue'
import { kNavbar, kApp } from 'konsta/vue'
</script>

<template>
  <k-navbar title="КАЛькулятор" />
  <k-app theme="ios">
    <CalcView />
  </k-app>
</template>
