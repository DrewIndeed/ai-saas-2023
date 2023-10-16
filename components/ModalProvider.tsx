"use client";

import { useEffect, useState } from "react";

import ProModal from "./ProModal";

interface Props {}

const ModalProvider = (props: Props) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;

  return <ProModal />;
};

export default ModalProvider;
