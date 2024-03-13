/*
Shows details for bonus Accumulation
*/

<script setup>
import { kCard } from 'konsta/vue'
const props = defineProps({
  buyPrice: Number,
  deltaBonus: Number,
  smmBonus: Number,
  sellPrice: Number,
  profit: Number
})
</script>
<template>
  <k-card>
    Режим накопления бонусов <br />
    Основное на что смотрим - конверсия баллов. Параметр показывает отношение маржи к полученным
    бонусам <br />
    Пример: <br />
    Купим мы товар за {{ props.buyPrice }} и получим за него {{ props.smmBonus }} бонусов. При этом
    ожидается, что мы его продадим предположительно за {{ props.sellPrice }} <br />
    Маржа в конечном итоге (с учётом кешбеков) будет {{ props.profit }}. <br />
    Маржа / полученные бонусы ({{ props.smmBonus }}) это и есть наша конверися. <br />
    В данном случае 1р = {{ Math.abs(props.deltaBonus / props.profit).toFixed(2) }} балла\ов.
  </k-card>
</template>
