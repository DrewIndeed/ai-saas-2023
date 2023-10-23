"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2ce82766-fb0e-47ed-8580-ef3a98b0d502");
  }, []);

  return null;
};

export default CrispChat;
