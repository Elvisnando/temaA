
const root = process.env.SERVER_URL || 'http://127.0.0.1:5000'
const fetch = require("node-fetch")
const assignmentsRoot = root + '/astronauts'
const esempioastronauta =  {
    "name": "dsad544",
    "surname": "veniam sit proident",
    "assignmentResult": {"url":"some url"},
    "iSpace": true
}


const postAssignments = function (newAssignment) {
    return fetch(assignmentsRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAssignment)
    })
}



const getManyAstronauti = function () {
    return fetch(assignmentsRoot, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}
const getOneAssignment = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}




test('risposta del get - basic response', () => {
    return getManyAstronauti()
    .then(response => {expect(response.json())})
});

test('risposta 200 in caso di inserimento', () => {
    return postAssignments(esempioastronauta)
    .then(response => {expect(response.status).toBe(200)})

});

test('risposta di un astronauta', () => {
    return getOneAssignment(1)
    .then(response => {expect(response.id).toEqual(esempioastronauta.id)})

});




