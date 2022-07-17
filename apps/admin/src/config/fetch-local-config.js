(() => {

    const fetchSync = url => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.send(null)
        return JSON.parse(xhr.responseText)
    }

    window.configuration = {...fetchSync('./assets/config/app-config.json?t=' + Date.now())}

})()
