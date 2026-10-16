import { NextResponse } from 'next/server';

// Crop disease knowledge base for Indian farmers
const CROP_DATABASE = [
  {
    id: 1,
    cropName: 'Wheat (गेहूँ)',
    season: 'Rabi (Oct–Mar)',
    commonDiseases: ['Yellow Rust', 'Brown Rust', 'Loose Smut', 'Powdery Mildew'],
    topStates: ['Punjab', 'Haryana', 'UP', 'MP', 'Rajasthan'],
    prevention: 'Use certified resistant seeds. Ensure proper drainage.',
  },
  {
    id: 2,
    cropName: 'Rice / Paddy (धान)',
    season: 'Kharif (Jun–Nov)',
    commonDiseases: ['Blast Disease', 'Brown Spot', 'Sheath Blight', 'Bacterial Blight'],
    topStates: ['West Bengal', 'UP', 'Andhra Pradesh', 'Punjab', 'Bihar'],
    prevention: 'Balanced NPK fertilization. Avoid excess nitrogen.',
  },
  {
    id: 3,
    cropName: 'Tomato (टमाटर)',
    season: 'Year-round',
    commonDiseases: ['Early Blight', 'Late Blight', 'Leaf Curl Virus', 'Fusarium Wilt'],
    topStates: ['AP', 'Karnataka', 'MP', 'Gujarat', 'Odisha'],
    prevention: 'Crop rotation every 2-3 years. Use resistant hybrids.',
  },
  {
    id: 4,
    cropName: 'Cotton (कपास)',
    season: 'Kharif (Apr–Oct)',
    commonDiseases: ['Bollworm Attack', 'Alternaria Blight', 'Grey Mildew', 'Root Rot'],
    topStates: ['Gujarat', 'Maharashtra', 'Telangana', 'AP', 'Rajasthan'],
    prevention: 'Timely sowing. Monitor for bollworm weekly.',
  },
  {
    id: 5,
    cropName: 'Sugarcane (गन्ना)',
    season: 'Year-round',
    commonDiseases: ['Red Rot', 'Smut', 'Ratoon Stunting', 'Whip Smut'],
    topStates: ['UP', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh'],
    prevention: 'Use disease-free seed cane. Hot water treatment of setts.',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    crops: CROP_DATABASE,
    totalCrops: CROP_DATABASE.length,
    helpline: '1800-180-1551',
    message: 'Fasal AI Crop Disease Knowledge Base',
  });
}
