<template>
    <div :class="['flex  bg-color2 rounded-xl p-2.5 text-sm']" :style="{ width: width }">
        <box-icon v-if="prependInnerIcon" :name="prependInnerIcon" color="#6C727F" class="me-2"></box-icon>
        <input :type="typeInput" :placeholder="placeholder" class="text-color4 bg-color2 outline-none w-full"
            @input="(e) => emit('update:modelValue', e.target.value)">
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number]
    },
    type: {
        type: [String]
    },
    prependInnerIcon: {
        type: String
    },
    placeholder: {
        type: String
    },
    width: {
        required: false
    }
})

const emit = defineEmits(['update:modelValue'])

const typeInput = computed(() => props.type || 'text')

</script>

<style scoped>
@media (max-width: 576px) {
    input::placeholder {
        font-size: 12px;
    }
}
</style>