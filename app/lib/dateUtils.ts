/**
 * Utility functions for dynamic date, year, quarter, and duration calculations.
 * Ensures the VRHC-JRMS automatically adapts to the current year, quarter, and time.
 */

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentQuarter(): string {
  const date = new Date();
  const month = date.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return `Q${quarter} ${date.getFullYear()}`;
}

export function getFormattedToday(): string {
  return new Date().toLocaleDateString("en-GH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Accra",
  });
}

/**
 * Calculates the exact duration/age a case has been pending since its filing date.
 */
export function calculateTimePending(filingDateStr: string): string {
  if (!filingDateStr) return "Recent";
  
  // Support both YYYY-MM-DD and DD/MM/YYYY
  let filingDate: Date;
  if (filingDateStr.includes("/")) {
    const parts = filingDateStr.split("/");
    if (parts.length === 3) {
      filingDate = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    } else {
      filingDate = new Date(filingDateStr);
    }
  } else {
    filingDate = new Date(filingDateStr);
  }

  if (isNaN(filingDate.getTime())) return "Active";

  const now = new Date();
  const diffMs = now.getTime() - filingDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Fresh Filing";
  if (diffDays < 30) return `${diffDays} days pending`;
  
  const diffMonths = Math.floor(diffDays / 30.4375);
  if (diffMonths < 12) return `${diffMonths} mos pending`;

  const diffYears = Math.floor(diffDays / 365.25);
  const remainingMonths = Math.floor((diffDays % 365.25) / 30.4375);

  if (remainingMonths > 0) {
    return `${diffYears} yrs ${remainingMonths} mos pending`;
  }
  return `${diffYears} yrs pending`;
}

/**
 * Formats relative target dates for sittings or rulings.
 */
export function getRelativeFutureDate(daysInFuture: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysInFuture);
  return d.toISOString().split("T")[0];
}

export function getDynamicCaseNumber(seqNumber: number, filingYear?: number): string {
  const yr = filingYear || getCurrentYear();
  const seq = String(seqNumber).padStart(4, "0");
  return `VRHC-JC-${yr}-${seq}`;
}
