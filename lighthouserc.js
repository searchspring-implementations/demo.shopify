module.exports = {
    ci: {
      collect: {
        staticDistDir: './public',
        url: ['http://localhost:3333/mockup.html'],
      },
      upload: {
        // target: 'filesystem',
        target: 'temporary-public-storage',
        outputDir: 'lighthouse'
      },
    },
  };