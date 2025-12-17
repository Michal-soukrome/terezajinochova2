"use client";

import { motion } from "framer-motion";
import React from "react";

interface FullHeightSectionProps {
  title: string;
  description: string;
  content?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
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
  description,
  content,
  imageUrl,
  imageAlt = "Section image",
  imageSide = "right",
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
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative min-h-screen w-full flex items-center justify-center ${backgroundColor}`}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        {/* Text Content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`p-8 lg:p-32 ${
            imageSide === "left" ? "lg:col-start-2" : ""
          }`}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold font-heading ${textColor} mb-6 leading-tight`}
          >
            {title}
          </h2>
          <p
            className={`text-lg md:text-xl ${textColor} opacity-90 mb-8 leading-relaxed`}
          >
            {description.split("\n\n").map((p, idx) => (
              <span key={idx} className="block mb-4">
                {p}
              </span>
            ))}
          </p>

          {content && <div className={`${textColor} mb-8`}>{content}</div>}

          {children && <div className="mb-8">{children}</div>}

          {cta && (
            <a href={cta.href} className="btn btn-primary inline-block">
              {cta.text}
            </a>
          )}
        </motion.div>

        {/* Image Content */}
        {imageUrl && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative h-screen w-full ${
              imageSide === "left" ? "lg:col-start-1 lg:row-start-1" : ""
            }`}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
