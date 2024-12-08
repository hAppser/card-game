/* eslint-disable react/prop-types */
import { Navbar } from "../navbar/Navbar";

export const NavigatableComponent = ({ component }) => {
  return (
    <>
      <Navbar />
      {component}
    </>
  );
};
