<template>
    <div class="flex flex-col gap-y-2 mt-3">
        <p v-if="label" class="text-sm mb-2 text-color4">{{ label }}</p>

        <div :class="groupClass">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, provide } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Array],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    activeClass: {
        type: String,
        default: 'chip-active',
    },
    label: {
        type: String
    }
});

const emit = defineEmits(['update:modelValue']);

const groupClass = computed(() => ({
    'chip-group': true,
    // 'chip-group--multiple': props.multiple,
}));

const updateSelection = (value) => {
    if (props.multiple) {
        const index = props.modelValue.indexOf(value);
        const newValue =
            index === -1
                ? [...props.modelValue, value]
                : props.modelValue.filter((item) => item !== value);
        emit('update:modelValue', newValue);
    } else {
        const newValue = props.modelValue === value ? null : value;
        emit('update:modelValue', newValue);
    }
};

const isSelected = (value) =>
    props.multiple
        ? props.modelValue.includes(value)
        : props.modelValue === value;

provide('updateSelection', updateSelection);
provide('isSelected', isSelected);
</script>

<style>
.chip-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.chip-group--multiple {
    flex-direction: column;
}
</style>