<script setup>
import { kApp, kPage } from 'konsta/vue'
import { RouterView } from 'vue-router'
import AuthProvider from './providers/AuthProvider.vue'
import UnauthorizedView from './views/UnauthorizedView.vue'

const hmackey = '35df66f89c4336512a805a656125d757842a2d01a1b341d7ab91a702cc5aa236'
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
