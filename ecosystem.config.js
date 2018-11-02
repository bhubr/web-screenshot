module.exports = {
  apps : [{
    name: 'web-screenshot',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development',
      PORT: 5040
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5040
    }
  }],

  deploy : {
    production : {
      user : 'bhu',
      host : 'jsx.fr',
      ref  : 'origin/master',
      repo : 'git@github.com:bhubr/web-screenshot.git',
      path : '/home/bhu/node/web-screenshot',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
