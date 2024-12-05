module.exports = [{
    name: 'Calibration',
    config: {
        database: 'EMS',
        server: '81.133.236.250,32768\\EMSCLOUD1',
        driver: 'msnodesqlv8',
        port: 32768,
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
},{
    name: 'Highland Game',
    config: {
        database: 'EMS',
        server: 'localhost\\SQLEXPRESS',
        driver: 'msnodesqlv8',
        port: 1433,
        user: 'MONITOR',
        password: 'Thermal',
        connectionTimeout: 200000,
        options: {
			trustedConnection: true
		},
		connectionTimeout: 200000,
		requestTimeout: 200000,
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 60000
		}
    }
},{
    name: 'Highland Game 1',
    config: {
        database: 'EMS',
        server: 'localhost\\SQLEXPRESS',
        driver: 'msnodesqlv8',
        port: 1433,
        user: 'MONITOR',
        password: 'Thermal',
        connectionTimeout: 200000,
        options: {
			trustedConnection: true
		},
		connectionTimeout: 200000,
		requestTimeout: 200000,
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 60000
		}
    }
},{
    name: 'Highland Game 2',
    config: {
        database: 'EMS',
        server: 'localhost\\SQLEXPRESS',
        driver: 'msnodesqlv8',
        port: 1433,
        user: 'MONITOR',
        password: 'Thermal',
        connectionTimeout: 200000,
        options: {
			trustedConnection: true
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
