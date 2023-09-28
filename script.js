// Hide the parameters box initially
parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none'
jsonBox = document.getElementById('requestJsonBox')
jsonBox.style.display = 'none'

// Utility Fnctions
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

// Initisalize no of prarmeters
paramCounter = 0

// If the user chooses params, hide the json box
paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    jsonBox.style.display = 'none'
    parametersBox.style.display = 'block'
})

// If the user chooses json, hide the params box

JSONRadio = document.getElementById('JSONRadio')
JSONRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none'
    jsonBox.style.display = 'block'
})

// If the user clicks on the + button add more parameters
addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    params = document.getElementById('params')
    string = `
    <div class="form-row">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCounter + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${paramCounter + 2}" placeholder="Enter Parameter ${paramCounter + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${paramCounter + 2}"
                            placeholder="Enter Parameter ${paramCounter + 2} Value">
                    </div>
                    <button  class="btn btn-primary deleteParam">-</button>
                    </div>
                <div id="params"></div>
            </div>
    `
    // Convert the element string to DOM Node
    let paramElement = getElementFromString(string)
    params.appendChild(paramElement)
    // Add an Event Listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => {
            // To do: Add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove()
        })
    }
    paramCounter++
})

// If the user clicks on submit button
submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    // Show 'Please Wait' in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = 'Please Wait...  Fetching Response...'

    // Fetch all the values user has entered
    let url = document.getElementById('url').value
    requestType = document.querySelector("input[name='requestType']:checked").value
    contentType = document.querySelector("input[name='contentType']:checked").value

    // If user has chosen params option, collect all the parameters in an object
    if (contentType == 'params') {
        data = {}
        for (let i = 0; i < paramCounter + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value
            }
            data = JSON.stringify(data)
        }
    }
    else {
        data = document.getElementById('requestJsonText').value
    }

    // if the request type is POST, invoke the fetch API to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text
            })
    }
})