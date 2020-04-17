import axios from 'axios'
import Navbar from '@/components/Navbar'


export default {
    name: 'Search',
    components: {
        Navbar
    },
    data () {
        return {
            urlAPI: 'http://localhost:3000/',
            showModal: false,
            search: '',
            channels: []
        }
    },
    created () {        
        this.getChannels()        
    },
    mounted () {
        this.goSearch()
    },
    methods: {
        showDetails (channel) {
            this.$router.push({ name: 'details', params: { channel } })
        },
        goSearch () {
           this.search = this.$route.query.q
        },
        searchData (search) {
            axios({method: 'get', url: this.urlAPI + 'channels', params: {filter: search}})
            .then(res => {
                this.dataModal.github.repos = res.data.public_repos
                this.dataModal.github.followers = res.data.followers
            })
            .catch(err => window.console.log(err))           
        },
        getContentGithub (username) {
            axios({method: 'get', url: `https://api.github.com/users/${username}`})
            .then(res => {
                this.dataModal.github.repos = res.data.public_repos
                this.dataModal.github.followers = res.data.followers
            })
            .catch(err => window.console.log(err))
        },
        getChannels () {
            axios({method: 'get', url: this.urlAPI+'channels'})
                .then(res => {
                    this.channels = res.data.channels
                })
                .catch(err => window.console.log(err))
        }
    }
}