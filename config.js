module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'db4free.net',
        user: process.env.MYSQL_USER || 'practico_node',
        password: process.env.MYSQL_PASSWORD || 'db4free1',
        database: process.env.MYSQL_DB || 'practico_node',
    },
    mysqlService: {
        host: process.env.MYSQL_SVR_HOST || 'localhost',
        port: process.env.MYSQL_SVR_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_SVR_HOST || 'localhost',
        port: process.env.CACHE_SVR_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-19627.c17.us-east-1-4.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 19627,
        password: process.env.PASS || 'yrAJXeLC7v031DR4vOjVP8hU7YMJ9Ogm',
    }
}