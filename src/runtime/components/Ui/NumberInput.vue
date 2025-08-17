<script setup lang="ts">
defineOptions({
  name: 'UiNumberInput',
})

const number = defineModel<number>({
  default: 0,
})

const addNumber = (value: number) => {
  number.value += value
}

const props = defineProps({
  steps: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <div>
    <UiBtn @click="addNumber(-props.steps)">
      -
    </UiBtn>
    <input
      v-model="number"
      class="sui-number-input"
      type="number"
    >
    <UiBtn @click="addNumber(props.steps)">
      +
    </UiBtn>
  </div>
</template>

<style scoped>
.sui-number-input {
    width: fit-content;
}
.sui-number-input[type="number"] {
    width: 4rem;
    text-align: center;
}

/* hide controls */
.sui-number-input::-webkit-inner-spin-button,
.sui-number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0;
}
</style>
