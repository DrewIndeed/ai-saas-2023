"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChatCompletion,
  ChatCompletionMessage,
} from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomAvatar from "@/components/Avatar";
import Empty from "@/components/Empty";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useProModal } from "@/hooks/useProModal";
import { formSchema } from "./constants";

const ConversationPage = () => {
  // hooks
  const proModal = useProModal();
  const router = useRouter();
  // states
  const [messages, setMessages] = useState<
    (ChatCompletionMessage & ChatCompletion.Choice)[]
  >([]);
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
        messages: [currentMsg],
      });
      // update messages state
      setMessages((prevMsg) => [...prevMsg, currentMsg, response.data]);
      // reset form for new promt
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
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
          desc: "Our most advanced chat model",
          icon: MessageSquare,
          iconColor: "text-violet-500",
          bgColor: "bg-violet-500/10",
        }}
      />
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
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
              <Button className="col-span-6 lg:col-span-2 w-full">
                Generate
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setMessages([]);
                }}
                variant="destructive"
                className="col-span-6 lg:col-span-2 w-full"
                disabled={messages.length <= 0}
              >
                Clear All
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 pb-4">
          {formLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !formLoading && (
            <Empty label="Ask me anything ✨" />
          )}
          {messages.length > 0 && <Separator />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg) => (
              <div
                key={msg.content || msg.message.content}
                className={cn(
                  "p-5 max-w-[90%] flex gap-x-6 rounded-lg break-word text-justify",
                  msg.role === "user"
                    ? "bg-white border border-black/10 ml-auto flex-row-reverse justify-between font-semibold"
                    : "bg-muted mr-auto"
                )}
              >
                <CustomAvatar type={msg.role === "user" ? "user" : "bot"} />
                <div className="flex flex-col justify-center">
                  {!msg.message ? msg.content : msg.message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
