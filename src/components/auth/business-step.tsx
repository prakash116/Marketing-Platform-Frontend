"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Check,
  Dumbbell,
  GraduationCap,
  MapPin,
  Scissors,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FieldError, FieldLabel, Input, fieldClass } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  businessTypes,
  createBusiness,
  type BusinessDetails,
  type BusinessType,
} from "@/mocks/auth";
import { StepHeading, StepProgress } from "./auth-parts";
import { SUCCESS_HOLD_MS } from "./phone-step";
import { StatusButton } from "./status-button";

const typeIcons: Record<BusinessType, LucideIcon> = {
  restaurant: UtensilsCrossed,
  salon: Scissors,
  retail: ShoppingBag,
  clinic: Stethoscope,
  gym: Dumbbell,
  coaching: GraduationCap,
};

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  businessName: z.string().trim().min(2, "Enter your business name"),
  type: z.enum(businessTypes.map((type) => type.value) as [BusinessType, ...BusinessType[]], {
    error: "Pick the kind of business",
  }),
  city: z.string().trim().min(2, "Enter your city"),
});

const creatorJoin = "/creators/join" as Route;

export function BusinessStep({ onCreated }: { onCreated: (details: BusinessDetails) => void }) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessDetails>({ resolver: zodResolver(schema), mode: "onTouched" });

  const create = useMutation({
    mutationFn: createBusiness,
    onSuccess: (_, details) => {
      setDone(true);
      setTimeout(() => onCreated(details), SUCCESS_HOLD_MS);
    },
  });

  return (
    <div>
      <StepProgress step={2} />
      <StepHeading title="Tell us about your business">
        We will set up the right templates for you.
      </StepHeading>

      <form
        noValidate
        onSubmit={handleSubmit((details) => create.mutate(details))}
        className="space-y-4"
      >
        <div>
          <FieldLabel htmlFor="name">Your name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Amit Kumar"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
          {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
        </div>

        <div>
          <FieldLabel htmlFor="businessName">Business name</FieldLabel>
          <Input
            id="businessName"
            autoComplete="organization"
            placeholder="Sharma Sweets"
            aria-invalid={errors.businessName ? true : undefined}
            {...register("businessName")}
          />
          {errors.businessName ? <FieldError>{errors.businessName.message}</FieldError> : null}
        </div>

        <fieldset>
          <legend className="mb-1.5 text-[13px] leading-5 font-semibold text-foreground">
            What kind of business?
          </legend>
          {/* Chips instead of a dropdown: one tap, all options visible. */}
          <div className="grid grid-cols-2 gap-2.5">
            {businessTypes.map(({ value, label }) => {
              const Icon = typeIcons[value];
              return (
                <label
                  key={value}
                  className={cn(
                    "relative flex h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-card px-3 text-[14px] font-medium text-text-secondary",
                    "transition-[border-color,background-color,color] duration-150 hover:border-border-strong hover:bg-muted",
                    "has-checked:border-primary has-checked:bg-primary-soft has-checked:font-semibold has-checked:text-primary-soft-foreground",
                    "has-focus-visible:ring-3 has-focus-visible:ring-primary/20",
                  )}
                >
                  <input
                    type="radio"
                    value={value}
                    className="peer sr-only"
                    {...register("type")}
                  />
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 hidden size-5 animate-pop-in items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card peer-checked:flex"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                </label>
              );
            })}
          </div>
          {errors.type ? <FieldError>{errors.type.message}</FieldError> : null}
        </fieldset>

        <div>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <div className={cn(fieldClass, "gap-2.5 px-3.5", errors.city && "border-destructive")}>
            <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              id="city"
              autoComplete="address-level2"
              placeholder="Delhi"
              aria-invalid={errors.city ? true : undefined}
              className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              {...register("city")}
            />
          </div>
          {errors.city ? <FieldError>{errors.city.message}</FieldError> : null}
        </div>

        <StatusButton
          type="submit"
          className="mt-2"
          status={done ? "success" : create.isPending ? "loading" : "idle"}
          loadingLabel="Creating account…"
          successLabel="Account created"
        >
          Create my account
        </StatusButton>
      </form>

      <p className="mt-5 text-center text-[13px] text-muted-foreground">
        Are you a creator or influencer?{" "}
        <Link
          href={creatorJoin}
          prefetch={false}
          className="font-semibold text-primary hover:underline"
        >
          Join as a creator →
        </Link>
      </p>
    </div>
  );
}
