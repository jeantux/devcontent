import Navbar from '@/components/Navbar'
import axios from 'axios'

export default {
    name: 'Details',
    components: {
        Navbar
    },
    data () {
        return {
            username: '',
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
        this.getRepos()
        this.getUser()
    },
    methods: {
        scrollTop() {
            setTimeout(() => window.scrollTo(0, 0), 2000)
        },
        checkOnline(url, error, ok) {
            try {
                var scriptElem = document.createElement('script')
                scriptElem.type = 'text/javascript'
                scriptElem.onerror = () => { error() }
                scriptElem.onload = () => { ok() }
                scriptElem.src = url
                document.getElementsByTagName("body")[0].appendChild(scriptElem)
            } catch(err) {
                error(err)
            }
        },
        getContentParams () { // alterar logica
            this.username = this.$route.query.u
            if (this.username === undefined || this.username === '') {
                this.$router.push({ name: 'home'})
            }
        },
        
        getUser () {
            axios({ method: 'get', url: 'http://localhost:3000/channels',params: {username: this.username} })
            .then(res => {
                this.channel = res.data.channels[0]
                this.channel.tags = this.channel.tags.split(',')
            })
            .catch(err => {
                window.console.log(err)
            })
        },

        getRepos () {
           axios({ method: 'get', url: `https://api.github.com/users/${this.username}/repos` })
           .then(res => {
               this.repos = res.data
           })
           .catch(err => {
               window.console.log(err)
           })
         }
    }
}