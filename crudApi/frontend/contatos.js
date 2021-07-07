

const Contact = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

const updateCt = async (contact, id) => {
    const url = `http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/${id}`;
    const options = {
        method: 'PUT',
        body: JSON.stringify(contact)
    }
    await fetch(url, options);

}
const Creatct = async (contato) => {
    const url = 'http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/';
    const options = {
        method: 'POST',
        body: JSON.stringify(contato)
    }
    await fetch(url, options);
}



const Row = (contato) => {
    const tbody = document.querySelector('main>table>tbody')
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${contato.id}</td>
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.cidade}</td>
        <td>${contato.estado}</td>
    `

    tbody.appendChild(newRow);
}

const table = () => {
    const tbody = document.querySelector('main>table>tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
}

const updateTable = async () => {
    table();
    const url = 'http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/';
    const contatos = await Contact(url);
    contatos.forEach(Row);
}


const save = async () => {
    if (isValidForm()) {
        const newContact = {
            // 'id': '',
            'nome': document.getElementById('nome').value,
            'email': document.getElementById('email').value,
            'cidade': document.getElementById('cidade').value,
            'estado': document.getElementById('estado').value
        }
        const idContact = document.getElementById('nome').dataset.idcontact
        if (idContact == "new") {
            await Creatct(newContact);
        } else {
            await updateCt(newContact, idContact);
            document.getElementById('deletar').disabled = false
        }
        updateTable();
        fields();
    }
}

const Delete = async () => {
    const ID = prompt('Insira um ID para deletar');

    if (ID > 0) {
        const url = `http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/${ID}`;

        const options = {
            method: 'DELETE',
        }

        await fetch(url, options);
        updateTable();
    }else{
        alert('ID não encontrado')
    }
}

const fields = () => {
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
    document.getElementById('nome').dataset.idcontact = "new";
}
const isValidForm = () => document.querySelector('main>form').reportValidity();
const fillFilds = (contato) => {

    document.getElementById('nome').value = contato.nome
    document.getElementById('email').value = contato.email
    document.getElementById('cidade').value = contato.cidade
    document.getElementById('estado').value = contato.estado
    document.getElementById('nome').dataset.idcontact = contato.id
}


const edit = async () => {
    const ID = prompt('Insira um ID para editar');
    if (ID > 0) {
        const url = `http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/${ID}`;
        const contato = await Contact(url);
        if (contato == "id não encontrado") {
            alert("ID não encontrado");
        } else {
            fillFilds(contato[0])
            document.getElementById('deletar').disabled = true
        }

    }
}

updateTable();

document.getElementById('salvar')
    .addEventListener('click', save);

document.getElementById('deletar')
    .addEventListener('click', Delete);

document.getElementById('editar')
    .addEventListener('click', edit);
