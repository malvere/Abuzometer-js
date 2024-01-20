<script setup>
import { ref, watch } from 'vue'
import { kPage, kNavbar, kList, kListItem, kToggle, kButton, kBlock } from 'konsta/vue'
import PromoSheet from './PromoSheet.vue'
import { useRouter } from 'vue-router'
const gvalue = ref(0)
const pSheet = ref(null)

const openSheet = (target) => {
  pSheet.value.sheetOpened = true
  pSheet.value.currentPromo = target
}

const router = useRouter()
function butHome() {
  router.push({ name: 'home' })
}

const dData = [
  '0/0;2000/16000;5000/38000;9000/70000;17000/140000::УСЫ',
  '0/0;2000/13000;5000/30000;6000/50000;14000/105000::ДИМА'
]

// Set values in local storage
watch(gvalue, (newValue) => {
  localStorage.setItem('gvalue', newValue.toString())
  localStorage.setItem('promo', dData[newValue.toString()])
})
if (localStorage.getItem('gvalue')) {
  gvalue.value = parseInt(localStorage.getItem('gvalue'))
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
    <k-block strong inset class="grid grid-cols-2 gap-x-6">
      <k-button large rounded tonal @click="butHome()"> Назад </k-button>
      <k-button large rounded tonal @click="() => openSheet(dData[gvalue].discountInfo)">
        Детали промокода
      </k-button>
    </k-block>
    <PromoSheet ref="pSheet" />
  </k-page>
</template>
