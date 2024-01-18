<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import ActionSheet from '@/components/ActionSheet.vue'
import { kNavbar, kApp } from 'konsta/vue'
</script>

<template>
  <k-navbar title="КАЛькулятор" />
  <k-app theme="ios">
    <ActionSheet />
  </k-app>
</template>
