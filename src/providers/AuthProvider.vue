/* Checks if user uses valid telegram client */

<script setup>
import { ref, provide, onMounted } from 'vue'
import WebApp from '@twa-dev/sdk'
import hmac from 'js-crypto-hmac'

const props = defineProps({
  hex_hmac_signature: {
    type: String,
    required: true
  }
})

const clientAuthorized = ref(null)

const ksort = (obj) => {
  const sortedKeys = Object.keys(obj).sort()
  const sortedObj = {}

  sortedKeys.forEach((key) => {
    sortedObj[key] = obj[key]
  })

  return sortedObj
}

const buffer2Hex = (buffer) => {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('')
}

const hex2Buffer = (hexString) => {
  const bytes = []
  for (let i = 0; i < hexString.length; i += 2) {
    bytes.push(parseInt(hexString.substr(i, 2), 16))
  }
  return new Uint8Array(bytes)
}

let initDataUnsafe = { ...WebApp.initDataUnsafe }
let initDataHash = initDataUnsafe.hash
let initDataString = ''

delete initDataUnsafe['hash']
initDataUnsafe = ksort(initDataUnsafe)

initDataString = Object.entries(initDataUnsafe)
  .map(([key, value]) => {
    value = typeof value === 'object' ? JSON.stringify(value, null, 0) : value
    return `${key}=${value}`
  })
  .join('\n')

const checkAuthorization = async () => {
  try {
    const result = await hmac.compute(
      hex2Buffer(props.hex_hmac_signature),
      new TextEncoder().encode(initDataString),
      'SHA-256'
    )
    clientAuthorized.value = buffer2Hex(result) === initDataHash
    provide('authorized', clientAuthorized.value)
  } catch (error) {
    console.error('Error checking authorization:', error)
  }
}

onMounted(() => {
  checkAuthorization()
})
</script>

<template>
  <slot v-if="clientAuthorized" />
  <slot v-else name="unauthorized"> Unauthorized Telegram Client </slot>
</template>

<style lang="scss"></style>
