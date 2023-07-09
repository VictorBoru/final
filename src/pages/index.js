import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import styles from './styles.module.css'

const RegistrationForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault()

    const response = await axios.post(
      "http://localhost:8081/register",
      {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
    );

    console.log("response", response);
    router.push("/login");
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <form onSubmit={registerUser} className={styles.form}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </label>
      <input type="submit" value="Register" />
      <button onClick={redirectToLogin} className={styles.redirectButton}>Already have an account?</button>
    </form>
  );
};

export default RegistrationForm;


