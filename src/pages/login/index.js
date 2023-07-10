import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import cookie from 'js-cookie';
import styles from './styles.module.css'

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault()
  
    const response = await axios.post(
      "http://localhost:8081/login",
      {
        email: email,
        password: password,
      }
    );
  
    console.log("response", response);
    if (response.data.response === "Successfully logged in") {
      cookie.set('jwt', response.data.jwt);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={loginUser} className={styles.form}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;