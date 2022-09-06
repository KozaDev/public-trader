import { useEffect, useState } from "react";
import { useAuth } from "lib/contexts/authContext";
import useHandleForm from "lib/hooks/useHandleForm";
import Router from "next/router";
import { StyledFrom } from "styles/components";
import FormError from "components/molecules/FormError/FormError";
import { emptyRegisterForm } from "lib/consts/consts";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState(emptyRegisterForm);
  const { signin, user } = useAuth();

  useEffect(() => {
    if (user) redirectLoggedUser(user.id);
  }, [user]);

  const sendData = () =>
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
      data: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    });

  const handleSuccess = ({ data }) => {
    if (data?.user?.id) {
      redirectLoggedUser(data.user.id);
      signin(data);
    }
  };

  function redirectLoggedUser(id) {
    Router.replace(`/users/${id}`);
  }

  const { execute, pending, error, unsetErrors } = useHandleForm(
    sendData,
    handleSuccess
  );

  const handleChange = (e) => {
    unsetErrors(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    execute();
  };

  return (
    <StyledFrom onSubmit={submit}>
      <h1>Register</h1>
      <div>
        <h3>Name</h3>
        <input
          type={"text"}
          name={"username"}
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </div>

      <div>
        <h3>Email</h3>
        <input
          type={"email"}
          name={"email"}
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </div>

      <div>
        <h3>Password</h3>
        <input
          type={"password"}
          name={"password"}
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </div>

      {error.isError && <FormError error={error.error} />}
      <input type={"submit"} value={"Register"} disabled={pending}></input>
    </StyledFrom>
  );
};

export default Register;