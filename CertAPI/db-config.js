module.exports = [{
    name: 'Calibration',
    config: {
        database: 'EMS',
        server: '192.168.1.156\\EMSCLOUD1',
        driver: 'msnodesqlv8',
        port: 1433,
        user: "MONITOR",
        password: "Thermal",
        connectionTimeout: 200000,
        options: {
			trustedConnection: false
		},
		connectionTimeout: 200000,
		requestTimeout: 200000,
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 60000
		}
    }
}
]
