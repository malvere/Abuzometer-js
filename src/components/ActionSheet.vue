<template>
  <k-page>
    <k-navbar title="Abuzomer" />
    <k-block strong inset class="space-y-4">
      <p>
        Абузомер. Древняя разработка коварного учёного Святосквирта большечленова.
      </p>
    </k-block>
    <k-block-title>Панель разумиста</k-block-title>
    <k-block strong inset class="flex space-x-4 rtl:space-x-reverse">
      <k-button @click="() => (actionsTwoOpened = true)">Ядерный удар по пендосам</k-button>
      <k-button @click="() => (actionsTwoOpened = true)">Не нажимать</k-button>
    </k-block>
    <k-actions :opened="actionsOneOpened" @backdropclick="() => (actionsOneOpened = false)">
      <k-actions-group>
        <k-actions-label>Do something</k-actions-label>
        <k-actions-button bold @click="() => (actionsOneOpened = false)">
          Button 1
        </k-actions-button>
        <k-actions-button @click="() => (actionsOneOpened = false)"> Button 2 </k-actions-button>
        <k-actions-button @click="() => (actionsOneOpened = false)"> Cancel </k-actions-button>
      </k-actions-group>
    </k-actions>
    <k-actions :opened="actionsTwoOpened" @backdropclick="() => (actionsTwoOpened = false)">
      <k-actions-group>
        <k-actions-label>Do something</k-actions-label>
        <k-actions-button bold @click="but1()">
          Калькулятор
        </k-actions-button>
        <k-actions-button @click="but2()"> All Forms </k-actions-button>
      </k-actions-group>
      <k-actions-group>
        <k-actions-button @click="() => (actionsTwoOpened = false)"> Cancel </k-actions-button>
      </k-actions-group>
    </k-actions>
  </k-page>
</template>

<script>
import {
  kPage,
    kNavbar,
  kBlockTitle,
  kBlock,
  kButton,
  kActions,
  kActionsButton,
  kActionsLabel,
  kActionsGroup
} from 'konsta/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: {
    kPage,
    kNavbar,
    kBlockTitle,
    kBlock,
    kButton,
    kActions,
    kActionsButton,
    kActionsLabel,
    kActionsGroup
  },
  setup() {
    const actionsOneOpened = ref(false)
    const actionsTwoOpened = ref(false)

    const router = useRouter()
    function but1() {
      actionsTwoOpened.value = false
      router.push({ name: 'calc' })
    }

    function but2() {
      alert('Hi')
      actionsTwoOpened.value = false
      router.push({ name: 'about' })
    }
    return { actionsOneOpened, actionsTwoOpened, but1, but2 }
  }
}
</script>
