import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://equran.id/api/v2";

const SurahDetail = () => {
  const { surahNumber } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await axios.get(`${API_URL}/surat/${surahNumber}`);
        setSurah(response.data.data);
      } catch (error) {
        console.error("Error fetching surah:", error);
        setSurah(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber]);

  if (loading) return <p style={styles.loading}>⏳ Memuat...</p>;
  if (!surah) return <p style={styles.error}>⚠ Surah tidak ditemukan.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {surah.namaLatin} <span style={styles.arabic}>({surah.nama})</span>
      </h1>
      <p style={styles.subtitle}>
        {surah.arti} - {surah.tempatTurun} - {surah.jumlahAyat} Ayat
      </p>

      <Link to="/" style={styles.backButton}>⬅ Kembali ke daftar surah</Link>

      <div style={styles.ayatContainer}>
        {surah.ayat.map((ayat) => (
          <div key={ayat.nomorAyat} style={styles.ayatBlock}>
            <p style={styles.ayatText}>{ayat.teksArab}</p>
            <p><strong>{ayat.nomorAyat}.</strong> {ayat.teksLatin}</p>
            <p><em>{ayat.teksIndonesia}</em></p>
            <audio controls style={styles.audio} src={ayat.audio["05"]}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  title: {
    color: "#6a0572",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  arabic: {
    fontSize: "24px",
    color: "#333",
    fontWeight: "normal",
  },
  subtitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "20px",
  },
  backButton: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#6a0572",
    padding: "8px 15px",
    borderRadius: "5px",
    fontSize: "14px",
    display: "inline-block",
    marginBottom: "20px",
  },
  ayatContainer: {
    textAlign: "right",
    maxWidth: "700px",
    margin: "auto",
  },
  ayatBlock: {
    padding: "15px 0",
    borderBottom: "1px solid #ddd",
  },
  ayatText: {
    fontSize: "28px",
    color: "#222",
    direction: "rtl",
    marginBottom: "10px",
  },
  audio: {
    marginTop: "10px",
    width: "100%",
  },
  loading: {
    fontSize: "18px",
    color: "#6a0572",
  },
  error: {
    fontSize: "18px",
    color: "red",
  },
};

export default SurahDetail;
