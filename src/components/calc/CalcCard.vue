<script setup>
import { ref } from 'vue'
import { kPage, kPopup, kNavbar, kLink, kBlock } from 'konsta/vue'

import CalcResult from './CalcResult.vue'

defineProps({
  price: {
    type: String,
    required: true
  },
  smmBonus: {
    type: String,
    required: true
  },
  rmBonus: {
    type: String,
    required: true
  },
  sellPrice: {
    type: String,
    required: true
  }
})

const popupOpened = ref(false)
defineExpose({
  popupOpened
})
</script>

<template>
  <k-popup :opened="popupOpened">
    <k-page>
      <k-navbar title="Результаты">
        <template #right>
          <k-link navbar @click="() => (popupOpened = false)"> Close </k-link>
        </template>
      </k-navbar>
      <k-block class="space-y-4 hairline-transparent">
        <CalcResult
          :price="price"
          :smm-bonus="smmBonus"
          :rm-bonus="rmBonus"
          :sell-price="sellPrice"
        />
      </k-block>
    </k-page>
  </k-popup>
</template>
