module.exports = {
  apps: [{
    name: 'tigers',
    cwd: '/home/ubuntu/olympiad_tiger_site',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=512',
      PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    },
    error_file: '/home/ubuntu/.pm2/logs/tigers-error.log',
    out_file: '/home/ubuntu/.pm2/logs/tigers-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    exp_backoff_restart_delay: 100,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
