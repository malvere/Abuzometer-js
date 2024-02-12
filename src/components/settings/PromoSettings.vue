<script setup>
import { onMounted, ref, watch } from 'vue'
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
import { getPromos } from './getJson.js'

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

watch(gvalue, (newValue) => {
  localStorage.setItem('gvalue', newValue.toString())
  if (newValue !== -1) {
    const pcode = parsedData.value[newValue]
    localStorage.setItem('promo', pcode.discountInfo + '::' + pcode.promocodeName)
    console.log(pcode.discountInfo + '::' + pcode.promocodeName)
    curData.value = pcode.discountInfo + '::' + pcode.promocodeName
  } else {
    // Set promo to "0/0;" when gvalue is -1
    localStorage.setItem('promo', '0/0;0/0::Промокод не выбран')
    curData.value = '0/0;0/0::Промокод не выбран'
  }
})

const jdata = ref()
onMounted(async () => {
  jdata.value = await getPromos('promokod')
  console.log(jdata.value)
})
const parsedData = ref([])
watch(jdata, (newValue) => {
  // Parse the data only when jdata is updated
  parsedData.value = newValue.map((promo) => {
    const { promo: discountInfo, promo_name: promocodeName } = promo
    return parseDiscountData(`${discountInfo}::${promocodeName}`)
  })
  console.log(parsedData)
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
// const parsedData = dData.map(parseDiscountData)

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
        <k-menu-list-item
          title="0%"
          subtitle="Не учитывать кешбек"
          :active="cardData === 0"
          @click="() => (cardData = 0)"
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
