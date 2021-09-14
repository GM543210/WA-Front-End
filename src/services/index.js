import axios from 'axios'

let beService = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

let Auth = {
    async register(data) {
        let user = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            institution_name: data.institution_name
        }

        await beService.post('/registration', user)
        return
    },

    async login(data) {
        let cred = {
            email: data.email,
            password: data.password 
        }

        return beService.post('/login', cred)
    }
}

let Institutions = {
    async create(data) {
        let inst = {
            institution_name: data.institution_name,
            institution_adress: data.institution_adress,
            institution_wh: data.institution_wh,
            branch_office_city: data.branch_office_city
        }

        return beService.post('/institutions/create', inst)
    },

    async getAll() {
        return beService.get('/institutions/get')
    },

    async getByName(data) {
        return beService.get(`/institutions/get?institution_name=${data.institution_name}`)
    },

    async update(data) {
        let inst = {
            institution_old_name: data.institution_old_name,
            institution_name: data.institution_name,
            institution_adress: data.institution_adress,
            institution_wh: data.institution_wh,
            branch_office_city: data.branch_office_city
        }

        return beService.post('/institutions/update', inst)
    }
}

let Queue = {
    async getSize(data) {
        return beService.get(`/queue/size?institution_name=${data.institution_name}`)
    },

    async getCurrent(data) {
        return beService.get(`/queue/current?institution_name=${data.institution_name}`)
    },

    async addToQueue(data) {
        let inst = {
            institution_name: data.institution_name
        }

        return beService.post('/queue/add', inst)
    },

    async getState(data) {
        return beService.get(`/queue/state?institution_name=${data.institution_name}`)
    }
}

export { Auth, Institutions, Queue }