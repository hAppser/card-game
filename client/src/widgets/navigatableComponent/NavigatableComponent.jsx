import { Navbar } from "../navbar/Navbar";

export const NavigatableComponent = ({ component }) => {
  return (
    <>
      <Navbar />
      {component}
    </>
  );
};
