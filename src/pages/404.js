import PageError from "components/templates/PageError/PageError";
import { errorMessages } from "lib/consts/consts";

export default function Custom404() {
  return <PageError error={{ message: errorMessages.notFound }} />;
}
