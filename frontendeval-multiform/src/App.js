import "./App.css";
import React, { useState, useEffect } from "react";

const fields = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "birthdate",
    name: "birthdate",
    type: "date",
    label: "Birthdate",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "password",
  },
];

function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    birthdate: "",
    password: "",
  });

  const [page, setPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const lastPage = fields.length - 1; //4-1=3 [0,1,2,3]

  const onChangeHandle = (e) => {
    setFormValues({
      ...formValues,
      [`${fields[page].name}`]: e.target.value,
    });
  };

  const onSubmitFormHandle = (e) => {
    e.preventDefault();
    //conditional check to either submit or go to the next page
    if (page === lastPage) {
      //if your at last page --> submit
      alert(JSON.stringify(formValues, null, 2));
      setShowSuccess(true);
      console.log("submitting");
    } else {
      //else if your not at last page --> go next
      setPage(page + 1);
    }
  };
  const onBackClick = () => {
    setPage(page - 1);
  };
  console.log(formValues);

  return (
    <>
      {showSuccess ? (
        <div className="">This is the success page</div>
      ) : (
        <div className="">
          {page !== 0 && (
            <button id="back-button" onClick={onBackClick}>{`< Back`}</button>
          )}
          <form className="App" onSubmit={onSubmitFormHandle}>
            <label htmlFor={fields[page].name}>{fields[page].label}</label>
            <input
              type={fields[page].type}
              name={fields[page].name}
              id={fields[page].id}
              value={formValues[fields[page].name]}
              onChange={onChangeHandle}
            />
            <button disabled={!formValues[fields[page].name]} type="submit">
              {page === lastPage ? "Submit" : "Next"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
