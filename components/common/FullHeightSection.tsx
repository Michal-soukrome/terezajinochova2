"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { TranslatedLink } from "../navigation";

interface FullHeightSectionProps {
  title: string;
  sectionId?: string;
  description: string;
  content?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  imagePosition?: "object-center" | "object-top" | "object-bottom";
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  cta?: {
    text: string;
    href: string;
  };
}

export function FullHeightSection({
  title,
  sectionId,
  description,
  content,
  imageUrl,
  imageAlt = "Section image",
  imageSide = "right",
  imagePosition = "object-center",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  children,
  cta,
}: FullHeightSectionProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: imageSide === "right" ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
    <motion.section
      id={sectionId}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative min-h-screen w-full ${backgroundColor}`}
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* TEXT */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`
            flex w-full items-center
            p-8 lg:w-1/2 lg:p-32
            ${imageSide === "left" ? "lg:order-2" : ""}
          `}
        >
          <div className="max-w-xl">
            <motion.h2
              className={`heading font-medium  text-5xl md:text-6xl text-accent-1-contrast leading-tight mb-2 ${textColor} mb-6 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h2>

            <p
              className={`mb-8 text-lg leading-relaxed opacity-90 md:text-xl ${textColor}`}
            >
              {description.split("\n\n").map((p, idx) => (
                <span key={idx} className="mb-4 block">
                  {p}
                </span>
              ))}
            </p>

            {content && <div className={`${textColor} mb-8`}>{content}</div>}
            {children && <div className="mb-8">{children}</div>}

            {cta && (
              <TranslatedLink
                href={cta.href}
                className="btn btn-primary inline-block"
              >
                {cta.text}
              </TranslatedLink>
            )}
          </div>
        </motion.div>

        {/* IMAGE */}
        {imageUrl && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`
              relative w-full
              h-[50vh] lg:h-screen lg:w-1/2
              ${imageSide === "left" ? "lg:order-1" : ""}
            `}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className={`object-cover ${imagePosition}`}
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
