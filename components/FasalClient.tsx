'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Camera,
  Upload,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Phone,
  RefreshCw,
  Volume2,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  TrendingDown,
  Info,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────
interface TreatmentData {
  immediate: string[];
  immediateHindi: string[];
  chemical: string[];
  chemicalHindi: string[];
  organic: string[];
  organicHindi: string[];
}

interface AnalysisResult {
  cropName: string;
  cropNameHindi: string;
  diseaseName: string;
  diseaseNameHindi: string;
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidenceScore: number;
  isHealthy: boolean;
  symptoms: string[];
  symptomsHindi: string[];
  causes: string;
  causesHindi: string;
  treatment: TreatmentData;
  prevention: string[];
  preventionHindi: string[];
  estimatedYieldLoss: string;
  urgency: string;
  urgencyHindi: string;
  nearbyHelp: string;
  kccHelpline: string;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────
function getSeverityColor(level: string) {
  switch (level) {
    case 'LOW': return 'bg-green-100 text-green-800 border-green-300';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getSeverityIcon(level: string) {
  switch (level) {
    case 'LOW': return '🟢';
    case 'MEDIUM': return '🟡';
    case 'HIGH': return '🟠';
    case 'CRITICAL': return '🔴';
    default: return '⚪';
  }
}

function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function FasalClient() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'english' | 'hindi'>('hindi');
  const [expandedSection, setExpandedSection] = useState<string | null>('symptoms');
  const [mimeType, setMimeType] = useState('image/jpeg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Image Handler ──────────────────────────────────────────────────────
  const handleImageSelect = useCallback((file: File) => {
    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result.split(',')[1]);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleImageSelect(file);
  };

  // ─── AI Analysis ────────────────────────────────────────────────────────
  const analyzeImage = async () => {
    if (!imageBase64) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।');
        return;
      }

      setResult(data.result);
      setExpandedSection('symptoms');
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    setImageBase64(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800">
      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-green-950/95 backdrop-blur-sm border-b border-green-700">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">Fasal AI</div>
              <div className="text-green-400 text-xs">फसल रोग पहचानकर्ता</div>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1800-180-1551</span>
          </a>
        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      {!result && (
        <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-700/50 text-green-300 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Powered by Google Gemini AI • निःशुल्क</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              फसल बीमारी<br />
              <span className="text-green-400">पहचानें तुरंत</span>
            </h1>
            <p className="text-green-200 text-sm">
              अपनी फसल की फोटो लें और पाएं<br />
              तुरंत उपचार सलाह — हिंदी में, मुफ़्त
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { value: '50+', label: 'रोग पहचान', icon: '🦠' },
              { value: '30s', label: 'में परिणाम', icon: '⚡' },
              { value: '100%', label: 'निःशुल्क', icon: '🆓' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-white font-black text-lg">{s.value}</div>
                <div className="text-green-300 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ─── UPLOAD ZONE ──────────────────────────────────────────── */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative"
          >
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-green-400 rounded-3xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-16 h-16 bg-green-500/30 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-bold text-lg">📸 फोटो लें</p>
                <p className="text-green-300 text-sm mt-1">या यहाँ फ़ाइल छोड़ें</p>
                <p className="text-green-400 text-xs mt-2">JPG, PNG, WEBP – मुफ़्त</p>
              </label>
            ) : (
              <div className="relative rounded-3xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Uploaded crop"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                  <button
                    onClick={resetAll}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-bold py-3 rounded-2xl hover:bg-white/30 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    नई फोटो
                  </button>
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-white text-sm font-bold py-3 rounded-2xl transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        विश्लेषण...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        AI से जाँचें
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-900/50 border border-red-500 rounded-2xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* ─── FEATURE CARDS ──────────────────────────────────────── */}
          <div className="mt-8 space-y-3">
            <p className="text-green-300 text-xs font-semibold uppercase tracking-wider">Fasal AI कैसे काम करता है?</p>
            {[
              { icon: '📸', title: 'फोटो लें', desc: 'रोगग्रस्त फसल की स्पष्ट फोटो लें' },
              { icon: '🤖', title: 'AI विश्लेषण', desc: 'Google Gemini AI रोग की पहचान करता है' },
              { icon: '💊', title: 'उपचार पाएं', desc: 'हिंदी में तुरंत उपचार सलाह मिलती है' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <p className="text-white font-bold text-sm">{f.title}</p>
                  <p className="text-green-300 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── ANALYSIS LOADING STATE ──────────────────────────────────────── */}
      {isAnalyzing && (
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="bg-white/10 rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Leaf className="w-10 h-10 text-green-400 animate-bounce" />
            </div>
            <p className="text-white font-bold text-xl mb-2">AI विश्लेषण हो रहा है...</p>
            <p className="text-green-300 text-sm">Google Gemini AI आपकी फसल की जाँच कर रहा है</p>
            <div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── RESULTS ─────────────────────────────────────────────────────── */}
      {result && !isAnalyzing && (
        <div className="max-w-lg mx-auto px-4 pt-4 pb-10">
          {/* Language Toggle */}
          <div className="flex bg-white/10 rounded-2xl p-1 mb-4">
            {(['hindi', 'english'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === lang
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-green-300 hover:text-white'
                }`}
              >
                {lang === 'hindi' ? '🇮🇳 हिंदी' : '🔤 English'}
              </button>
            ))}
          </div>

          {/* Result Header Card */}
          <div className={`rounded-3xl p-5 mb-4 border-2 ${result.isHealthy ? 'bg-green-900/50 border-green-500' : 'bg-red-950/50 border-red-600'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-1">
                  {activeTab === 'hindi' ? 'फसल' : 'Crop'}
                </p>
                <p className="text-white font-black text-xl">
                  {activeTab === 'hindi' ? result.cropNameHindi : result.cropName}
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-full border text-xs font-bold ${getSeverityColor(result.severityLevel)}`}>
                {getSeverityIcon(result.severityLevel)} {result.severityLevel}
              </div>
            </div>

            <div className={`rounded-2xl p-3 mb-3 ${result.isHealthy ? 'bg-green-800/50' : 'bg-red-900/50'}`}>
              {result.isHealthy ? (
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-bold text-sm">
                    {activeTab === 'hindi' ? '✅ फसल स्वस्थ है!' : '✅ Crop is Healthy!'}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-red-300 text-xs font-semibold mb-1">
                    {activeTab === 'hindi' ? 'रोग पाया गया:' : 'Disease Detected:'}
                  </p>
                  <p className="text-white font-black text-lg">
                    {activeTab === 'hindi' ? result.diseaseNameHindi : result.diseaseName}
                  </p>
                </>
              )}
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="flex justify-between text-xs text-green-300 mb-1">
                <span>{activeTab === 'hindi' ? 'AI विश्वास स्तर' : 'AI Confidence'}</span>
                <span className="font-bold text-green-400">{result.confidenceScore}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full transition-all"
                  style={{ width: `${result.confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Voice Button */}
            <button
              onClick={() =>
                speakText(
                  activeTab === 'hindi'
                    ? `${result.cropNameHindi} में ${result.diseaseNameHindi} पाई गई है। ${result.urgencyHindi}`
                    : `${result.cropName} has ${result.diseaseName}. ${result.urgency}`
                )
              }
              className="mt-3 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-green-300 text-sm font-bold py-2.5 rounded-2xl transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              {activeTab === 'hindi' ? '🔊 सुनें (Hindi)' : '🔊 Listen'}
            </button>
          </div>

          {/* Yield Loss Warning */}
          {!result.isHealthy && (
            <div className="bg-orange-900/40 border border-orange-600 rounded-2xl p-4 mb-4 flex gap-3">
              <TrendingDown className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-300 text-xs font-semibold">
                  {activeTab === 'hindi' ? '⚠️ उपज हानि अनुमान' : '⚠️ Estimated Yield Loss'}
                </p>
                <p className="text-orange-100 text-sm font-bold">{result.estimatedYieldLoss}</p>
                <p className="text-orange-300 text-xs mt-1">
                  {activeTab === 'hindi' ? result.urgencyHindi : result.urgency}
                </p>
              </div>
            </div>
          )}

          {/* ─── Accordion Sections ─────────────────────────────────── */}
          {/* Symptoms */}
          <AccordionCard
            id="symptoms"
            isOpen={expandedSection === 'symptoms'}
            onToggle={toggleSection}
            icon="🔍"
            title={activeTab === 'hindi' ? 'लक्षण' : 'Symptoms'}
          >
            <ul className="space-y-2">
              {(activeTab === 'hindi' ? result.symptomsHindi : result.symptoms).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                  <span className="text-green-400 mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </AccordionCard>

          {/* Causes */}
          <AccordionCard
            id="causes"
            isOpen={expandedSection === 'causes'}
            onToggle={toggleSection}
            icon="🧬"
            title={activeTab === 'hindi' ? 'कारण' : 'Causes'}
          >
            <p className="text-sm text-gray-200">{activeTab === 'hindi' ? result.causesHindi : result.causes}</p>
          </AccordionCard>

          {/* Treatment */}
          <AccordionCard
            id="treatment"
            isOpen={expandedSection === 'treatment'}
            onToggle={toggleSection}
            icon="💊"
            title={activeTab === 'hindi' ? 'उपचार विधि' : 'Treatment'}
          >
            <div className="space-y-4">
              {/* Immediate */}
              <div>
                <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">
                  ⚡ {activeTab === 'hindi' ? 'तुरंत करें' : 'Do Immediately'}
                </p>
                <ul className="space-y-1.5">
                  {(activeTab === 'hindi' ? result.treatment.immediateHindi : result.treatment.immediate).map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="text-yellow-400 font-bold shrink-0">{i + 1}.</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical */}
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                  🧪 {activeTab === 'hindi' ? 'रासायनिक उपचार' : 'Chemical Treatment'}
                </p>
                <ul className="space-y-1.5">
                  {(activeTab === 'hindi' ? result.treatment.chemicalHindi : result.treatment.chemical).map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="text-blue-400 shrink-0">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organic */}
              <div>
                <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">
                  🌿 {activeTab === 'hindi' ? 'जैविक उपाय (देशी)' : 'Organic / Home Remedy'}
                </p>
                <ul className="space-y-1.5">
                  {(activeTab === 'hindi' ? result.treatment.organicHindi : result.treatment.organic).map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="text-green-400 shrink-0">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionCard>

          {/* Prevention */}
          <AccordionCard
            id="prevention"
            isOpen={expandedSection === 'prevention'}
            onToggle={toggleSection}
            icon="🛡️"
            title={activeTab === 'hindi' ? 'भविष्य में रोकथाम' : 'Prevention'}
          >
            <ul className="space-y-2">
              {(activeTab === 'hindi' ? result.preventionHindi : result.prevention).map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                  <Shield className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </AccordionCard>

          {/* Help Section */}
          <div className="bg-white/10 rounded-3xl p-5 mb-4">
            <p className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Info className="w-3.5 h-3.5 inline mr-1" />
              {activeTab === 'hindi' ? 'मदद कहाँ पाएं?' : 'Get Expert Help'}
            </p>
            <p className="text-gray-200 text-sm mb-3">{result.nearbyHelp}</p>
            <a
              href="tel:18001801551"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors w-full"
            >
              <Phone className="w-4 h-4" />
              {result.kccHelpline}
            </a>
          </div>

          {/* Analyze Another Button */}
          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-colors"
          >
            <Camera className="w-5 h-5" />
            {activeTab === 'hindi' ? '📸 नई फसल जाँचें' : '📸 Scan Another Crop'}
          </button>
        </div>
      )}

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-green-700 py-6 mt-4">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="text-green-400 text-xs">
            🌾 Fasal AI — VBYLD 2027 Hack for Social Cause
          </p>
          <p className="text-green-500 text-xs mt-1">
            Rural Development & AI Technology • SDG 2 • SDG 1
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── Accordion Card Sub-Component ────────────────────────────────────────────
function AccordionCard({
  id, isOpen, onToggle, icon, title, children,
}: {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl mb-3 overflow-hidden border transition-all ${isOpen ? 'border-green-500 bg-white/10' : 'border-white/10 bg-white/5'}`}>
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-white font-bold text-sm">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-green-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-green-300" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}
