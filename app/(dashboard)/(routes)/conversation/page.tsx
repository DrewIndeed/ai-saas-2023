"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChatCompletion,
  ChatCompletionMessage,
} from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import axios from "axios";
import { formSchema } from "./constants";

const ConversationPage = () => {
  // hooks
  const router = useRouter();
  // states
  const [messages, setMessages] = useState<ChatCompletion.Choice[]>([]);
  // set up form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });
  // form loading state
  const formLoading = form.formState.isSubmitting;
  // handle submit form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // create message obj
      const currentMsg: ChatCompletionMessage = {
        role: "user",
        content: values.prompt,
      };
      // create new messages
      const newMessages = [...messages, currentMsg];
      // call conversation api
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      // update messages state
      setMessages((prevMsg) => [...prevMsg, currentMsg, response.data]);
      // reset form for new promt
      form.reset();
    } catch (error) {
      // TODO: open modal
      console.log("[CONVERATION_SUBMIT_ERROR]", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        {...{
          title: "Conversation",
          desc: "Our most advanced conversation model",
          icon: MessageSquare,
          iconColor: "text-violet-500",
          bgColor: "bg-violet-500/10",
        }}
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={formLoading}
                        placeholder="How do I calculate the parameter of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {formLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !formLoading && (
            <Empty label="Maximus gotcha, don't by shy " />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg) => {
              if (!msg.message) return null;
              return <div key={msg.message.content}>{msg.message.content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
