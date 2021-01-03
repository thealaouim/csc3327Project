
const Services = require("../services/employee.service");

//create client account
exports.signupClient = (req, res) => {
    Services.clientSignup(req.body).then(() => {
        res.send({ message: "User was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};


//update client account
exports.updateClient = (req, res) => {
    Services.clientUpdate({ ...req.body, id: req.params.id }).then(() => {
        res.status(200).send({ message: "Updated client information successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

}

//get facilities of the specific employee
exports.getEmployeeFacilities = (req, res) => {
    Services.getEmployeeFacilities(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}



//create facility sessions
exports.createSession = (req, res) => {
    Services.createSession(req.body.time, req.body.facilityId).then(data => {
        res.status(200).send({ message: "session was created successfully" })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}


//delete sessions
exports.deleteSession = (req, res) => {
    Services.deleteSession(req.params.id).then(data => {
        res.status(200).send({ message: "session was deleted successfully" });
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}


//get clients of each session
exports.getSessionClients = (req, res) => {
    Services.getSessionClients(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}