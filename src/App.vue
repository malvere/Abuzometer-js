<script setup>
// import { kApp, kPage, kNavbar, kBlock } from 'konsta/vue';
import { kApp, kPage } from 'konsta/vue';
import { RouterView } from 'vue-router';

// const pageTitle = 'Abuzomer';
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <!-- <k-navbar :title="pageTitle" /> -->

      <!-- Use RouterView as a placeholder for the matched component -->
      <RouterView />
    </k-page>
  </k-app>
</template>
