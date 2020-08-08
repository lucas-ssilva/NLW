//procurar o botão 
// quando clicar executar uma ação
//duplicar os campos e colocar na pagina // que campos ? // onde ?

document.querySelector("#add-time").addEventListener('click', cloneField)

function cloneField() {
    const NewfieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //limpar os campos 
    const fields = NewfieldContainer.querySelectorAll('input')

    fields.forEach(element => {
        element.value = ""
    });


    document.querySelector('#schedule-items').appendChild(NewfieldContainer)
}