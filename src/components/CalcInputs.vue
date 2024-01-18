<script setup>
import { kPage, kBlockTitle, kList, kListInput, kBlock, kButton } from 'konsta/vue'
import { ref } from 'vue'

import DemoIcon from '../components/icons/IconTooling.vue'
import CalcCard from './calc/CalcCard.vue'

const smmPrice = ref('145000')
const smmBonus = ref('50000')
const rmBonus = ref('70000')
const sellPrice = ref('105000')

const calcCard = ref(null)
const ri1 = ref(false)
const triggerK = () => {
  ri1.value = true;
  ri1.value = false;
}
const vif = ref(false)
// const popupOpened = ref(false)
const openPopup = () => {
  console.log(smmPrice.value)
  if (
    smmPrice.value !== '' &&
    smmBonus.value !== '' &&
    rmBonus.value !== '' &&
    sellPrice.value !== ''
  ) {
    // popupOpened.value = true
    vif.value = true
    calcCard.value.popupOpened = true
  } else {
    // Возможно, вы хотите добавить обработку ситуации, когда не все поля заполнены
    console.log('Пожалуйста, заполните все поля')
  }
}
</script>

<template>
  <k-page>
    <k-block strong inset class="space-y-4">
      <p>Тут будет инструкция. Или не тут</p>
    </k-block>
    <k-block-title>Блок ввода</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input
        ref="input1"
        label="Цена на СММ"
        type="text"
        
        :disabled="ri1"
        placeholder="Цена на СберМаркете"
        :value="smmPrice"
        inputmode="numeric"
        @change="(e) => (smmPrice = e.target.value)"
        @blur="triggerK"
      >
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input
        label="Бонусы спасибо"
        :value="smmBonus"
        type="text"
        inputmode="numeric"
        placeholder="Баллы на СберМаркете"
        @change="(e) => (smmBonus = e.target.value)"
      >
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input
        label="Списание баллов"
        :value="rmBonus"
        type="text"
        inputmode="numeric"
        placeholder="Списание баллов"
        @change="(e) => (rmBonus = e.target.value)"
      >
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input
        label="Цена продажи"
        :value="sellPrice"
        type="text"
        inputmode="numeric"
        placeholder="Цена продажи"
        @change="(e) => (sellPrice = e.target.value)"
      >
        <template #media> <demo-icon /> </template>
      </k-list-input>
    </k-list>

    <div class="grid grid-cols-3">
      <div />
      <k-button @click="openPopup" raised rounded large>Вычислить</k-button>
      <div />
    </div>

    <k-block-title>Ниже будут результаты расчётов...</k-block-title>
    <CalcCard
      ref="calcCard"
      :smm-price="smmPrice"
      :smm-bonus="smmBonus"
      :rm-bonus="rmBonus"
      :sell-price="sellPrice"
    />
  </k-page>
</template>

<script></script>
