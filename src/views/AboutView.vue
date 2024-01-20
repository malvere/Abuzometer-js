<script setup>
import FormInputs from '@/components/FormInputs.vue'

const pageTitle = 'Abuzomer'
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <k-navbar :title="pageTitle" />
      <FormInputs />
    </k-page>
  </k-app>
</template>
