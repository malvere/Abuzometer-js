<script setup>
import { kNavbar, kApp, kBlock, kPage, kListItem } from 'konsta/vue'
</script>

<template>
  <k-navbar title="Нет доступа" />
  <k-app theme="ios">
    <k-page>
      <kBlock strong inset class="grid grid-cols-3">
        <div />
        <k-list-item
          :chevron-material="false"
          title=""
          subtitle="405"
          text="Отказ: вы не карлик"
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
        <div />
      </kBlock>
    </k-page>
  </k-app>
</template>
