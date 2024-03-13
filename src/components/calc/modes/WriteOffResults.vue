/*
Outputs results for writing bonuses off.
*/

<script setup>
import { kTable, kTableHead, kTableBody, kTableCell, kTableRow, kBadge } from 'konsta/vue'
import { chipColor } from '../funcs/gConvChip'
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
  },
  gConv: {
    type: Number,
    required: true
  },
  lConv: {
    type: Number,
    required: true
  }
})
const gConv = props.profit < 0 ? 0 : props.gConv
const cC = computed(() => {
  return chipColor(gConv)
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
        <k-table-cell>GConv</k-table-cell>
        <k-table-cell class="text-right">
          <k-badge :colors="cC">{{ Math.abs(gConv.toFixed(3)) }}</k-badge>
        </k-table-cell>
      </k-table-row>
      <k-table-row>
        <k-table-cell>LConv</k-table-cell>

        <k-table-cell class="text-right">{{ props.lConv }}</k-table-cell>
      </k-table-row>
    </k-table-body>
  </k-table>
</template>
../gConvChip../funcs/gConvChip
