"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Video } from "lucide-react";
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

const VideoGenPage = () => {
  // hooks
  const proModal = useProModal();
  const router = useRouter();
  // states
  const [video, setVideo] = useState<string | undefined>(undefined);
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
      setVideo(undefined);
      // call conversation api
      const response = await axios.post("/api/video-gen", values);
      // update messages state
      setVideo(response.data[0]);
      // reset form for new promt
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      console.log("[VIDEO_SUBMIT_ERROR]", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        {...{
          title: "Video Generation",
          desc: "Turn your prompt into your favorite video",
          icon: Video,
          iconColor: "text-orange-600",
          bgColor: "bg-orange-600/10",
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
                        placeholder="A huge whale swimming from top view"
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
                  setVideo(undefined);
                }}
                variant="destructive"
                className="col-span-6 lg:col-span-2 w-full"
                disabled={!video}
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
          {!video && !formLoading && (
            <Empty label="Let me show you the world ✨" />
          )}
          {video && <Separator />}
          {video && (
            <video
              className="w-full aspect-video mt-8 rounded-lg border border-black"
              controls
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenPage;
