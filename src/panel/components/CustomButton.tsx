type CustomButtonProps = {
  label: string;
  active: boolean;
  callback: () => void;
};

export const CustomButton = ({
  label,
  active,
  callback,
}: CustomButtonProps) => {
  return (
    <div
      className={`checkbox d-flex align-items-center user-select-none border rounded ${
        active ? "active" : ""
      }`}
      onClick={() => callback()}
    >
      <span>{label}</span>
    </div>
  );
};
