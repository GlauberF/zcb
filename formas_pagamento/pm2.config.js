module.exports = {
    apps: [
        {
            name: 'ms_forma_pagamento',
            script: 'build/server.js',
            watch: false,
            instances: 1,
            autorestart: true,
            max_memory_restart: '1G',
        },
    ],
};