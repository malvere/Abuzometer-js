<script setup>
import { kBlockTitle, kCard, kBlock, kToggle, kListItem, kList } from 'konsta/vue'
import { ref } from 'vue'
import WriteOff from './modes/WriteOff.vue'
import AccumulateBonus from './modes/AccumulateBonus.vue'

const props = defineProps({
  smmPrice: {
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
const discountDataString = ref('')

// Results mode. True means points are being written off
const results_mode = ref(true)

if (localStorage.getItem('promo')) {
  discountDataString.value = localStorage.getItem('promo')
}
const price = props.smmPrice
const smmBonus = props.smmBonus
const rmBonus = props.rmBonus
const sellPrice = props.sellPrice

const discountPairs = discountDataString.value.split(';')

// Преобразование в объект
const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

// Находит ближайшую сумму (не более price), для которой задана скидка
function findNearestDiscount() {
  let nearestAmount = 0
  for (const key in discountObject) {
    const currentAmount = parseInt(key, 10)
    if (currentAmount <= price && currentAmount > nearestAmount) {
      nearestAmount = currentAmount
    }
  }
  return discountObject[nearestAmount]
}

// Получаем ближайшую скидку для целевой суммы
const nearestDiscount = findNearestDiscount(price)

const buyPrice = price - nearestDiscount - rmBonus
const recalcBonus = Math.round((smmBonus / price) * buyPrice)
const profit = sellPrice - buyPrice
const deltaBonus = recalcBonus - rmBonus
const gConv = profit / deltaBonus
const lConv = profit / rmBonus 

if (profit < 0) {
  results_mode.value = false
}

</script>

<template>
  <k-block></k-block>
  <k-block-title>Результаты</k-block-title>
  <!-- <k-block> -->
  <k-card v-if="results_mode" class="block overflow-x-auto mt-10" :content-wrap="false">
    <WriteOff
      :buy-price="buyPrice"
      :recalc-bonus="recalcBonus"
      :profit="profit"
      :delta-bonus="deltaBonus"
      :g-conv="gConv"
      :l-conv="lConv"
    />
  </k-card>
  <k-card v-else class="block overflow-x-auto mt-10" :content-wrap="false">
    <AccumulateBonus
      :buy-price="buyPrice"
      :recalc-bonus="recalcBonus"
      :profit="profit"
      :delta-bonus="deltaBonus"
    />
  </k-card>
  <!-- <k-card> -->
  <k-list strong inset>
    <k-list-item label :title="results_mode === true ? `Списание` : `Начисление`">
      <template #after>
        <k-toggle
          component="div"
          class="-my-0"
          :checked="results_mode"
          @change="() => (results_mode = !results_mode)"
        />
      </template>
    </k-list-item>
  </k-list>
  <!-- </k-card> -->
  <k-block-title :with-block="false">Инструкция</k-block-title>
  <k-card>
    Смотрим на два осноных параметра: GConv и LConv <br />
    GConv: Глобальная конверисия. Учитывает баллы которые будут начисленны за данную покупку <br />
    Пример: <br />
    Купим мы товар за {{ buyPrice }} с учётом промокодов и списанки, спишем {{ rmBonus }} баллов и
    получится что мы эти {{ rmBonus }} обменяли на {{ profit }} деревянных рублей профита (это
    кстати и есть LConv). Но из-за того что нам ещё сверху баллы упадут (в данном случае
    {{ recalcBonus }}), в коннечном итоге потеря баллов составит {{ deltaBonus }}. <br />
    По итогу мы {{ Math.abs(deltaBonus) }} меняем на {{ profit }} рублей, что и будет GConv (тут она
    {{ gConv }}) <br />
    Если всё равно непонятно - пишем мне или Ярику
  </k-card>
  <!-- </k-block> -->
</template>
