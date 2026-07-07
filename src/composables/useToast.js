import { ref } from "vue";

const toasts = ref([]);
let toastId = 0;

export function useToast() {
  const showToast = (message, type = "success", duration = 3500) => {
    const id = ++toastId;
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  const success = (msg) => showToast(msg, "success");
  const error = (msg) => showToast(msg, "error");
  const info = (msg) => showToast(msg, "info");

  return { toasts, showToast, success, error, info };
}
