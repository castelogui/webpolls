<template>
  <fieldset class="w-full p-1 flex flex-col gap-2 my-2">
    <label :for="props.label" class="text-lg">{{ props.label }}</label>
    <div class="tags-input">
      <div v-for="option in props.modelValue" :key="option.id" class="tag">
        {{ option.title }}
        <button type="button" @click="removeOption(option)">x</button>
      </div>
      <input
        class="w-full py-2 px-4 border b-gray-100 rounded"
        type="text"
        :id="props.label"
        placeholder="Adicionar opção..."
        @keydown.enter.prevent="addOption"
        v-model="newOption"
      />
    </div>
  </fieldset>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
