import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://equran.id/api/v2";

const QuranList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Fetches the list of surahs from the API and sets it to the state variable
   * `surahs`.
   *
   * @return {Promise<void>}
   */
/******  04fbe79c-3575-4e38-9e91-9bc1f8de5c6d  *******/    const getSurahs = async () => {
      try {
        const response = await axios.get(`${API_URL}/surat`);
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };

    getSurahs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📖 Al-Qur'an Digital</h1>

      {loading ? (
        <p style={styles.loading}>⏳ Memuat daftar surah...</p>
      ) : (
        <ul style={styles.list}>
          {surahs.map((surah) => (
            <li key={surah.nomor} style={styles.listItem}>
              <Link to={`/surah/${surah.nomor}`} style={styles.link}>
                <span style={styles.number}>{surah.nomor}.</span> {surah.namaLatin} ({surah.nama})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#6a0572",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#6a0572",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    maxWidth: "400px",
    margin: "auto",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    display: "block",
    padding: "5px",
  },
  number: {
    color: "#6a0572",
    fontWeight: "bold",
  },
};

export default QuranList;
