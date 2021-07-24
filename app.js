var app = new Vue({
    el: '#app',
    data: {
        search: '',
        cities: [],

        season: 'seasonall',
        days: [],
        hour: [],
        form: " ",

        formResult: '',
        seasonResult: '',
        hourResult: '',
        daysResult: ''

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

                if (this.hour.length) {
                    this.hourResult = value.gen.match('[' + this.hour.join('') + ']')
                } else {
                    this.hourResult = value.gen.match('[1234567]')
                }

                if (this.days.length) {
                    this.daysResult = value.niti.match('[' + this.days.join('') + ']')
                } else {
                    this.daysResult = value.niti.match('[月火水木金土]')
                }

                return this.formResult && this.seasonResult &&
                    this.hourResult && this.daysResult &&
                    (value.kamoku.includes(this.search) ||
                        value.gakubu.includes(this.search) ||
                        value.gakka.includes(this.search) ||
                        value.tantou.includes(this.search))
            })
        }
    },


})