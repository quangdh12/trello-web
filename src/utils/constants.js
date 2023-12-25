let apiRoot = ''

console.log('import.meta.env::', import.meta.env);

if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://trello-api-tgma.onrender.com'
}
console.log("🚀 ~ file: constants.js:9 ~ apiRoot:", apiRoot)

export const API_ROOT = apiRoot

