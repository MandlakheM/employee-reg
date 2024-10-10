import { useState, useEffect } from "react";
import "./AdminDetails.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import axios from "axios";

const AddAdmin = ({ handleAddAdmin, userInfo, updating }) => {
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdminInfo({
      ...adminInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      adminInfo.firstName.trim() !== "" ||
      adminInfo.email.trim() !== "" ||
      adminInfo.dob.trim() !== "" ||
      adminInfo.image.trim() !== "" ||
      adminInfo.lastName.trim() !== "" ||
      adminInfo.password.trim() !== ""
    ) {
      try {
        await axios.post("http://localhost:4000/add-admin", adminInfo);
        alert("new admin created");
      } catch (error) {
        console.log("unable to create new admin :", error);
      }
      //   console.log(adminInfo);
    } else {
      alert("all fields must be populated");
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAdminInfo((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div className="modal">
      <div className="overlay" onClick={handleAddAdmin}></div>
      <div className="modalContent">
        <h2>{updating ? "update your profile" : "add new admin"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={updating ? userInfo.firstName : adminInfo.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={updating ? userInfo.lastName : adminInfo.lastName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={updating ? userInfo.email : adminInfo.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Create password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <label htmlFor="id" className={updating ? "" : "adminID"}>
            ID
          </label>
          <input
            id="adminID"
            name="adminID"
            type="text"
            value={updating ? userInfo.adminID : ""}
            className={updating ? "" : "adminID"}
            readOnly
          />
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={updating ? userInfo.dob : adminInfo.dob}
            onChange={handleChange}
          />
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">
            {updating ? "update details" : "create new admin"}
          </button>
        </form>
        <div className="closeModal" onClick={handleAddAdmin}>
          close
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
