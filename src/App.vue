<script setup>
import { kApp, kPage } from 'konsta/vue'
import { RouterView } from 'vue-router'
import AuthProvider from './providers/AuthProvider.vue'
import UnauthorizedView from './views/UnauthorizedView.vue'
import WebApp from '@twa-dev/sdk'
import { onMounted, ref } from 'vue'
import { apiEndpoints } from '@/api'
import axios from 'axios'
const state = ref({
  hasResponse: false,
  key: null
})
onMounted(async () => {
  const uid = WebApp.initDataUnsafe.user.id
  try {
    const response = await axios.post(apiEndpoints.key, {
      user_id: uid.toString()
    })
    // if (!response.ok) {
    //   throw new Error(`Failed with ${response.status}`)
    // }
    state.value.hasResponse = true
    state.value.key = response.data.key
    // response.json().then((data) => (state.value.key = data.key))
    console.log(response.data)
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
