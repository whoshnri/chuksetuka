"use client";

import { jsPDF } from "jspdf";
import { DownloadSimple } from "./phosphor-icons";
import { privacyPolicySections, privacyPolicyUpdated } from "@/lib/privacy-content";
import { paperAssets } from "./site-ui";

export function PrivacyPolicyDownload() {
  async function loadLogo() {
    const sources = [
      paperAssets.logo,
      `/_next/image?url=${encodeURIComponent(paperAssets.logo)}&w=384&q=90`,
    ];

    for (const source of sources) {
      try {
        const image = new window.Image();
        image.crossOrigin = "anonymous";
        image.src = source;
        await Promise.race([
          new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error("Logo unavailable"));
          }),
          new Promise<never>((_, reject) =>
            window.setTimeout(() => reject(new Error("Logo load timed out")), 4000),
          ),
        ]);

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context || !image.naturalWidth || !image.naturalHeight) continue;
        context.drawImage(image, 0, 0);
        return {
          data: canvas.toDataURL("image/png"),
          aspectRatio: image.naturalWidth / image.naturalHeight,
        };
      } catch {
        // Try the same asset through Next's same-origin image proxy below.
      }
    }

    return null;
  }

  async function download() {
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const left = 20;
    const width = 170;
    let y = 22;

    const logo = await loadLogo();
    if (!logo) {
      window.alert("The Chuks Etuka Consulting logo could not be loaded, so the PDF was not created. Please try again when the logo is available.");
      return;
    }

    const addPageIfNeeded = (height: number) => {
      if (y + height > 278) {
        pdf.addPage();
        y = 22;
      }
    };

    let logoWidth = 42;
    let logoHeight = logoWidth / logo.aspectRatio;
    if (logoHeight > 18) {
      logoHeight = 18;
      logoWidth = logoHeight * logo.aspectRatio;
    }
    pdf.addImage(logo.data, "PNG", left, y - 4, logoWidth, logoHeight);
    y += logoHeight + 6;
    pdf.setTextColor(22, 63, 66);
    pdf.setFontSize(24);
    pdf.text("Privacy policy", left, y);
    y += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(90, 100, 99);
    pdf.setFontSize(10);
    pdf.text(`Last updated ${privacyPolicyUpdated}`, left, y);
    y += 12;

    for (const section of privacyPolicySections) {
      addPageIfNeeded(18);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.setTextColor(22, 63, 66);
      pdf.text(section.title, left, y);
      y += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(45, 51, 51);
      for (const paragraph of section.paragraphs) {
        const lines = pdf.splitTextToSize(paragraph, width) as string[];
        const height = lines.length * 5;
        addPageIfNeeded(height + 5);
        pdf.text(lines, left, y);
        y += height + 5;
      }
      y += 2;
    }

    const pageCount = pdf.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
      pdf.setPage(page);
      pdf.setFontSize(8);
      pdf.setTextColor(125, 132, 131);
      pdf.text("info@chuksetukaconsulting.com", left, 287);
      pdf.text(`${page} / ${pageCount}`, 190, 287, { align: "right" });
    }
    pdf.save("chuks-etuka-consulting-privacy-policy.pdf");
  }

  return (
    <button type="button" onClick={download} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#163f42] px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#23595c]">
      Download privacy policy <DownloadSimple size={18} aria-hidden="true" />
    </button>
  );
}
