/* Shows results for bonus Accumulation. Coefficinets can be tuned in ../funcs/aConvChip */

<script setup>
import { kTable, kTableHead, kTableBody, kTableCell, kTableRow, kBadge } from 'konsta/vue'
import { chipColor } from '../funcs/aConvChip'
import { computed } from 'vue'

const props = defineProps({
  buyPrice: {
    type: Number,
    required: true
  },
  recalcBonus: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  deltaBonus: {
    type: Number,
    required: true
  }
})

const aConv = props.deltaBonus / props.profit
const cC = computed(() => {
  return chipColor(aConv)
})
console.log(cC)
</script>
<template>
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
        <k-table-cell class="text-right">{{ props.buyPrice }}</k-table-cell>
      </k-table-row>
      <k-table-row>
        <k-table-cell>Перерасчёт баллов</k-table-cell>
        <k-table-cell class="text-right">{{ props.recalcBonus }}</k-table-cell>
      </k-table-row>
      <k-table-row>
        <k-table-cell>Профит</k-table-cell>
        <k-table-cell class="text-right">{{ props.profit }}</k-table-cell>
      </k-table-row>
      <k-table-row>
        <k-table-cell>Δ Баллов</k-table-cell>
        <k-table-cell class="text-right">{{ props.deltaBonus }}</k-table-cell>
      </k-table-row>
      <k-table-row>
        <k-table-cell>Конверсия баллов</k-table-cell>
        <k-table-cell class="text-right">
          <k-badge :colors="cC">{{ Math.abs(aConv.toFixed(2)) }}</k-badge>
        </k-table-cell>
      </k-table-row>
    </k-table-body>
  </k-table>
</template>
../gConvChip../funcs/gConvChip
