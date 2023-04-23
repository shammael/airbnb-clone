import CategoryInput from "../Category/CategoryInput";
import categories from "../Category/data/categories";
import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";

interface Props extends CommonProps<"category", string> {}

const CategoryModal = ({ onChange, values }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div className="col-span-1" key={category.label}>
            <CategoryInput
              icon={category.icon}
              label={category.label}
              onClick={(category) => onChange("category", category)}
              selected={values.category === category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryModal;
