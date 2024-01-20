<script setup>
import { kList, kListItem, kPopover } from 'konsta/vue'
</script>

<template>
  <k-popover
    :opened="popoverOpened"
    :target="popoverTargetRef"
    @backdropclick="() => (popoverOpened = false)"
  >
    <k-list nested>
      <k-list-item title="Item 1" link @click="() => (popoverOpened = false)" />
      <k-list-item title="List Item 2" link @click="() => (popoverOpened = false)" />
      <k-list-item title="Item 3" link @click="() => (popoverOpened = false)" />
      <k-list-item title="List Item 4" link @click="() => (popoverOpened = false)" />
      <k-list-item title="Item 5" link @click="() => (popoverOpened = false)" />
    </k-list>
  </k-popover>
</template>
