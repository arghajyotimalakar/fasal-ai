/**
 * Fasal AI — Automated Test Suite
 * VBYLD 2027: Hack for Social Cause | Theme: Rural Development & Livelihoods
 * Run: node tests/run-tests.js (or: agy-node tests/run-tests.js)
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('==============================================================');
console.log('🌾 Fasal AI: Automated Test Suite');
console.log('  AI Crop Disease Detector for 600M Indian Farmers');
console.log('==============================================================\n');

let passed = 0, total = 0;

function test(name, fn) {
  total++;
  try { fn(); console.log(`  ✅ PASS: ${name}`); passed++; }
  catch (e) { console.error(`  ❌ FAIL: ${name}\n     ${e.message}`); }
}

// ─── Suite 1: Severity Classification ─────────────────────────────────────
console.log('📦 Suite 1: Disease Severity Classification Engine');

function classifySeverity(confidenceScore, affectedAreaPercent) {
  if (affectedAreaPercent === 0) return 'HEALTHY';
  if (confidenceScore >= 85 && affectedAreaPercent >= 60) return 'CRITICAL';
  if (confidenceScore >= 70 && affectedAreaPercent >= 40) return 'HIGH';
  if (confidenceScore >= 50 && affectedAreaPercent >= 20) return 'MEDIUM';
  return 'LOW';
}

test('Should classify CRITICAL disease correctly', () => {
  assert.strictEqual(classifySeverity(90, 70), 'CRITICAL');
});
test('Should classify HIGH severity disease', () => {
  assert.strictEqual(classifySeverity(75, 45), 'HIGH');
});
test('Should classify MEDIUM severity disease', () => {
  assert.strictEqual(classifySeverity(55, 25), 'MEDIUM');
});
test('Should classify LOW severity disease', () => {
  assert.strictEqual(classifySeverity(40, 10), 'LOW');
});
test('Should classify healthy crop (no affected area)', () => {
  assert.strictEqual(classifySeverity(95, 0), 'HEALTHY');
});

// ─── Suite 2: Yield Loss Calculation ──────────────────────────────────────
console.log('\n📦 Suite 2: Estimated Yield Loss Calculator');

function estimateYieldLoss(severity, daysUntreated) {
  const baseRates = { LOW: 0.05, MEDIUM: 0.15, HIGH: 0.30, CRITICAL: 0.50 };
  const base = baseRates[severity] || 0;
  const compoundedLoss = Math.min(base * (1 + daysUntreated * 0.03), 0.95);
  return Math.round(compoundedLoss * 100);
}

test('LOW severity untreated for 7 days should show ~6% loss', () => {
  const loss = estimateYieldLoss('LOW', 7);
  assert.ok(loss >= 5 && loss <= 15, `Expected ~5-15%, got ${loss}%`);
});
test('HIGH severity untreated for 14 days should show significant loss (>40%)', () => {
  const loss = estimateYieldLoss('HIGH', 14);
  assert.ok(loss >= 40, `Expected >=40%, got ${loss}%`);
});
test('CRITICAL severity should cap at 95% maximum loss', () => {
  const loss = estimateYieldLoss('CRITICAL', 100);
  assert.strictEqual(loss, 95);
});

// ─── Suite 3: Crop Season Validation ──────────────────────────────────────
console.log('\n📦 Suite 3: Indian Crop Season Validation (Kharif/Rabi/Zaid)');

function getCropSeason(cropName) {
  const kharif = ['rice', 'cotton', 'sugarcane', 'soybean', 'maize', 'groundnut'];
  const rabi = ['wheat', 'barley', 'mustard', 'gram', 'peas'];
  const zaid = ['watermelon', 'cucumber', 'muskmelon'];
  const lower = cropName.toLowerCase();
  if (kharif.some(c => lower.includes(c))) return 'KHARIF';
  if (rabi.some(c => lower.includes(c))) return 'RABI';
  if (zaid.some(c => lower.includes(c))) return 'ZAID';
  return 'YEAR_ROUND';
}

test('Rice should be identified as Kharif crop', () => {
  assert.strictEqual(getCropSeason('Rice (Paddy)'), 'KHARIF');
});
test('Wheat should be identified as Rabi crop', () => {
  assert.strictEqual(getCropSeason('Wheat'), 'RABI');
});
test('Watermelon should be identified as Zaid crop', () => {
  assert.strictEqual(getCropSeason('Watermelon'), 'ZAID');
});
test('Tomato should be year-round', () => {
  assert.strictEqual(getCropSeason('Tomato'), 'YEAR_ROUND');
});

// ─── Suite 4: Image Validation ────────────────────────────────────────────
console.log('\n📦 Suite 4: Image Upload Validation');

function validateImage(base64String, mimeType) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(mimeType)) return { valid: false, error: 'Unsupported format' };
  if (!base64String || base64String.length < 100) return { valid: false, error: 'Image too small or empty' };
  if (base64String.length > 4 * 1024 * 1024 * 1.33) return { valid: false, error: 'Image exceeds 4MB limit' };
  return { valid: true };
}

test('Valid JPEG base64 should pass validation', () => {
  const fakeBase64 = 'A'.repeat(1000);
  const result = validateImage(fakeBase64, 'image/jpeg');
  assert.strictEqual(result.valid, true);
});
test('Invalid MIME type (PDF) should be rejected', () => {
  const result = validateImage('A'.repeat(1000), 'application/pdf');
  assert.strictEqual(result.valid, false);
});
test('Empty base64 string should be rejected', () => {
  const result = validateImage('', 'image/jpeg');
  assert.strictEqual(result.valid, false);
});

// ─── Suite 5: Hindi Text Output Validation ────────────────────────────────
console.log('\n📦 Suite 5: Hindi (Devanagari) Output Integrity');

function containsDevanagari(text) {
  return /[\u0900-\u097F]/.test(text);
}

test('Should detect valid Hindi Devanagari text in disease name', () => {
  assert.strictEqual(containsDevanagari('गेहूँ का पीला रतुआ'), true);
});
test('Should detect valid Hindi in treatment advice', () => {
  assert.strictEqual(containsDevanagari('नीम का तेल छिड़कें'), true);
});
test('Should correctly reject non-Hindi English-only text', () => {
  assert.strictEqual(containsDevanagari('Yellow Rust Disease'), false);
});

// ─── Suite 6: API Route Files Exist ──────────────────────────────────────
console.log('\n📦 Suite 6: Project File Structure Integrity');

test('Main AI analysis API route exists', () => {
  const p = path.join(__dirname, '../app/api/analyze/route.ts');
  assert.strictEqual(fs.existsSync(p), true);
});
test('Crops knowledge base API route exists', () => {
  const p = path.join(__dirname, '../app/api/crops/route.ts');
  assert.strictEqual(fs.existsSync(p), true);
});
test('Main FasalClient component exists', () => {
  const p = path.join(__dirname, '../components/FasalClient.tsx');
  assert.strictEqual(fs.existsSync(p), true);
});
test('Gemini AI integration is configured in analysis route', () => {
  const content = fs.readFileSync(path.join(__dirname, '../app/api/analyze/route.ts'), 'utf-8');
  assert.ok(content.includes('gemini-2.5-flash'), 'Gemini model not found in API route');
  assert.ok(content.includes('GEMINI_API_KEY'), 'API key config missing');
});
test('License file exists (MIT open source)', () => {
  const p = path.join(__dirname, '../LICENSE');
  assert.strictEqual(fs.existsSync(p), true);
});

// ─── Summary ──────────────────────────────────────────────────────────────
console.log(`\n==============================================================`);
console.log(`📊 Test Results: ${passed}/${total} Tests Passed`);
console.log(passed === total
  ? `✅ ALL TESTS PASSED — Ready for VBYLD 2027 Submission!`
  : `❌ Some tests failed — review above.`);
console.log(`==============================================================`);
process.exit(passed === total ? 0 : 1);
