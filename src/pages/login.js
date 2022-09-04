import { useEffect, useState } from "react";
import { useAuth } from "lib/contexts/authContext";
import useHandleForm from "lib/hooks/useHandleForm";
import Router from "next/router";
import { StyledFrom } from "styles/components";
import FormError from "components/molecules/FormError/FormError";
import { emptyLoginForm } from "lib/consts";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState(emptyLoginForm);
  const { signin, user } = useAuth();

  useEffect(() => {
    if (user) redirectLoggedUser(user.id);
  }, [user]);

  const sendData = () =>
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      data: {
        identifier: formData.identifier,
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
      <h1>Login</h1>
      <div>
        <h3>Name/email</h3>
        <input
          type={"text"}
          name={"identifier"}
          value={formData.identifier}
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

      <input type={"submit"} value={"Login"} disabled={pending}></input>
    </StyledFrom>
  );
};

export default Login;
