
let sever = io("https://chat-q05grtthv-my95dn.vercel.app/")


let int = document.querySelector('.int')
let btn = document.querySelector('.btn')
let logins = document.querySelector('.login')
let containers = document.querySelector('.container')
let peoples = document.querySelector('.peoples')
let iconSend = document.querySelector('.icon-send')
let input = document.querySelector('.input')
let showChat = document.querySelector('.show-chat')
let mess = document.querySelector('.mess')
let name = document.querySelector('.name')
let li = document.querySelector('li')
let btnn = document.querySelector('.btnn')
let imageAvatar = document.querySelector('.imageAvatar')
let form = document.querySelector('form')
let image = document.querySelector('.image')
let subsearch = document.querySelector('.sub-search')
let array = []
let avartars = []
let subname = ''
let allContent = []
let imageAVT = ""
let testImage = ""
let testdata = []
let id = (Math.random() + 1).toString(36).substring(7)
btnn.onclick = () => {
    sever.emit('client-send-id', id)
}
btn.onclick = () => {
    let value = int.value
    sever.emit('client-send-data', value)
    int.value = ''
    
    sever.on('sever-send-data-allUser', (data) => {
        
        
        setTimeout(() => {

            logins.style.display = 'none'
            form.style.display = 'none'
        }, 1000)
        setTimeout(() => {

            containers.style.display = 'flex'

        }, 1000)




        peoples.innerHTML = ''
        data.forEach(element => {
            testdata.push(element.user)

            console.log('element', element)

            console.log('allContent', element)

            peoples.innerHTML += `
                            
                            <div class="app-element">
                            <img src="${element.avatar || "data:image/jpeg;base64,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"}" alt="" class="avatar-image">
                            <ul>
                            <li class="element">${element.user}</li>
                            </ul>
                            </div>
                            `



        })
    })

}
sever.on('sever-send-name', (data) => {
    name.textContent = data.name
    image.src = data.imgAvatar || "data:image/jpeg;base64,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"
    imageAVT = data.imgAvatar

})



sever.on('already exist', () => {

    alert('already exist')
})




const handleMess = () => {


    showChat.scrollTop = showChat.scrollHeight

}

const handleRender = (data) => {
    
    showChat.innerHTML = ''
    array.push(data)
    let ElmentMess = document.createElement('div')
    ElmentMess.classList.add('list-mess')
    let defaultImage = "data:image/jpeg;base64,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"
    array.forEach(e => {

        ElmentMess.innerHTML += `
        <ul class="ul">
        <img src="${e.avatarImage || defaultImage}" alt="avatar" class="src">
        <li class=${e.id === id ? 'my-mess' : 'other'}> ${e.value}</li>
        </ul>
        `
    })
    showChat.appendChild(ElmentMess)



    handleMess()


}

subsearch.addEventListener('input', () => {
    let searchValue = subsearch.value.toLowerCase()
     let test = document.querySelectorAll('.app-element')
     
     test.forEach(e => {
        let textContent = e.textContent.toLowerCase()
        if(textContent.includes(searchValue)) {
            e.style.display = 'flex'
        } else {
            e.style.display = 'none'
        }
     })
})



input.addEventListener("keydown", function (event) {
    if (input.value == '') {
        return
    }
    if (event.key === "Enter" || event.keyCode === 13) {
        let value = input.value;
        sever.emit('client-send-data-chat', { value, id, avatarImage: imageAVT });
        input.value = '';
    }

});

iconSend.onclick = () => {
    if (input.value == '') {
        return
    }
    let value = input.value
    sever.emit('client-send-data-chat', { value, id, avatarImage: imageAVT })
    input.value = ''
}


sever.on('sever-send-data-client', (data) => {
    handleRender(data)
})







