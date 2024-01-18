<script setup>
import CalcResults from '@/components/calc/CalcResult.vue'
import { kNavbar, kApp } from 'konsta/vue'
</script>

<template>
  <k-navbar title="Results" />
  <k-app theme="ios">
    <CalcResults />
  </k-app>
</template>
