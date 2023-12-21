module.exports = {
    apps: [
        {
            name: 'ms_clientes',
            script: 'build/server.js',
            watch: false,
            instances: 1,
            autorestart: true,
            max_memory_restart: '1G',
        },
    ],
};