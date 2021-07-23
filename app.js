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
        search_kamoku() {
            return this.cities.filter(value => {
                return value.kamoku.includes(this.search) ||
                    value.gakubu.includes(this.search) ||
                    value.gakka.includes(this.search) ||
                    value.tantou.includes(this.search) ||
                    value.kyoushitsu.includes(this.search) ||
                    value.niti.includes(this.search) ||
                    value.gen.includes(this.search)
            })
        }
    },


})