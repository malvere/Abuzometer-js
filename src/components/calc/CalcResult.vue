<script setup>
import {
  kBlockTitle,
  kCard,
  kTable,
  kTableHead,
  kTableBody,
  kTableCell,
  kTableRow,
  kBlock,
  kChip
} from 'konsta/vue'
import { ref, computed } from 'vue'

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
  }
})
const state = {
  rak: {
    fillBg: 'bg-red-600',
    fillText: 'text-white',
    outlineBorder: 'border-red-500',
    outlineText: 'text-red-500'
  },
  olen: {
    fillBg: 'bg-green-600',
    fillText: 'text-white',
    outlineBorder: 'border-green-500',
    outlineText: 'text-green-500'
  },
  statist: {
    fillBg: 'bg-blue-500',
    fillText: 'text-white',
    outlineBorder: 'border-blue-500',
    outlineText: 'text-blue-500'
  },
  korben: {
    fillBg: 'bg-[#980cff]',
    fillText: 'text-white',
    outlineBorder: 'border-[#980cff]',
    outlineText: 'text-[#980cff]'
  }
}

const chipColor = computed(() => {
  const absGConv = Math.abs(gConv)
  if (absGConv > 0.9) {
    return state.korben
  } else if (absGConv >= 0.82) {
    console.log('0.82')
    return state.statist
  } else if (absGConv >= 0.75) {
    return state.olen
  } else if (absGConv < 0.7) {
    return state.rak
  } else {
    return state.rak
  }
})

console.log(chipColor)
// Ваш строковый массив
const discountDataString = ref('')
if (localStorage.getItem('promo')) {
  discountDataString.value = localStorage.getItem('promo')
}
const price = props.smmPrice
const smmBonus = props.smmBonus
const rmBonus = props.rmBonus
const sellPrice = props.sellPrice

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
const profit = sellPrice - buyPrice
const deltaBonus = recalcBonus - rmBonus
const gConv = parseFloat(profit / deltaBonus).toFixed(6)
const lConv = parseFloat(profit / rmBonus).toFixed(6)

// console.log(buyPrice) // Выводит 2000
</script>

<template>
  <k-block></k-block>
  <k-block-title>Результаты</k-block-title>
  <!-- <k-block> -->
  <k-card class="block overflow-x-auto mt-10" :content-wrap="false">
    <k-table>
      <k-table-head>
        <k-table-row header>
          <k-table-cell header>Параметр</k-table-cell>
          <k-table-cell header class="text-right">Значение</k-table-cell>
        </k-table-row>
      </k-table-head>
      <k-table-body>
        <k-table-row>
          <k-table-cell>Цена покупки</k-table-cell>
          <k-table-cell class="text-right">{{ buyPrice }}</k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>Перерасчёт баллов</k-table-cell>
          <k-table-cell class="text-right">{{ recalcBonus }}</k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>Профит</k-table-cell>
          <k-table-cell class="text-right">{{ profit }}</k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>Δ Баллов</k-table-cell>
          <k-table-cell class="text-right">{{ deltaBonus }}</k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>GConv</k-table-cell>
          <k-table-cell class="text-right">
            <k-chip class="m-0.5" :colors="chipColor">
              {{ gConv }}
            </k-chip>
          </k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>LConv</k-table-cell>
          <k-table-cell class="text-right">{{ lConv }}</k-table-cell>
        </k-table-row>
      </k-table-body>
    </k-table>
  </k-card>
  <!-- </k-block> -->
</template>
