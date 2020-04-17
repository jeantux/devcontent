import axios from 'axios'
import Navbar from '@/components/Navbar'

export default {
    name: 'Home',
    components: {
        Navbar
    },
    data () {
        return {
            urlAPI: 'http://localhost:3000/',
            showModal: false,
            search: '',
            topChannel: {
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
            dataModal: {
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
            channels: []
        }
    },
    created () {        
        this.getChannels()
        this.getTopChannel()
    },
    methods: {
        getTopChannel () {
            axios({method: 'get', url: this.urlAPI + 'topchannel'})
            .then(res => {
                this.topChannel = res.data.channel
            })
            .catch(err => {
                window.console.log(err)
            })
        },
        getContentGithub (username) {
            axios({method: 'get', url: `https://api.github.com/users/${username}`})
            .then(res => {
                this.dataModal.github.repos = res.data.public_repos
                this.dataModal.github.followers = res.data.followers
            })
            .catch(err => window.console.log(err))
        },
        showDetails (param, channel) {
            this.showModal = param

            if (channel !== undefined) {
                this.dataModal.name = channel.name
                this.dataModal.desc = channel.desc
                this.dataModal.img = channel.img
                this.dataModal.urlYoutube = channel.urlYoutube
                this.dataModal.github.username = channel.usernameGit
                this.dataModal.tags = channel.tags
                this.dataModal.github.repos = null
                this.dataModal.github.followers = null
                this.getContentGithub(channel.username)
            }
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