import data from './data.js'

const listdata = data

var app = new Vue({
    el: '#app',
    data() {
        return {
            episodes : [],
            search: '',
            searchedData: [],
            sortBy: 'newest',
            sortTx : '최신회부터',
            season: 'all'
        }
    },
    created() {
        this.episodes = listdata
    },
    computed: {
        filteredData() {
            let filteredList = this.episodes
            if (this.search != '' && this.search) {
                this.searchedData = filteredList.filter(
                    (data) => {
                        return data.title.toLowerCase().includes(this.search.toLowerCase());
                    });
                filteredList = this.searchedData;
            } 

            filteredList = filteredList.sort((a, b) => {
                let result
                if(this.sortBy == 'oldest') {
                    a.id > b.id ? result = 1 : result = -1;
                    return result   
                } else if (this.sortBy == 'newest') {
                    a.id < b.id ? result = 1 : result = -1;
                    return result
                }
            })

            if(this.season !== 'all'){
                let start, end;
                if(this.season == 1) {
                    start = 0;
                    end = 27;
                } else if (this.season == 2) {
                    start = 28;
                    end = 110;
                }
                filteredList = filteredList.filter((data) => {
                    return data.id >= start && data.id <= end
                });
            }
            return filteredList
        }
    },
    methods: {
        sortCtrl() {
            if(this.sortBy == 'oldest') {
                this.sortBy = 'newest'
                this.sortTx = '최신회부터'
            }else {
                this.sortBy = 'oldest'
                this.sortTx = '첫회부터'

            }
        },
        sortSeason(target) {
            this.season = target
        },
        accordion(event) {
            
            let el = event.currentTarget.nextElementSibling
            if(el.style.display == 'none') {
                el.style.display = 'block';
            }else {
                el.style.display = 'none'
            }
        } 
    }

})