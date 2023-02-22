async function create(){
    const plataform = document.getElementById(`plataform`).value
    const owner = document.getElementById(`owner`).value
    const user = document.getElementById(`user`).value
    const password = document.getElementById(`password`).value

    if(!plataform || !owner || !user || !password){
        console.log('Informações incompletas')
        return
    }

    const response = await fetch('http://localhost:3000/data/create',{
        method: 'post',
        body: JSON.stringify({
            plataform: plataform,
            owner: owner,
            user: user,
            password: password,
            date: '22/02'
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    const data = await response.json()
    console.log(data)
}

async function getAll(){
    const response = await fetch('http://localhost:3000/data')
    const data = await response.json()
    console.log(data)
}

async function deleteAll(){
    let getUsers = await fetch('http://localhost:3000/data')
    let usersJSON = await getUsers.json()
    let response = ''
    let data = ''
    for (let index in usersJSON){
        response = await fetch('http://localhost:3000/data/delete/' + usersJSON[index]['_id'],{
            method: 'delete'
        })
        data = await response.json()
        console.log(data)
    }
}