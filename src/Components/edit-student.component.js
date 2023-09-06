import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,  } from "react-router-dom"; 
import StudentForm from "./StudentForm";

const EditStudent = (props) => {
  const { id } = useParams(); // Access the 'id' parameter from the route
   

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put(`http://localhost:4000/students/update-student/${id}`, studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          props.history.push("/student-list"); // Use history to navigate
          
        } 
      })
      .catch((err) => console.log());
  };

  // Load data from the server and reinitialize the student form
  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/update-student/${id}`)
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, [id]); // Include 'id' in the dependency array to re-fetch data when it changes

  // Return the student form
  return (
    <StudentForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Update Student
    </StudentForm>
  );
};

export default EditStudent;
