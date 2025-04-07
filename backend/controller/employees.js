// import admin from "firebase-admin";
// import serviceAccount from "../key.json" assert { type: "json" };
// import admin from 'firebase-admin';
import { auth } from "../firebaseClientConfig.js"
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { admin, db } from '../firebaseAdminConfig.js';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

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
      employee: employeeData,
    });
  } catch (error) {
    console.error("Failed to add employee: ", error);
    res.status(500).send({
      message: "Failed to add employee",
      error: error.message,
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

    const employeeDoc = await db.collection("employees").doc(employeeId).get();

    if (!employeeDoc.exists) {
      return res.status(404).send("Employee not found");
    }

    const employeeData = employeeDoc.data();

    await db.collection("employees").doc(employeeId).delete();
    res.status(200).send("Employee deleted successfully");

    const employeeRef = db.collection("deletedEmployees").doc();
    const newEmpId = employeeRef.id;

    employeeData.empID = newEmpId;

    await employeeRef.set(employeeData);
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

export const getDeletedEmployees = async (req, res) => {
  try {
    const employeesRef = db.collection("deletedEmployees");
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

export const addAdmin = async (req, res) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );

    const adminDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      image: req.body.image,
    };

    const adminRef = db.collection("admins").doc(userCredential.user.uid);
    const newAdminId = adminRef.id;

    adminDetails.adminID = newAdminId;

    await adminRef.set(adminDetails);

    res.status(201).send({
      message: "Admin added successfully",
      adminId: newAdminId,
      admin: adminDetails,
    });
  } catch (error) {
    console.error("Registration failed. Please try again.", error);
    res.status(500).send({
      message: "Failed to add admin",
      error: error.message,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const adminRef = db.collection("admins").doc(adminId);
    const doc = await adminRef.get();

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

export const getAllAdmins = async (req, res) => {
  try {
    const adminsRef = db.collection("admins");
    const snapshot = await adminsRef.get();

    if (snapshot.empty) {
      res.status(200).send([]);
      return;
    }

    const admins = [];
    snapshot.forEach((doc) => {
      admins.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).send(admins);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).send("Error retrieving admins");
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const adminID = req.params.id;

    const adminDoc = await db.collection("admins").doc(adminID).get();

    if (!adminDoc.exists) {
      return res.status(404).send("Employee not found");
    }

    await db.collection("admins").doc(adminID).delete();
    res.status(200).send("Admin deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee");
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const adminID = req.params.id;
    const updateData = req.body;

    const adminRef = db.collection("admins").doc(adminID);
    const doc = await adminRef.get();

    if (!doc.exists) {
      res.status(404).send(`Admin with ID ${adminID} not found`);
      return;
    }

    await adminRef.update(updateData);

    res.status(200).send("Admin updated successfully");
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).send(`Error updating admin: ${error.message}`);
  }
};

export const makeSysAdmin = async (req, res) => {
  const adminEmail = req.body.email;

  try {
    const user = await admin.auth().getUserByEmail(adminEmail);

    await admin.auth().setCustomUserClaims(user.uid, { sysAdmin: true });

    const userRef = db.collection("admins").doc(user.uid);

    await userRef.update({ sysAdmin: "true" });

    res.status(200).send(`User ${adminEmail} is now a sysAdmin`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    if (error.code === "auth/user-not-found") {
      res.status(404).send("User not found");
    } else {
      res.status(500).send("Error setting custom claims");
    }
  }
};
