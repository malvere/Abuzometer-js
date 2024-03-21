/* This modes handles situation where user wants to write his bonuses off. (Convert them to cash) */

<script setup>
import { kCard } from 'konsta/vue'
const props = defineProps({
  buyPrice: Number,
  rmBonus: Number,
  profit: Number,
  deltaBonus: Number,
  recalcBonus: Number,
  gConv: Number
})
</script>
<template>
  <k-card>
    Смотрим на два осноных параметра: GConv и LConv <br />
    GConv: Глобальная конверисия. Учитывает баллы которые будут начисленны за данную покупку <br />
    Пример: <br />
    Купим мы товар за {{ props.buyPrice }} с учётом промокодов и списанки, спишем
    {{ props.rmBonus }} баллов и получится что мы эти {{ rmBonus }} обменяли на
    {{ props.profit }} деревянных рублей профита (это кстати и есть LConv). <br />
    Но из-за того что нам ещё сверху баллы упадут (в данном случае {{ props.recalcBonus }}), в
    коннечном итоге дельта составит {{ props.deltaBonus }}. <br />
    По итогу мы {{ Math.abs(props.deltaBonus) }} меняем на {{ props.profit }} рублей, что и будет
    GConv (тут она {{ props.gConv.toFixed(4) }}) <br />
    Если всё равно непонятно - пишем мне или Ярику
  </k-card>
</template>
