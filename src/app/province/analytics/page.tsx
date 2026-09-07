"use client";

import { useMemo, useState, type ReactNode } from "react";

type Tab =
  | "Demographics"
  | "Employment"
  | "Household & Poverty"
  | "Education"
  | "Health"
  | "Disability"
  | "Digital Access"
  | "Consent & Compliance"
  | "ID Cards & Grievances";

type BarItem = {
  label: string;
  value: number;
};

type Segment = {
  label: string;
  percentage: number;
  color: string;
};

const tabs: Tab[] = [
  "Demographics",
  "Employment",
  "Household & Poverty",
  "Education",
  "Health",
  "Disability",
  "Digital Access",
  "Consent & Compliance",
  "ID Cards & Grievances",
];

const ageData: BarItem[] = [
  { label: "0–17", value: 15800 },
  { label: "18–30", value: 13500 },
  { label: "31–45", value: 12200 },
  { label: "46–60", value: 10200 },
  { label: "60+", value: 9800 },
];

const sexData: BarItem[] = [
  { label: "Male", value: 24800 },
  { label: "Female", value: 22800 },
  { label: "Other", value: 638 },
];

const employmentData: BarItem[] = [
  { label: "Agriculture", value: 42 },
  { label: "Services", value: 39 },
  { label: "Manufacturing", value: 40 },
  { label: "Self-employed", value: 41 },
  { label: "Other", value: 39 },
];

const educationData: BarItem[] = [
  { label: "Basic (1–8)", value: 15200 },
  { label: "Basic (9–10)", value: 11300 },
  { label: "Secondary (11–12)", value: 7200 },
  { label: "Higher Secondary", value: 4800 },
  { label: "Bachelor", value: 3500 },
  { label: "Master", value: 2800 },
  { label: "Technical/Voc.", value: 2100 },
];

const healthData: BarItem[] = [
  { label: "Doctors", value: 46 },
  { label: "Nurses", value: 91 },
  { label: "Health Assistants", value: 78 },
];

const disabilityData: BarItem[] = [
  { label: "Physical", value: 920 },
  { label: "Vision", value: 700 },
  { label: "Hearing", value: 540 },
  { label: "Intellectual", value: 390 },
  { label: "Psychosocial", value: 250 },
  { label: "Multiple", value: 180 },
];

const digitalData: BarItem[] = [
  { label: "Basic", value: 11500 },
  { label: "Intermediate", value: 8500 },
  { label: "Advanced", value: 8300 },
  { label: "None", value: 4800 },
];

const ageShare: Segment[] = [
  { label: "0–17", percentage: 32, color: "#123b78" },
  { label: "18–30", percentage: 20, color: "#f59e0b" },
  { label: "31–45", percentage: 18, color: "#22c55e" },
  { label: "46–60", percentage: 12, color: "#06b6d4" },
  { label: "60+", percentage: 18, color: "#ef234c" },
];

const sexShare: Segment[] = [
  { label: "Female", percentage: 51, color: "#ef234c" },
  { label: "Male", percentage: 47, color: "#123b78" },
  { label: "Other", percentage: 2, color: "#f59e0b" },
];

const incomeShare: Segment[] = [
  { label: "100K+", percentage: 30, color: "#123b78" },
  { label: "100K–200K", percentage: 25, color: "#ef234c" },
  { label: "200K–300K", percentage: 20, color: "#22c55e" },
  { label: "300K–500K", percentage: 15, color: "#f59e0b" },
  { label: "500K+", percentage: 10, color: "#8b5cf6" },
];

const educationShare: Segment[] = [
  { label: "Basic", percentage: 30, color: "#123b78" },
  { label: "Secondary", percentage: 23, color: "#ef234c" },
  { label: "Higher Secondary", percentage: 17, color: "#22c55e" },
  { label: "Bachelor", percentage: 10, color: "#f59e0b" },
  { label: "Master", percentage: 8, color: "#8b5cf6" },
  { label: "Technical", percentage: 7, color: "#06b6d4" },
  { label: "Other", percentage: 5, color: "#64748b" },
];

const disabilityShare: Segment[] = [
  { label: "Physical", percentage: 31, color: "#0ea5e9" },
  { label: "Vision", percentage: 23, color: "#2563eb" },
  { label: "Hearing", percentage: 18, color: "#06b6d4" },
  { label: "Intellectual", percentage: 12, color: "#22c55e" },
  { label: "Multiple", percentage: 9, color: "#f59e0b" },
  { label: "Other", percentage: 7, color: "#ef234c" },
];

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
      <path d="M4 5v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
      <path d="M20 19v-4h-4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function KpiCard({
  label,
  value,
  accent = "border-blue-500",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 border-t-4 ${accent} bg-white px-3.5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:px-4`}
    >
      <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold leading-none text-gray-900 sm:text-xl">
        {value}
      </p>
    </div>
  );
}

function AnalyticsCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
        <h3 className="text-xs font-bold text-gray-800 sm:text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function BarChart({
  data,
  horizontal = false,
}: {
  data: BarItem[];
  horizontal?: boolean;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2 sm:gap-3">
            <span className="w-20 shrink-0 truncate text-[10px] text-gray-500 sm:w-28 sm:text-xs">
              {item.label}
            </span>

            <div className="h-2.5 flex-1 overflow-hidden rounded-sm bg-gray-100 sm:h-3">
              <div
                className="h-full rounded-sm bg-[#123b78] transition-all duration-500"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>

            <span className="w-10 text-right text-[10px] font-medium text-gray-400 sm:text-xs">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-44 items-end gap-2 border-b border-gray-100 px-1 pb-5 sm:h-52 sm:gap-4 sm:px-2 sm:pb-6">
      {data.map((item) => (
        <div
          key={item.label}
          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
        >
          <div
            className="w-5 rounded-t-md bg-[#123b78] transition-all duration-500 sm:w-8"
            style={{ height: `${Math.max(5, (item.value / max) * 100)}%` }}
          />
          <span className="max-w-full truncate text-[9px] text-gray-400 sm:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({
  segments,
  size = 132,
}: {
  segments: Segment[];
  size?: number;
}) {
  const gradient = useMemo(() => {
    let current = 0;

    return segments
      .map((segment) => {
        const start = current;
        current += segment.percentage;
        return `${segment.color} ${start}% ${current}%`;
      })
      .join(", ");
  }, [segments]);

  return (
    <div className="flex items-center justify-center py-2">
      <div
        className="relative shrink-0 rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradient})`,
        }}
      >
        <div className="absolute inset-[25%] rounded-full bg-white" />
      </div>
    </div>
  );
}

function Legend({ items }: { items: Segment[] }) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-[10px] text-gray-500 sm:text-xs">
            {item.label}
          </span>
          <span className="ml-auto text-[10px] font-semibold text-gray-400 sm:text-xs">
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

function ChartAndLegend({
  segments,
  size = 132,
}: {
  segments: Segment[];
  size?: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <DonutChart segments={segments} size={size} />
      <div className="w-full max-w-[170px]">
        <Legend items={segments} />
      </div>
    </div>
  );
}

function RegistrationTrend() {
  return (
    <div className="relative h-52 w-full sm:h-60">
      <svg
        viewBox="0 0 800 220"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {[40, 80, 120, 160, 200].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="800"
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        <polyline
          fill="none"
          stroke="#123b78"
          strokeWidth="3"
          points="20,185 150,170 280,150 410,120 540,95 670,65 790,35"
        />
        <polyline
          fill="none"
          stroke="#ef234c"
          strokeWidth="2"
          points="20,190 150,193 280,192 410,193 540,191 670,192 790,190"
        />
        <polyline
          fill="none"
          stroke="#20a36a"
          strokeWidth="2"
          points="20,210 150,218 280,215 410,214 540,215 670,214 790,215"
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-gray-400 sm:text-xs">
        <span>Mar '25</span>
        <span>Apr '25</span>
        <span>May '25</span>
        <span>Jun '25</span>
        <span>Jul '25</span>
        <span>Aug '25</span>
      </div>

      <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-3 whitespace-nowrap text-[9px] sm:gap-4 sm:text-xs">
        <span className="text-blue-700">● Citizens registered</span>
        <span className="text-red-500">● Female</span>
        <span className="text-green-600">● Youth</span>
      </div>
    </div>
  );
}

function InfoNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 px-3 py-3 text-center text-[10px] leading-4 text-purple-600 sm:px-4 sm:text-xs">
      ⓘ {children}
    </div>
  );
}

function DemographicsSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Age Distribution — Bar">
          <BarChart data={ageData} />
        </AnalyticsCard>

        <AnalyticsCard title="Age Distribution — Share">
          <ChartAndLegend segments={ageShare} />
        </AnalyticsCard>

        <AnalyticsCard title="Sex Distribution — Bar">
          <BarChart data={sexData} />
        </AnalyticsCard>

        <AnalyticsCard title="Sex Distribution — Share">
          <ChartAndLegend segments={sexShare} />
        </AnalyticsCard>
      </div>

      <div className="mt-4">
        <AnalyticsCard title="Registration & Sex Ratio — Live Trend (06 months)">
          <RegistrationTrend />
        </AnalyticsCard>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Ethnicity — Major Groups">
          <ChartAndLegend
            segments={[
              { label: "Group 1", percentage: 35, color: "#123b78" },
              { label: "Group 2", percentage: 20, color: "#ef234c" },
              { label: "Group 3", percentage: 15, color: "#f59e0b" },
              { label: "Group 4", percentage: 12, color: "#22c55e" },
              { label: "Other", percentage: 18, color: "#8b5cf6" },
            ]}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Janajati — Subgroups">
          <BarChart
            horizontal
            data={[
              { label: "Rai", value: 3000 },
              { label: "Tamang", value: 2700 },
              { label: "Magar", value: 2600 },
              { label: "Limbu", value: 2100 },
              { label: "Newar", value: 1800 },
              { label: "Gurung", value: 1800 },
            ]}
          />
        </AnalyticsCard>
      </div>
    </>
  );
}

function EmploymentSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Employment Category — Bar">
          <BarChart data={employmentData} />
        </AnalyticsCard>

        <AnalyticsCard title="Income Quintile — Share">
          <ChartAndLegend segments={incomeShare} />
        </AnalyticsCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Foreign Employment — By Destination Country">
          <BarChart
            horizontal
            data={[
              { label: "Australia", value: 44 },
              { label: "Saudi Arabia", value: 40 },
              { label: "UAE", value: 31 },
              { label: "Qatar", value: 27 },
              { label: "Japan", value: 18 },
              { label: "Other", value: 12 },
            ]}
          />
        </AnalyticsCard>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
          <p className="text-sm font-bold text-orange-600">
            Employment Insight
          </p>
          <p className="mt-3 text-xs leading-6 text-gray-600 sm:text-sm">
            Foreign employment is one of the major employment groups in the
            province. Australia, Saudi Arabia and UAE are the leading
            destination groups in this mock dataset.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <AnalyticsCard title="Foreign Employment Summary">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-xs">
              <thead className="bg-gray-50 text-gray-400">
                <tr>
                  <th className="px-3 py-3">Destination</th>
                  <th className="px-3 py-3">Citizens</th>
                  <th className="px-3 py-3">Share</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Australia", "44", "25.6%", "Active"],
                  ["Saudi Arabia", "40", "23.3%", "Active"],
                  ["UAE", "31", "18.0%", "Active"],
                  ["Qatar", "27", "15.7%", "Active"],
                  ["Japan", "18", "10.5%", "Active"],
                  ["Other", "12", "7.0%", "Other"],
                ].map(([country, count, share, status]) => (
                  <tr
                    key={country}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-3 font-medium text-gray-600">
                      {country}
                    </td>
                    <td className="px-3 py-3 text-gray-600">{count}</td>
                    <td className="px-3 py-3 text-gray-600">{share}</td>
                    <td className="px-3 py-3 text-green-600">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnalyticsCard>
      </div>
    </>
  );
}

function HouseholdSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Household Size">
          <BarChart
            horizontal
            data={[
              { label: "1–2 members", value: 20 },
              { label: "3–4 members", value: 38 },
              { label: "5–6 members", value: 29 },
              { label: "7+ members", value: 13 },
            ]}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Poverty Distribution">
          <ChartAndLegend
            segments={[
              { label: "Below poverty", percentage: 32, color: "#ef234c" },
              { label: "Near poverty", percentage: 18, color: "#f59e0b" },
              { label: "Above poverty", percentage: 50, color: "#123b78" },
            ]}
          />
        </AnalyticsCard>
      </div>

      <div className="mt-4">
        <AnalyticsCard title="Poverty Class by Municipality">
          <BarChart
            horizontal
            data={[
              { label: "Below poverty", value: 32 },
              { label: "Near poverty", value: 18 },
              { label: "Above poverty", value: 50 },
            ]}
          />
        </AnalyticsCard>
      </div>

      <InfoNotice>
        Household and poverty values are aggregate province-level mock
        analytics. No individual household records are displayed.
      </InfoNotice>
    </>
  );
}

function EducationSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Education Level — Bar">
          <BarChart horizontal data={educationData} />
        </AnalyticsCard>

        <AnalyticsCard title="Education Level — Share">
          <ChartAndLegend segments={educationShare} />
        </AnalyticsCard>
      </div>

      <div className="mt-4">
        <AnalyticsCard title="Enrollment & Dropout Rate — Live Trend">
          <RegistrationTrend />
        </AnalyticsCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Dropout Reasons">
          <BarChart
            horizontal
            data={[
              { label: "Economic", value: 460 },
              { label: "Migration", value: 390 },
              { label: "Family", value: 350 },
              { label: "Distance", value: 290 },
              { label: "Other", value: 210 },
            ]}
          />
        </AnalyticsCard>

        <div className="grid grid-cols-2 gap-3">
          <KpiCard label="Total Students" value="5,910" />
          <KpiCard
            label="Total Graduates"
            value="45,347"
            accent="border-green-500"
          />
          <KpiCard
            label="Government Schools"
            value="95"
            accent="border-purple-500"
          />
          <KpiCard
            label="Private Schools"
            value="29"
            accent="border-orange-500"
          />
          <KpiCard label="Community Schools" value="4" />
          <KpiCard label="Total Schools" value="127" accent="border-pink-500" />
        </div>
      </div>
    </>
  );
}

function HealthSection() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <KpiCard label="Government Hospitals" value="5" />
        <KpiCard label="Private Hospitals" value="3" />
        <KpiCard label="Health Posts" value="54" />
        <KpiCard label="Total Hospital Beds" value="271" />
        <KpiCard label="Government Beds" value="160" />
        <KpiCard label="Private Beds" value="111" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Hospitals — Government vs Private">
          <ChartAndLegend
            segments={[
              { label: "Government", percentage: 72, color: "#123b78" },
              { label: "Private", percentage: 28, color: "#f59e0b" },
            ]}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Health Workforce">
          <BarChart horizontal data={healthData} />
        </AnalyticsCard>
      </div>

      <InfoNotice>
        Health profile — Phase 2 dataset. Some health-related records are
        currently aggregated at province level.
      </InfoNotice>
    </>
  );
}

function DisabilitySection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Disability Type — Bar">
          <BarChart horizontal data={disabilityData} />
        </AnalyticsCard>

        <AnalyticsCard title="Disability Type — Share">
          <ChartAndLegend segments={disabilityShare} />
        </AnalyticsCard>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <KpiCard label="Registered Profiles" value="3,182" />
        <KpiCard
          label="Verified Profiles"
          value="1,896"
          accent="border-orange-500"
        />
      </div>

      <InfoNotice>
        Disability data is shown only as province-level aggregates. No citizen
        names or personal disability records are displayed.
      </InfoNotice>
    </>
  );
}

function DigitalAccessSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Digital Literacy">
          <BarChart horizontal data={digitalData} />
        </AnalyticsCard>

        <AnalyticsCard title="Smartphone Ownership">
          <ChartAndLegend
            segments={[
              { label: "Has smartphone", percentage: 62, color: "#65a982" },
              { label: "No smartphone", percentage: 38, color: "#e43c59" },
            ]}
          />
        </AnalyticsCard>
      </div>

      <InfoNotice>
        Digital access records are available only for completed digital-literacy
        profiles.
      </InfoNotice>
    </>
  );
}

function ConsentSection() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Consent Recorded" value="100%" />
        <KpiCard label="NID Verified" value="94.8%" accent="border-green-500" />
        <KpiCard label="Sync Pending" value="4.8%" accent="border-orange-500" />
        <KpiCard label="Sync Conflicts" value="22" accent="border-pink-500" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="Consent Channel — Share">
          <ChartAndLegend
            segments={[
              { label: "National ID", percentage: 57, color: "#123b78" },
              { label: "Card", percentage: 35, color: "#ef234c" },
              { label: "Portal", percentage: 5, color: "#22c55e" },
              { label: "Verbal", percentage: 3, color: "#8b5cf6" },
            ]}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Consent Channel — Bar">
          <BarChart
            horizontal
            data={[
              { label: "National ID", value: 94 },
              { label: "Card", value: 62 },
              { label: "Portal", value: 21 },
              { label: "Verbal", value: 8 },
            ]}
          />
        </AnalyticsCard>
      </div>

      <InfoNotice>
        Consent and compliance metrics are calculated from synchronized
        province-level records.
      </InfoNotice>
    </>
  );
}

function IdCardSection() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsCard title="ID Cards by Type">
          <ChartAndLegend
            segments={[
              { label: "Type 1", percentage: 48, color: "#123b78" },
              { label: "Type 2", percentage: 30, color: "#ef234c" },
              { label: "Type 3", percentage: 12, color: "#22c55e" },
              { label: "Type 4", percentage: 10, color: "#f59e0b" },
            ]}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Grievance Status">
          <BarChart
            horizontal
            data={[
              { label: "Open", value: 210 },
              { label: "Pending", value: 220 },
              { label: "Resolved", value: 175 },
              { label: "Closed", value: 90 },
            ]}
          />
        </AnalyticsCard>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Total Grievances" value="695" />
        <KpiCard label="Resolved" value="175" accent="border-green-500" />
        <KpiCard label="Pending" value="220" accent="border-orange-500" />
        <KpiCard label="SLA Breach" value="22" accent="border-pink-500" />
      </div>

      <InfoNotice>
        ID card and grievance statistics are province-level aggregates. No
        individual grievance details are exposed at this tier.
      </InfoNotice>
    </>
  );
}

export default function ProvinceAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Demographics");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 print:bg-white">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="text-gray-400">Province Portal</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-red-500">Analytics</span>
            </div>

            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Province Admin
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              Koshi Province Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
              Complete demographic, economic and social analytics for the
              selected province. All information shown at this tier is aggregate
              and read-only.
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto print:hidden">
            <button
              type="button"
              onClick={handleExport}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:flex-none sm:px-4 sm:text-sm"
            >
              <DownloadIcon />
              Export Report
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#092e68] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#062553] focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-4 sm:text-sm"
            >
              <RefreshIcon />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Registered" value="48,236" />
          <KpiCard
            label="NID Verified"
            value="94.8%"
            accent="border-green-500"
          />
          <KpiCard
            label="Active Grievances"
            value="287"
            accent="border-pink-500"
          />
          <KpiCard
            label="ID Cards Issued"
            value="4,836"
            accent="border-orange-500"
          />
        </section>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end print:hidden">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[10px] text-gray-500 sm:text-xs"
          >
            <CalendarIcon />
            Dashboard Range: Aug 2025 – Aug 2026
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#092e68] px-4 py-2 text-[10px] font-semibold text-white sm:text-xs"
          >
            <DownloadIcon />
            Download Report
          </button>
        </div>

        <div className="mt-4 overflow-x-auto border-b border-gray-200 print:hidden">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[10px] font-medium transition sm:px-3 sm:py-3 sm:text-sm ${
                    active
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <section className="mt-4">
          {activeTab === "Demographics" && <DemographicsSection />}
          {activeTab === "Employment" && <EmploymentSection />}
          {activeTab === "Household & Poverty" && <HouseholdSection />}
          {activeTab === "Education" && <EducationSection />}
          {activeTab === "Health" && <HealthSection />}
          {activeTab === "Disability" && <DisabilitySection />}
          {activeTab === "Digital Access" && <DigitalAccessSection />}
          {activeTab === "Consent & Compliance" && <ConsentSection />}
          {activeTab === "ID Cards & Grievances" && <IdCardSection />}
        </section>

        <footer className="mt-8 border-t border-gray-200 pt-4 text-center text-[10px] text-gray-400 sm:text-xs">
          Digital Nepal E-Governance System
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          aside,
          nav,
          header,
          footer {
            display: none !important;
          }

          body {
            background: white !important;
          }
        }
      `}</style>
    </main>
  );
}
