const users = []

const addUser = ({id,username,room})=>{
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error:'Username and room are required!'
        }
    }
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //Validate username
    if(existingUser){
        return {
            error:'Username is in use!'
        }
    }

    //Store user
    const user = {id,username,room}
    users.push(user)
    return{
        user
    }
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id 

    })
    if(index !== -1) {

        return users.splice(index,1)[0]
    }
}

const getUser = (id)=>{
    return users.find((user)=>{
        return user.id === id
    })
}

const getUserInRoom = (room)=>{
    return users.find((user)=>{
        return user.room === room
    })
}

addUser({
    id:22,
    username:'angolo',
    room:'Fatna'
})

addUser({
    id:42,
    username:'fissa',
    room:'Fatna'
})

addUser({
    id:32,
    username:'angolo',
    room:'m7ata'
})

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}