<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import ActionSheet from '@/components/ActionSheet.vue'

const pageTitle = 'Home'
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <k-navbar :title="pageTitle" />
      <ActionSheet />
    </k-page>
  </k-app>
</template>
