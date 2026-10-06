"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
};

export function JobList({ jobs, isId }: { jobs: Job[], isId: boolean }) {
  const [deptFilter, setDeptFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const departments = ["All", ...Array.from(new Set(jobs.map(j => j.department)))];
  const locations = ["All", ...Array.from(new Set(jobs.map(j => j.location)))];

  const filteredJobs = jobs.filter(job => {
    if (deptFilter !== "All" && job.department !== deptFilter) return false;
    if (locFilter !== "All" && job.location !== locFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeptFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold mb-2">{isId ? "Posisi Terbuka" : "Open Positions"}</h2>
          <p className="text-muted-foreground">{isId ? "Temukan peran terbaik Anda di NOVERA." : "Find your best role at NOVERA."}</p>
        </div>
        
        {jobs.length > 0 && (
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select 
              value={deptFilter}
              onChange={handleDeptChange}
              className="bg-background border border-border/50 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === "All" ? (isId ? "Semua Departemen" : "All Departments") : dept}</option>
              ))}
            </select>
            <select 
              value={locFilter}
              onChange={handleLocChange}
              className="bg-background border border-border/50 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc === "All" ? (isId ? "Semua Lokasi" : "All Locations") : loc}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {filteredJobs.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {currentJobs.map((job) => (
              <Link href={`/careers/${job.slug}`} key={job.slug} className="group p-6 bg-background border border-border/50 hover:border-primary/50 rounded-2xl transition-all hover:shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                  {isId ? "Lihat Detail" : "View Details"} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center mt-10 gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium border border-border/50 rounded-lg hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isId ? "Sebelumnya" : "Previous"}
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.max(1, totalPages) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                    currentPage === i + 1 
                      ? "bg-primary text-primary-foreground border-transparent" 
                      : "border border-border/50 hover:bg-muted/50 text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(Math.max(1, totalPages), p + 1))}
              disabled={currentPage === Math.max(1, totalPages)}
              className="px-4 py-2 text-sm font-medium border border-border/50 rounded-lg hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isId ? "Selanjutnya" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="p-12 bg-background border border-dashed border-border/60 rounded-2xl text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
            <Briefcase className="w-6 h-6" />
          </div>
          <h5 className="font-heading text-xl font-bold mb-2">
            {isId ? "Tidak Ada Posisi Yang Sesuai" : "No Matching Positions"}
          </h5>
          <p className="text-muted-foreground max-w-md">
            {isId 
              ? "Tidak ada peran yang sesuai dengan filter yang Anda pilih. Silakan sesuaikan kriteria pencarian." 
              : "There are no roles matching your selected filters. Please adjust your search criteria."}
          </p>
        </div>
      )}
    </>
  );
}
