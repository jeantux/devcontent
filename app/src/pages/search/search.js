import axios from 'axios'
import Navbar from '@/components/Navbar'

export default {
    name: 'Search',
    components: {
        Navbar
    },
    data () {
        return {
            urlAPI: '',
            showModal: false,
            search: '',
            channels: []
        }
    },
    created () {
        this.urlAPI = process.env.VUE_APP_API_BASE_URL
        this.goSearch()
        this.getChannels()        
    },
    methods: {
        showDetails (channel) {
            this.$router.push({ name: 'details', query: { u: channel.usernamegit } })
        },
        goSearch () {
           this.search = this.$route.query.q
        },
        searchData (search) {
            axios({method: 'get', url: this.urlAPI + 'channels', params: {filter: search}})
            .then(res => {
                this.channels = res.data.channels
            })
            .catch(err => window.console.log(err))           
        },
        getChannels () {
            this.searchData(this.search)
        }
    }
}