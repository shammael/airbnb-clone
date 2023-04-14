"use client";

interface Props {
  title: string;
  subtitle?: string;
  center?: string;
}

const Heading = ({ title, center, subtitle }: Props) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-neutral-500 mt-1">{subtitle}</div>
    </div>
  );
};

export default Heading;
