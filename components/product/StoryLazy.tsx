"use client";

import dynamic from "next/dynamic";

// The story is server-rendered as usual; its JS (picker state, phone animations, Motion `m`)
// is code-split so it stays off the critical path of the hero.
const StoryLazy = dynamic(() => import("@/components/product/Story"));

export default StoryLazy;
