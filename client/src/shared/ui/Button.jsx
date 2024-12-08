/* eslint-disable react/prop-types */
export const Button = ({ className, onClick, label, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
