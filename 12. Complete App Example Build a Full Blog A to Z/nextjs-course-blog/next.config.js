const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: "elhadiii90",
                mongodb_password: "T8hw0cmUi7CNcwRe",
                mongodb_clustername: "cluster0",
                mongodb_database: "nextjs-blog-dev",
            },
        };
    }

    return {
        env: {
            mongodb_username: "elhadiii90",
            mongodb_password: "T8hw0cmUi7CNcwRe",
            mongodb_clustername: "cluster0",
            mongodb_database: "nextjs-blog",
        },
    };
};
