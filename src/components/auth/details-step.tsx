"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  AtSign,
  Building2,
  Check,
  Clapperboard,
  Dumbbell,
  GraduationCap,
  MapPin,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  accountTypes,
  agencyClientCounts,
  businessTypes,
  createAccount,
  creatorNiches,
  followerRanges,
  type AccountType,
  type BusinessType,
  type SignupDetails,
} from "@/mocks/auth";
import { StepHeading, StepProgress } from "./auth-parts";
import { ChipGroup, PrefixField, TextField } from "./form-fields";
import { SUCCESS_HOLD_MS } from "./phone-step";
import { StatusButton, type ButtonStatus } from "./status-button";

const typeIcons: Record<AccountType, LucideIcon> = {
  business: Store,
  agency: Building2,
  creator: Clapperboard,
};

const businessIcons: Record<BusinessType, LucideIcon> = {
  restaurant: UtensilsCrossed,
  salon: Scissors,
  retail: ShoppingBag,
  clinic: Stethoscope,
  gym: Dumbbell,
  coaching: GraduationCap,
};

const headings: Record<AccountType, { title: string; subtitle: string }> = {
  business: {
    title: "Tell us about your business",
    subtitle: "We will set up the right templates for you.",
  },
  agency: {
    title: "Tell us about your agency",
    subtitle: "You can add your client businesses next.",
  },
  creator: {
    title: "Tell us about you",
    subtitle: "Brands use this to find you for paid work.",
  },
};

/** z.enum from one of the option lists in mocks/auth. */
function enumOf<T extends readonly { value: string }[]>(options: T, message: string) {
  const values = options.map((option) => option.value) as [
    T[number]["value"],
    ...T[number]["value"][],
  ];
  return z.enum(values, { error: message });
}

const name = z.string().trim().min(2, "Enter your name");
const city = z.string().trim().min(2, "Enter your city");

const businessSchema = z.object({
  name,
  businessName: z.string().trim().min(2, "Enter your business name"),
  type: enumOf(businessTypes, "Pick the kind of business"),
  city,
});

const agencySchema = z.object({
  name,
  agencyName: z.string().trim().min(2, "Enter your agency name"),
  clients: enumOf(agencyClientCounts, "Pick how many clients you manage"),
  city,
});

const creatorSchema = z.object({
  name,
  instagram: z
    .string()
    .trim()
    .regex(/^@?[A-Za-z0-9._]{1,30}$/, "Enter your Instagram handle, e.g. @priyaeats")
    .transform((handle) => handle.replace(/^@/, "")),
  niches: z
    .array(enumOf(creatorNiches, "Pick a niche"), { error: "Pick at least one niche" })
    .min(1, "Pick at least one niche")
    .max(3, "Pick up to 3 niches"),
  followers: enumOf(followerRanges, "Pick your follower count"),
  city,
});

interface FormProps {
  status: ButtonStatus;
  onSubmit: (details: SignupDetails) => void;
}

/**
 * Step 2 of 3 for new numbers. "I am a" picks the account type, and the form
 * below changes to match. Links like /signup?as=creator preselect the type.
 */
export function DetailsStep({
  initialType,
  onCreated,
}: {
  initialType: AccountType;
  onCreated: (details: SignupDetails) => void;
}) {
  const [accountType, setAccountType] = useState<AccountType>(initialType);
  const [done, setDone] = useState(false);

  const create = useMutation({
    mutationFn: createAccount,
    onSuccess: (details) => {
      setDone(true);
      setTimeout(() => onCreated(details), SUCCESS_HOLD_MS);
    },
  });

  const status: ButtonStatus = done ? "success" : create.isPending ? "loading" : "idle";
  const formProps: FormProps = { status, onSubmit: (details) => create.mutate(details) };
  const heading = headings[accountType];

  return (
    <div>
      <StepProgress step={2} />
      <StepHeading title={heading.title}>{heading.subtitle}</StepHeading>

      <AccountTypePicker
        value={accountType}
        onChange={setAccountType}
        disabled={status !== "idle"}
      />

      {/* key: each type keeps its own fresh form state. */}
      {accountType === "business" ? (
        <BusinessForm key="business" {...formProps} />
      ) : accountType === "agency" ? (
        <AgencyForm key="agency" {...formProps} />
      ) : (
        <CreatorForm key="creator" {...formProps} />
      )}
    </div>
  );
}

function AccountTypePicker({
  value,
  onChange,
  disabled,
}: {
  value: AccountType;
  onChange: (type: AccountType) => void;
  disabled: boolean;
}) {
  const selected = accountTypes.find((type) => type.value === value);
  return (
    <fieldset className="mb-6" disabled={disabled}>
      <legend className="mb-1.5 text-[13px] leading-5 font-semibold text-foreground">I am a</legend>
      <div className="grid grid-cols-3 gap-2.5">
        {accountTypes.map((type) => {
          const Icon = typeIcons[type.value];
          return (
            <label
              key={type.value}
              className={cn(
                "relative flex h-18 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-input bg-card text-[14px] font-medium text-text-secondary",
                "transition-[border-color,background-color,color] duration-150 hover:border-border-strong hover:bg-muted",
                "has-checked:border-primary has-checked:bg-primary-soft has-checked:font-semibold has-checked:text-primary-soft-foreground",
                "has-focus-visible:ring-3 has-focus-visible:ring-primary/20",
              )}
            >
              <input
                type="radio"
                name="accountType"
                value={type.value}
                checked={value === type.value}
                onChange={() => onChange(type.value)}
                className="peer sr-only"
              />
              <Icon className="size-5" aria-hidden="true" />
              {type.label}
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
      <p key={value} className="mt-2 animate-fade-up text-[12.5px] leading-5 text-muted-foreground">
        {selected?.hint}
      </p>
    </fieldset>
  );
}

const cityProps = {
  id: "city",
  label: "City",
  placeholder: "Delhi",
  autoComplete: "address-level2",
  prefix: <MapPin className="size-4" />,
};

function BusinessForm({ status, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(businessSchema), mode: "onTouched" });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => onSubmit({ accountType: "business", ...values }))}
      className="space-y-4"
    >
      <TextField
        id="name"
        label="Your name"
        placeholder="Amit Kumar"
        autoComplete="name"
        registration={register("name")}
        error={errors.name}
      />
      <TextField
        id="businessName"
        label="Business name"
        placeholder="Sharma Sweets"
        autoComplete="organization"
        registration={register("businessName")}
        error={errors.businessName}
      />
      <ChipGroup
        legend="What kind of business?"
        options={businessTypes.map((type) => ({ ...type, icon: businessIcons[type.value] }))}
        registration={register("type")}
        error={errors.type}
      />
      <PrefixField {...cityProps} registration={register("city")} error={errors.city} />
      <SubmitButton status={status} />
    </form>
  );
}

function AgencyForm({ status, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(agencySchema), mode: "onTouched" });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => onSubmit({ accountType: "agency", ...values }))}
      className="space-y-4"
    >
      <TextField
        id="name"
        label="Your name"
        placeholder="Neha Verma"
        autoComplete="name"
        registration={register("name")}
        error={errors.name}
      />
      <TextField
        id="agencyName"
        label="Agency name"
        placeholder="Spark Digital"
        autoComplete="organization"
        registration={register("agencyName")}
        error={errors.agencyName}
      />
      <ChipGroup
        legend="How many businesses do you manage?"
        options={agencyClientCounts}
        registration={register("clients")}
        error={errors.clients}
        columns={3}
      />
      <PrefixField {...cityProps} registration={register("city")} error={errors.city} />
      <SubmitButton status={status} />
    </form>
  );
}

function CreatorForm({ status, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(creatorSchema),
    mode: "onTouched",
    defaultValues: { niches: [] },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => onSubmit({ accountType: "creator", ...values }))}
      className="space-y-4"
    >
      <TextField
        id="name"
        label="Your name"
        placeholder="Priya Sharma"
        autoComplete="name"
        registration={register("name")}
        error={errors.name}
      />
      <PrefixField
        id="instagram"
        label="Instagram handle"
        placeholder="priyaeats"
        autoComplete="off"
        prefix={<AtSign className="size-4" />}
        registration={register("instagram")}
        error={errors.instagram}
      />
      <ChipGroup
        legend="What do you post about? (up to 3)"
        options={creatorNiches}
        registration={register("niches")}
        error={errors.niches}
        multiple
        columns={4}
      />
      <ChipGroup
        legend="Followers"
        options={followerRanges}
        registration={register("followers")}
        error={errors.followers}
      />
      <PrefixField {...cityProps} registration={register("city")} error={errors.city} />
      <SubmitButton status={status} />
    </form>
  );
}

function SubmitButton({ status }: { status: ButtonStatus }) {
  return (
    <StatusButton
      type="submit"
      className="mt-2"
      status={status}
      loadingLabel="Creating account…"
      successLabel="Account created"
    >
      Create my account
    </StatusButton>
  );
}
