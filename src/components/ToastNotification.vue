<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="'toast-' + toast.type"
    >
      <span class="toast-icon">
        <span v-if="toast.type === 'success'">&#10003;</span>
        <span v-else-if="toast.type === 'error'">&#10007;</span>
        <span v-else>&#8505;</span>
      </span>
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { useToast } from "../composables/useToast";

const { toasts } = useToast();
</script>
