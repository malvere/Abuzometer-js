<script setup>
import { kBlockTitle, kCard, kBlock, kToggle, kListItem, kList } from 'konsta/vue'
import { ref } from 'vue'
import WriteOff from './modes/WriteOffResults.vue'
import AccumulateBonus from './modes/AccumulateResults.vue'
import AccumulateCard from './modes/AccumulateCard.vue'
import WriteOffCard from './modes/WriteOffCard.vue'
import WebApp from '@twa-dev/sdk'

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

// Ваш строковый массив
const discountDataString = ref('')

if (localStorage.getItem('promo')) {
  discountDataString.value = localStorage.getItem('promo')
}

const price = Number(props.smmPrice)
const smmBonus = Number(props.smmBonus)
const rmBonus = Number(props.rmBonus)
const sellPrice = Number(props.sellPrice)
const cashBack = Number(props.cashBack)

const discountPairs = discountDataString.value.split(';')

// Преобразование в объект
const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

// Находит ближайшую сумму (не более price), для которой задана скидка
function findNearestDiscount() {
  let nearestAmount = 0
  for (const key in discountObject) {
    const currentAmount = parseInt(key, 10)
    if (currentAmount <= price && currentAmount > nearestAmount) {
      nearestAmount = currentAmount
    }
  }
  return discountObject[nearestAmount]
}

// Получаем ближайшую скидку для целевой суммы
const nearestDiscount = findNearestDiscount(price)

const buyPrice = price - nearestDiscount - rmBonus
const recalcBonus = Math.round((smmBonus / price) * buyPrice)
const profit = sellPrice - buyPrice + (cashBack / 100) * buyPrice
const deltaBonus = recalcBonus - rmBonus
const gConv = profit / deltaBonus
const lConv = profit / rmBonus

// Results mode. True means points are being written off
const results_mode = ref(true)
if (profit < 0) {
  results_mode.value = false
}
const changeMode = () => {
  WebApp.HapticFeedback.impactOccurred('light')
  results_mode.value = !results_mode.value
}
</script>

<template>
  <k-block></k-block>
  <k-block-title>Результаты</k-block-title>
  <!-- <k-block> -->
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
  <!-- <k-card> -->
  <k-list strong inset>
    <k-list-item label :title="results_mode === true ? `Списание` : `Начисление`">
      <template #after>
        <k-toggle component="div" class="-my-0" :checked="results_mode" @change="changeMode" />
      </template>
    </k-list-item>
  </k-list>
  <!-- </k-card> -->
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
