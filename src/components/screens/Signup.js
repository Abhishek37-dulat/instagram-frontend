import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid email address",
        classes: "#c62828 red darken-3",
      });
    } else {
      fetch("https://lucky-tuna-tutu.cyclic.app/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.msg, classes: "#c62828 red darken-3" });
          } else {
            M.toast({ html: data.msg, classes: "#388e3c green darken-2" });
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instargram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => PostData()}
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
        >
          SignUp
        </button>
        <h5>
          <Link to="/Login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
