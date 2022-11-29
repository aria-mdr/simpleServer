const putData = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

let newName
let newAge 
let newKind

const setName = () => {
    newName = document.getElementById('addName').value
}

const setAge = () => {
    newAge = document.getElementById('addAge').value

}

const setKind = () => {
    newKind = document.getElementById('addKind').value
}

const edit = (e) => {
    const id = e.target.getAttribute('data-id');
    console.log(id)

    const data = {
        id
    }

    if(newName) {
        data.name = newName
    }
    if(newKind) {
        data.kind = newKind
    }
    if(newAge) {
        data.age = newAge
    }
    putData('/animals', data)

    // putData('/animals', {
    //     id: id, 
    //     ...(newName ? { name: newName } : undefined),
    //     ...(newAge ? { age: newAge } : undefined),
    //     ...(newKind && { kind: newKind }),
    // })
    
}

document.getElementById('addKind').addEventListener('focusout', setKind )
document.getElementById('addAge').addEventListener('focusout', setAge )
document.getElementById('addName').addEventListener('focusout', setName )

document.getElementById('edit').addEventListener('click', edit);