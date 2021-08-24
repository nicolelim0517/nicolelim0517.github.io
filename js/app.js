import data from './data.js'

const listdata = data

var app = new Vue({
    el: '#app',
    data() {
        return {
            episodes : [],
            episodesLength : 0,
            search: '',
            searchedData: [],
            sortBy: 'newest',
            sortTx : '최신회부터',
            season: 'all',
            lastItemId: 0,
            selectedKeyword: '',
            filterActive: false,
            filteredList: [],
            filterClass: 'mdi-filter-outline',
            filterActiveClass: 'mdi-filter',
        }
    },
    created() {
        this.episodes = listdata
        this.episodesLength = listdata.length
        this.lastItemId = this.episodes[this.episodes.length - 1].id;
    },
    computed: {
        filteredData() {
            this.filteredList = this.episodes;
            
            if (this.search != '' && this.search) {
                this.searchedData = this.filteredList.filter(
                    (data) => {
                        return data.title.toLowerCase().includes(this.search.toLowerCase());
                    });
                this.filteredList = this.searchedData;
            } 

            this.filteredList = this.filteredList.sort((a, b) => {
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
                    end = 108;
                }
                else if (this.season == 3) {
                    start = 111;
                    end = 131;
                }
                else if (this.season == 4) {
                    start = 132;
                    end = this.lastItemId;
                }

                this.filteredList = this.filteredList.filter((data) => {
                    return data.id >= start && data.id <= end
                });
            }
            if (this.selectedKeyword != '' && this.selectedKeyword) {
                this.filteredList = this.filteredList.filter((data) => {
                    return data.keywords.some((word) => {
                        return word.includes(this.selectedKeyword);
                    })
                })
            }
            if(this.filteredList.length !== this.episodesLength) {
                this.filterActive = true;
            }
            console.log(this.filterActive)
            return this.filteredList
        },
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
            this.season = target;
        },
        accordion(event) {
            let el = event.currentTarget;
            let target = el.nextElementSibling;
            if(target.style.display == 'none') {
                target.style.display = 'block';
                el.querySelector('.mdi-menu-down').classList.replace('mdi-menu-down', 'mdi-menu-up');
            }else {
                target.style.display = 'none'
                el.querySelector('.mdi-menu-up').classList.replace('mdi-menu-up', 'mdi-menu-down');
            }
        }, 
        getKeyword(event){
            let el = event.currentTarget;
            let word = el.innerHTML;
            this.selectedKeyword = word;
        },
        setFilterActive() {
            this.season = 'all';
            this.selectedKeyword = '';
            this.search = '';
            this.filteredList = this.episodes;
            this.filterActive = false;
        }
    }
})