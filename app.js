var app = new Vue({
    el: '#app',
    data: {
        message: '',
        search: '',
        cities: [],

        searchGenre: 'class',
    },
    methods: {
        async getCities() {
            var url = 'list-2.json'
            await axios.get(url).then(x => { this.cities = x.data })
        }
    },
    mounted() {
        this.getCities()
    },
    computed: {
        search_tantou() {
            return this.cities.filter(value => {
                return value.kamoku.includes(this.search)
            })
        }
    },


})