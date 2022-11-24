if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg)=> console.log('Service worked registered', reg))
    .catch((err)=> console.log('Service worked no registered', err))
}