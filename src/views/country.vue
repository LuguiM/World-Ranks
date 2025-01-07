<template>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="flex flex-col justify-center items-center gap-y-4 lg:mx-14 p-5 lg:p-14 md:mt-14 xl:mt-0">
        <img :src="flags.svg" :alt="flags.alt" class="w-[15rem] lg:w-[25rem] rounded-lg md:-mt-[7.5rem]">
        <div class="text-center mt-5">
            <h1 class="text-3xl">{{ countryName.common }}</h1>
            <p class="text-sm lg:text-lg font-normal">{{ countryName.official }}</p>
        </div>
        <div class="flex justify-around gap-x-3 lg:gap-x-10">
            <div v-for="data in cardData" class="bg-color2 p-5 rounded-xl font-normal">
                <div class="flex flex-col md:flex-row gap-y-1 lg:gap-x-6 text-xs lg:text-base">
                    <p v-html="data.text"></p>
                    <span class="border border-color1"></span>
                    <p>{{ data.numbers }} </p>
                </div>
            </div>
        </div>

    </div>
    <div v-for="list in formattedList" :key="list.label" class="flex justify-between border-y border-color2 py-9 px-6">
        <h1 class="text-color4 font-normal">{{ list.label }}</h1>
        <p class="text-color5">{{ list.formattedText }}</p>
    </div>

    <div class="m-5">
        <h1 class="text-color4 pt-4 font-normal">Neighbouring Countries</h1>
        <div class="pt-5 flex flex-wrap gap-3">
            <div class="flex flex-col items-center gap-y-1 cursor-pointer" v-for="flag in contrieBorders"
                @click="viewCountry(flag.name)">
                <img :src="flag.flag.png" alt="" class="h-[2.5rem] rounded-lg ">
                <p class="text-sm font-normal text-color5">{{ flag.name }}</p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute();
const countryData = ref([])
const flags = ref({});
const countryName = ref({})
const borders = ref([])
const contrieBorders = ref([])

const cardData = computed(() => [
    {
        text: 'Population',
        numbers: countryData.value.population.toLocaleString()
    },
    {
        text: 'Area km<sup>2</sup>',
        numbers: countryData.value.area.toLocaleString()
    }
])

const listData = computed(() => [
    {
        label: 'Capital',
        text: countryData.value.capital
    },
    {
        label: 'Subregion',
        text: countryData.value.subregion
    },
    {
        label: 'Language',
        text: countryData.value.languages
    },
    {
        label: 'Currencies',
        text: countryData.value.currencies
    },
    {
        label: 'Continents',
        text: countryData.value.region
    }
])

const formattedList = computed(() => {
    return listData.value.map(item => {
        if (item.label === "Language" && typeof item.text === 'object' && item.text !== null) {
            return {
                ...item,
                formattedText: Object.values(item.text).join(', ')
            };
        } else if (item.label === "Currencies" && typeof item.text === 'object' && item.text !== null) {
            const currencies = Object.values(item.text)
                .map(currency => `${currency.name} `);
            return {
                ...item,
                formattedText: currencies.join(', ')
            };
        } else if (Array.isArray(item.text)) {
            return {
                ...item,
                formattedText: item.text.join(', ')
            };
        } else {
            return {
                ...item,
                formattedText: item.text
            };
        }
    });
})

const isLoading = ref(true);

const getBordes = () => {
    try {
        borders.value.map(async border => {
            const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
            const data = await res.json();

            if (data.length > 0) {
                const countrie = data[0]
                contrieBorders.value = [
                    ...contrieBorders.value,
                    {
                        name: countrie.name.common,
                        flag: countrie.flags
                    }
                ]
            }
        })
    } catch (e) {

    }
}

const getData = async (country) => {
    isLoading.value = true;
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
        }
        const data = await res.json();

        if (data.length > 0) {
            countryData.value = data[0];
            borders.value = countryData.value.borders
            flags.value = countryData.value.flags;
            countryName.value = countryData.value.name;
            getBordes()

        }
    } catch (error) {
        console.error('Error fetching country data:', error.message);
    } finally {
        isLoading.value = false;
    }
};
const viewCountry = (country) => {
    // router.push({
    //     to: '/country',
    //     params: {name:country}
    // })

    window.location.href=`../World-Ranks/#/country/${country}`;
}
onMounted(() => {
    const name = route.params.name;
    if (name) {
        getData(name);
    }
});

</script>

<style></style>
