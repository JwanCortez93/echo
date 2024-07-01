"use client";

import TextFormField from "@/components/TextFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EchoValidation } from "@/lib/validations/echo";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { createEcho } from "../../_actions/echoes";
import { z } from "zod";
import { useOrganization } from "@clerk/nextjs";

const PostEcho = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(EchoValidation),
    defaultValues: {
      echo: "",
      accountId: userId,
    },
  });

  

  const onSubmit = async (values: z.infer<typeof EchoValidation>) => {
    await createEcho({
      text: values.echo,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <TextFormField
          control={form.control}
          label="Content"
          name="echo"
          placeholder="What do you want to say?"
          isTextarea
        />
        <Button type="submit" className="bg-primary">
          Post Echo
        </Button>
      </form>
    </Form>
  );
};

export default PostEcho;
