const mssql = require("mssql/msnodesqlv8");
const configs = require("./db-config");
const companyConnections = require("./company-config");

let pools = new Map();
let connections = [];

module.exports = {
  /**
   * https://github.com/tediousjs/node-mssql
   * Get or create a pool. If a pool doesn't exist the config must be provided.
   * If the pool does exist the config is ignored (even if it was different to the one provided
   * when creating the pool)
   *
   * @param {string} name
   * @param {{}} [config]
   * @return {Promise.<mssql.ConnectionPool>}
   */
  connected: () => {
    if (pools.size === 0) {
      console.log("no setup");
      return false;
    } else {
      console.log("setup ok");
      return true;
    }
  },
  check: () => {
    console.log(pools);
    return pools;
  },
  setup: () => {  
    
    //console.log(configs);
    for (const dbs of configs) {
      console.log(dbs.name);
      try {
        const pool = new mssql.ConnectionPool(dbs.config);
        // automatically remove the pool from the cache if `pool.close()` is called
        const close = pool.close.bind(pool);
        pool.close = (...args) => {
          pools.delete(dbs.name);
          return close(...args);
        };
        pools.set(dbs.name, pool.connect());
        connections = [...connections, dbs.name];
      } catch (error) {
        console.log(error.message);
      }
    }
    console.log("setup complete");
   
    return connections;
  },
  get: (name, config) => {
    if (!pools.has(name)) {
      if (!config) {
        throw new Error("Pool does not exist");
      }
      console.log("Establishing new pool");
      const pool = new mssql.ConnectionPool(config);

      // automatically remove the pool from the cache if `pool.close()` is called
      const close = pool.close.bind(pool);
      pool.close = (...args) => {
        pools.delete(name);
        return close(...args);
      };
      pools.set(name, pool.connect());
    }
    console.log("Fetching pool data");
    return pools.get(name);
  },
  /**
   * Closes all the pools and removes them from the store
   *
   * @return {Promise<mssql.ConnectionPool[]>}
   */
  closeAll: () =>
    Promise.all(
      Array.from(pools.values()).map((connect) => {
        return connect.then((pool) => pool.close());
      })
    ),
  getConnections: () => {
    console.log('Connections');
    console.log(connections);
    return connections;
  }
};
