<script setup>
import {
  kBlockTitle,
  kCard,
  kTable,
  kTableHead,
  kTableBody,
  kTableCell,
  kTableRow,
  kBlock
} from 'konsta/vue'

const props = defineProps({
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

// Ваш строковый массив
const discountDataString = "0/0;2000/16000;5000/38000;9000/70000;17000/140000";

const price = props.price; // Измените целевую сумму по вашему запросу
const smmBonus = props.smmBonus;
const rmBonus = props.rmBonus;
const sellPrice = props.sellPrice;


const discountPairs = discountDataString.split(';')

// Преобразование в объект
const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

// Находит ближайшую сумму (не более price), для которой задана скидка
function findNearestDiscount() {
  let nearestAmount = -Infinity
  for (const key in discountObject) {
    const currentAmount = parseInt(key, 10)
    if (currentAmount <= price && currentAmount > nearestAmount) {
      nearestAmount = currentAmount
    }
  }
  return discountObject[nearestAmount]
}

// Получаем ближайшую скидку для целевой суммы
const nearestDiscount = findNearestDiscount(price);

const buyPrice = price - nearestDiscount - rmBonus;
const recalcBonus = Math.round(smmBonus / price * buyPrice);
const profit = sellPrice - buyPrice;
const deltaBonus = recalcBonus - rmBonus;
const gConv = parseFloat(profit / deltaBonus).toFixed(6);
const lConv = parseFloat(profit / rmBonus).toFixed(6);

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
        <k-table-body class="divide-y">
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
            <k-table-cell class="text-right">{{ gConv }}</k-table-cell>
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
