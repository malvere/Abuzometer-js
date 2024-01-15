<script setup>
import { kApp, kPage, kNavbar, kBlock } from 'konsta/vue';
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <k-navbar title="My App" />
      <k-block>
        <p>Here comes my app</p>
      </k-block>
    </k-page>
  </k-app>
</template>