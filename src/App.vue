<script setup>
import { kApp, kPage } from 'konsta/vue'
import { RouterView } from 'vue-router'
import AuthProvider from './providers/AuthProvider.vue'
import UnauthorizedView from './views/UnauthorizedView.vue'
import WebApp from '@twa-dev/sdk'
import { onMounted, ref } from 'vue'
import { apiEndpoints } from '@/api'
const state = ref({
  hasResponse: false,
  key: null
})
onMounted(async () => {
  const uid = WebApp.initDataUnsafe.user.id
  // const uid = "1380381516"
  console.log(uid)
  console.log(state.value)
  try {
    const response = await fetch(apiEndpoints.key, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: uid })
    })
    if (!response.ok) {
      throw new Error(`Failed with ${response.status}`)
    }
    state.value.hasResponse = true
    response.json().then((data) => (state.value.key = data.key))
    console.log(state.value)
  } catch (error) {
    console.error('Error fetching HMAC key: ', error)
  }
})
</script>

<template>
  <k-app theme="ios">
    <k-page v-if="state.hasResponse">
      <AuthProvider :hex_hmac_signature="state.key">
        <RouterView />
        <template #unauthorized v-if="state.key">
          <UnauthorizedView />
        </template>
      </AuthProvider>
    </k-page>
    <k-page v-else> Loading... </k-page>
  </k-app>
</template>
