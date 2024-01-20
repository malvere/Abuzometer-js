<script setup>
import { ref, computed } from 'vue'
import {
  kPage,
  kSheet,
  kBlock,
  kButton,
  kToolbar,
  kLink,
  kBlockTitle,
  kCard,
  kTable,
  kTableHead,
  kTableBody,
  kTableCell,
  kTableRow
} from 'konsta/vue'

const sheetOpened = ref(false)
const discounts = computed(() => {
  if (props.promoData) {
    const [discountInfo] = props.promoData.split('::')
    const parsedDiscounts = discountInfo.split(';').map((pair) => {
      const [threshold, discount] = pair.split('/')
      return { threshold: threshold, discount: discount }
    })
    return parsedDiscounts.slice(1);
  } else {
    return []
  }
})
const props = defineProps({
  promoData: {
    type: String,
    required: true
  }
})
defineExpose({
  sheetOpened
})
</script>

<template>
  <k-page>
    <k-sheet
      class="pb-safe w-full"
      :opened="sheetOpened"
      @backdropclick="() => (sheetOpened = false)"
    >
      <k-toolbar top>
        <div class="left" />
        <div class="right">
          <k-link toolbar @click="() => (sheetOpened = false)"> Готово </k-link>
        </div>
      </k-toolbar>
      <k-block-title>{{ 'Промокод: ' + promoData.split('::')[1] }}</k-block-title>
      <k-card class="block overflow-x-auto mt-8" :content-wrap="false">
        <k-table>
          <k-table-head>
            <k-table-row header>
              <k-table-cell header>Сумма скидки</k-table-cell>
              <k-table-cell header class="text-right">Сумма заказа</k-table-cell>
            </k-table-row>
          </k-table-head>
          <k-table-body>
            <k-table-row v-for="(discount, rowIndex) in discounts" :key="rowIndex">
              <k-table-cell>{{ discount.threshold }}</k-table-cell>
              <k-table-cell class="text-right">{{ discount.discount }}</k-table-cell>
            </k-table-row>
          </k-table-body>
        </k-table>
      </k-card>
      <k-block strong inset>
        <p></p>
        <div class="mt-4">
          <k-button @click="() => (sheetOpened = false)">Закрыть</k-button>
        </div>
      </k-block>
    </k-sheet>
  </k-page>
</template>
