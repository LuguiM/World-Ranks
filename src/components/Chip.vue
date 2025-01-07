<template>
    <div
      :class="['chipBase chip w-max rounded-xl', { [activeClass]: isSelected }, `chip-${variant}`]"
      @click="toggle"
    >
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, inject, computed } from 'vue';
  
  const props = defineProps({
    value: {
      type: [String, Number],
      required: true,
    },
    activeClass: {
      type: String,
    },
    variant:{
        type: String,
        validator(value, props){
            return ['text', 'outlined',].includes(value)
        }
    }
  });
  
  const updateSelection = inject('updateSelection', null);
  const isSelectedFn = inject('isSelected', null);
  
  const localSelected = ref(false);
  const variant = props.variant ? props.variant : 'default';
  
  const toggle = () => {
    if (updateSelection && isSelectedFn) {
      updateSelection(props.value);
    } 
    if(props.activeClass){
      localSelected.value = !localSelected.value;
    }
  };
  
  const isSelected = computed(() => {

    let resp;

    if (updateSelection && isSelectedFn) {
      resp =  isSelectedFn(props.value); 
    } 
    if(props.activeClass) {
      resp = localSelected.value;
    }

    return resp
  });
  </script>
  
  <style>

  .chipBase {
    padding: 6px 10px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s;
  }

  .chip-default {
    background-color: var(--color2);
    color: var(--color5);
  }

  .chip-text {
    color: var(--color4);
  }

  .chip-outlined {
    border: 1px solid;
  }

  .chip-active {
    background-color: var(--color2);
    color: var(--color4);
  }
  </style>
  