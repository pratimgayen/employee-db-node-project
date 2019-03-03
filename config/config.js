const config ={
    production:{
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        DATABASE_CONNECTOR: 'mongodb',
        DATABASE_USERNAME: '',
        DATABASE_PASSWORD: '',
        DATABASE_HOST: 'localhost:27017',
        DATABASE_NAME: 'employee',
    }
}


exports.get = function get(env){
    return config[env] || config.default
}