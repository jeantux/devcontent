import Navbar from '@/components/Navbar'
import axios from 'axios'

export default {
    name: 'Details',
    components: {
        Navbar
    },
    data () {
        return {
            channel: {
                name: '',
                type: '',
                tags: [],
                desc: '',
                img: '',
                github: {
                    username: '',
                    followers: null,
                    repos: null,
                },
                urlYoutube: ''
            },
            repos: []
        }
    },
    created () {
        this.getContentParams()
    },
    methods: {
        getContentParams () {
            this.channel = this.$route.params.channel
            window.console.log(this.channel)
        },
      getRepos () {
        axios({ method: 'get', url: 'https://api.github.com/'+this.github.username })
        .then(res => {
            this.repos = res.data
        })
        .catch(err => {
            window.console.log(err)
        })
      }
    }
}