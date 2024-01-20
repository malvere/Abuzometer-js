<script setup>
import { kPage, kBlockTitle, kList, kListInput, kBlock, kButton } from 'konsta/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DemoIcon from '@/components/icons/IconTooling.vue'
import CalcCard from './CalcCard.vue'

const router = useRouter()
function butSettings() {
  router.push({ name: 'settings' })
}

const smmPrice = ref('145000')
const smmBonus = ref('50000')
const rmBonus = ref('70000')
const sellPrice = ref('105000')

const calcCard = ref(null)
const openPopup = () => {
  console.log(smmPrice.value)
  if (
    smmPrice.value !== '' &&
    smmBonus.value !== '' &&
    rmBonus.value !== '' &&
    sellPrice.value !== ''
  ) {
    calcCard.value.popupOpened = true
  } else {
    // Возможно, вы хотите добавить обработку ситуации, когда не все поля заполнены
    console.log('Пожалуйста, заполните все поля')
  }
}
</script>

<template>
  <k-page>
    <!-- <k-block>
      <p>Тут будет инструкция. Или не тут</p>
      <k-button class="k-color-brand-red" large tonal>Скрыть клавиатуру</k-button>
    </k-block> -->
    <k-block strong inset class="grid grid-cols-2 gap-x-6">
      <k-button @click="butSettings" raised tonal rounded large>Настройки</k-button>
      <k-button @click="openPopup" raised rounded large>Вычислить</k-button>
    </k-block>
    <k-block-title medium>Блок ввода</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input
        label="Цена на СММ"
        type="text"
        placeholder="Цена на СберМаркете"
        inputmode="numeric"
        :value="smmPrice"
        @change="(e) => (smmPrice = e.target.value)"
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
