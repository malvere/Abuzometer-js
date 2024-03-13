<script setup>
import { ref } from 'vue'
import { kPage, kPopup, kNavbar, kLink, kBlock } from 'konsta/vue'

import CalcResult from './CalcResultAlter.vue'


const props = defineProps({
  smmPrice: { // Megamarket price (without promocodes)
    type: String,
    required: true
  },
  smmBonus: { // Bonuses as seen in good card (without promos)
    type: String,
    required: true
  },
  rmBonus: { // How many bonuses user is willing to write off
    type: String,
    required: true
  },
  sellPrice: { // Desired sell price
    type: String,
    required: true
  },
  cashBack: { // Cashbacks (If payment method differs from Sberbank)
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
