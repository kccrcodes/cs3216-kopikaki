import { adminAuth as auth, adminDb as db } from "../src/lib/firebase-admin";

async function ensureDemoUser(uid: string, loginName: string, displayName: string) {
  const email = `${loginName}@users.kopikaki.invalid`;
  try {
    await auth.createUser({ uid, email, password: "kopikaki-demo", displayName });
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("already exists")) throw error;
    await auth.updateUser(uid, { email, password: "kopikaki-demo", displayName });
  }
}

async function seed() {
  await ensureDemoUser("test-user", "david", "David Tan");
  await ensureDemoUser("test-kaki", "susan", "Auntie Susan");

  await Promise.all([
    db.collection("users").doc("test-user").set({ name: "David Tan", preferredName: "Uncle David", neighborhood: "Bishan", languages: ["English", "Mandarin", "Hokkien"] }),
    db.collection("users").doc("test-kaki").set({ name: "Auntie Susan", preferredName: "Auntie Susan", neighborhood: "Bishan", languages: ["English", "Mandarin"] }),
    db.collection("users").doc("test-user").collection("kakis").doc("test-kaki").set({ kind: "person", name: "Auntie Susan", activities: ["pickleball", "walk"], times: ["morning", "afternoon"], neighborhood: "Bishan", languages: ["English", "Mandarin"], venue: "Bishan Sports Hall", hasAccount: true }),
    db.collection("users").doc("test-kaki").collection("kakis").doc("test-user").set({ kind: "person", name: "Uncle David", activities: ["kopi", "walk"], times: ["morning", "afternoon"], neighborhood: "Bishan", languages: ["English", "Mandarin", "Hokkien"], venue: "Bishan Community Club", hasAccount: true }),
    db.collection("kakis").doc("heng").set({ kind: "person", name: "Uncle Heng", activities: ["pickleball", "kopi", "chess"], times: ["morning"], neighborhood: "Bishan", languages: ["English", "Mandarin"], venue: "Bishan Sports Hall" }),
    db.collection("kakis").doc("susan").set({ kind: "person", name: "Auntie Susan", activities: ["pickleball", "walk"], times: ["morning", "afternoon"], neighborhood: "Bishan", languages: ["English", "Mandarin"], venue: "Bishan Sports Hall" }),
    db.collection("kakis").doc("raymond").set({ kind: "person", name: "Uncle Raymond", activities: ["chess", "kopi"], times: ["afternoon"], neighborhood: "Toa Payoh", languages: ["English", "Hokkien"], venue: "Toa Payoh Central" }),
    db.collection("groups").doc("bishan-active-kakis").set({ kind: "group", name: "Bishan Active Kakis", members: ["Uncle Heng", "Auntie Susan"], activities: ["walk", "pickleball"], times: ["morning"], neighborhood: "Bishan", languages: ["English", "Mandarin"], venue: "Bishan Community Club" }),
    db.collection("activities").doc("kim-keat-kopi").set({ kind: "activity", name: "Kim Keat Kopi Chat", members: ["Community host"], activities: ["kopi"], times: ["morning"], neighborhood: "Kim Keat", languages: ["English", "Mandarin", "Hokkien"], venue: "Kim Keat Café" }),
  ]);
  console.log("Seeded demo accounts:");
  console.log("  david / kopikaki-demo (Uncle David)");
  console.log("  susan / kopikaki-demo (Auntie Susan)");
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
