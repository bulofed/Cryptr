<template>
  <div class="bg-zinc-300 p-2 flex-1 gap-4 rounded-lg flex" :class="customClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>