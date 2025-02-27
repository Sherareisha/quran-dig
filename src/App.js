import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import QuranList from "./components/QuranList";
import JuzList from "./components/JuzList";
import SurahDetail from "./components/SurahDetail";

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>📖 Menu</h2>
          <ul style={styles.navList}>
            <li>
              <a
                href="/"
                style={styles.navLink}
              >
                📜 Daftar Surah
              </a>
            </li>
            <li>
              <a
                href="/juz"
                style={styles.navLink}
              >
                📖 Daftar Juz
              </a>
            </li>{" "}
          </ul>
        </div>
        <div style={styles.mainContent}>
          <Routes>
            <Route
              path="/"
              element={<QuranList />}
            />
            <Route
              path="/juz"
              element={<JuzList />}
            />{" "}
            {/* Tambahkan route untuk JuzList */}
            <Route
              path="/surah/:surahNumber"
              element={<SurahDetail />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  sidebar: {
    width: "250px",
    background: "#6a0572",
    color: "white",
    padding: "20px",
    position: "fixed",
    height: "100vh",
  },
  sidebarTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "0.3s",
  },
  navLinkHover: {
    background: "#570456",
  },
  mainContent: {
    marginLeft: "250px",
    padding: "20px",
    width: "100%",
  },
};

export default App;
