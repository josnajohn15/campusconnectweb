module.exports = {
    resolve: {
      fallback: {
        http: false,
        path: false,
        crypto: false,
        querystring: false,
        zlib: false,
        stream: false,
        fs: false, // If you don't need fs
        net: false, // If you don't need net
      },
    },
  };
  