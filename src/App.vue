<script setup>
import { kApp, kPage } from 'konsta/vue'
import { RouterView } from 'vue-router'
import AuthProvider from './providers/AuthProvider.vue'
import UnauthorizedView from './views/UnauthorizedView.vue'

const hmackey = 'fe9155b917ca3cdcf46d125795064948a502b61be4eb6c364430ef43f91a0f93'
</script>

<template>
  <k-app theme="ios">
    <k-page>
      <AuthProvider :hex_hmac_signature="hmackey">
        <RouterView />
        <template #unauthorized v-if="hmackey">
          <UnauthorizedView />
        </template>
      </AuthProvider>
    </k-page>
  </k-app>
</template>
