<script setup>
import { ref } from 'vue'
import { kPage, kPopup, kNavbar, kLink, kBlock } from 'konsta/vue'

import CalcResult from './CalcResultAlter.vue'

const props = defineProps({
  smmPrice: {
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
  },
  cashBack: {
    type: String
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
          v-if="popupOpened"
          :smm-price="props.smmPrice"
          :smm-bonus="props.smmBonus"
          :rm-bonus="props.rmBonus"
          :sell-price="props.sellPrice"
          :cash-back="props.cashBack"
        />
      </k-block>
    </k-page>
  </k-popup>
</template>
