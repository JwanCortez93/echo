import { TextFormFieldProps } from "../../types/index.d";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const TextFormField = ({
  name,
  control,
  label,
  placeholder,
  isTextarea,
}: TextFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3 w-full">
          <FormLabel className="text-base-semibold text-secondary">
            {label}
          </FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                rows={12}
                placeholder={placeholder}
                className="account-form_input no-focus"
                {...field}
              ></Textarea>
            ) : (
              <Input
                placeholder={placeholder}
                type="text"
                className="account-form_input no-focus"
                {...field}
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TextFormField;
