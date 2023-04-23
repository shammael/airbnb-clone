"use client";

interface Props {
  onClick: (value: string) => void;
  selected: boolean;
  icon: any;
  label: string;
}

const CategoryInput = ({ icon: Icon, label, onClick, selected }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer justify-center items-center ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon
        width={50}
        height={50}
        className="fill-neutral-600 font-bold text-center"
      />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
