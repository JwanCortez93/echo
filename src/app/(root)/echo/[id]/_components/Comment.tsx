"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CommentProps } from "../../../../../../types/index.d";
import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CommentValidation } from "@/lib/validations/echo";
import { Button } from "@/components/ui/button";
import TextFormField from "@/components/TextFormField";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { addCommentToEcho } from "@/app/(root)/_actions/echoes";

const Comment = ({ echoId, currentUserImg, currentUserId }: CommentProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      echo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToEcho({
      echoId,
      commentText: values.echo,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });

    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="echo"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  placeholder="Comment..."
                  type="text"
                  className="no-focus text-secondary outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
