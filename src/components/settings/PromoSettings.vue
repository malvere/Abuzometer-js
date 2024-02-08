<script setup>
import { ref, watch } from 'vue'
import {
  kPage,
  kNavbar,
  kList,
  kListItem,
  kToggle,
  kButton,
  kBlock,
  kMenuList,
  kMenuListItem
} from 'konsta/vue'
import PromoSheet from './PromoSheet.vue'
import { useRouter } from 'vue-router'
const gvalue = ref(0)
const pSheet = ref(null)
const curData = ref('')
const openSheet = () => {
  pSheet.value.sheetOpened = true
  console.log(curData.value)
}

const router = useRouter()
function butHome() {
  router.push({ name: 'home' })
}

const dData = [
  // '0/0;2000/16000;5000/38000;9000/70000;17000/140000::УСЫ',
  // '0/0;2000/16000;4000/30000;6000/45000;8000/60000::ДИМА',
  // '0/0;2000/14000;4000/30000;6000/40000;8000/60000::СМЕТАНКА',
  // '0/0;3000/19000;5000/30000;10000/60000;15000/90000::ЭЛЯ',
  // '0/0;2000/12000;4000/25000;6000/37000;8000/47000::МАМКУПИ',
  // '0/0;1000/6000;4000/25000;7000/43000;10000/60000::ДЫМОК',
  '0/0;1000/6000;5000/30000;10000/55000;20000/110000::ДАША',
  '0/0;2000/18000;5000/45000;9000/82000;12000/110000::ЖАЛКОЧТОЛИ',
  '0/0;1000/11000;2000/18000;3000/27000;4000/40000::ЛАДНОКУПЛЮ',
  '0/0;1500/5000;3000/8000;5000/13000;7000/25000::1fepn',
  '0/0;2000/10000;5000/25000;7000/30000;15000/75000::5fepn',
  '0/0;10000/70000;15000/90000;20000/140000;30000/180000::6fepn',
  '0/0;2000/10000;4000/20000;6000/30000;8000/40000::КИНЗА/УКРОП',
  // '0/0;2000/11000;5000/40000;9000/60000;12000/90000::ИКРА',
  // '0/0;1000/8000;2000/17000;3000/25000;5000/40000::СЕЛЬДЬ',
]

watch(gvalue, (newValue) => {
  localStorage.setItem('gvalue', newValue.toString())
  if (newValue !== -1) {
    localStorage.setItem('promo', dData[newValue.toString()])
    curData.value = dData[newValue.toString()]
  } else {
    // Set promo to "0/0;" when gvalue is -1
    localStorage.setItem('promo', '0/0;0/0::Промокод не выбран')
    curData.value = '0/0;0/0::Промокод не выбран'
  }
})

if (localStorage.getItem('gvalue')) {
  gvalue.value = parseInt(localStorage.getItem('gvalue'))
  curData.value = localStorage.getItem('promo')
}
// Toggle off
const toggleSwitch = (value) => {
  gvalue.value = gvalue.value === value ? -1 : value
}

// Discount parser
const parseDiscountData = (dataString) => {
  const [discountInfo, promocodeName] = dataString.split('::')

  return { discountInfo, promocodeName }
}
const parsedData = dData.map(parseDiscountData)

const cardData = ref(0)
cardData.value = parseInt(localStorage.getItem('cashBack'))
watch(cardData, (newValue) => {
  localStorage.setItem('cashBack', newValue.toString())
})
</script>

<template>
  <k-page>
    <k-navbar title="Настройки" />

    <k-list strong inset>
      <k-list-item
        label
        v-for="(data, index) in parsedData"
        :key="index"
        :title="data.promocodeName"
      >
        <template #after>
          <k-toggle class="-my-1" :checked="gvalue === index" @change="() => toggleSwitch(index)" />
        </template>
      </k-list-item>
    </k-list>
    <k-block>
      <k-menu-list>
        <k-menu-list-item
          title="3%"
          subtitle="МТС #скидкавезде и ИНГО"
          :active="cardData === 3"
          @click="() => (cardData = 3)"
        >
          <template #media>
            <demo-icon />
          </template>
        </k-menu-list-item>
        <k-menu-list-item
          title="5%"
          subtitle="Альфа-Банк Стандарт"
          :active="cardData === 5"
          @click="() => (cardData = 5)"
        >
          <template #media>
            <demo-icon />
          </template>
        </k-menu-list-item>
        <k-menu-list-item
          title="7%"
          subtitle="Альфа-Банк премиум"
          :active="cardData === 7"
          @click="() => (cardData = 7)"
        >
          <template #media>
            <demo-icon />
          </template>
        </k-menu-list-item>
      </k-menu-list>
    </k-block>
    <k-block strong inset class="grid grid-cols-2 gap-x-6">
      <k-button large rounded tonal @click="butHome()"> Назад </k-button>
      <k-button large rounded tonal @click="() => openSheet()"> Детали промокода </k-button>
    </k-block>
    <PromoSheet ref="pSheet" :promo-data="curData" />
  </k-page>
</template>
