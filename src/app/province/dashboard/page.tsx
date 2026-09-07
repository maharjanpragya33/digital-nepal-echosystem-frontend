"use client";

import Link from "next/link";
import { useEffect, useMemo, type ReactNode } from "react";
import { useMapSelection } from "@/contexts/MapSelectionContext";

import citizens from "../../../../data/citizens.json";
import wards from "../../../../data/wards.json";
import municipalities from "../../../../data/municipalities.json";
import idCards from "../../../../data/id-cards.json";
import syncBatches from "../../../../data/sync-batches.json";

type Province = {
  id: string;
  name: string;
  capital: string;
  districts: number;
};

type District = {
  name: string;
  citizens: number;
  municipalities: number;
  localBodies: number;
  wards: number;
  cards: number;
};

const provinces: Province[] = [
  {
    id: "prov-1",
    name: "Koshi Province",
    capital: "Biratnagar",
    districts: 14,
  },
  { id: "prov-2", name: "Madhesh Province", capital: "Janakpur", districts: 8 },
  { id: "prov-3", name: "Bagmati Province", capital: "Hetauda", districts: 13 },
  { id: "prov-4", name: "Gandaki Province", capital: "Pokhara", districts: 11 },
  {
    id: "prov-5",
    name: "Lumbini Province",
    capital: "Deukhuri",
    districts: 12,
  },
  {
    id: "prov-6",
    name: "Karnali Province",
    capital: "Birendranagar",
    districts: 10,
  },
  {
    id: "prov-7",
    name: "Sudurpashchim Province",
    capital: "Godawari",
    districts: 9,
  },
];

const koshiDistricts: District[] = [
  {
    name: "Taplejung",
    citizens: 9940,
    municipalities: 4,
    localBodies: 9,
    wards: 61,
    cards: 6840,
  },
  {
    name: "Panchthar",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
  {
    name: "Ilam",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
  {
    name: "Jhapa",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
  {
    name: "Morang",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
  {
    name: "Sunsari",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
  {
    name: "Dhankuta",
    citizens: 0,
    municipalities: 0,
    localBodies: 0,
    wards: 0,
    cards: 0,
  },
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#123b78]">
      {children}
    </span>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <path d="M16 3.2a4 4 0 0 1 0 7.6" />
      <path d="M19 15a4 4 0 0 1 3 3.8V21" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h4M7 13h2M15 13h2" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 21V4" />
      <path d="M5 5c4-3 7 3 14 0v10c-7 3-10-3-14 0" />
    </svg>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  accent,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  accent: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 border-l-4 ${accent} bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            {title}
          </p>
          <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {value}
          </p>
          <p className="mt-1 text-[11px] text-gray-400 sm:text-xs">
            {subtitle}
          </p>
        </div>
        <Icon>{icon}</Icon>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-sm bg-[#123b78]" />
          <h2 className="text-sm font-bold text-gray-800 sm:text-base">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="ml-4 mt-1 text-[11px] text-gray-400 sm:text-xs">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function ProgressRow({
  label,
  percentage,
  className,
}: {
  label: string;
  percentage: number;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <span className="w-24 shrink-0 truncate text-[10px] text-gray-500 sm:w-36 sm:text-xs">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 sm:h-2.5">
        <div
          className={`h-full rounded-full ${className}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
      <span className="w-8 text-right text-[10px] font-semibold text-gray-500 sm:w-10 sm:text-xs">
        {percentage}%
      </span>
    </div>
  );
}

function QuickAction({
  title,
  value,
  subtitle,
  href,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-gray-200 border-l-4 border-l-[#123b78] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      <div className="flex items-center gap-3">
        <Icon>{icon}</Icon>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-gray-700 sm:text-sm">
            {title}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-[10px] text-red-400 sm:text-xs">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function normalizeProvinceId(value: string | null): string {
  if (!value) return "prov-1";
  const normalized = value.toLowerCase().trim();
  if (normalized.startsWith("prov-")) return normalized;
  if (/^[1-7]$/.test(normalized)) return `prov-${normalized}`;
  return "prov-1";
}

export default function ProvinceDashboard() {
  const { selectProvince } = useMapSelection();

  const provinceId = useMemo(() => {
    if (typeof window === "undefined") return "prov-1";

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) return "prov-1";

    try {
      const decoded: { jurisdiction_id?: string } = JSON.parse(atob(token));
      return normalizeProvinceId(
        typeof decoded.jurisdiction_id === "string"
          ? decoded.jurisdiction_id
          : null,
      );
    } catch {
      return "prov-1";
    }
  }, []);

  const province =
    provinces.find((item) => item.id === provinceId) ?? provinces[0];

  useEffect(() => {
    selectProvince(province.id.replace("prov-", ""), province.name);
  }, [province.id, province.name, selectProvince]);

  const stats = useMemo(() => {
    const provinceWards = province.id === "prov-1" ? wards : [];

    const wardIds = new Set(provinceWards.map((ward) => ward.id));

    const provinceCitizens = citizens.filter((citizen) =>
      wardIds.has(citizen.ward_id),
    );

    const municipalityIds = new Set(
      provinceWards.map((ward) => ward.municipality_id),
    );

    const provinceMunicipalities = municipalities.filter((municipality) =>
      municipalityIds.has(municipality.id),
    );

    const citizenIds = new Set(provinceCitizens.map((citizen) => citizen.id));

    const provinceCards = idCards.filter((card) =>
      citizenIds.has(card.citizen_id),
    );

    const verifiedCitizens = provinceCitizens.filter(
      (citizen) => citizen.nid_verified,
    );

    return {
      citizens: provinceCitizens.length,
      municipalities: provinceMunicipalities.length,
      wards: provinceWards.length,
      cards: provinceCards.length,
      nidVerified:
        provinceCitizens.length > 0
          ? Math.round(
              (verifiedCitizens.length / provinceCitizens.length) * 1000,
            ) / 10
          : 0,
    };
  }, [province.id]);

  const recentSyncs = useMemo(() => syncBatches.slice(0, 4), []);

  return (
    <main className="min-h-screen bg-[#fafafa] px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="text-gray-400">Province Portal</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-red-500">Dashboard</span>
            </div>

            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Province Admin
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {province.name} Dashboard
            </h1>

            <span className="mt-2 inline-flex max-w-full rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-medium text-blue-600 sm:text-xs">
              Province Admin — Analytical View Only. No write access to citizen
              records.
            </span>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <Link
              href="/province/analytics"
              className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 sm:flex-none sm:px-4 sm:text-sm"
            >
              View Analytics
            </Link>

            <Link
              href="/province/national-map"
              className="flex flex-1 items-center justify-center rounded-lg bg-[#092e68] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#062553] sm:flex-none sm:px-4 sm:text-sm"
            >
              View Map
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Citizens"
            value={stats.citizens.toLocaleString()}
            subtitle="Registered citizens"
            icon={<UsersIcon />}
            accent="border-l-blue-500"
          />
          <StatCard
            title="Total Municipalities"
            value={stats.municipalities.toLocaleString()}
            subtitle="Within selected province"
            icon={<BuildingIcon />}
            accent="border-l-green-500"
          />
          <StatCard
            title="Total Wards"
            value={stats.wards.toLocaleString()}
            subtitle="Administrative wards"
            icon={<FlagIcon />}
            accent="border-l-pink-500"
          />
          <StatCard
            title="ID Cards Issued"
            value={stats.cards.toLocaleString()}
            subtitle="Across municipalities"
            icon={<CardIcon />}
            accent="border-l-orange-500"
          />
        </section>

        <section className="mt-6">
          <SectionTitle
            title="Province Level Structure"
            subtitle="प्रदेश संरचनाको विवरण"
          />

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[1.5fr_1fr_0.7fr] bg-gray-50 px-4 py-3 text-[10px] font-semibold uppercase text-gray-400 sm:text-xs">
                  <span>Province Name</span>
                  <span>Capital</span>
                  <span>Districts</span>
                </div>

                {provinces.map((item) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[1.5fr_1fr_0.7fr] border-t border-gray-100 px-4 py-3 text-xs sm:text-sm ${
                      item.id === province.id ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <span className="font-semibold text-gray-700">
                      {item.name}
                    </span>
                    <span className="font-medium text-gray-600">
                      {item.capital}
                    </span>
                    <span className="text-gray-600">{item.districts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
                Composition
              </p>

              <div className="space-y-5">
                <ProgressRow
                  label="Metropolitan City"
                  percentage={1}
                  className="bg-blue-300"
                />
                <ProgressRow
                  label="Sub-Metropolitan City"
                  percentage={1}
                  className="bg-blue-300"
                />
                <ProgressRow
                  label="Municipality"
                  percentage={37}
                  className="bg-purple-500"
                />
                <ProgressRow
                  label="Rural Municipality"
                  percentage={61}
                  className="bg-green-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <SectionTitle
            title="Registration Coverage"
            subtitle="Aggregated registration coverage for the selected province"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Households Registered"
              value="13"
              subtitle="26.1% below target"
              icon={<UsersIcon />}
              accent="border-l-blue-500"
            />
            <StatCard
              title="Employment Profiles"
              value="41"
              subtitle="Across municipalities"
              icon={<BuildingIcon />}
              accent="border-l-green-500"
            />
            <StatCard
              title="Education Records"
              value="393"
              subtitle="4% dropout rate"
              icon={<CardIcon />}
              accent="border-l-pink-500"
            />
            <StatCard
              title="Disability Profiles"
              value="8"
              subtitle={`${stats.citizens > 0 ? "Aggregated province data" : "No records"}`}
              icon={<FlagIcon />}
              accent="border-l-orange-500"
            />
          </div>
        </section>

        <section className="mt-6">
          <SectionTitle
            title="Quick Actions"
            subtitle="Frequently used province tools"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickAction
              title="Municipality Comparison"
              value={stats.municipalities}
              href="/province/municipalities"
              icon={<BuildingIcon />}
            />
            <QuickAction
              title="Province Analytics"
              value="9"
              subtitle="Analytical sections"
              href="/province/analytics"
              icon={<UsersIcon />}
            />
            <QuickAction
              title="Province Reports"
              value="3"
              subtitle="Population, grievance, ID card"
              href="/province/reports"
              icon={<CardIcon />}
            />
            <QuickAction
              title="NID Verified"
              value={`${stats.nidVerified}%`}
              subtitle="Province records"
              href="/province/analytics"
              icon={<FlagIcon />}
            />
          </div>
        </section>

        <section className="mt-6">
          <SectionTitle
            title="District Breakdown — Administrative Structure"
            subtitle="Official district, local-body and ward counts with platform figures"
            action={
              <Link
                href="/province/municipalities"
                className="shrink-0 rounded-lg bg-[#092e68] px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-[#062553] sm:px-4 sm:text-xs"
              >
                Full Comparison
              </Link>
            }
          />

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 sm:text-xs">
                <tr>
                  <th className="px-4 py-3">District Name</th>
                  <th className="px-4 py-3">NID Citizens</th>
                  <th className="px-4 py-3">Municipalities</th>
                  <th className="px-4 py-3">Total Local Bodies</th>
                  <th className="px-4 py-3">Wards</th>
                  <th className="px-4 py-3">ID Cards</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>

              <tbody>
                {koshiDistricts.map((district) => (
                  <tr
                    key={district.name}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700">
                      {district.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district.citizens.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district.municipalities}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district.localBodies}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district.wards.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district.cards.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/province/districts/${district.name.toLowerCase()}`}
                        className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-4">
              <h3 className="text-sm font-bold text-gray-800">
                Recent Activity
              </h3>
              <p className="mt-1 text-xs text-gray-400">Recent sync batches</p>
            </div>

            <div className="space-y-3 p-4">
              {recentSyncs.length === 0 ? (
                <p className="py-4 text-center text-xs text-gray-400">
                  No recent activity available.
                </p>
              ) : (
                recentSyncs.map((batch) => (
                  <div
                    key={batch.batch_id}
                    className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <span className="truncate text-gray-600">
                      {batch.ward_id}
                    </span>
                    <span
                      className={
                        batch.status === "COMPLETED"
                          ? "font-semibold text-green-500"
                          : "font-semibold text-orange-400"
                      }
                    >
                      {batch.status === "COMPLETED" ? "Completed" : "Pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-4">
              <h3 className="text-sm font-bold text-gray-800">
                Pending Activity
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Items requiring attention
              </p>
            </div>

            <div className="space-y-3 p-4 text-xs sm:text-sm">
              {["ward-012", "ward-004", "ward-003"].map((wardId) => (
                <div
                  key={wardId}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-gray-600">{wardId}</span>
                  <span className="font-semibold text-orange-400">Pending</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 border-t border-gray-200 py-4 text-center text-[10px] text-gray-400 sm:text-xs">
          Digital Nepal E-Governance System
        </footer>
      </div>
    </main>
  );
}
