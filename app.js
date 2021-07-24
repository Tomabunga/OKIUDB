var app = new Vue({
    el: '#app',
    data: {
        search: '',
        cities: [],

        season: 'seasonall',
        days: ["月", "火", "水", "木", "金", "土"],
        hour: [1, 2, 3, 4, 5, 6, 7],
        form: " ",
        formResult: '',
        seasonResult: '',

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

                if (this.form == "online") {
                    this.formResult = value.kyoushitsu.match('^(?=.*ｵﾝﾗｲﾝ授業).*$')
                } else if (this.form == "real") {
                    this.formResult = value.kyoushitsu.match('^(?!.*ｵﾝﾗｲﾝ授業).*$')
                } else {
                    this.formResult = value.kyoushitsu.match('(?=.)')
                }

                if (this.season == "season0") {
                    this.seasonResult = value.gakki.match('^(?=.*通年).*$')
                } else if (this.season == "season1") {
                    this.seasonResult = value.gakki.match('^(?=.*前期).*$')
                } else if (this.season == "season2") {
                    this.seasonResult = value.gakki.match('^(?=.*後期).*$')
                } else {
                    this.seasonResult = value.gakki.match('(?=.)')
                }

                return this.formResult && this.seasonResult &&
                    value.gen.match('[' + this.hour.join('') + ']') &&
                    value.niti.match('[' + this.days.join('') + ']') &&
                    (value.kamoku.includes(this.search) ||
                        value.gakubu.includes(this.search) ||
                        value.gakka.includes(this.search) ||
                        value.tantou.includes(this.search))
            })
        }
    },


})