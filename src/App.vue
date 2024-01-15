<script setup>
import { kApp, kPage, kNavbar, kBlock } from 'konsta/vue'
import ActionSheet from '@/components/ActionSheet.vue'
import FormInputs from '@/components/FormInputs.vue';

const pageTitle = 'Abuzomer'
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <k-navbar :title="pageTitle" />
      <k-block>
        <!-- <p>Here comes my app</p> -->
      </k-block>
      <ActionSheet />
      <!-- <FormInputs /> -->
    </k-page>
  </k-app>
</template>
