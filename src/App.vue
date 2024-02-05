<script setup>
import { kApp, kPage, kBlockTitle, kList, kListInput, kListButton } from 'konsta/vue'
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
const inviteCode = ref('')

onMounted(async () => {
  const uid = WebApp.initDataUnsafe.user.id
  try {
    const response = await axios.post(apiEndpoints.key, {
      user_id: uid.toString()
    })
    state.value.hasResponse = true
    state.value.key = response.data.key
    console.log(response.status)
  } catch (error) {
    console.error('Error fetching HMAC key: ', error)
  }
})

const authUser = async () => {
  const uid = WebApp.initDataUnsafe.user.id
  try {
    const conf = {
      params: {
        tgid: uid,
        code: inviteCode.value
      }
    }
    const response = await axios.get(apiEndpoints.user, conf)
    console.log('User Authenticated:', response.data);
  } catch (error) {
    console.error('Error creating user: ', error)
  }

}

</script>

<!-- <template>
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
</template> -->

<template>
  <k-app theme="ios">
    <k-page v-if="!!state.key">
      <AuthProvider :hex_hmac_signature="state.key">
        <RouterView />
        <template #unauthorized v-if="state.key">
          <UnauthorizedView />
        </template>
      </AuthProvider>
    </k-page>
    <k-page v-else> 
      <k-block-title>Отказ в доступе</k-block-title>
      <k-list inset strong>
        <k-list-input
        label="Инвайт"
        type="text"
        placeholder="Введите инвайт код"
        :value="inviteCode"
        @change="(e) => (inviteCode = e.target.value)"
      />
      <k-list-button class="k-color-brand-red" @click="authUser()"> Авиторизация </k-list-button>
      </k-list>
    </k-page>
  </k-app>
</template>