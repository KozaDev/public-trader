import { useEffect, useState } from "react";
import { useAuth } from "lib/contexts/authContext";
import useHandleForm from "lib/hooks/useHandleForm";
import Router from "next/router";
import FormError from "components/molecules/FormError/FormError";
import InputSubmit from "components/atoms/InputSubmit/InputSubmit";
import { emptyRegisterForm } from "lib/consts/consts";
import axios from "axios";
import { StyledResponsiveTemplate, StyledFrom } from "styles/components";

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
    <StyledResponsiveTemplate>
      <div className="flex-wrapper">
        <h1>Register</h1>
        <StyledFrom onSubmit={submit}>
          <div>
            <label for={"username"}>Name</label>
            <input
              id={"username"}
              type={"text"}
              name={"username"}
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
            ></input>
          </div>

          <div>
            <label for={"email"}>Email</label>
            <input
              id={"email"}
              type={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            ></input>
          </div>

          <div>
            <label for={"password"}>Password</label>
            <input
              id={"password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            ></input>
          </div>

          {error.isError && <FormError error={error.error} />}
          <div>
            <label for={"button"} />
            <InputSubmit id={"button"} value={"Register"} disabled={pending} />
          </div>
        </StyledFrom>
      </div>
    </StyledResponsiveTemplate>
  );
};

export default Register;
