"use client";

import { motion, useReducedMotion } from "motion/react";
import { Annotation } from "./ui/Section";
import Button from "./ui/Button";
import PhoneFrame from "./ui/PhoneFrame";
import { heroParent, heroItem, heroFrame } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : "hidden";

  return (
    <section id="top" aria-labelledby="hero-title">
      <motion.div
        variants={heroParent}
        initial={initial}
        animate="show"
        className="container-x grid grid-cols-1 items-center gap-12 pb-24 pt-16 lg:grid-cols-[7fr_5fr] lg:gap-16"
      >
        {/* Left column */}
        <div>
          <motion.div variants={heroItem}>
            <Annotation
              idx="00"
              name="AI UGC video ads — done for you"
              labelId="hero-title"
            />
          </motion.div>

          <motion.h1 variants={heroItem} id="hero-title" className="display-1 mt-5">
            UGC ads engineered to convert.
          </motion.h1>

          <motion.p variants={heroItem} className="body-lg mt-3">
            Hyper-realistic AI-generated video and static ads for your brand.
            Scripted with proven direct-response hooks, delivered in 72 hours,
            ready for TikTok, Meta and YouTube.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={site.bookingUrl} external variant="primary">
              Book a free strategy call
            </Button>
            <Button href="#work" variant="secondary">
              See the work →
            </Button>
          </motion.div>
        </div>

        {/* Right column — hero frame */}
        <motion.div variants={heroFrame} className="w-full">
          <div className="rounded-frame border border-line bg-bg p-6 shadow-[var(--shadow-frame)]">
            {/* desktop: 3-phone cluster (§8.4) */}
            <div className="hidden items-center justify-center sm:flex">
              {/* TODO:REAL-DATA drop MP4s in /public/videos and pass src */}
              <PhoneFrame
                chip="FITNESS · REELS"
                className="-mr-6 w-[200px] -rotate-[2.5deg] lg:w-[220px]"
              />
              <PhoneFrame
                chip="SKINCARE · TIKTOK"
                className="relative z-10 w-[220px] -translate-y-3 lg:w-[240px]"
              />
              <PhoneFrame
                chip="SAAS · YOUTUBE"
                className="-ml-6 w-[200px] rotate-[2deg] lg:w-[220px]"
              />
            </div>

            {/* mobile: 2 phones, no rotation */}
            <div className="flex items-center justify-center gap-4 sm:hidden">
              <PhoneFrame chip="SKINCARE · TIKTOK" className="w-[150px]" />
              <PhoneFrame chip="SAAS · YOUTUBE" className="w-[150px]" />
            </div>
          </div>

          <p className="mono-note mt-4 text-center">
            output / batch 014 — skincare · 9:16 · 72h
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
