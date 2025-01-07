<template>
    <div class="flex flex-col md:grid md:grid-cols-3 grid-flow-col md:gap-6 m-1 md:m-3 xl:m-14 p-1 sm:p-3">
        <div class="flex flex-col gap-y-4">
            <h3 class="text-color4">Found {{ totalPages }} countries</h3>

            <Input v-model="valueInput" placeholder="Search by Name, Region, Subregion" prepend-inner-icon="search"
                class="md:hidden justify-self-end w-[19rem] md:w-[22rem]" @input="search" />

            <Dropdown label="Sort by" placeholder="Population" class="md:pt-10" v-model="selectedValue"
                :items="sortByOptions" @click="sortCountries" />

            <ChipGroup class="mt-6" v-model="selectedChip" :multiple="true" label="Region">
                <Chip class="mx-2" v-for="region in regions" active-class="chipClass" variant="text" :value="region"
                    @click="searchByRegion">
                    {{ region }}
                </Chip>
            </ChipGroup>

            <div class="my-3">
                <p class="text-color4 text-sm mb-3">Status</p>
                <Checkbox label="Member of the United Nations" value="unMember" v-model="statusCheck" />
                <Checkbox label="Independent" value="independent" v-model="statusCheck" />
            </div>

        </div>
        <div class="col-span-12">

            <Input v-model="valueInput" placeholder="Search by Name, Region, Subregion" prepend-inner-icon="search"
                class="hidden md:flex justify-self-end mb-10 md:w-[22rem]" @input="search" />

            <Table :headers="headers" :items="itemsFiltered" v-model:page="page" :items-per-page="10">
                <template #flags="{ entity, common }">
                    <img :src="entity.svg" :alt="entity.alt" class="w-[4rem] me-8 aspect-video rounded-lg cursor-pointer" @click="viewCountry(common)">
                </template>
                <template #name="{ entity, common }">
                    <span @click="viewCountry(common)" class="cursor-pointer">{{ entity.common }}</span>
                </template>

            </Table>
            <Pagination v-model="page" :perPage="10" :total="totalPages"  />


        </div>

    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()

// Pagination
const page = ref(1)
const totalPages = ref(0)

const statusCheck = ref([]);
const valueInput = ref();
const selectedChip = ref([])
const selectedValue = ref('Population');
const sortByOptions = ['Population', 'Area', 'Alphabetical order']
const regions = ref(['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'oceania'])

const headers = ref([
    { title: 'Flag', key: 'flags', align: 'start' },
    { title: 'Name', key: 'name', align: 'end' },
    { title: 'Population', key: 'population', align: 'start' },
    { title: 'Area km<sup>2</sup>', key: 'area', align: 'start' },
    { title: 'Region', key: 'region', align: 'end' },
])

const items = ref([])
const itemsFiltered = ref([])

const getCountries = async () => {
    const data = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,area,region,subregion,independent,unMember')
    const response = await data.json()

    items.value = response
    itemsFiltered.value = items.value
    sortCountries()
    searchByRegion()
    totalPages.value = itemsFiltered.value.length

}

const sortCountries = () => {
    itemsFiltered.value.sort((a, b) => {
        let valueA, valueB;

        switch (selectedValue.value) {
            case 'Population':
                valueA = a.population || 0;
                valueB = b.population || 0;
                return valueB - valueA;
            case 'Area':
                valueA = a.area || 0;
                valueB = b.area || 0;
                return valueB - valueA;
            case 'Alphabetical order':
                valueA = a.name.common.toLowerCase();
                valueB = b.name.common.toLowerCase();
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
        }
    });
    page.value = 1
};

const searchByRegion = () => {
    const regions = selectedChip.value.map(region => region.toLowerCase());

    if (regions.length > 0) {
        itemsFiltered.value = items.value.filter(country =>
            regions.includes(country.region.toLowerCase())
        );
    } else {
        itemsFiltered.value = [...items.value];
    }

    totalPages.value = itemsFiltered.value.length;
    page.value = 1
    sortCountries();
};

const searchByStatus = () => {
    const status = statusCheck.value.map(region => region);
    // console.log(status, 'status');
    // console.log(statusCheck.value, 'statusCheck');

    if (status.length > 0) {
        itemsFiltered.value = items.value.filter(country => {
            // console.log('Validacion', country.independent === true);
            
            return (
                (status.includes('independent') && country.independent === true) ||
                (status.includes('unMember') && country.unMember === true)
            );
        });
        // searchByRegion()
        // console.log('itemsFil', itemsFiltered.value);

    }else{
        itemsFiltered.value = items.value
    }

    totalPages.value = itemsFiltered.value.length;
    page.value = 1
}


const search = () => {
    const query = valueInput.value.toLocaleLowerCase()

    if (query != '') {
        itemsFiltered.value = items.value.filter(country =>
            country.name.common.toLocaleLowerCase().includes(query) ||
            country.region.toLocaleLowerCase().includes(query) ||
            country.subregion.toLocaleLowerCase().includes(query)
        )
        totalPages.value = itemsFiltered.value.length
        page.value = 1
        sortCountries();
        // searchByRegion()

        return
    }

    getCountries()

}

const viewCountry = (country) => {
    router.push('/country/' + country)
}

watch(statusCheck, searchByStatus, { deep: true });

onMounted(() => {
    getCountries()
})

</script>
<style>
.chipClass {
    background-color: var(--color2);
    color: var(--color5)
}
</style>
