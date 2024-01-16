<script setup>
import CalcInputs from '@/components/CalcInputs.vue'

const pageTitle = 'Abuzomer'
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <k-navbar :title="pageTitle" />
      <CalcInputs />
    </k-page>
  </k-app>
</template>

