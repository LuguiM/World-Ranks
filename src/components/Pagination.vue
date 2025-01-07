<template>
    <div>
        <nav aria-label="Page navigation" class="mt-10 ">
            <ul class="pagination flex flex-wrap justify-center gap-10">
                <li :class="`page-item ${page === 1 ? 'disabled' : ''}`" @click="onPreviusPage">
                    <a class="page-link" aria-label="Previous">
                        <box-icon type="solid" name="chevron-left" color="#D2D5DA"></box-icon>
                    </a>
                </li>
                <li
                    v-for="noPage in pageNumbers"
                    :key="noPage"
                    @click="noPage !== '...' && onSpecificPage(noPage)"
                    :class="{'page-item': true, 'active-pagination': noPage === modelValue, 'disabled': noPage === '...'}"
                >
                    <a class="page-link">{{ noPage }}</a>
                </li>

                <li @click="onNextPage" :class="`page-item ${page >= Math.ceil(total / perPage) ? 'disabled' : ''}`">
                    <a class="page-link" aria-label="Next">
                        <box-icon type="solid" name="chevron-right" color="#D2D5DA"></box-icon>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    perPage: {
        required: true
    },
    total: {
        required: true
    },
    modelValue: {
        required: true,
        default() {
            return 1
        }
    }
})

const emit = defineEmits('update:modelValue')

const page = computed(() => props.modelValue || 1);

const pageNumbers = computed(() => {
    const totalPages = Math.ceil(props.total / props.perPage)
    const currentPage = props.modelValue || 1
    const pages = []

    if (totalPages <= 11) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        if (currentPage <= 6) {
            // Mostrar 1 al 8 y el último
            for (let i = 1; i <= 7; i++) pages.push(i)
            pages.push('...')
            pages.push(totalPages)
        } else if (currentPage > totalPages - 6) {
            // Mostrar las últimas 8 páginas
            pages.push(1)
            pages.push('...')
            for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i)
        } else {
            // Mostrar páginas cercanas al número actual
            pages.push(1)
            pages.push('...')
            for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i)
            pages.push('...')
            pages.push(totalPages)
        }
    }

    return pages
})


const onPreviusPage = () => {
    emit('update:modelValue', page.value - 1)
}

const onNextPage = () => {
    emit('update:modelValue', page.value + 1)
}

const onSpecificPage = (n) => {
    emit('update:modelValue', n)
}




</script>
<style scoped>
@tailwind components;

.disabled {
    color: #474545;
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;
    transition: opacity 0.3s;
}

@layer components {
    .active-pagination {
        @apply shadow-xl bg-color3  text-color2 rounded-lg
    }

    .page-item {
        @apply py-2 px-3 cursor-pointer text-white
    }

    .page-link {
        @apply cursor-pointer
    }


}
</style>