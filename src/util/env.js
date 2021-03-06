const staticHostApiHost = () => {
    var mHost = location.hostname
    return {
        'cdn.lifesense.com': 'https://sports.lifesense.com',
        'static-qa.lifesense.com': '/',
        '192.168.0.102': '/',
        'static-qa2.lifesense.com': 'https://sports-qa2.lifesense.com',
        'localhost': 'https://sports-qa.lifesense.com',
    } [mHost] || 'https://sports-qa.lifesense.com'
}

export {
    staticHostApiHost
}