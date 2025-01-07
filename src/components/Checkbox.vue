<template>
    <div class="checkbox-container my-2">
        <input type="checkbox" :id="idName" :value="value"
            :checked="Array.isArray(modelValue) ? modelValue.includes(value) : modelValue"
            @change="verifyValue($event.target)">
        <label :for="idName">{{ label }}</label>
    </div>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits, onMounted } from 'vue';


const props = defineProps({
    modelValue: {
        type: [Boolean, String, Number, Array],
        required: true
    },
    label: {
        type: String
    },
    value: {
        type: [Boolean, String, Number]
    },
    id: {
        type: String,
        default: null,
    },
})

const emit = defineEmits(['update:modelValue']);

const generateId = () => `input-${Math.random().toString(36).substr(2, 9)}`;
const idName = computed(() => props.id || generateId());


const verifyValue = (target) => {
    const value = typeof props.value === 'number' ? Number(target.value) : 
                  typeof props.value === 'boolean' ? target.checked : 
                  target.value;
    const checked = target.checked

    if (Array.isArray(props.modelValue)) {
        const newValue = [...props.modelValue];
        if (newValue.includes(value)) {
            newValue.splice(newValue.indexOf(value), 1);
        } else {
            newValue.push(value);
        }

        emit('update:modelValue', newValue);
        return
    }

    emit('update:modelValue', checked)

}

onMounted(() => {
})

</script>

<style scoped>
.checkbox-container {
    display: block;
}

.checkbox-container input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
}

.checkbox-container label {
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: var(--color5);
}


.checkbox-container label:before {
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid var(--color4);
    /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05); */
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
}

.checkbox-container input:checked+label::before {
    background-color: var(--color3);
    border: 2px solid var(--color3);
}

.checkbox-container input:checked+label:after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 6px;
    height: 14px;
    border: solid var(--color5);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}
</style>