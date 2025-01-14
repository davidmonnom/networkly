type CustomCheckboxProps = {
  label: string;
  active: boolean;
  callback: () => void;
};

export const CustomCheckbox = ({
  label,
  active,
  callback,
}: CustomCheckboxProps) => {
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
