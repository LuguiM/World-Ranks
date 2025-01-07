<template>
    <div class='overflow-auto table-width'>
        <table class="w-full my-3 table-auto overflow-x-scroll">
            <thead>
                <tr class="border-b border-color2">
                    <th class="text-color4 text-start text-sm pb-3" v-for="(header) in headers" :key="header.key">
                        <span v-html="header.title"></span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="allItems.length > 0" v-for="entity in allItems" :key="`entity-${entity.name}`" class="text-color5">
                    <td v-for="(header, i) in headers" :key="header.key" class="py-[22px]">
                        <slot :name="`${header.key}`" :entity="entity[header.key]" :common="entity.name.official">{{ entity[header.key].toLocaleString('en-US') }}</slot>
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="100%" class="text-center py-4 text-color5">
                        No se encontraron datos
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    headers: {
        required: true,

    },
    items: {
        required: true
    },
    itemsPerPage: {
        required: false
    },
    page: {
        required: false
    }

})

const emit = defineEmits('update:page')

const allItems = computed(() => {
    if (props.itemsPerPage && props.page) {
        const start = (props.page - 1) * props.itemsPerPage
        const end = start + props.itemsPerPage
        return props.items.slice(start, end)
    }

    return props.items
})

</script>
<style scoped>
@media (min-width: 310px) and (max-width: 476px) { 
    .table-width {
        width: 20rem !important;
    }
 }

@media (max-width: 477px) {
    .table-width {
        width: 22rem;
    }
} 
</style>