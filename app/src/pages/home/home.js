import axios from 'axios'
import Navbar from '@/components/Navbar'

export default {
    name: 'Home',
    components: {
        Navbar
    },
    data () {
        return {
            urlAPI: '',
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
                urlyoutube: ''
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
                urlyoutube: ''
            },
            channels: []
        }
    },
    created () {        
        this.urlAPI = process.env.VUE_APP_API_BASE_URL
        this.getChannels()
        this.getTopChannel()
    },
    methods: {
        getTopChannel () {
            axios({method: 'get', url: this.urlAPI + 'topchannel'})
            .then(res => {
                this.topChannel = res.data.channel
                if (this.topChannel.tags !== null) {
                    this.topChannel.tags = this.topChannel.tags.split(',')
                    this.topChannel.desc = this.topChannel.desc.substr(0, 350) + ' ...'
                }
            })
            .catch(err => {
                window.console.log(err)
            })
        },
        goSearch () {
            this.$router.push({ name: 'search', query: { q: this.search } })
        },
        goDetails (username) {
            this.$router.push({ name: 'details', query: { u: username } })
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
                this.dataModal.urlyoutube = channel.urlyoutube
                this.dataModal.github.username = channel.usernamegit
                this.dataModal.tags = channel.tags
                this.dataModal.github.repos = null
                this.dataModal.github.followers = null
                this.getContentGithub(channel.usernamegit)
            }
        },
        getChannels () {
            axios({method: 'get', url: this.urlAPI+'channels', params: {filter: ''}})
                .then(res => {
                    this.channels = res.data.channels
                    
                    for (const index in this.channels) {
                        const channel = this.channels[index]
                        if (channel.tags !== null) {
                            channel.tags = channel.tags.split(',')
                        }
                    }
                })
                .catch(err => window.console.log(err))
        }
    }
}