"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Empty from "@/components/Empty";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useProModal } from "@/hooks/useProModal";
import { formSchema } from "./constants";

const MusicGenPage = () => {
  // hooks
  const proModal = useProModal();
  const router = useRouter();
  // states
  const [music, setMusic] = useState<string | undefined>(undefined);
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
      console.log({ values });
      setMusic(undefined);
      // call conversation api
      const response = await axios.post("/api/music-gen", values);
      // update messages state
      setMusic(response.data.audio);
      // reset form for new promt
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      console.log("[MUSIC_SUBMIT_ERROR]", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        {...{
          title: "Music Generation",
          desc: "Turn your prompt into your favorite sound",
          icon: Music,
          iconColor: "text-emerald-700",
          bgColor: "bg-emerald-700/10",
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
                        placeholder="Guitar version of the Hungarian Rhapsody"
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
                  setMusic(undefined);
                }}
                variant="destructive"
                className="col-span-6 lg:col-span-2 w-full"
                disabled={!music}
              >
                Clear
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
          {!music && !formLoading && <Empty label="Make me sing ✨" />}
          {music && <Separator />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicGenPage;
