import { useEffect, useState } from "react";
import { useAuth } from "lib/contexts/authContext";
import useHandleForm from "lib/hooks/useHandleForm";
import Router from "next/router";
import { StyledResponsiveTemplate, StyledFrom } from "styles/components";
import FormError from "components/molecules/FormError/FormError";
import { emptyLoginForm } from "lib/consts/consts";
import axios from "axios";
import InputSubmit from "components/atoms/InputSubmit/InputSubmit";
import DummyUsers from "components/organisms/DummyUsers/DummyUsers";

export async function getStaticProps() {
  let dummyUsers = null;
  const error = { isError: false, error: null };

  try {
    const dummyUsersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/dummy-users`
    );
    dummyUsers = dummyUsersRes.data;
  } catch (e) {
    error.isError = true;
    error.error = errorFactory(e);
  }

  return {
    props: { dummyUsers, error },
  };
}

const Login = ({ dummyUsers }) => {
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
        identifier: formData.identifier.trim(),
        password: formData.password.trim(),
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
        <h1>Login</h1>
        <StyledFrom onSubmit={submit}>
          <div>
            <label htmlFor={"text"}>Name/email</label>
            <input
              id={"text"}
              type={"text"}
              name={"identifier"}
              value={formData.identifier}
              onChange={handleChange}
              autoComplete="off"
            ></input>
          </div>

          <div>
            <label htmlFor={"password"}>Password</label>
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
            <label htmlFor={"button"} />
            <InputSubmit
              id={"button"}
              type={"submit"}
              value={"Login"}
              disabled={pending}
            />
          </div>
        </StyledFrom>
      </div>
      <DummyUsers
        data={dummyUsers.data}
        title={"Use this credentials to login"}
      />
    </StyledResponsiveTemplate>
  );
};

export default Login;
