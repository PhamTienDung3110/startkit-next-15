/**
 * Dashboard Page
 *
 * @description Trang dashboard chính với overview, charts, và data table
 * - NON-SEO page (không cần index Google)
 * - Load data từ data.json (static import)
 * - Có thể dùng Zustand store cho filters/view states
 *
 * Components:
 * - SectionCards: Stats cards (revenue, users, etc.)
 * - ChartAreaInteractive: Interactive area chart
 * - DataTable: TanStack table với sorting, filtering
 *
 * Layout: Sidebar + Header được inherit từ root layout
 */

import { ChartAreaInteractive } from "@/views/dashboard/chart-area-interactive";
import { DataTable } from "@/views/dashboard/data-table";
import { SectionCards } from "@/views/dashboard/section-cards";

import data from "./data.json";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Container với @container query support */}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Stats Cards - KPIs overview */}
          <SectionCards />

          {/* Interactive Chart - với padding horizontal */}
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          {/* Data Table - với pagination, sorting, filtering */}
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
