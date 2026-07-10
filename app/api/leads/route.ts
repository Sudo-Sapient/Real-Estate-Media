import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  listingUrl?: unknown;
  propertyType?: unknown;
  engagement?: unknown;
  timeline?: unknown;
  phone?: unknown;
  goal?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  if (clean(payload.website, 100)) {
    return Response.json({ ok: true });
  }

  const lead = {
    name: clean(payload.name, 120),
    email: clean(payload.email, 180).toLowerCase(),
    company: clean(payload.company, 180),
    role: clean(payload.role, 120),
    listingUrl: clean(payload.listingUrl, 600),
    propertyType: clean(payload.propertyType, 100),
    engagement: clean(payload.engagement, 120),
    timeline: clean(payload.timeline, 120),
    phone: clean(payload.phone, 80),
    goal: clean(payload.goal, 1200),
    submittedAt: new Date().toISOString(),
    userAgent: clean(request.headers.get("user-agent"), 300),
  };

  if (lead.name.length < 2) {
    return Response.json({ message: "Please enter your name." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (lead.company.length < 2) {
    return Response.json({ message: "Please enter your company name." }, { status: 400 });
  }

  try {
    const url = new URL(lead.listingUrl);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
  } catch {
    return Response.json({ message: "Please enter a valid property listing URL." }, { status: 400 });
  }

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    await mkdir(dataDirectory, { recursive: true });
    await appendFile(path.join(dataDirectory, "leads.ndjson"), `${JSON.stringify(lead)}\n`, "utf8");
  } catch (error) {
    console.error("Unable to persist lead", error);
    return Response.json({ message: "We couldn’t save your request. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true, message: "Request received." }, { status: 201 });
}
