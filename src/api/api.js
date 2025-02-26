import axios from "axios";

const API_URL = "https://equran.id/api/v2";

// Ambil daftar surah
export const getSurahs = async () => {
  try {
    const response = await axios.get(`${API_URL}/surat/${nomor}`);
    return response.data.data; // API ini menyimpan daftar surah dalam "data"
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return [];
  }
};

// Ambil detail surah, termasuk teks, transliterasi, terjemahan, dan audio
export const getSurahDetail = async (surahNumber) => {
  try {
    const response = await axios.get(`${API_URL}/surat/${surahNumber}`);
    const surah = response.data.data;

    return surah.ayat.map((ayah) => ({
      number: ayah.nomorAyat, // Nomor ayat
      text: ayah.teksArab, // Teks ayat dalam bahasa Arab
      translation: ayah.teksIndonesia, // Terjemahan bahasa Indonesia
      transliteration: ayah.teksLatin, // Transliterasi (Latin)
      audio: ayah.audio["01"], // URL audio (versi pertama)
    }));
  } catch (error) {
    console.error("Error fetching surah details:", error);
    return [];
  }
};
