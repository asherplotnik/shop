import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import classes from "./BUsers.module.css";
import MyButton from "../../../../components/UI/Button/Button";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Modal from "../../../../components/UI/Modal/Modal";
import UpdateUserForm from "../UpdateUserForm/UpdateUserForm";
import { serverAddress } from "../../../../assets/helper";

const BUsers = () => {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let [showDelete, setShowDelete] = useState(false);
  let [pressedUser, setPressedUser] = useState({});
  let [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUpdatePressed = (row) => {
    setShowUpdate(!showUpdate);
    setPressedUser(row);
  };
  const onDeletePressed = (rId) => {
    setShowDelete(!showDelete);
    setPressedUser({ id: rId });
  };

  const updateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#userupdate"));
    formData.append("id", pressedUser.id);
    formData.append("email", pressedUser.email);
    if (/\D/.test(formData.get("phone"))) {
      alert("PHONR NUMBER IN VALID");
    } else {
      setShowUpdate(!showUpdate);
      axios
        .post(serverAddress + "admin/updateUser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          document.querySelector("#userupdate").reset();
          fetchUsers();
        })
        .catch((error) => {
          alert(error);
          document.querySelector("#userupdate").reset();
          fetchUsers();
        });
    }
  };
  const removeUser = (id) => {
    const sqlQuery = { sql: "SELECT * FROM users WHERE id ='" + id + "'" };
    setLoading(true);
    axios
      .post(serverAddress + "API/query", sqlQuery)
      .then((response) => {
        let myUser = {};
        response.data.map((row) => {
          myUser = {
            email: row.email,
            password: row.password,
          };
          return null;
        });
        const authData = {
          email: myUser.email,
          password: myUser.password,
          returnSecureToken: true,
        };
        let url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0";
        axios
          .post(url, authData)
          .then((response) => {
            const idToken = response.data.idToken;
            const removeReq = { idToken: idToken };
            axios
              .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDTc2IWZVm8QxfLyelchjJSuTbSvF-U3s0",
                removeReq
              )
              .then((response) => {
                console.log(response);
                deleteUser();
              })
              .catch((error) => {
                console.log("delete error:", JSON.stringify(error));
                alert("delete error:", error);
                return false;
              });
          })
          .catch((error) => {
            console.log("signin error:", JSON.stringify(error));
            alert("signin error:", error);
            return false;
          });
      })
      .catch((error) => {
        alert("search user error:", error.message);
        return false;
      });
  };
  const deleteUser = () => {
    const sqlQuery = {
      sql: "DELETE FROM users WHERE id ='" + pressedUser.id + "'",
    };
    setLoading(true);
    axios
      .post(serverAddress + "API/update", sqlQuery)
      .then((response) => {
        fetchUsers();
        setShowDelete(!showDelete);
        console.log(response.data);
      })
      .catch((err) => {
        fetchUsers();
        console.log(err);
      });
  };

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(serverAddress + "admin/getUsers", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setLoading(false);
        setUsers(
          response.data.map((row) => {
            return {
              id: row.id,
              userId: row.id,
              username: row.username,
              email: row.email,
              address: row.address,
              phone: row.phone,
              level: row.level,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
      });
  };

  const columns = [
    {
      Header: (
        <div>
          <div key="ID" className={classes.HeaderStyle}>
            ID
          </div>
        </div>
      ),
      accessor: "id",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="USERNAME" className={classes.HeaderStyle}>
          USER NAME
        </div>
      ),
      accessor: "username",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div>
          <div key="EMAIL" className={classes.HeaderStyle}>
            EMAIL
          </div>
        </div>
      ),
      accessor: "email",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div>
          <div key="ADDRESS" className={classes.HeaderStyle}>
            ADDRESS
          </div>
        </div>
      ),
      accessor: "address",
      filterable: false,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="PHONE" className={classes.HeaderStyle}>
          PHONE
        </div>
      ),
      accessor: "phone",
      filterable: false,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div>
          <div key="USERID" className={classes.HeaderStyle}>
            USER ID
          </div>
        </div>
      ),
      accessor: "userId",
      filterable: false,
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div>
          <div key="LEVEL" className={classes.HeaderStyle}>
            LEVEL
          </div>
        </div>
      ),
      accessor: "level",
      Cell: (row) => (
        <div key={row.value} className={classes.CellStyle}>
          {" "}
          {row.value.toUpperCase()}{" "}
        </div>
      ),
    },
    {
      Header: (
        <div key="UPDATE" className={classes.HeaderStyle}>
          UPDATE
        </div>
      ),
      accessor: "upt",
      Cell: () => (
        <div>
          <MyButton id="updateButton" btnType="update">
            UPDATE
          </MyButton>
        </div>
      ),
      filterable: false,
    },
    {
      Header: (
        <div key="DELETE" className={classes.HeaderStyle}>
          DELETE
        </div>
      ),
      accessor: "del",
      Cell: () => (
        <div>
          <MyButton btnType="delete">DELETE</MyButton>
        </div>
      ),
      filterable: false,
    },
  ];
  let usersTable = <Spinner />;
  if (loading === false) {
    usersTable = (
      <ReactTable
        columns={columns}
        data={users}
        defaultPageSize={50}
        filterable
        minRows={1}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              const rowDetails = {
                id: null,
                username: null,
                email: null,
                address: null,
                phone: null,
                userId: null,
                level: null,
              };
              if (rowInfo !== undefined) {
                if (e.target.innerHTML === "DELETE") {
                  onDeletePressed(rowInfo.original.id);
                }
                if (e.target.innerHTML === "UPDATE") {
                  rowDetails.id = rowInfo.original.id;
                  rowDetails.username = rowInfo.original.username;
                  rowDetails.email = rowInfo.original.email;
                  rowDetails.address = rowInfo.original.address;
                  rowDetails.phone = rowInfo.original.phone;
                  rowDetails.userId = rowInfo.original.userId;
                  rowDetails.level = rowInfo.original.level;
                  onUpdatePressed(rowDetails);
                }
                // console.log("A Td Element was clicked!");
                // console.log("it produced this event:", e.target.innerHTML);
                // console.log("It was in this column:", column.Header);
                // console.log("It was in this row:", rowInfo);
                // console.log("It was in this table instance:", instance);
                if (handleOriginal) {
                  handleOriginal();
                }
              }
            },
          };
        }}
      />
    );
  }
  return (
    <div className={classes.Trans}>
      <Modal show={showDelete} modalClosed={onDeletePressed}>
        <div className={classes.Font}>are you sure?</div>
        <br/>
        <div>
          <MyButton
            btnType="continue"
            clicked={() => removeUser(pressedUser.id)}
          >
            YES
          </MyButton>
          {"\u00A0"} {"\u00A0"}
          <MyButton btnType="cancel" clicked={onDeletePressed}>
            NO
          </MyButton>
        </div>
      </Modal>
      <Modal show={showUpdate} modalClosed={onUpdatePressed}>
        <UpdateUserForm
          show={showUpdate}
          modalClosed={onUpdatePressed}
          update={updateUser}
          username={pressedUser.username}
          address={pressedUser.address}
          phone={pressedUser.phone}
          level={pressedUser.level}
        ></UpdateUserForm>
      </Modal>
      {usersTable}
    </div>
  );
};

export default BUsers;
