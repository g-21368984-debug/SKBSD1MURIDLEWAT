
export interface LateRecord {
  id: string;
  studentName: string;
  studentClass: string;
  reason: string;
  arrivalTime: string;
  date: string;
  status: 'Lewat';
}

export interface ClassStats {
  className: string;
  count: number;
}

export interface ReasonStats {
  reason: string;
  count: number;
}

export enum SchoolClass {
  // Tahun 1
  C1_AKTIF = '1 Aktif',
  C1_AMANAH = '1 Amanah',
  C1_ARIF = '1 Arif',
  C1_ASPIRASI = '1 Aspirasi',
  C1_AZAM = '1 Azam',
  // Tahun 2
  C2_AKTIF = '2 Aktif',
  C2_AMANAH = '2 Amanah',
  C2_ARIF = '2 Arif',
  C2_ASPIRASI = '2 Aspirasi',
  C2_AZAM = '2 Azam',
  // Tahun 3
  C3_AKTIF = '3 Aktif',
  C3_AMANAH = '3 Amanah',
  C3_ARIF = '3 Arif',
  C3_ASPIRASI = '3 Aspirasi',
  C3_AZAM = '3 Azam',
  // Tahun 4
  C4_AKTIF = '4 Aktif',
  C4_AMANAH = '4 Amanah',
  C4_ARIF = '4 Arif',
  C4_ASPIRASI = '4 Aspirasi',
  C4_AZAM = '4 Azam',
  // Tahun 5
  C5_AKTIF = '5 Aktif',
  C5_AMANAH = '5 Amanah',
  C5_ARIF = '5 Arif',
  C5_ASPIRASI = '5 Aspirasi',
  C5_AZAM = '5 Azam',
  // Tahun 6
  C6_AKTIF = '6 Aktif',
  C6_AMANAH = '6 Amanah',
  C6_ARIF = '6 Arif',
  C6_ASPIRASI = '6 Aspirasi',
  C6_AZAM = '6 Azam',
}

export const COMMON_REASONS = [
  'Kesesakan Lalu Lintas',
  'Bangun Lewat',
  'Masalah Kenderaan',
  'Menghantar Adik Beradik',
  'Cuaca Buruk (Hujan)',
  'Lain-lain'
];
