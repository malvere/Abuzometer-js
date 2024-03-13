<script setup>
import { kBlockTitle, kCard, kBlock, kToggle, kListItem, kList } from 'konsta/vue'
import { ref } from 'vue'
import WriteOff from './modes/WriteOffResults.vue'
import AccumulateBonus from './modes/AccumulateResults.vue'
import AccumulateCard from './modes/AccumulateCard.vue'
import WriteOffCard from './modes/WriteOffCard.vue'
import WebApp from '@twa-dev/sdk'

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

// Your string array. Fromat: 0/0;1000/2000;...1500/3000::promo_name
const discountDataString = ref('')

if (localStorage.getItem('promo')) {
  discountDataString.value = localStorage.getItem('promo')
}

const price = Number(props.smmPrice)
const smmBonus = Number(props.smmBonus)
const rmBonus = Number(props.rmBonus)
const sellPrice = Number(props.sellPrice)
const cashBack = Number(props.cashBack)

let discountIndex = discountDataString.value.indexOf("::");
let discountResult = discountDataString.value.substring(0, discountIndex);
const discountPairs = discountResult.split(';')

// Conversion to object
const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

// Retrieve nearest discount (must be <= price)
const nearestDiscount = Object.entries(discountObject).reduce((p, [, s]) => s <= price ? s : p)

// Calculations for objectve function
const buyPrice = price - nearestDiscount - rmBonus
const recalcBonus = Math.round((smmBonus / price) * buyPrice)
const profit = sellPrice - buyPrice + (cashBack / 100) * buyPrice
const deltaBonus = recalcBonus - rmBonus
const gConv = profit / deltaBonus
const lConv = profit / rmBonus

// Results mode.
// Write-off mode (true) and Accumulation mode (false)
const results_mode = ref(true)
if (profit < 0) {
  results_mode.value = false
}
const changeMode = () => {
  WebApp.HapticFeedback.impactOccurred('light') // Haptic feedback via Telegram miniApp SDK
  results_mode.value = !results_mode.value // User can manually change the mode
}
</script>

<template>
  <k-block></k-block>
  <k-block-title>Результаты</k-block-title>
  <k-card v-if="results_mode" class="block overflow-x-auto mt-10" :content-wrap="false">
    <WriteOff
      :buy-price="buyPrice"
      :recalc-bonus="recalcBonus"
      :profit="profit"
      :delta-bonus="deltaBonus"
      :g-conv="gConv"
      :l-conv="lConv"
    />
  </k-card>
  <k-card v-else class="block overflow-x-auto mt-10" :content-wrap="false">
    <AccumulateBonus
      :buy-price="buyPrice"
      :recalc-bonus="recalcBonus"
      :profit="profit"
      :delta-bonus="deltaBonus"
    />
  </k-card>
  <k-list strong inset>
    <k-list-item label :title="results_mode === true ? `Списание` : `Начисление`">
      <template #after>
        <k-toggle component="div" class="-my-0" :checked="results_mode" @change="changeMode" />
      </template>
    </k-list-item>
  </k-list>
  <k-block-title :with-block="false">Инструкция</k-block-title>
  <WriteOffCard
    v-if="results_mode"
    :buy-price="buyPrice"
    :rm-bonus="rmBonus"
    :delta-bonus="deltaBonus"
    :profit="profit"
    :recalc-bonus="recalcBonus"
    :g-conv="gConv"
  />
  <AccumulateCard
    v-else
    :buy-price="buyPrice"
    :delta-bonus="deltaBonus"
    :profit="profit"
    :smm-bonus="smmBonus"
    :sell-price="sellPrice"
    :a-conv="deltaBonus / profit"
  />
</template>
