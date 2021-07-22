var app = new Vue({
    el: '#app',
    data: {
    message: 'Search/Filter In Table',
    search:'',
    cities: []
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
        search_tantou(){
        　return this.cities.filter(value => {
            return value.tantou.includes(this.search)
        　})
    　}
    }
})