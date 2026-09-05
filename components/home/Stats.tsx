"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { supabase } from "@/lib/supabase-client";

export default function Stats() {
  const [graduates, setGraduates] = useState(0);
  const [institutions, setInstitutions] = useState(0);
  const [opportunities, setOpportunities] = useState(0);
  const [applications, setApplications] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: graduatesCount } = await supabase
      .from("graduates")
      .select("*", { count: "exact", head: true });

    const { count: institutionsCount } = await supabase
      .from("institutions")
      .select("*", { count: "exact", head: true });

    const { count: opportunitiesCount } = await supabase
      .from("opportunities")
      .select("*", { count: "exact", head: true });

    const { count: applicationsCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true });

    setGraduates(graduatesCount || 0);
    setInstitutions(institutionsCount || 0);
    setOpportunities(opportunitiesCount || 0);
    setApplications(applicationsCount || 0);
  }

  const stats = [
    {
      icon: GraduationCap,
      title: "الخريجون",
      value: graduates,
    },
    {
      icon: Building2,
      title: "المؤسسات",
      value: institutions,
    },
    {
      icon: BriefcaseBusiness,
      title: "الفرص",
      value: opportunities,
    },
    {
      icon: FileText,
      title: "طلبات التقديم",
      value: applications,
    },
  ];

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="إحصائيات المنصة"
          subtitle="أرقام يتم تحديثها تلقائياً من قاعدة البيانات."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="text-center"
              >
                <Icon
                  size={42}
                  className="mx-auto text-blue-700"
                />

                <h3 className="mt-5 text-4xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-600">
                  {item.title}
                </p>

              </Card>
            );
          })}

        </div>

      </div>

    </section>
  );
}
