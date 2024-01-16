<template>
  <k-page>
    <k-navbar title="КАЛькулятор" />
    <k-block strong inset class="space-y-4">
      <p>Тут будет инструкция. Или не тут</p>
    </k-block>
    <k-block-title>Блок ввода</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input type="text" placeholder="Цена на СберМаркете">
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input type="password" placeholder="Баллы на СберМаркете">
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input type="email" placeholder="Списание баллов">
        <template #media> <demo-icon /> </template>
      </k-list-input>
      <k-list-input type="url" placeholder="Цена продажи">
        <template #media> <demo-icon /> </template>
      </k-list-input>
    </k-list>
    <k-block-title>Ниже будут результаты расчётов...</k-block-title>
  </k-page>
</template>
<script>
import { ref } from 'vue'
import { kPage, kNavbar, kBlockTitle, kList, kListInput, kBlock } from 'konsta/vue'
import DemoIcon from '../components/icons/IconTooling.vue'
export default {
  components: {
    kPage,
    kNavbar,
    kBlock,
    // kNavbarBackLink,
    kBlockTitle,
    kList,
    kListInput,
    DemoIcon
  },
  setup() {
    const name = ref({ value: '', changed: false })
    const demoValue = ref('')
    const onNameChange = (e) => {
      name.value = { value: e.target.value, changed: true }
    }
    const onDemoValueChange = (e) => {
      demoValue.value = e.target.value
    }
    const onDemoValueClear = () => {
      demoValue.value = ''
    }
    return { name, demoValue, onNameChange, onDemoValueChange, onDemoValueClear }
  }
}
</script>
