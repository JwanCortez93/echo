import { UserValidation } from "@/lib/validations/user";

declare type SidebarLinkType = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  route: string;
  label: string;
};

declare type AccountProfileFormProps = {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  buttonTitle: string;
};

declare type TextFormFieldProps = {
  control: Control<z.infer<typeof UserValidation>>;
  name: string;
  label: string;
  placeholder: string;
  isTextarea: boolean;
};

declare type UpdateUserParams = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

declare type CreateEchoParams = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};
