"use client";
import { useEffect, useState, use } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function SubjectPapersPage({ params }) {
  const resolvedParams = use(params);
  const { year, subject } = resolvedParams || {};
  const decodedSubject = decodeURIComponent(subject).replace(/-/g, " ");

  const [ctPapers, setCtPapers] = useState([]);
  const [semesterPapers, setSemesterPapers] = useState([]);

  useEffect(() => {
    if (!year || !subject) return;

    const fetchPapers = async () => {
      try {
        const q = query(
          collection(db, "QuestionPapers"),
          where("year", "==", year),
          where("subject", "==", decodedSubject)
        );

        const querySnapshot = await getDocs(q);
        const allPapers = querySnapshot.docs.map((doc) => doc.data());

        const ct = allPapers.filter((p) => p.type?.toLowerCase() === "ct");
        const sem = allPapers.filter(
          (p) => p.type?.toLowerCase() === "semester"
        );

        setCtPapers(ct);
        setSemesterPapers(sem);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, [year, subject]);

  const renderPapersGrid = (papers) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {papers.map((paper, index) => (
        <div
          key={index}
          style={{
            width: "180px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onClick={() => window.open(paper.url, "_blank")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            style={{
              width: "100%",
              height: "180px",
              backgroundColor: "#f3f3f3",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={paper.url}
              alt={paper.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <p style={{ marginTop: "10px", fontWeight: "600" }}>
            {paper.title || `Paper ${index + 1}`}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        {decodedSubject
          ? `${decodedSubject.toUpperCase()} PAPERS`
          : "Loading..."}
      </h1>

      {/* CT PAPERS SECTION */}
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>🧾 CT Papers</h2>
      {ctPapers.length > 0 ? (
        renderPapersGrid(ctPapers)
      ) : (
        <p style={{ color: "gray", marginLeft: "10px" }}>
          No CT papers uploaded yet.
        </p>
      )}

      {/* SEMESTER PAPERS SECTION */}
      <h2
        style={{ textAlign: "left", marginTop: "50px", marginBottom: "20px" }}
      >
        🎓 Semester Papers
      </h2>
      {semesterPapers.length > 0 ? (
        renderPapersGrid(semesterPapers)
      ) : (
        <p style={{ color: "gray", marginLeft: "10px" }}>
          No semester papers uploaded yet.
        </p>
      )}
    </div>
  );
}
