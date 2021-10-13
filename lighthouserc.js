module.exports = {
    ci: {
        collect: {
            staticDistDir: './public',
            url: ['http://localhost:3333/mockup.html'],
        },
        upload: {
            target: 'filesystem',
            outputDir: 'lighthouse'
        },
        // assert: {
        //     "assertions": {
        //         "categories:accessibility": ["warn", { "minScore": 0.9 }],
        //         "categories:performance": ["error", { "minScore": 0.9 }],
        //     }
        // }
    },
};

