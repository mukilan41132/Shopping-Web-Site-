function getSessionData(req) {
    const sessionData = req.session.flashData;
    req.session.flashData = null;
    return sessionData;
}

function flashDataSession(req, data, action) {
    req.session.flashData = data;
    console.log("action",action)
    req.session.save(action);
}

module.exports = {
    flashDataSession: flashDataSession,
    getSessionData: getSessionData
}