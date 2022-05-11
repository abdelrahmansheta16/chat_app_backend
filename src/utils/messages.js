const generateMessage = (text) =>{
    return{
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (url) =>{
    return{
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage,generateLocationMessage}