<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-bold text-gray-700 mb-1">
      {{ label }}
    </label>
    <input :type="type" :id="id" :placeholder="placeholder" required
      class="text-black w-full p-3 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-600" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  id: String,
  placeholder: String,
  modelValue: String
});
</script>