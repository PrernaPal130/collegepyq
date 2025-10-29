"use client";
import { useEffect, useState, use } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Link from "next/link";

export default function YearPage({ params }) {
  const resolvedParams = use(params);
  const { year } = resolvedParams || {};
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    console.log("Year from URL:", year);

    if (!year) return;

    const fetchSubjects = async () => {
      try {
        const q = query(
          collection(db, "QuestionPapers"),
          where("year", "==", year)
        );
        const querySnapshot = await getDocs(q);
        console.log("Found docs:", querySnapshot.docs.length);
        console.log(
          "Fetched subjects:",
          querySnapshot.docs.map((d) => d.data())
        );
        querySnapshot.docs.forEach((doc) => console.log(doc.data()));

        const subjectList = [
          ...new Set(querySnapshot.docs.map((doc) => doc.data().subject)),
        ];

        setSubjects(subjectList);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, [year]);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "40px" }}>
        {year ? `${year.toUpperCase()} Year Subjects` : "Loading..."}
      </h1>

      {subjects.length === 0 ? (
        <p>No subjects found for this year yet.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {subjects.map((subject, index) => (
            <Link key={index} href={`/${year}/${subject}`}>
              <span
                style={{
                  color: "white",
                  backgroundColor: "#0070f3",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "0.3s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0057b8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#0070f3")
                }
              >
                {subject.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
