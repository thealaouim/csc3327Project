
const Services = require("../services/admin.service");


//create admin account
exports.signupAdmin = (req, res) => {
    Services.adminSignup(req.body).then(() => {
        res.send({ message: "Admin was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

//create new facility
exports.createFacility = (req, res) => {
    const facility = { name: req.body.name, maxCapacity: req.body.maxCapacity };
    Services.addFacility(facility).then(data => {
        res.status(200).send({ message: "Facility was created succefully", ...data });
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while creating facility" });
    })
}

//update facility
exports.updateFacility = (req, res) => {
    const id = req.params.id;
    const facility = { name: req.body.name, maxCapacity: req.body.maxCapacity };
    Services.updateFacility(facility, id).then(data => {
        res.status(200).send({ message: "Facility was updated succefully", ...data });
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while updating facility" })
    })
}

//create desk employee account
exports.signupDeskEmployee = (req, res) => {
    Services.deskEmployeeSignup(req.body).then(() => {
        res.send({ message: "Desk Employee was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

//update desk employee information
exports.updateDeskEmployee = (req, res) => {
    Services.deskEmployeeUpdate({ ...req.body, id: req.params.id }).then(() => {
        res.status(200).send({ message: "Updated deskEmployee information successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

//Assign facility to desk employee
exports.assignFacility = (req, res) => {
    Services.assignFacility(req.body.facilityId, req.body.employeeId).then((data) => {
        switch (data) {
            case 4041:
                res.status(404).send({ message: "Desk employee not found!" })
                break;
            case 4042:
                res.status(404).send({ message: "Facility not found!" })
                break;
            default:
                res.status(200).send({ message: "Facility has been assigned to desk employee" });
        }
    }).catch(err => res.status(500).send({ message: err.message || "Some error happened while assigning facility to employee" }))
}



//get all facilities
exports.getAllFacilities = (req, res) => {
    Services.getFacilities().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while updating facility" });
    });
}


//get all employees with their facilities
exports.getAllEmployees = (req, res) => {
    Services.getEmployees().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}


//get all clients
exports.getAllClients = (req, res) => {
    Services.getClients().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
