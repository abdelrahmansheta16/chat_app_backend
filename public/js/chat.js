const socket = io()

const messageForm = document.querySelector('#messageForm')
const messageFormInput = messageForm.querySelector('input')
const messageFormButton = messageForm.querySelector('button')
const locationFormButton = document.querySelector('#send-location')
const messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
    console.log(url)
    const html = Mustache.render(locationTemplate,{
        username:message.username,
        url:message.url,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    
    messages.insertAdjacentHTML('beforeend',html)
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(locationTemplate,{
        room,
        users
    })
    
    document.querySelector('#sidebar').innerHTML = html
})

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage',message,(message)=>{
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value = ''
        messageFormInput.focus()
        console.log('message delivered '+message)
    })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    locationFormButton.setAttribute('disabled','disabled')
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            "latitude":position.coords.latitude,
            "longtitude":position.coords.longitude
        },(message)=>{
            locationFormButton.removeAttribute('disabled')
            console.log(message)
        })
    })
    
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})