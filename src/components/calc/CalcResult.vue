/*
The code bellow is currently deprecated.
Will be removed in future commits.
*/


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
  kBadge,
  kToggle,
  kListItem,
  kList
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
    bg: 'bg-red-600',
    fillBg: 'bg-red-600',
    fillText: 'text-white',
    outlineBorder: 'border-red-500',
    outlineText: 'text-red-500'
  },
  olen: {
    bg: 'bg-green-600',
    fillBg: 'bg-green-600',
    fillText: 'text-white',
    outlineBorder: 'border-green-500',
    outlineText: 'text-green-500'
  },
  statist: {
    bg: 'bg-blue-500',
    fillBg: 'bg-blue-500',
    fillText: 'text-white',
    outlineBorder: 'border-blue-500',
    outlineText: 'text-blue-500'
  },
  korben: {
    bg: 'bg-[#980cff]',
    fillBg: 'bg-[#980cff]',
    fillText: 'text-white',
    outlineBorder: 'border-[#980cff]',
    outlineText: 'text-[#980cff]'
  }
}

// Color of a chip. Based on Olenemer from WOT xD
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
// Your string array. Fromat: 0/0;1000/2000;...1500/3000::promo_name
const discountDataString = ref('')

// Results mode. True means points are being written off
const results_mode = ref(true)

if (localStorage.getItem('promo')) {
  discountDataString.value = localStorage.getItem('promo')
}
const price = props.smmPrice
const smmBonus = props.smmBonus
const rmBonus = props.rmBonus
const sellPrice = props.sellPrice

const discountPairs = discountDataString.value.split(';')

const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

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

const nearestDiscount = findNearestDiscount(price)
const buyPrice = price - nearestDiscount - rmBonus
const recalcBonus = Math.round((smmBonus / price) * buyPrice)
const profit = sellPrice - buyPrice
const deltaBonus = recalcBonus - rmBonus
const gConv = parseFloat(profit / deltaBonus).toFixed(6)
const lConv = parseFloat(profit / rmBonus).toFixed(6)

</script>

<template>
  <k-block></k-block>
  <k-block-title>Результаты</k-block-title>
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
            <k-badge :colors="chipColor">{{ gConv }}</k-badge>
          </k-table-cell>
        </k-table-row>
        <k-table-row>
          <k-table-cell>LConv</k-table-cell>
          <k-table-cell class="text-right">{{ lConv }}</k-table-cell>
        </k-table-row>
      </k-table-body>
    </k-table>
  </k-card>
  <k-list strong inset>
    <k-list-item label :title="results_mode === true ? `Списание` : `Начисление`">
      <template #after>
        <k-toggle
          component="div"
          class="-my-0"
          :checked="results_mode"
          @change="() => (results_mode = !results_mode)"
        />
      </template>
    </k-list-item>
  </k-list>
  <k-block-title :with-block="false">Инструкция</k-block-title>
  <k-card>
    Смотрим на два осноных параметра: GConv и LConv <br />
    GConv: Глобальная конверисия. Учитывает баллы которые будут начисленны за данную покупку <br />
    Пример: <br />
    Купим мы товар за {{ buyPrice }} с учётом промокодов и списанки, спишем {{ rmBonus }} баллов и
    получится что мы эти {{ rmBonus }} обменяли на {{ profit }} деревянных рублей профита (это
    кстати и есть LConv). Но из-за того что нам ещё сверху баллы упадут (в данном случае
    {{ recalcBonus }}), в коннечном итоге потеря баллов составит {{ deltaBonus }}. <br />
    По итогу мы {{ Math.abs(deltaBonus) }} меняем на {{ profit }} рублей, что и будет GConv (тут она
    {{ gConv }}) <br />
    Если всё равно непонятно - пишем мне или Ярику
  </k-card>
  <!-- </k-block> -->
</template>
