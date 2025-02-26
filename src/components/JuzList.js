import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const API_URL = "https://equran.id/api/v2";

const JuzList = () => {
  const [juzList, setJuzList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJuz = async () => {
      try {
        const juzData = [];
        for (let i = 1; i <= 30; i++) {
          const response = await axios.get(`${API_URL}/juz/${i}`);
          const juzInfo = response.data.data;
          const surahSet = new Set();

          juzInfo.ayat.forEach((ayat) => {
            if (!surahSet.has(ayat.surah.nomor)) {
              surahSet.add(ayat.surah.nomor);
            }
          });

          const uniqueSurahs = Array.from(surahSet).map((nomor) => {
            return juzInfo.ayat.find((ayat) => ayat.surah.nomor === nomor)
              .surah;
          });

          juzData.push({juz: juzInfo.juz, surahs: uniqueSurahs});
        }
        setJuzList(juzData);
      } catch (error) {
        console.error("Error fetching juz list:", error);
      } finally {
        setLoading(false);
      }
    };

    getJuz();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📖 Daftar Juz</h1>

      {loading ? (
        <p style={styles.loading}>⏳ Memuat daftar juz...</p>
      ) : (
        <ul style={styles.list}>
          {juzList.map((juz) => (
            <li
              key={juz.juz}
              style={styles.listItem}
            >
              <h2 style={styles.juzTitle}>Juz {juz.juz}</h2>
              <ul>
                {juz.surahs.map((surah) => (
                  <li
                    key={surah.nomor}
                    style={styles.surahItem}
                  >
                    <Link
                      to={`/surah/${surah.nomor}`}
                      style={styles.link}
                    >
                      {surah.namaLatin} ({surah.nama})
                    </Link>
                  </li>
                ))}
              </ul>
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
    maxWidth: "600px",
    margin: "auto",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  juzTitle: {
    color: "#6a0572",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  surahItem: {
    paddingLeft: "15px",
    listStyleType: "circle",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "bold",
    display: "block",
    padding: "5px",
  },
};

export default JuzList;
