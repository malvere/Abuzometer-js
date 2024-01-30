<script setup>
import { kPage, kBlockTitle, kList, kListInput, kBlock, kButton, kListItem } from 'konsta/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DemoIcon from '@/components/icons/IconTooling.vue'
import CalcCard from './CalcCard.vue'
import WebApp from '@twa-dev/sdk'

const router = useRouter()
function butSettings() {
  saveInputs()
  WebApp.HapticFeedback.impactOccurred('light')
  router.push({ name: 'settings' })
}

function saveInputs() {
  localStorage.setItem(
    'initData',
    JSON.stringify({
      smmPrice: smmPrice.value,
      smmBonus: smmBonus.value,
      rmBonus: rmBonus.value,
      sellPrice: sellPrice.value
      // cashBack: cashBack.value
    })
  )
  localStorage.setItem('cashBack', cashBack.value)
}
const smmPrice = ref('')
const smmBonus = ref('')
const rmBonus = ref('')
const sellPrice = ref('')
const cashBack = ref('')

const calcCard = ref(null)
onMounted(() => {
  const storedData = localStorage.getItem('initData')
  if (storedData) {
    const parsedData = JSON.parse(storedData)
    if (parsedData.smmPrice) smmPrice.value = parsedData.smmPrice
    if (parsedData.smmBonus) smmBonus.value = parsedData.smmBonus
    if (parsedData.rmBonus) rmBonus.value = parsedData.rmBonus
    if (parsedData.sellPrice) sellPrice.value = parsedData.sellPrice
    // if (parsedData.cashBack) cashBack.value = parsedData.cashBack
  }
  const cashBackData = localStorage.getItem('cashBack')
  if (cashBackData) {
    cashBack.value = cashBackData
  }
})
const openPopup = () => {
  if (
    smmPrice.value !== '' &&
    smmBonus.value !== '' &&
    rmBonus.value !== '' &&
    sellPrice.value !== ''
  ) {
    calcCard.value.popupOpened = true
    saveInputs()
    WebApp.HapticFeedback.notificationOccurred('success')
  } else {
    // Возможно, вы хотите добавить обработку ситуации, когда не все поля заполнены
    console.log('Пожалуйста, заполните все поля')
    WebApp.HapticFeedback.notificationOccurred('error')
    WebApp.showAlert(`Заполните все поля! Поле кешбека можно оставить пустым.`)
  }
}
const checkTG = () => {
  WebApp.showAlert(WebApp.initDataUnsafe.user.id)
  WebApp.HapticFeedback.notificationOccurred('success')
}
</script>

<template>
  <k-page>
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
      <k-list-input
        label="Кешбек"
        :value="cashBack"
        type="text"
        inputmode="numeric"
        placeholder="Кешбек по карте банка"
        @change="(e) => (cashBack = e.target.value)"
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
      :cash-back="cashBack"
    />
    <k-block strong inset class="grid grid-cols-3 gap-x-6">
      <div />
      <k-button @click="checkTG" raised tonal rounded large>TEST H</k-button>
      <div />
    </k-block>
    <k-block class="space-y-24">
      <div />
      <k-list>
        <k-list-item
          :chevron-material="false"
          title=""
          subtitle="Abuzomer"
          text="Q&A: @pablosupply"
        >
          <template #media>
            <img
              class="ios:rounded-lg material:rounded-full ios:w-10 material:w-10"
              src="@/assets/logo.svg"
              width="10"
              alt="demo"
            />
          </template>
        </k-list-item>
      </k-list>
      <div />
    </k-block>
  </k-page>
</template>

<script></script>
