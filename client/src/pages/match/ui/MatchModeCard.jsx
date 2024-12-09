/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/Button";

export const MatchModeCard = ({
  cardClassName,
  titleClassName,
  buttonClassName,
  title,
  buttonLabel,
  description,
  onButtonClick,
}) => {
  return (
    <div className={cardClassName}>
      <h2 className={titleClassName}>{title}</h2>
      <p className="text-gray-600 mb-4 h-32">{description}</p>
      <Button
        label={buttonLabel}
        className={buttonClassName}
        onClick={onButtonClick}
      />
    </div>
  );
};
