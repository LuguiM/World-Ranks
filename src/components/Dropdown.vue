<template>
    <div class="dropdown inline-block relative z-20 w-auto" :style="{ width: width }">
        <div class="flex flex-col text-color4">
            <p class="text-sm mb-2">{{ label }}</p>
            <div @click="openClose()"
                class="border border-color2  rounded-lg py-1 px-2 flex justify-between cursor-pointer">
                <p class="text-color5">{{ selectedTitle }}</p>
                <box-icon type="solid" name="chevron-down" color="#D2D5DA"></box-icon>
            </div>
        </div>
        <ul v-if="showDropdown" class="dropdown-menu absolute bg-color5 text-color2 pt-1" :style="{ width: width }">
            <li v-if="items.length === 0" @click="openClose()">
                No items
            </li>
            <li v-else v-for="item in elements" :key="item.value" @click="handleSelect(item)"
                class="cursor-pointer hover:bg-gray-200 py-2 px-4">
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    label: {
        type: String,
        require: false
    },
    width: {
        require: false,
        default() {
            return '100%'
        }
    },
    items: {
        type: Array,
        require: true
    },
    placeholder: {
        type: String,
        default() {
            return 'Seleccione una opcion'
        }
    },
    modelValue: {
        type: [String, Number, Object, Array],
        require: true
    },
    isObject: {
        type: Boolean,
        require: true,
        default() {
            return false
        }
    },
    itemTitle: {
        type: String,
        default: '',
    },
    itemValue: {
        type: String,
        default: '',
    },

})

const emit = defineEmits(['update:modelValue']);

const handleSelect = (item) => {
    emit('update:modelValue', item.value);
    openClose();
};

const showDropdown = ref(false);
const elements = computed(() => {
    return props.items.map((item) => {
        if (typeof item === 'object' && props.isObject) {
            return {
                title: item[props.itemTitle] || 'Undefined',
                value: item[props.itemValue] || 'Undefined'
            };
        }

        return {
            title: item,
            value: item,
        }
    })
});
const selectedTitle = computed(() => {
    const selected = elements.value.find(
        (item) => item.value === props.modelValue
    )

    return selected ? selected.title : props.placeholder
})


const openClose = () => {
    showDropdown.value = !showDropdown.value;
}

onMounted(() => {

})



</script>
<style></style>