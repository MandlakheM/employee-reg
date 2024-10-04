import admin from "firebase-admin";
import serviceAccount from "../key.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const getEmployees = async (req, res) => {
  try {
    const employeesRef = db.collection("employees");
    const snapshot = await employeesRef.get();

    if (snapshot.empty) {
      res.status(200).send([]);
      return;
    }

    const employees = [];
    snapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).send(employees);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).send("Error retrieving employees");
  }
};

export const addEmployees = async (req, res) => {
  try {
    const employeeData = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      cellNumber: req.body.cellNumber,
      position: req.body.position,
      image: req.body.image,
    };

    const employeeRef = db.collection("employees").doc();

    const newEmpId = employeeRef.id;

    employeeData.empID = newEmpId;

    await employeeRef.set(employeeData);

    res.status(201).send({
      message: "Employee added successfully",
      employeeId: newEmpId,
      employee: employeeData
    });
  } catch (error) {
    console.error("Failed to add employee: ", error);
    res.status(500).send({
      message: "Failed to add employee",
      error: error.message
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeRef = db.collection("employees").doc(employeeId);
    const doc = await employeeRef.get();

    if (!doc.exists) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).send(doc.data());
    }
  } catch (error) {
    console.error("Error getting employee:", error);
    res.status(500).send("Error retrieving employee");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    await db.collection("employees").doc(employeeId).delete();
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee");
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updateData = req.body;
    
    const employeeRef = db.collection("employees").doc(employeeId);
    const doc = await employeeRef.get();

    if (!doc.exists) {
      res.status(404).send(`Employee with ID ${employeeId} not found`);
      return;
    }

    await employeeRef.update(updateData);
    
    res.status(200).send("Employee updated successfully");
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send(`Error updating employee: ${error.message}`);
  }
};
